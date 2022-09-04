import React from 'react';
import Stack from '@mui/material/Stack/Stack';
import IconButton from '@mui/material/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { CheckboxComponent } from './components/Checkbox';
import {EditableSpan} from './components/EditableSpan';
import type {TaskType} from './Todolist';
import styles from './Todolist.module.css';

type TaskPropsType = {
    task: TaskType;
    removeTask: (taskID: string) => void;
    changeTaskStatus: (taskID: string, isDone: boolean) => void;
    editTaskTitle: (taskID: string, taskTitle: string) => void;
}

export const Task = (props: TaskPropsType) => {

    const removeTask = (taskID: string) => {
        props.removeTask(taskID);
    }

    const onCheckboxHandler = (taskID: string, isDone: boolean) => {
        props.changeTaskStatus(taskID, isDone)
    }

    const editTaskTitle = (taskID: string, value: string) => {
        props.editTaskTitle(taskID, value);
    }

    return (
        <Stack direction={'column'} spacing={1} key={props.task.id}>
            <div key={props.task.id} className={props.task.isDone ? styles.isDone : ''} style={{listStyle: 'none'}}>
                <div className={styles.btn}>
                    <CheckboxComponent checked={props.task.isDone}
                                       className={styles.btn}
                                       callback={(isDone) => onCheckboxHandler(props.task.id, isDone)}
                    />
                    <IconButton aria-label="delete" size="small"
                                onClick={() => removeTask(props.task.id)}>
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                    {/*<Button buttonTitle={'x'} callback={() => removeTask(task.id)}/>*/}
                    <EditableSpan value={props.task.taskTitle}
                                  callback={(value) => editTaskTitle(props.task.id, value)}
                    />
                </div>
            </div>
        </Stack>
    )
};
