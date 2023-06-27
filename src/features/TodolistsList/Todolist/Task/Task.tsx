import React, { ChangeEvent, useCallback } from 'react'
import { Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import {TaskStatuses} from "../../../../common/enums";
import {EditableSpan} from "../../../../common/components";
import {RemoveTaskArgType, TaskType} from "../../tasks-api";

type TaskPropsType = {
	task: TaskType
	todolistId: string
	changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
	changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
	removeTask: (arg: RemoveTaskArgType) => void
}
export const Task = React.memo((props: TaskPropsType) => {
	const {task, todolistId, changeTaskStatus, changeTaskTitle, removeTask} = props

	const onClickHandler = useCallback(() => {
		const arg = {taskId: task.id, todolistId }
		removeTask(arg)
	}, [removeTask, task.id, todolistId]);

	const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked
		changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
	}, [changeTaskStatus, task.id, todolistId]);

	const onTitleChangeHandler = useCallback((newValue: string) => {
		changeTaskTitle(task.id, newValue, todolistId)
	}, [changeTaskTitle, task.id, todolistId]);

	return <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
		<Checkbox
			checked={task.status === TaskStatuses.Completed}
			color="primary"
			onChange={onChangeHandler}
		/>

		<EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
		<IconButton onClick={onClickHandler}>
			<Delete/>
		</IconButton>
	</div>
})
