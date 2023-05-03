import React, {ChangeEvent, useCallback, FC} from 'react';
import {FilterValuesType} from '../../App';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTodo: (todolistId: string, updatedTitle: string) => void
    updateTask: (todolistId: string, taskId: string, updateTitle: string) => void
}

export const Todolist: FC<PropsType> = React.memo((props) => {
        console.log('Todolist called')
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const updateTodoHandler = (newTitle: string) => {
        props.updateTodo(props.id, newTitle)
    }

    const updateTaskHandler = (taskID: string, updateTitle: string) => {
        props.updateTask(props.id, taskID, updateTitle)
    }

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), ["all", props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), ["active", props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), ["completed", props.id])

    let tasksForTodoList = props.tasks

    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.isDone)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={updateTodoHandler}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}
        />
        <ul>
            {
                tasksForTodoList.map((t: TaskType) => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} callBack={(updateTitle) => updateTaskHandler(t.id, updateTitle)}/>
                            <IconButton onClick={onClickHandler}>
                                <Delete/>
                            </IconButton>
                            </li>
                        })
                        }
                    </ul>
                    <div>
                        <Button variant={props.filter === 'all' ? "outlined" : "text"}
                                color='primary'
                                onClick={onAllClickHandler}
                        >All
                        </Button>
                        <Button variant={props.filter === 'active' ? "outlined" : "text"}
                                color='secondary'
                                onClick={onActiveClickHandler}>Active
                        </Button>
                        <Button variant={props.filter === 'completed' ? "outlined" : "text"}
                                color='success'
                                onClick={onCompletedClickHandler}

                        >Completed
                        </Button>
                    </div>
                </div>
})


// export function Todolist(props: PropsType) {
//     console.log('Todolist called')
//     const addTask = useCallback((title: string) => {
//         props.addTask(title, props.id)
//     }, [])
//
//     const updateTodoHandler = (newTitle: string) => {
//         props.updateTodo(props.id, newTitle)
//     }
//
//     const updateTaskHandler = (taskID: string, updateTitle: string) => {
//         props.updateTask(props.id, taskID, updateTitle)
//     }
//
//     const removeTodolist = () => props.removeTodolist(props.id)
//
//     const onAllClickHandler = () => props.changeFilter("all", props.id);
//     const onActiveClickHandler = () => props.changeFilter("active", props.id);
//     const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
//
//     return <div>
//
//
//         <h3>
//             <EditableSpan title={props.title} callBack={updateTodoHandler}/>
//             <IconButton onClick={removeTodolist}>
//                 <Delete/>
//             </IconButton>
//         </h3>
//         <AddItemForm addItem={addTask}
//         />
//         <ul>
//             {
//                 props.tasks.map(t => {
//                     const onClickHandler = () => props.removeTask(t.id, props.id)
//                     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//                         let newIsDoneValue = e.currentTarget.checked;
//                         props.changeTaskStatus(t.id, newIsDoneValue, props.id);
//                     }
//
//                     return <li key={t.id} className={t.isDone ? "is-done" : ""}>
//                         <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
//                         <EditableSpan title={t.title} callBack={(updateTitle) => updateTaskHandler(t.id, updateTitle)}/>
//                             <IconButton onClick={onClickHandler}>
//                                 <Delete/>
//                             </IconButton>
//                             </li>
//                         })
//                         }
//                     </ul>
//                     <div>
//                         <Button variant={props.filter === 'all' ? "outlined" : "text"}
//                                 color='primary'
//                                 onClick={onAllClickHandler}
//                         >All
//                         </Button>
//                         <Button variant={props.filter === 'active' ? "outlined" : "text"}
//                                 color='secondary'
//                                 onClick={onActiveClickHandler}>Active
//                         </Button>
//                         <Button variant={props.filter === 'completed' ? "outlined" : "text"}
//                                 color='success'
//                                 onClick={onCompletedClickHandler}
//
//                         >Completed
//                         </Button>
//                     </div>
//                 </div>
//                 }


