import axios from "axios";
import {ResponseType} from "../types";
import {TaskPriorities, TaskStatuses} from "../enums";
import {UpdateDomainTaskModelType} from "../../features/TodolistsList/tasks-reducer";

const settings = {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '4ae79221-a547-42ce-bc89-4afae61dc986'
    }
}
const instance = axios.create({

    ...settings
})

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(arg: AddTaskArgType) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${arg.todolistId}/tasks`, {title: arg.title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}


export type AddTaskArgType = {
    title: string,
    todolistId: string
}

export type UpdateTaskArgType = {
    taskId: string,
    domainModel: UpdateDomainTaskModelType,
    todolistId: string
}

export type RemoveTaskArgType = {
    taskId: string,
    todolistId: string
}