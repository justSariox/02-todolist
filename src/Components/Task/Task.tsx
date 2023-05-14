import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../Todolist/Todolist";
import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "../../state/tasks-reducer";
import {useDispatch} from "react-redux";

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task: FC<TaskPropsType> = memo(({task, todolistId}) => {
    console.log('task render')
    const {taskId, title, isDone} = task
    const dispatch = useDispatch()

    const onClickHandler = useCallback(() => dispatch(RemoveTaskAC(taskId, todolistId)), [dispatch, taskId, todolistId])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(ChangeTaskStatusAC(taskId, newIsDoneValue, todolistId))
    }, [dispatch, taskId, todolistId])
    const onTitleChangeHandler = useCallback((newValue: string) => {

        dispatch(ChangeTaskTitleAC(taskId, newValue, todolistId))
    }, [dispatch, taskId, todolistId])

    return (
        <div key={taskId} className={isDone ? "is-done" : ""}>
            <Checkbox
                checked={isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={title} onChange={onTitleChangeHandler} />
            <IconButton onClick={onClickHandler}>
                <Delete />
            </IconButton>
        </div>
    );
});

