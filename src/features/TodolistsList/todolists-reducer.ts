import { todolistsAPI, TodolistType} from '../../common/api/todolists-api'
import {Dispatch} from 'redux'
import {appActions, RequestStatusType} from '../../app/app-reducer'
import {AppThunk} from '../../app/store';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    clearTasksAndTodos,


} from "../../common/actions/common.actions";
import {handleServerNetworkError} from "../../common/utils";

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC: ((state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1)
            }
        }),
        addTodolistAC: ((state, action: PayloadAction<{ todolist: TodolistType }>) => {

            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        }),
        changeTodolistTitleAC: ((state, action: PayloadAction<{ id: string, title: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        }),
        changeTodolistFilterAC: ((state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        }),
        changeTodolistEntityStatusAC: ((state, action: PayloadAction<{ id: string, status: RequestStatusType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        }),
        setTodolistsAC: ((state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }),
    },
    extraReducers: (builder) => {
        builder.addCase(clearTasksAndTodos, (state, action) => {
            return action.payload.todolists
        })
    }

})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

// thunks
export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        dispatch(appActions.setAppStatusAC({status: 'loading'}))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(todolistsActions.setTodolistsAC({todolists: res.data}))
                dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        //изменим глобальный статус приложения, чтобы вверху полоса побежала
        dispatch(appActions.setAppStatusAC({status: 'loading'}))
        //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
        dispatch(todolistsActions.changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(todolistsActions.removeTodolistAC({id: todolistId}))
                //скажем глобально приложению, что асинхронная операция завершена
                dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setAppStatusAC({status: 'loading'}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(todolistsActions.addTodolistAC({todolist: res.data.data.item}))
                dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(todolistsActions.changeTodolistTitleAC({id, title}))
            })
    }
}

// types

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType

}
