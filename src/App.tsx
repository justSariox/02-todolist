import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Components/Todolist/Todolist';
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC, RemoveTodoListAC,
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}




function App() {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.TodoListsReducer)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.TasksReducer)
    const dispatch = useDispatch()

    // const todolistId1 = v1();
    // const todolistId2 = v1();

    // let [todolists, dispatchToTodolist] = useReducer(TodoListsReducer, [
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ])
    //
    // let [tasks, dispatchToTasks] = useReducer(TasksReducer, {
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "React Book", isDone: true}
    //     ]
    // });

    const updateTask = useCallback((taskId: string, todolistId: string, updatedTitle: string) => {
        const action = ChangeTaskTitleAC(todolistId, taskId, updatedTitle)
        dispatch(action)
    }, [])

    const updateTodoList = useCallback((todolistId: string, updatedTitle: string) => {
        const action = ChangeTodoListTitleAC(todolistId, updatedTitle)
        dispatch(action)
    }, [])

    // const AddNewTodoList = (title: string) => {
    //     const action = AddTodoListAC(title)
    //     dispatch(action)
    // }
    const AddNewTodoList = useCallback((title: string) => {
            const action = AddTodoListAC(title)
            dispatch(action)
        }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        const action = RemoveTaskAC(id, todolistId)
        dispatch(action)

    }, [])


    const addTask = useCallback((title: string, todolistId: string) => {
        const action = AddTaskAC(todolistId, title)
        dispatch(action)
    }, [])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        const action = ChangeTaskStatusAC(todolistId, id, isDone)
        dispatch(action)
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = ChangeTodoListFilterAC(todolistId, value)
        dispatch(action)
    }, [])

    const removeTodolist = useCallback((id: string) => {
        const action = RemoveTodoListAC(id)
        dispatch(action)
    }, [])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container style={{padding: 20}}>
                    <AddItemForm addItem={AddNewTodoList}/>

                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => <Grid item>
                                <Paper style={{padding: '10px'}}>

                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodo={updateTodoList}
                                    />
                                </Paper>
                            </Grid>
                        )
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;
