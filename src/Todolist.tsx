import React, {useState} from 'react';
// import {Button} from "./components/Button";
import {Checkbox} from "./components/Checkbox";
import styles from "./Todolist.module.css";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import Stack from '@mui/material/Stack/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export type TaskType = {
    id: string;
    taskTitle: string;
    author?: string;
    isDone: boolean;
}
export type TasksType = {
    [key: string]: TaskType[],
}
export type TaskFilterType = 'All' | 'Active' | 'Completed';

export type TodolistType = {
    id: string;
    todolistTitle: string;
    filter: TaskFilterType;
}

type PropsType = {
    todolistID: string;
    todolistTitle: string;
    tasks: TaskType[];
    addTask: (todolistID: string, title: string) => void;
    removeTask: (todolistID: string, taskID: string) => void;
    changeFilterTask: (todolistID: string, taskFilterValue: TaskFilterType) => void;
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void;
    taskFilter: TaskFilterType;
    editTodolistTitle: (todolistID: string, todolistTitle: string) => void;
    editTaskTitle: (todolistID: string, taskID: string, taskTitle: string) => void;
    removeTodolist: (todolistID: string) => void;
}

enum Filter {
    All = 'All', Active = 'Active', Completed = 'Completed',
}

export const Todolist = (props: PropsType) => {

    let [inputValue, setInputValue] = useState('');
    let [error, setError] = useState<string | null>(null);

    const onChangeFilter = (todolistID: string, taskFilterValue: TaskFilterType) => {
        props.changeFilterTask(props.todolistID, taskFilterValue);
    }
    const addTask = (title: string) => {
        if (title.trim() !== '') {
            props.addTask(props.todolistID, title.trim());
        }
        setInputValue('');
        if (!title) {
            setError('Title is required!');
        }
    }
    const removeTask = (taskID: string) => {
        props.removeTask(props.todolistID, taskID);
    }
    const onCheckboxHandler = (taskID: string, isDone: boolean) => {
        props.changeTaskStatus(props.todolistID, taskID, isDone)
    }
    const editTodolistTitle = (value: string) => {
        props.editTodolistTitle(props.todolistID, value);
    }
    const editTaskTitle = (taskID: string, value: string) => {
        props.editTaskTitle(props.todolistID, taskID, value);
    }
    const removeTodolist = () => {
        props.removeTodolist(props.todolistID);
    }

    const styleButtonAll =
        props.taskFilter === Filter.All
            ? {background: '#1977d2', color: 'white'}
            : {background: 'none'}
    const styleButtonActive = props.taskFilter === Filter.Active
        ? {background: '#1977d2', color: 'white'}
        : {background: 'none'}
    const styleButtonCompleted = props.taskFilter === Filter.Completed
        ? {background: '#1977d2', color: 'white'}
        : {background: 'none'}

    return (
        <div>
            <h3>
                <EditableSpan value={props.todolistTitle}
                              callback={(value) => editTodolistTitle(value)}
                />
                <IconButton aria-label="delete" size="small" onClick={removeTodolist}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
                {/*<Button buttonTitle={'x'} callback={() => removeTodolist()}/>*/}
            </h3>
            <span className={styles.errorMessage}>{error}</span>
            <AddItemForm addFormCallback={addTask}/>
            <ul>
                {props.tasks.map((task, index) => {
                    return (<li key={index} className={task.isDone ? styles.isDone : ''}>
                        <div className={styles.btn}>
                            <Checkbox checked={task.isDone}
                                      className={styles.btn}
                                      callback={(isDone) => onCheckboxHandler(task.id, isDone)}
                            />
                            <IconButton aria-label="delete" size="small"
                                        onClick={() => removeTask(task.id)}>
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>
                            {/*<Button buttonTitle={'x'} callback={() => removeTask(task.id)}/>*/}
                            <EditableSpan value={task.taskTitle}
                                          callback={(value) => editTaskTitle(task.id, value)}
                            />
                        </div>
                    </li>)
                })}
            </ul>
            <div className={styles.btn}>
                <Stack spacing={1} direction="row">
                    <Button variant="outlined"
                            style={styleButtonAll}
                            onClick={() => onChangeFilter(props.todolistID, Filter.All)}>{Filter.All}</Button>
                    <Button variant="outlined"
                            style={styleButtonActive}
                            onClick={() => onChangeFilter(props.todolistID, Filter.Active)}>{Filter.Active}</Button>
                    <Button variant="outlined"
                            style={styleButtonCompleted}
                            onClick={() => onChangeFilter(props.todolistID, Filter.Completed)}>{Filter.Completed}</Button>
                </Stack>
                {/*<Button buttonTitle={Filter.All}*/}
                {/*        callback={() => onChangeFilter(props.todolistID, Filter.All)}*/}
                {/*        className={props.taskFilter === Filter.All ? styles.activeFilter : ''}/>*/}
                {/*<Button buttonTitle={Filter.Active}*/}
                {/*        callback={() => {*/}
                {/*            onChangeFilter(props.todolistID, Filter.Active)*/}
                {/*        }}*/}
                {/*        className={props.taskFilter === Filter.Active ? styles.activeFilter : ''}/>*/}
                {/*<Button buttonTitle={Filter.Completed}*/}
                {/*        callback={() => {*/}
                {/*            onChangeFilter(props.todolistID, Filter.Completed)*/}
                {/*        }}*/}
                {/*        className={props.taskFilter === Filter.Completed ? styles.activeFilter : ''}/>*/}
            </div>
        </div>
    );
}
