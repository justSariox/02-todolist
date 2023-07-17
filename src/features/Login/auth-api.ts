import {TResponse} from "../../common/types";
import {instance} from "../../common/api";


export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<TResponse<{ userId?: number }>>('auth/login', data);
    },
    logout() {
        return instance.delete<TResponse<{ userId?: number }>>('auth/login');

    },
    me() {
        return instance.get<TResponse<{ id: number; email: string; login: string }>>('auth/me');
    },

}


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
