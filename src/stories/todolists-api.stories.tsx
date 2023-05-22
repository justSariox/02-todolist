import React, {useEffect, useState} from 'react'

import {taskAPI, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}


const todolistId = '498bf60e-6ef1-4221-90d6-274b907b3676'
const taskId = '30503f15-1a31-47c4-a6a5-dec2bbf96de8'
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.createTodolist('another new todolist')
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '498bf60e-6ef1-4221-90d6-274b907b3676'
        todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [tasks, setTasks] = useState<any>(null)
    useEffect(() => {
        taskAPI.getTasks(todolistId)
            .then(res => setTasks(res.data))
    }, [])
    return <div>{JSON.stringify(tasks)}</div>
}
export const CreateTasks = () => {
    const [tasks, setTasks] = useState<any>(null)
    useEffect(() => {
        taskAPI.createTask(todolistId, 'new task')
            .then(res => setTasks(res.data))
    }, [])
    return <div>{JSON.stringify(tasks)}</div>
}
export const DeleteTasks = () => {
    const [tasks, setTasks] = useState<any>(null)
    useEffect(() => {
        taskAPI.deleteTask(todolistId, taskId)
            .then(res => setTasks(res.data))
    }, [])
    return <div>{JSON.stringify(tasks)}</div>
}
export const UpdateTasks = () => {
    const [tasks, setTasks] = useState<any>(null)
    useEffect(() => {
        taskAPI.updateTask(todolistId, taskId, 'new task title')
            .then(res => setTasks(res.data))
    }, [])
    return <div>{JSON.stringify(tasks)}</div>
}
