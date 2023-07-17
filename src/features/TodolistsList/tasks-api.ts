import {TResponse} from "../../common/types";
import {TaskPriorities, TaskStatuses} from "../../common/enums";
import {UpdateDomainTaskModelType} from "./tasks-reducer";
import {instance} from "../../common/api/common.api";


export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<TResponse>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(arg: AddTaskArgType) {
        return instance.post<TResponse<{ item: TaskType }>>(`todo-lists/${arg.todolistId}/tasks`, {title: arg.title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<TResponse<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
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