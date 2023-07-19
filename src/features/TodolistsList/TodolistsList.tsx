import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../app/store'
import { Grid, Paper } from '@mui/material'

import { Navigate } from 'react-router-dom'
import { useAppDispatch } from '../../common/hooks/';
import {useActions} from '../../common/hooks'

import {TaskStatuses} from "../../common/enums";
import {AddItemForm} from "../../common/components";
import {FilterValuesType, TodolistDomainType, todolistsActions, todolistsThunks } from './todolists/todolists-reducer'
import {TasksStateType, tasksThunks } from './tasks/tasks-reducer'
import {AddTaskArgType, RemoveTaskArgType } from './tasks/tasks-api'
import { Todolist } from './todolists/Todolist'

type PropsType = {
    demo?: boolean
}



export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const {fetchTodolistsTC, removeTodolistTC, changeTodolistTitleTC, addTodolistTC} = useActions(todolistsThunks)
    const {removeTaskTC, addTaskTC, updateTaskTC} = useActions(tasksThunks)


    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
			fetchTodolistsTC()
    }, [demo, isLoggedIn])

    const removeTask = useCallback( (arg: RemoveTaskArgType) => {

        removeTaskTC(arg)
    }, [])

    const addTask = useCallback( (task: AddTaskArgType) => {

        addTaskTC(task)
    }, [])

    const changeStatus = useCallback( (taskId: string, status: TaskStatuses, todolistId: string) => {

        updateTaskTC({taskId, domainModel: {status}, todolistId})
    }, [])

    const changeTaskTitle = useCallback( (taskId: string, title: string, todolistId: string) => {

        updateTaskTC({taskId, domainModel: {title}, todolistId})
    }, [])

    const changeFilter = useCallback( (value: FilterValuesType, todolistId: string) => {
        dispatch(todolistsActions.changeTodolistFilterAC({id: todolistId, filter: value}))
    }, [])

    const removeTodolist = useCallback( (id: string) => {
        removeTodolistTC(id)
    }, [])

    const changeTodolistTitle = useCallback( (todolistId: string, title: string) => {

        changeTodolistTitleTC({todolistId, title})
    }, [])

    const addTodolist = useCallback((title: string) => {
        addTodolistTC(title)
    }, [])

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
