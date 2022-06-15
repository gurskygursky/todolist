import React, {useState} from 'react';
import {ChangeEvent} from "react";
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import {Checkbox} from "./components/Checkbox";
import styles from "./Todolist.module.css";

export type TaskType = {
    id: string;
    taskTitle: string;
    isDone: boolean;
}
export type TaskFilterType = 'All' | 'Active' | 'Completed';

type PropsType = {
    todolistTitle: string;
    tasks: TaskType[];
    addTask: (title: string) => void;
    removeTask: (taskID: string) => void;
    changeFilterTask: (taskFilterValue: TaskFilterType) => void;
    changeTaskStatus: (taskID: string, isDone: boolean) => void;
    taskFilter: TaskFilterType;
}

enum Filter {
    All = 'All',
    Active = 'Active',
    Completed = 'Completed',
}

export const Todolist = (props: PropsType) => {

    let [inputValue, setInputValue] = useState('');
    let [error, setError] = useState<string | null>(null);

    const onChangeFilter = (taskFilterValue: TaskFilterType) => {
        props.changeFilterTask(taskFilterValue);
    }
    const addTask = (title: string) => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
        }
        setInputValue('');
        if (!title) {
            setError('Title is required!');
        }
    }
    const removeTask = (taskID: string) => {
        props.removeTask(taskID);
    }
    const onCheckboxHandler = (taskID: string, isDone: boolean) => {
        props.changeTaskStatus(taskID, isDone)
    }

    // const onChangeTaskStatuses = (taskID: string, isDone: boolean) => {
    //     props.changeTaskStatus(taskID, isDone);
    // }

    return (
        <div>
            <h3>{props.todolistTitle}</h3>
            <span className={styles.errorMessage}>{error}</span>
            <div>
                <Input inputValue={inputValue}
                       onChangeInputValue={setInputValue}
                       addTask={addTask}
                       error={error}
                       setError={setError}
                />
                <Button buttonTitle={'+'}
                        callback={() => addTask(inputValue)}
                />
            </div>

            <ul>
                {props.tasks.map((task, index) => {

                    return (
                        <li key={index} className={task.isDone ? styles.isDone : ''}>
                            {/*<Checkbox checked={task.isDone}*/}
                            {/*          callback={(isDone) => onCheckboxHandler(task.id, isDone)}*/}
                            {/*/>*/}
                            {/*<input type="checkbox"*/}
                            {/*       checked={task.isDone}*/}
                            {/*       onChange={(event: ChangeEvent<HTMLInputElement>) => onCheckboxHandler(task.id, event.currentTarget.checked)}*/}
                            {/*/>*/}
                            <div className={styles.btn}>
                                <Checkbox checked={task.isDone}
                                          className={styles.btn}
                                          callback={(isDone) => onCheckboxHandler(task.id, isDone)}
                                />
                                <Button buttonTitle={'x'} callback={() => removeTask(task.id)}/>
                                <span>{task.taskTitle}</span>
                            </div>

                            {/*<button onClick={() => {removeTask(task.id)}}>x</button>*/}
                        </li>
                    )
                })}
            </ul>
            <div className={styles.btn}>
                <Button buttonTitle={Filter.All}
                        callback={() => onChangeFilter(Filter.All)}
                        className={props.taskFilter === Filter.All ? styles.activeFilter : ''}/>
                {/*<button className={props.taskFilter === 'All' ? styles.activeFilter : ''}*/}
                {/*        onClick={() => onChangeFilter('All')}>All</button>*/}
                <Button buttonTitle={Filter.Active}
                        callback={() => {
                            onChangeFilter(Filter.Active)
                        }}
                        className={props.taskFilter === Filter.Active ? styles.activeFilter : ''}/>
                {/*<button className={props.taskFilter === 'Active'  ? styles.activeFilter : ''}*/}
                {/*        onClick={() => onChangeFilter('Active')}>Active</button>*/}
                <Button buttonTitle={Filter.Completed}
                        callback={() => {
                            onChangeFilter(Filter.Completed)
                        }}
                        className={props.taskFilter === Filter.Completed ? styles.activeFilter : ''}/>
                {/*<button className={props.taskFilter === 'Completed'  ? styles.activeFilter : ''}*/}
                {/*        onClick={() => onChangeFilter('Completed')}>Completed</button>*/}
            </div>
        </div>
    );
}
