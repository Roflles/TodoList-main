import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

type PropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: PropsType) {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const addTasks = () => {

        if (title.trim() === "") {
            return setError("Title is error");
        }
        props.addItem(title.trim());
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTasks();
        }
    }
    return (


        <div>
            <TextField 
                variant={"outlined"}
                label={"Type value"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            
            <IconButton onClick={addTasks} color={"primary"} >
                <ControlPointIcon />
            </IconButton>
            
        </div>
    )
}