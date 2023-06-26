import {ResponseType} from "../types";
import axios from "axios";

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

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>('auth/login', data);
    },
    logout() {
        return instance.delete<ResponseType<{ userId?: number }>>('auth/login');

    },
    me() {
        return instance.get<ResponseType<{ id: number; email: string; login: string }>>('auth/me');

    }
}


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
