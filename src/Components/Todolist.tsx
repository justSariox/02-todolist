import React, {FC, useCallback, useEffect} from 'react'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Delete } from '@mui/icons-material';
import {Task} from './Task'
import {TaskStatuses, TaskType} from '../api/todolists-api'
import {FilterValuesType} from '../state/todolists-reducer'
import {fetchTasksTC} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../state/store";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType

}

export const Todolist: FC<PropsType> = React.memo((props) => {
    console.log('Todolist called')
    const {id, title, tasks, changeFilter, changeTaskStatus, changeTaskTitle, removeTask, ...otherProps} = props

    const dispatch: AppDispatchType = useDispatch()


    useEffect(() => {dispatch(fetchTasksTC(id))}, [])

    const addTask = useCallback((title: string) => {
        otherProps.addTask(title, id)
    }, [otherProps.addTask, id])

    const removeTodolist = () => {
        otherProps.removeTodolist(id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        otherProps.changeTodolistTitle(id, title)
    }, [id, otherProps.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => changeFilter('all', id), [id, changeFilter])
    const onActiveClickHandler = useCallback(() => changeFilter('active', id), [id, changeFilter])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [id, changeFilter])


    let tasksForTodolist = tasks

    if (otherProps.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (otherProps.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={id}
                                          removeTask={removeTask}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTaskStatus={changeTaskStatus}
                    />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={otherProps.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={otherProps.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={otherProps.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


