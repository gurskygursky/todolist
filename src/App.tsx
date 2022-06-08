import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

export const App = () => {

    const tasks1 = [
        { id: 1, taskTitle: "HTML&CSS", isDone: true },
        { id: 2, taskTitle: "JS", isDone: true },
        { id: 3, taskTitle: "ReactJS", isDone: false },
        { id: 4, taskTitle: "NodeJS", isDone: false },
    ];
    const tasks2 = [
        { id: 1, taskTitle: "Hello world", isDone: true },
        { id: 2, taskTitle: "I am Happy", isDone: false },
        { id: 3, taskTitle: "Yo", isDone: false },
    ];

    return (
        <div className="App">
            <Todolist tasks={tasks1} todolistTitle={'What to learn'}/>
            <Todolist tasks={tasks2} todolistTitle={'What to'}/>
        </div>
    );
}
