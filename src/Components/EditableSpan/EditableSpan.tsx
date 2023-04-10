import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';

type EditableSpanPropsType = {
    title: string
    callBack: (updateTitle: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)
    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activateEditMode = () => {
        setEditMode(!editMode)
        if (editMode) {
            addItem()
        }
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activateEditMode()
        }
    }
    const addItem = () => {
        debugger
        props.callBack(title)
    }


    return editMode
        ? <input
            type='text'
            value={title}
            autoFocus
            onBlur={activateEditMode}
            onChange={onChangeInputValue}
            onKeyPress={onKeyPress}
        />
        : <span onDoubleClick={activateEditMode}>{title}</span>


};
