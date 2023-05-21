import React from 'react'
import { Provider } from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "../../state/tasks-reducer";

import {v1} from "uuid";
import {TodoListsReducer} from "../../state/todolists-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: TodoListsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}