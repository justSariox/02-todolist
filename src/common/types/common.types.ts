export type TResponse<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
    fieldsErrors: FieldErrorType[]
}

export type FieldErrorType = {
    error: string
    field: string
}

export type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
};



