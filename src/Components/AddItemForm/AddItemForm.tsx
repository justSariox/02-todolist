import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import { IconButton, TextField} from "@mui/material";
import { AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
const ButtonStyle = {maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', marginLeft: '10px'}
export const AddItemForm: FC<AddItemFormPropsType> = (props) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addItem(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return (
        <div>
            <div>
                <TextField
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    error={!!error}
                    label={'Title'}
                    helperText={error}
                />
                <IconButton
                    onClick={addItem}
                    color='primary'
                >
                    <AddBox />
                </IconButton>
                {/*{error && <div className="error-message">{error}</div>}*/}
            </div>
        </div>
    );
};

