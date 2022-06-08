import React, {useState} from 'react';
import './App.css';
import {TaskFilterType, TaskType, Todolist} from './Todolist';

export const App = () => {

    // const tasks1 = [
    //     {id: 1, taskTitle: "HTML&CSS", isDone: true},
    //     {id: 2, taskTitle: "JS", isDone: true},
    //     {id: 3, taskTitle: "ReactJS", isDone: false},
    //     {id: 4, taskTitle: "NodeJS", isDone: false},
    // ];
    // const tasks2 = [
    //     {id: 1, taskTitle: "Hello world", isDone: true},
    //     {id: 2, taskTitle: "I am Happy", isDone: false},
    //     {id: 3, taskTitle: "Yo", isDone: false},
    // ];

    let [tasks, setTasks] = useState<TaskType[]>([
            {id: 1, taskTitle: "HTML&CSS", isDone: true},
            {id: 2, taskTitle: "JS", isDone: true},
            {id: 3, taskTitle: "ReactJS", isDone: false},
            {id: 4, taskTitle: "NodeJS", isDone: false},
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


    return (
        <div className="App">
            <Todolist tasks={filteredTasks}
                      todolistTitle={'What to learn'}
                      changeFilterTask={changeFilterTask}
            />
            {/*<Todolist tasks={tasks2} todolistTitle={'What to'}/>*/}
        </div>
    );
}
