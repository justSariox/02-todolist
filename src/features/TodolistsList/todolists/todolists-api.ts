import {instance} from "../../../common/api/common.api";
import {TResponse} from "../../../common/types";

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<TResponse<{ item: TodolistType }>>('todo-lists', {title: title});

    },
    deleteTodolist(id: string) {
        return instance.delete<TResponse>(`todo-lists/${id}`);
    },
    updateTodolist(arg: UpdateTodolistTitleArgType) {
        return instance.put<TResponse>(`todo-lists/${arg.todolistId}`, {title: arg.title});

    },

}

// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type UpdateTodolistTitleArgType = {
    todolistId: string,
    title: string
}


