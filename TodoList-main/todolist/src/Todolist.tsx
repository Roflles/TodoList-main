import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Checkbox } from "@mui/material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string, todolistId: string) => void
    chacngeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (tasksId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (tasksId: string, newValue: string, todolistId: string) => void
    changeTodolistTitle: (tasksId: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export function TodoList(props: PropsType) {


    const onAllClickHandler = () => props.chacngeFilter("all", props.id);
    const onActiveClickHandler = () => props.chacngeFilter("active", props.id);
    const onCompletedClickHandler = () => props.chacngeFilter("completed", props.id);
    const removeTodolist = () => props.removeTodolist(props.id);

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    };

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle} />
                
                <IconButton aria-label="delete"  onClick={removeTodolist}>
                    <DeleteIcon/>
                </IconButton>

            </h3>
            <AddItemForm addItem={addTask} />
            <div>
                {
                    props.tasks.map(t => {
                        const onRemoveTasks = () => { props.removeTasks(t.id, props.id) }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                           props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox 
                                color="secondary"
                                onChange={onChangeStatusHandler}
                                checked={t.isDone}
                            />
                            <EditableSpan title={t.title}
                                          onChange={onChangeTitleHandler} />
                            <IconButton aria-label="delete" onClick={onRemoveTasks}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button  color={"inherit"} variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"error"} variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

