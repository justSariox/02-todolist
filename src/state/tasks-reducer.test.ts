import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, TasksReducer} from './tasks-reducer'
import {TasksStateType, TodolistType} from '../App'
import {AddTodoListAC, RemoveTodoListAC, TodoListsReducer} from "./todolists-reducer";
import {v1} from "uuid";

let todolistId1: string
let todolistId2: string
let startState:  TasksStateType
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = {
        [todolistId1]: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
})


test('correct task should be deleted from correct array', () => {
    const action = RemoveTaskAC('2', todolistId2)

    const endState = TasksReducer(startState, action)

    expect(endState).toEqual({
        [todolistId1]: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {
    const action = AddTaskAC( todolistId2, 'juce')

    const endState = TasksReducer(startState, action)


    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][0].id).toBeDefined()
    expect(endState[todolistId2][0].title).toBe('juce')
    expect(endState[todolistId2][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const action = ChangeTaskStatusAC(todolistId2, '2', false)

    const endState = TasksReducer(startState, action)

    expect(endState[todolistId2][2].isDone).toBeFalsy()
    expect(endState[todolistId1][1].isDone).toBeTruthy()
})

test('correct tasks should change its name', () => {
    const action = ChangeTaskTitleAC(todolistId1, '1', 'new task')

    const endState = TasksReducer(startState, action)

    expect(endState[todolistId1][0].title).toBe('new task')
    expect(endState[todolistId1][1].title).toBe('JS')
})

test('new array should be added when new todolist is added', () => {
    const action = AddTodoListAC('new todolist')

    const endState = TasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != todolistId1 && k != todolistId2)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = RemoveTodoListAC(todolistId2)

    const endState = TasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todolistId2]).not.toBeDefined()
})


