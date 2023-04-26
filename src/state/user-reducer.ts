export type StateType = {
    age: number,
    childrenCount: number,
    name: string
}

type IncrementAgeActionType = {
    type: 'INCREMENT-AGE'
}

type IncrementChildrenCountActionType = {
    type: 'INCREMENT-CHILDREN-COUNT'
}

type ChangeNameActionType = {
    type: 'CHANGE-NAME',
    newName: string
}

export type ActionType = IncrementAgeActionType | IncrementChildrenCountActionType | ChangeNameActionType & {
    [key: string]: any
}


export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...state, age: state.age + 1 }
        case 'INCREMENT-CHILDREN-COUNT':
            return {...state, childrenCount: state.childrenCount + 1}
        case 'CHANGE-NAME':
            return {...state, name: action.newName}
        default:
            throw new Error('i don`t understand this type')

    }
}