import {TasksStateType} from "../App";
import {ActionType} from "./user-reducer";

import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";
import {TaskType} from "../Components/Todolist/Todolist";

export type RemoveTasksActionType = {
    type: 'REMOVE-TASK'
    payload: {
        taskId: string,
        todolistId: string
    }
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        todolistId: string
        newTaskTitle: string
    }
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        todolistId: string
        taskId: string
        isDone: boolean
    }
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        taskId: string
        todolistId: string
        newTaskTitle: string
    }
}

export type ActionsType =
    RemoveTasksActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

const initialState: TasksStateType = {}

export const TasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return (
                {
                    ...state,
                    [action.payload.todolistId]:
                        state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
                }
            )
        case "ADD-TASK":
            const newTask: TaskType = {id: v1(), title: action.payload.newTaskTitle, isDone: false}
            return (
                {
                    ...state,
                    [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
                }
            )
        case "CHANGE-TASK-STATUS":
            return (
                {
                    ...state,
                    [action.payload.todolistId]:
                        state[action.payload.todolistId].map(task => task.id === action.payload.taskId
                            ?
                            {
                                ...task,
                                isDone: action.payload.isDone
                            }
                            : task)
                }
            )
        case "CHANGE-TASK-TITLE":
            return (
                {
                    ...state,
                    [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId
                        ? {...task, title: action.payload.newTaskTitle}
                        : task)
                }
            )

        case 'ADD-TODOLIST': {

            return {...state, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state
    }
}

export const RemoveTaskAC = (taskId: string, todolistId: string): RemoveTasksActionType => {
    return {type: "REMOVE-TASK", payload: {taskId, todolistId}}
}

export const AddTaskAC = (todolistId: string, newTaskTitle: string): AddTaskActionType => {
    return {type: "ADD-TASK", payload: {todolistId, newTaskTitle}}
}

export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, isDone}}
}

export const ChangeTaskTitleAC = (todolistId: string, taskId: string, newTaskTitle: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', payload: {todolistId, taskId, newTaskTitle}}
}