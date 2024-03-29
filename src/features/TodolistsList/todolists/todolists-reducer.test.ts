
import {v1} from 'uuid'
import {TodolistType} from './todolists-api'
import {appActions, RequestStatusType} from '../../../app/app-reducer'
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ResultCode} from "../../../common/enums";
import {handleServerAppError, handleServerNetworkError} from "../../../common/utils";
import {FilterValuesType, TodolistDomainType, todolistsActions, todolistsReducer } from './todolists-reducer';

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ]
})

// test('correct todolist should be removed', () => {
//     const endState = todolistsReducer(startState, todolistsActions.removeTodolistAC({id: todolistId1}))
//
//     expect(endState.length).toBe(1)
//     expect(endState[0].id).toBe(todolistId2)
// })

// test('correct todolist should be added', () => {
//     let todolist: TodolistType = {
//         title: 'New Todolist',
//         id: 'any id',
//         addedDate: '',
//         order: 0
//     }
//
//
//     const endState = todolistsReducer(startState, todolistsActions.addTodolistAC({todolist}))
//
//     expect(endState.length).toBe(3)
//     expect(endState[2].title).toBe(todolist.title)
//     expect(endState[0].filter).toBe('all')
// })

// test('correct todolist should change its name', () => {
//     let newTodolistTitle = 'New Todolist'
//
//     const action = todolistsActions.changeTodolistTitleAC({id: todolistId2, title: newTodolistTitle})
//
//     const endState = todolistsReducer(startState, action)
//
//     expect(endState[0].title).toBe('What to learn')
//     expect(endState[1].title).toBe(newTodolistTitle)
// })

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    const action = todolistsActions.changeTodolistFilterAC({id: todolistId2, filter: newFilter})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
// test('todolists should be added', () => {
//
//     const action = todolistsActions.setTodolistsAC({todolists: startState})
//
//     const endState = todolistsReducer([], action)
//
//     expect(endState.length).toBe(2)
// })
test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = 'loading'

    const action = todolistsActions.changeTodolistEntityStatusAC({id: todolistId2, status: "loading"})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe(newStatus)
})



// const removeTaskTC = createAsyncThunk<{ tasks: TaskType[] }, RemoveTaskArgType>(
//     'tasks/removeTask',
//     async (arg, thunkAPI) => {
//         const {dispatch, rejectWithValue} = thunkAPI
//         try {
//             dispatch(appActions.setAppStatusAC({status: 'loading'}))
//             const res = await tasksAPI.deleteTask(arg)
//             if (res.data.resultCode === ResultCode.Success) {
//                 const removedTask = res.data.data
//                 dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
//                 return removedTask
//             } else {
//                 handleServerAppError(res.data, dispatch)
//                 return rejectWithValue(null)
//             }
//         } catch (e) {
//             handleServerNetworkError(e, dispatch)
//             return rejectWithValue(null)
//         }
//     }
// )
//
