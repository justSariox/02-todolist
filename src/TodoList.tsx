import React, {FC} from 'react';
import {FilterType, TaskType} from "./App";

export type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
    changeTodoListFilter: (filter: FilterType) => void
}

const TodoList: FC<TodoListPropsType> = (props) => {
    let isAllTasksNotDone = true;
    props.tasks.map(task => task.isDone ? isAllTasksNotDone = false : task)

    const todoClasses = isAllTasksNotDone ? 'todolist-empty' : 'todolist'

    const TodoListItems: Array<JSX.Element> = props.tasks.map((task, id) => {
        return (
            <li key={id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>
                    ✖️
                </button>
            </li>
        )
    })

    return (

        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {TodoListItems}
            </ul>
            <div>
                <button onClick={() => props.changeTodoListFilter('All')}>All</button>
                <button onClick={() => props.changeTodoListFilter('Active')}>Active</button>
                <button onClick={() => props.changeTodoListFilter('Completed')}>Completed</button>
            </div>
        </div>

    );
};

export default TodoList;