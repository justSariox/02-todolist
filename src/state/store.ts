import {combineReducers, legacy_createStore as createStore} from "redux";
import {TodoListsReducer} from "./todolists-reducer";
import {TasksReducer} from "./tasks-reducer";

const rootReducer = combineReducers({
    TodoListsReducer,
    TasksReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>