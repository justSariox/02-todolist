import React, { useCallback, useEffect } from 'react'
import { Task } from './Task/Task'
import { Button, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import {TaskStatuses} from "../../../common/enums";
import {AddItemForm, EditableSpan} from "../../../common/components";
import {useAppDispatch} from "../../../common/hooks";
import {useActions} from '../../../common/hooks'
import {AddTaskArgType, RemoveTaskArgType, TaskType } from '../tasks/tasks-api';
import {FilterValuesType, TodolistDomainType } from './todolists-reducer';
import { tasksThunks } from '../tasks/tasks-reducer';

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (task: AddTaskArgType) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (arg: RemoveTaskArgType) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    demo?: boolean
}

export const Todolist = React.memo( ({demo = false, ...props}: PropsType) => {
    const {todolist, tasks, changeFilter, addTask, changeTaskStatus, changeTaskTitle, removeTask, removeTodolist, changeTodolistTitle} = props
    const dispatch = useAppDispatch()
    const {fetchTasksTC} = useActions(tasksThunks)
    useEffect(() => {
        if (demo) {
            return
        }
        fetchTasksTC(todolist.id)
    }, [demo, dispatch, todolist.id])

    const addTaskHandler = useCallback((title: string) => {

        const task = {todolistId: todolist.id, title}
        addTask(task)
    }, [addTask, todolist.id])

    const removeTodolistHandler = () => {
        removeTodolist(todolist.id)
    }
    const changeTodolistTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(todolist.id, title)
    }, [todolist.id, changeTodolistTitle])

    const onAllClickHandler = useCallback(() => changeFilter('all', todolist.id), [todolist.id, changeFilter])
    const onActiveClickHandler = useCallback(() => changeFilter('active', todolist.id), [todolist.id, changeFilter])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', todolist.id), [todolist.id, changeFilter])


    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolist.id}
                                                removeTask={removeTask}
                                                changeTaskTitle={changeTaskTitle}
                                                changeTaskStatus={changeTaskStatus}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


