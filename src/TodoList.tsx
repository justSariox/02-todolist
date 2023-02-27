import React, {FC} from 'react';
import {TaskType} from './App'

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

const TodoList: FC<TodoListPropsType> = (props) => {
    let isAllTasksNotDone = true;
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].idDone === true) {
            isAllTasksNotDone = false
            break;
        }
    }
    const todoClasses = isAllTasksNotDone ? 'todolist-empty' : 'todolist'
    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li>
                    <input type="checkbox" checked={props.tasks[0].idDone}/>
                    <span>{props.tasks[0].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[1].idDone}/>
                    <span>{props.tasks[1].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[2].idDone}/>
                    <span>{props.tasks[2].title}</span>
                </li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>

    );
};

export default TodoList;