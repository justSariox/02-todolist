import axios from "axios";

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type TaskType = {
    id: string
    title: string
    completed: number
    status: number,
    priority: number,
    startDate: string
    deadline: string
    todolistId: string
    order: number
    addedDate: string
}

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '990f84a5-64fa-4310-80fe-c1e3f6d9c87f'
    }
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType<{ item: string }>>(`todo-lists/${todolistId}`, {
                title: title
            }
        )
        return promise
    },
    getTodolist() {
        const promise = instance.get<Array<TodolistType>>(`todo-lists`)
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {
                title
            }
        )
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType<{ item: string }>>(`todo-lists/${todolistId}`
        )
        return promise
    },
}

export const taskAPI = {
    getTasks(todolistId: string) {
        const promise = instance.get<Array<TaskType>>(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, title: string) {
        const promise = instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType<{ item: string }>>(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        const promise = instance.put<ResponseType<{ item: string }>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
        return promise
    }
}