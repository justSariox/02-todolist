import {appActions} from "../../app/app-reducer";
import {todolistsThunks} from "./todolists-reducer";
import {createSlice} from "@reduxjs/toolkit";
import {clearTasksAndTodos} from "../../common/actions/";
import {createAppAsyncThunk} from "../../common/utils/create-app-async-thunk";
import {handleServerAppError, handleServerNetworkError} from "../../common/utils";
import {ResultCode, TaskPriorities, TaskStatuses} from "../../common/enums";
import {
    AddTaskArgType,
    RemoveTaskArgType,
    tasksAPI,
    TaskType,
    UpdateTaskArgType,
    UpdateTaskModelType
} from "./tasks-api";

const initialState: TasksStateType = {}

const fetchTasksTC = createAppAsyncThunk<{ tasks: TaskType[], todolistId: string },
    string>
('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setAppStatusAC({status: 'loading'}))
            const res = await tasksAPI.getTasks(todolistId)
            const tasks = res.data.items
            dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
            return {tasks, todolistId}
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    }
)
const addTaskTC = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>
('tasks/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatusAC({status: 'loading'}))
        const res = await tasksAPI.createTask(arg)
        if (res.data.resultCode === ResultCode.Success) {
            const task = res.data.data.item
            dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
            return {task}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})
const removeTaskTC = createAppAsyncThunk<RemoveTaskArgType, RemoveTaskArgType>(
    'tasks/removeTask',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            dispatch(appActions.setAppStatusAC({status: 'loading'}));
            const res = await tasksAPI.deleteTask(arg.todolistId, arg.taskId);
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(appActions.setAppStatusAC({status: 'succeeded'}));
                return {taskId: arg.taskId, todolistId: arg.todolistId};
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        }
    }
);

const updateTaskTC = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>
('tasks/updateTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    try {
        dispatch(appActions.setAppStatusAC({status: 'loading'}))
        const state = getState()
        const task = state.tasks[arg.todolistId].find(t => t.id === arg.taskId)
        if (!task) {
            dispatch(appActions.setAppErrorAC({error: 'Task not found'}))
            return rejectWithValue(null)
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...arg.domainModel
        }

        const res = await tasksAPI.updateTask(arg.todolistId, arg.taskId, apiModel)
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
            return arg
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksTC.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(addTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.task.todoListId]
                tasks.push(action.payload.task)
            })
            .addCase(updateTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index !== -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel}
                }
            })
            .addCase(removeTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index !== -1) {
                    tasks.splice(index, 1)
                }
            })
            .addCase(todolistsThunks.removeTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })

            .addCase(todolistsThunks.addTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsThunks.fetchTodolistsTC.fulfilled, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = []
                })
            })
            .addCase(clearTasksAndTodos, (state, action) => {
                return action.payload.tasks
            })

    }
})


export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = {fetchTasksTC, addTaskTC, updateTaskTC, removeTaskTC}

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// 123