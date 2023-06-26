import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../app/store'
import {tasksThunks, TasksStateType} from './tasks-reducer'
import { Grid, Paper } from '@mui/material'

import { Todolist } from './Todolist/Todolist'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from '../../common/hooks/';
import {
    addTodolistTC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType, removeTodolistTC,
    TodolistDomainType, todolistsActions
} from "./todolists-reducer";
import {TaskStatuses} from "../../common/enums";
import {AddItemForm} from "../../common/components";
import {AddTaskArgType, RemoveTaskArgType} from "../../common/api/tasks-api";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        const thunk = fetchTodolistsTC()
			dispatch(thunk)
    }, [])

    const removeTask = useCallback( (arg: RemoveTaskArgType) => {

        dispatch(tasksThunks.removeTaskTC(arg))
    }, [])

    const addTask = useCallback( (task: AddTaskArgType) => {

        dispatch(tasksThunks.addTaskTC(task))
    }, [])

    const changeStatus = useCallback( (taskId: string, status: TaskStatuses, todolistId: string) => {

        dispatch(tasksThunks.updateTaskTC({taskId, domainModel: {status}, todolistId}))
    }, [])

    const changeTaskTitle = useCallback( (taskId: string, title: string, todolistId: string) => {

        dispatch(tasksThunks.updateTaskTC({taskId, domainModel: {title}, todolistId}))
    }, [])

    const changeFilter = useCallback( (value: FilterValuesType, todolistId: string) => {
        dispatch(todolistsActions.changeTodolistFilterAC({id: todolistId, filter: value}))
    }, [])

    const removeTodolist = useCallback( (id: string) => {
        dispatch(removeTodolistTC(id))
    }, [])

    const changeTodolistTitle = useCallback( (id: string, title: string) => {

        dispatch(changeTodolistTitleTC(id, title))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    const allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
