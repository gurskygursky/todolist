import React, {useReducer} from 'react';
import './App.css';
import {TaskFilterType, TasksType, TaskType, Todolist, TodolistType} from './Todolist';
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
import {useDispatch, useSelector} from 'react-redux';
import { AppRootStateType } from './state/store';

export const AppWithReducers = () => {

    // const todolistID1 = v1();
    // const todolistID2 = v1();

    // let [tasks, dispatchTasks] = useReducer(tasksReducer, {
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

    // let [todolists, dispatchTodolist] = useReducer(todolistReducer, [
    //         {id: todolistID1, todolistTitle: 'What to learn', filter: 'All'},
    //         {id: todolistID2, todolistTitle: 'Reading list', filter: 'All'},
    //     ],
    // );
    
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks);
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
    const dispatch = useDispatch();

    //filter
    const changeFilterTask = (todolistID: string, taskFilterValue: TaskFilterType) => {
        dispatch(changeTodolistFilterAC(todolistID, taskFilterValue));
    };

    //tasks
    const addTask = (todolistID: string, taskTitle: string) => {
        dispatch(addTaskAC(todolistID, taskTitle));
    }
    const removeTask = (todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID));
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone));
    }
    const editTaskTitle = (todolistID: string, taskID: string, taskTitle: string) => {
        dispatch(editTaskTitleAC(todolistID, taskID, taskTitle));
    }

    //todolist
    const addTodolist = (todolistTitle: string) => {
        const action = addTodolistAC(todolistTitle);
        dispatch(action);
        dispatch(action);
    }
    const editTodolistTitle = (todolistID: string, todolistTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, todolistTitle));
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID));
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
