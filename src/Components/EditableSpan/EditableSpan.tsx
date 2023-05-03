import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    callBack: (updateTitle: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    console.log('EditableSpan called')
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
        props.callBack(title)
    }


    return editMode
        ? <TextField
            variant='standard'
            type='text'
            value={title}
            autoFocus
            onBlur={activateEditMode}
            onChange={onChangeInputValue}
            onKeyPress={onKeyPress}
        />
        : <span onDoubleClick={activateEditMode}>{title}</span>


};
