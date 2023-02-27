import React from 'react';
import TodoList from "./TodoList";
import './App.css';

export type TaskType = {
    id: number,
    title: string,
    idDone: boolean
}

function App(): JSX.Element {
    const tasks: TaskType[] = [
        {id: 1, title: 'HTML&CSS', idDone: true},
        {id: 2, title: 'JS', idDone: true},
        {id: 3, title: 'React', idDone: true},
    ]
    const tasks2: TaskType[] = [
        {id: 1, title: 'book1', idDone: false},
        {id: 2, title: 'book2', idDone: false},
        {id: 3, title: 'book3', idDone: false},
    ]

    return (
        <div className="App">
            <TodoList tasks={tasks} title='What to learn'/>
            <TodoList tasks={tasks2} title='What to read'/>
            <TodoList tasks={tasks} title='What to buy'/>
        </div>
    );
}

export default App;
