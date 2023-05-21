import React, {memo, useCallback, useMemo, useRef} from 'react';

import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";


import {EditableSpan} from "../EditableSpan/EditableSpan";
import {AppRootStateType} from "../../state/store";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {TodolistType} from "../../App";
import {AddTaskAC} from "../../state/tasks-reducer";
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "../../state/todolists-reducer";
import {Task} from "../Task/Task";
import {ButtonMemo} from "../ButtonMemo/ButtonMemo";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export const Todolist = memo(({todolist}: PropsType) => {
    console.log('todolist render')
    const {id, title, filter} = todolist

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

    const dispatch = useDispatch()

    const addTask = useCallback((title: string) => {
        const action = AddTaskAC(title, id)
        dispatch(action)
    }, [dispatch, id])

    const removeTodolist = useCallback(() => {
        const action = RemoveTodoListAC(id)
        dispatch(action)
    }, [dispatch, id])

    const changeTodolistTitle = useCallback((title: string) => {
        const action = ChangeTodoListTitleAC(id, title)
        dispatch(action)
    }, [dispatch, id])

    const onAllClickHandler = useCallback(() => dispatch(ChangeTodoListFilterAC(id, 'all')), [dispatch, id])

    const onActiveClickHandler = useCallback(() => dispatch(ChangeTodoListFilterAC(id, 'active')), [dispatch, id])

    const onCompletedClickHandler = useCallback(() => dispatch(ChangeTodoListFilterAC(id, 'completed')), [dispatch, id])


    useMemo(() => {
        if (filter === "active") {
            tasks = tasks.filter(t => !t.isDone);
        }
        if (filter === "completed") {
            tasks = tasks.filter(t => t.isDone);
        }
        return tasks
    }, [filter])


    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    return <Task key={t.id} task={t} todolistId={id}/>
                })
            }
        </div>
        <div style={{paddingTop: 10}}>
            <ButtonMemo title={'all'}
                        callBack={onAllClickHandler}
                        color={"primary"}
                        variant={filter === 'all' ? 'outlined' : 'text'}/>
            <ButtonMemo title={'active'}
                        callBack={onActiveClickHandler}
                        color={"inherit"}
                        variant={filter === 'active' ? 'outlined' : 'text'}/>
            <ButtonMemo title={'completed'}
                        callBack={onCompletedClickHandler}
                        color={"secondary"}
                        variant={filter === 'completed' ? 'outlined' : 'text'}/>
        </div>
    </div>
})


