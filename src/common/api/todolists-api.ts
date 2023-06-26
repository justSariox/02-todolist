import axios from 'axios'
import {ResponseType} from "../types";

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

// api
export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title});

    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title});

    },

}

// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}



