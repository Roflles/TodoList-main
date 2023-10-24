import React, { ChangeEvent, useState } from "react";
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType)  {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }

    const activateViewtMode = () => {
        setEditMode(false);
        props.onChange(title);
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value) 

    return editMode
        ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViewtMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}