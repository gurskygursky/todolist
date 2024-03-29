import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskFilterType, TasksType, Todolist, TodolistType} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {BasicAppBar} from './components/BasicAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistReducer
} from './reducers/todolist-reducer/todolist-reducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    editTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './reducers/tasks-reducer/tasks-reducer';

export const AppWithRedux = () => {

    const todolistID1 = v1();
    const todolistID2 = v1();
    //reducers
    // let [tasks, setTasks] = useState<TasksType>({
    //         [todolistID1]: [
    //             {id: v1(), taskTitle: 'HTML&CSS', isDone: true},
    //             {id: v1(), taskTitle: 'JS', isDone: true},
    //             {id: v1(), taskTitle: 'ReactJS', isDone: false},
    //             {id: v1(), taskTitle: 'NodeJS', isDone: false},
    //         ],
    //         [todolistID2]: [
    //             {id: v1(), author: 'Douglas Murray', taskTitle: 'The Madness Of Crowds', isDone: true},
    //             {id: v1(), author: 'James Clear', taskTitle: 'Atomic Habits:', isDone: true},
    //             {id: v1(), author: 'William L. Shirer', taskTitle: 'The Rise and Fall of the Third Reich', isDone: true},
    //             {id: v1(), author: 'Nick Morgan', taskTitle: 'JavaScript for Kids', isDone: true},
    //         ],
    //     },
    // );
    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
            [todolistID1]: [
                {id: v1(), taskTitle: 'HTML&CSS', isDone: true},
                {id: v1(), taskTitle: 'JS', isDone: true},
                {id: v1(), taskTitle: 'ReactJS', isDone: false},
                {id: v1(), taskTitle: 'NodeJS', isDone: false},
            ],
            [todolistID2]: [
                {id: v1(), author: 'Douglas Murray', taskTitle: 'The Madness Of Crowds', isDone: true},
                {id: v1(), author: 'James Clear', taskTitle: 'Atomic Habits:', isDone: true},
                {id: v1(), author: 'William L. Shirer', taskTitle: 'The Rise and Fall of the Third Reich', isDone: true},
                {id: v1(), author: 'Nick Morgan', taskTitle: 'JavaScript for Kids', isDone: true},
            ],
        },
    );
    // let [todolists, setTodolists] = useState<TodolistType[]>([
    //         {id: todolistID1, todolistTitle: 'What to learn', filter: 'All'},
    //         {id: todolistID2, todolistTitle: 'Reading list', filter: 'All'},
    //     ],
    // );
    let [todolists, dispatchTodolist] = useReducer(todolistReducer, [
            {id: todolistID1, todolistTitle: 'What to learn', filter: 'All'},
            {id: todolistID2, todolistTitle: 'Reading list', filter: 'All'},
        ],
    );
    //filter
    const changeFilterTask = (todolistID: string, taskFilterValue: TaskFilterType) => {
        dispatchTodolist(changeTodolistFilterAC(todolistID, taskFilterValue));
        // setTodolists(todolists.map((todolist) => todolist.id === todolistID
        //     ? {...todolist, filter: taskFilterValue}
        //     : todolist));
    };
    //tasks
    const addTask = (todolistID: string, taskTitle: string) => {
        dispatchTasks(addTaskAC(todolistID, taskTitle));
        // const task = {id: v1(), taskTitle: taskTitle, isDone: false};
        // setTasks({...tasks, [todolistID]: [task, ...tasks[todolistID]]});
    }
    const removeTask = (todolistID: string, taskID: string) => {
        dispatchTasks(removeTaskAC(todolistID, taskID));
        // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(removedTask => removedTask.id !== taskID)});
    }
    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todolistID, taskID, isDone));
        // setTasks({
        //     ...tasks, [todolistID]: tasks[todolistID].map(changingTask => changingTask.id === taskID
        //         ? {...changingTask, isDone}
        //         : changingTask)
        // });
    }
    const editTaskTitle = (todolistID: string, taskID: string, taskTitle: string) => {
        dispatchTasks(editTaskTitleAC(todolistID, taskID, taskTitle));
        // setTasks({
        //     ...tasks,
        //     [todolistID]: tasks[todolistID].map(task => task.id === taskID ? {...task, taskTitle} : task)
        // });
    }
    //todolist
    const addTodolist = (todolistTitle: string) => {
        const action = addTodolistAC(todolistTitle);
        dispatchTodolist(action);
        dispatchTasks(action);
        // const newTodolistID = v1();
        // const newTodolist: TodolistType = {id: newTodolistID, todolistTitle, filter: 'All'};
        // setTodolists([newTodolist, ...todolists]);
        // setTasks({...tasks, [newTodolistID]: []});
    }
    const editTodolistTitle = (todolistID: string, todolistTitle: string) => {
        dispatchTodolist(changeTodolistTitleAC(todolistID, todolistTitle));
        // setTodolists(todolists.map(todolist =>
        //     todolist.id === todolistID
        //         ? {...todolist, todolistTitle}
        //         : todolist));
    }
    const removeTodolist = (todolistID: string) => {
        dispatchTodolist(removeTodolistAC(todolistID));
        // setTodolists(todolists.filter(todolist => todolist.id !== todolistID));
        // setTasks({...tasks, [todolistID]: []});
    }

    return (
        <div className="App">
            <BasicAppBar/>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addFormCallback={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map((todolist) => {
                            let filteredTasks = tasks[todolist.id];

                            if (todolist.filter === 'Completed') {
                                filteredTasks = tasks[todolist.id].filter((task) => task.isDone)
                            }
                            if (todolist.filter === 'Active') {
                                filteredTasks = tasks[todolist.id].filter((task) => !task.isDone)
                            }
                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                            <Todolist key={todolist.id}
                                                      todolistID={todolist.id}
                                                      tasks={filteredTasks}
                                                      todolistTitle={todolist.todolistTitle}
                                                      changeFilterTask={changeFilterTask}
                                                      addTask={addTask}
                                                      removeTask={removeTask}
                                                      changeTaskStatus={changeTaskStatus}
                                                      taskFilter={todolist.filter}
                                                      editTodolistTitle={editTodolistTitle}
                                                      editTaskTitle={editTaskTitle}
                                                      removeTodolist={removeTodolist}
                                            />
                                    </Paper>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}
