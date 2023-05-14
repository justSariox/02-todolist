import {combineReducers, legacy_createStore as createStore} from "redux";
import {TodoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

const rootReducer = combineReducers({
    todolists: TodoListsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>