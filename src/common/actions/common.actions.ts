import {createAction} from "@reduxjs/toolkit";
import {TasksStateType} from "../../features/TodolistsList/tasks-reducer";
import {TodolistDomainType} from "../../features/TodolistsList/todolists-reducer";


export const clearTasksAndTodos = createAction('common/clear-tasks-todolists', (tasks: TasksStateType, todolists: TodolistDomainType[]) => {
    return {
        payload: {
            tasks,
            todolists
        }
    }
})