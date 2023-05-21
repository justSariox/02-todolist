import { TasksStateType } from '../App';
import {v1} from 'uuid';
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";
import {TaskType} from "../Components/Todolist/Todolist";



export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todolistId: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    title: string
}

export type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodoListActionType | RemoveTodoListActionType

let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return (
                { ...state,
                    [action.todolistId]:
                        state[action.todolistId].filter(t => t.id !== action.taskId)
                }
            )
        case "ADD-TASK":
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return (
                {
                    ...state,
                    [action.todolistId]: [newTask, ...state[action.todolistId]]
                }
            )
        case "CHANGE-TASK-STATUS":
            return (
                {
                    ...state,
                    [action.todolistId]:
                        state[action.todolistId].map(task => task.id === action.taskId
                            ?
                            {
                                ...task,
                                isDone: action.isDone
                            }
                            : task)
                }
            )
        case "CHANGE-TASK-TITLE":
            return (
                {
                    ...state,
                    [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                        ? {...task, title: action.title}
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

export const RemoveTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todolistId, taskId }
}
export const AddTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId}
}
export const ChangeTaskStatusAC = (taskId: string,
                                   isDone: boolean,
                                   todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId}
}
export const ChangeTaskTitleAC = (taskId: string,
                                  title: string,
                                  todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

