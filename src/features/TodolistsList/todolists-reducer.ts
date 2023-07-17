import {todolistsAPI, TodolistType, UpdateTodolistTitleArgType} from './todolists-api'
import {appActions, RequestStatusType} from '../../app/app-reducer'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {handleServerAppError, handleServerNetworkError} from "../../common/utils";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk";
import {ResultCode} from "../../common/enums";
import {clearTasksAndTodos} from "../../common/actions";

const initialState: Array<TodolistDomainType> = []

const fetchTodolistsTC = createAppAsyncThunk<{ todolists: TodolistType[] }, void>
('todolists/fetchTodolists',
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setAppStatusAC({status: 'loading'}))
            const res = await todolistsAPI.getTodolists()
            dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
            return {todolists: res.data}
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    }
)

const removeTodolistTC = createAppAsyncThunk<{ todolistId: string }, string>
('todolists/removeTodolist',
    async (todolistId, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setAppStatusAC({status: 'loading'}))
            const res = await todolistsAPI.deleteTodolist(todolistId)
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
                return {todolistId}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    }
)
const addTodolistTC = createAppAsyncThunk<{ todolist: TodolistType }, string>
('todolists/addTodolist',
    async (title, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setAppStatusAC({status: 'loading'}))
            const res = await todolistsAPI.createTodolist(title)
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(appActions.setAppStatusAC({status: 'loading'}))
                return {todolist: res.data.data.item}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    }
)
const changeTodolistTitleTC = createAppAsyncThunk<UpdateTodolistTitleArgType, UpdateTodolistTitleArgType>
('todolists/changeTodolistTitleTC',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setAppStatusAC({status: 'loading'}))
            const res = await todolistsAPI.updateTodolist(arg)
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
                return arg
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    }
)
const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        changeTodolistFilterAC: ((state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        }),
        changeTodolistEntityStatusAC: ((state, action: PayloadAction<{ id: string, status: RequestStatusType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(clearTasksAndTodos, (state, action) => {
                return action.payload.todolists
            })
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                return action.payload.todolists.map((tl) => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todolistId)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todolistId)
                if (index !== -1) {
                    state[index].title = action.payload.title
                }
            })
    }

})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = {fetchTodolistsTC, removeTodolistTC, addTodolistTC, changeTodolistTitleTC}

// types

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType

}
