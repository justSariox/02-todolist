import React, {useState} from 'react';
import TodoList from "./TodoList";
import './App.css';

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
export type FilterType = 'All' | 'Active' | 'Completed'




function App(): JSX.Element {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'React', isDone: true},
        {id: 4, title: 'task4', isDone: false},
        {id: 5, title: 'task5', isDone: true}
    ])
    const [filter, setFilter] = useState<FilterType>()

    let tasksForRender: Array<TaskType> = tasks
    if (filter === 'All') {
        tasksForRender = tasks
    }
    if (filter === 'Active') {
        tasksForRender = tasks.filter(task => !task.isDone)
    }
    if (filter === 'Completed') {
        tasksForRender = tasks.filter(task => task.isDone)
    }

    const changeTodoListFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    const removeTask = (id: number) => {
        const filteredTask = tasks.filter(task => task.id !== id)
        setTasks(filteredTask)
    }

    return (
        <div className="App">
            <TodoList tasks={tasksForRender}
                      removeTask={removeTask}
                      title='What to learn'
                      changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
