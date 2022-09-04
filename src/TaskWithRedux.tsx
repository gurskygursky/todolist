import React, {memo, useCallback} from 'react';
import Stack from '@mui/material/Stack/Stack';
import IconButton from '@mui/material/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { CheckboxComponent } from './components/Checkbox';
import {EditableSpan} from './components/EditableSpan';
import type {TaskType} from './Todolist';
import styles from './Todolist.module.css';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, editTaskTitleAC, removeTaskAC} from './reducers/tasks-reducer/tasks-reducer';

type TaskPropsType = {
    task: TaskType;
    todolistID: string;
    // removeTask: (taskID: string) => void;
    // changeTaskStatus: (taskID: string, isDone: boolean) => void;
    // editTaskTitle: (taskID: string, taskTitle: string) => void;
}

export const TaskWithRedux = memo((props: TaskPropsType) => {

    const dispatch = useDispatch();

    const removeTask = (todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID));
        // props.removeTask(taskID);
    }

    const onCheckboxHandler = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone));
        // props.changeTaskStatus(taskID, isDone)
    }

    const editTaskTitle = useCallback((todolistID: string, taskID: string, value: string) => {
        dispatch(editTaskTitleAC(todolistID, taskID, value));
        // props.editTaskTitle(taskID, value);
    }, [dispatch]);

    return (
        <Stack direction={'column'} spacing={1} key={props.task.id}>
            <div key={props.task.id} className={props.task.isDone ? styles.isDone : ''} style={{listStyle: 'none'}}>
                <div className={styles.btn}>
                    <CheckboxComponent checked={props.task.isDone}
                                       className={styles.btn}
                                       callback={(isDone) => onCheckboxHandler(props.todolistID, props.task.id, isDone)}
                    />
                    <IconButton aria-label="delete" size="small"
                                onClick={() => removeTask(props.todolistID, props.task.id)}>
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                    {/*<Button buttonTitle={'x'} callback={() => removeTask(task.id)}/>*/}
                    <EditableSpan value={props.task.taskTitle}
                                  callback={(value) => editTaskTitle(props.todolistID, props.task.id, value)}
                    />
                </div>
            </div>
        </Stack>
    )
});
