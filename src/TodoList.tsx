import React, {KeyboardEvent, ChangeEvent, FC, useState} from 'react';
import {FilterValuesType} from "./App";
// rsc
type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props) => {
    const [title, setTitle] = useState<string>("")
    const maxTitleLength = 15
    const minTitleLength = 0
    const isDisabledTask: boolean = title.length === minTitleLength || title.length > maxTitleLength

    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onPressKeyEnterHandler = isDisabledTask ? undefined : (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && props.addTask(title)
    const checkInputLengthHandler = (title: string) => {
        if (title.length === minTitleLength) {
            return <div>title should not be empty</div>
        }
        if (title.length > maxTitleLength) {
            return <div>title should be shorter</div>
        }
    }
    const checkTasksLength = (tasks: TaskType[]) => {
        let isAllTasksNotIsDone = true // все не выполенные
        for (let i = 0; i < props.tasks.length;) {
            if (props.tasks[i].isDone) {
                return tasks.length > 0 ? !isAllTasksNotIsDone : isAllTasksNotIsDone
            }
            return isAllTasksNotIsDone
        }

    }
    const todoClasses = checkTasksLength(props.tasks) ? "todolist-empty" : "todolist"
    const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTaskHandler = () => {
            props.removeTask(task.id)
        }
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>x
                </button>
            </li>
        )
    })
    const onSubmitInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        console.log(e.target.value)
        setTitle('')
    }

    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onSubmit={onSubmitInputHandler}
                    onChange={onChangeInputHandler}
                    onKeyDown={onPressKeyEnterHandler}

                />
                <button
                    disabled={isDisabledTask}
                    onClick={addTask}
                >+
                </button>
                {checkInputLengthHandler(title)}
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeTodoListFilter("all")
                }}
                >All
                </button>
                <button onClick={() => {
                    props.changeTodoListFilter("active")
                }}
                >Active
                </button>
                <button onClick={() => {
                    props.changeTodoListFilter("completed")
                }}
                >Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;