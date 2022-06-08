import React, {useState} from 'react';
import './App.css';
import {TaskFilterType, TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export const App = () => {

    let [tasks, setTasks] = useState<TaskType[]>([
            {id: v1(), taskTitle: "HTML&CSS", isDone: true},
            {id: v1(), taskTitle: "JS", isDone: true},
            {id: v1(), taskTitle: "ReactJS", isDone: false},
            {id: v1(), taskTitle: "NodeJS", isDone: false},
        ],
    );
    let [filter, setFilterTasks] = useState<TaskFilterType>('All');

    let filteredTasks = tasks;

    if (filter === 'Completed') {
        filteredTasks = tasks.filter((task) => task.isDone)
    }
    if (filter === 'Active') {
        filteredTasks = tasks.filter((task) => !task.isDone)
    }

    const changeFilterTask = (taskFilterValue: TaskFilterType) => {
        setFilterTasks(taskFilterValue);
    }

    const addTask = (newTaskTitle: string) => {
        const newTask = {id: v1(), taskTitle: newTaskTitle, isDone: false}
        setTasks([newTask, ...tasks]);
    }

    return (
        <div className="App">
            <Todolist tasks={filteredTasks}
                      todolistTitle={'What to learn'}
                      changeFilterTask={changeFilterTask}
                      addTask={addTask}
            />
        </div>
    );
}
