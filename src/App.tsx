import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Components/Todolist/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    const updateTask = (taskId: string, todolistId: string, updatedTitle: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId
                ? {...task, title: updatedTitle}
                : task)
        })
    }

    const updateTodoList = (todolistId: string, updatedTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId
            ? {...tl, title: updatedTitle}
            : tl))
    }

    const AddNewTodoList = (title: string) => {
        let newTodoListId: string = v1()
        let newTodoList: TodolistType = {id: newTodoListId, title: title, filter: 'all'}
        setTodolists([newTodoList, ...todolists])
        setTasks({...tasks, [newTodoListId]: []})

    }


    const removeTask = (id: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== id)
        })
        // засетаем таски, сделаем копию объекта tasks, с id в виде ключа todolistId, пройдёмся по нему фильтром,
        // сделаем проверку, что id из фильтра !== ид, переданную в функцию
    }


    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({
            ...tasks,
            [todolistId]: [task, ...tasks[todolistId]]
        })
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === id
                ? {...task, isDone}
                : task)
        })
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId
            ? {...tl, filter: value}
            : tl))
        // сетаем копию наших тудулистов, если ид нашего туду листа === ид, переданную в функцию, перезаписываем ключ
        // filter у объекта tl, если нет возвращаем исходный tl.
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            <AddItemForm addItem={AddNewTodoList}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        updateTask={updateTask}
                        updateTodo={updateTodoList}
                    />
                })
            }

        </div>
    );
}

export default App;
