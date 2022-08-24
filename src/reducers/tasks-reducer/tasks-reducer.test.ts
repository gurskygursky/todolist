import {addTaskAC, changeTaskStatusAC, editTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import type {TasksType} from './../../Todolist';
import { addTodolistAC, removeTodolistAC } from '../todolist-reducer/todolist-reducer';
import { v1 } from 'uuid';

let todolistID1: string;
let todolistID2: string;
let startState: TasksType = {} ;

beforeEach(() => {

    todolistID1: v1();
    todolistID2: v1();

    startState = {
        [todolistID1]: [
            { id: "1", taskTitle: "CSS", isDone: false },
            { id: "2", taskTitle: "JS", isDone: true },
            { id: "3", taskTitle: "React", isDone: false },
        ],
        [todolistID2]: [
            { id: "1", taskTitle: "bread", isDone: false },
            { id: "2", taskTitle: "milk", isDone: true },
            { id: "3", taskTitle: "tea", isDone: false },
        ],
    };
})


test('correct task should be deleted from correct array', () => {
    // const startState: TasksType = {
    //     "todolistID1": [
    //         { id: "1", taskTitle: "CSS", isDone: false },
    //         { id: "2", taskTitle: "JS", isDone: true },
    //         { id: "3", taskTitle: "React", isDone: false },
    //     ],
    //     "todolistID2": [
    //         { id: "1", taskTitle: "bread", isDone: false },
    //         { id: "2", taskTitle: "milk", isDone: true },
    //         { id: "3", taskTitle: "tea", isDone: false },
    //     ]
    // };

    const action = removeTaskAC(todolistID2, "2");

    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        [todolistID1]: [
            { id: "1", taskTitle: "CSS", isDone: false },
            { id: "2", taskTitle: "JS", isDone: true },
            { id: "3", taskTitle: "React", isDone: false },
        ],
        [todolistID2]: [
            { id: "1", taskTitle: "bread", isDone: false },
            { id: "3", taskTitle: "tea", isDone: false },
        ],
    });
});

test('correct task should be added to correct array', () => {
    // const startState: TasksType = {
    //     "todolistID1": [
    //         { id: "1", taskTitle: "CSS", isDone: false },
    //         { id: "2", taskTitle: "JS", isDone: true },
    //         { id: "3", taskTitle: "React", isDone: false },
    //     ],
    //     "todolistID2": [
    //         { id: "1", taskTitle: "bread", isDone: false },
    //         { id: "2", taskTitle: "milk", isDone: true },
    //         { id: "3", taskTitle: "tea", isDone: false },
    //     ]
    // };

    const action = addTaskAC(todolistID2, "juice");

    const endState = tasksReducer(startState, action);

    // expect(endState[todolistID1].length).toBe(4);
    expect(endState[todolistID2].length).toBe(4);
    expect(endState[todolistID2][3].id).toBeDefined();
    expect(endState[todolistID2][3].taskTitle).toBe('juice');
    expect(endState[todolistID2][3].isDone).toBe(false);
});

test('status of specified task should be changed', () => {
    // const startState: TasksType = {
    //     "todolistID1": [
    //         { id: "1", taskTitle: "CSS", isDone: false },
    //         { id: "2", taskTitle: "JS", isDone: true },
    //         { id: "3", taskTitle: "React", isDone: false },
    //     ],
    //     "todolistID2": [
    //         { id: "1", taskTitle: "bread", isDone: false },
    //         { id: "2", taskTitle: "milk", isDone: true },
    //         { id: "3", taskTitle: "tea", isDone: false },
    //     ]
    // };

    const action = changeTaskStatusAC(todolistID2, '2', false);

    const endState = tasksReducer(startState, action)

    expect(endState[todolistID2][1].isDone).toBe(false);
    expect(endState[todolistID2][1].taskTitle).toEqual('milk');
});

test('task title should be changed', () => {
    // const startState: TasksType = {
    //     "todolistID1": [
    //         { id: "1", taskTitle: "CSS", isDone: false },
    //         { id: "2", taskTitle: "JS", isDone: true },
    //         { id: "3", taskTitle: "React", isDone: false },
    //     ],
    //     "todolistID2": [
    //         { id: "1", taskTitle: "bread", isDone: false },
    //         { id: "2", taskTitle: "milk", isDone: true },
    //         { id: "3", taskTitle: "tea", isDone: false },
    //     ]
    // };

    const action = editTaskTitleAC(todolistID2, '2', 'new title');

    const endState = tasksReducer(startState, action)

    expect(endState[todolistID2][1].isDone).toBe(true);
    expect(endState[todolistID2][1].taskTitle).toEqual('new title');
});

test('new array should be added when new todolist is added', () => {
    // const startState: TasksType = {
    //     "todolistID1": [
    //         { id: "1", taskTitle: "CSS", isDone: false },
    //         { id: "2", taskTitle: "JS", isDone: true },
    //         { id: "3", taskTitle: "React", isDone: false },
    //     ],
    //     "todolistID2": [
    //         { id: "1", taskTitle: "bread", isDone: false },
    //         { id: "2", taskTitle: "milk", isDone: true },
    //         { id: "3", taskTitle: "tea", isDone: false },
    //     ]
    // };

    // const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, addTodolistAC('New Todolist'))


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== todolistID1 && k !== todolistID2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    // const startState: TasksType = {
    //     "todolistID1": [
    //         { id: "1", taskTitle: "CSS", isDone: false },
    //         { id: "2", taskTitle: "JS", isDone: true },
    //         { id: "3", taskTitle: "React", isDone: false },
    //     ],
    //     "todolistID2": [
    //         { id: "1", taskTitle: "bread", isDone: false },
    //         { id: "2", taskTitle: "milk", isDone: true },
    //         { id: "3", taskTitle: "tea", isDone: false },
    //     ]
    // };

    // const action = removeTodolistAC(todolistID2);

    const endState = tasksReducer(startState, removeTodolistAC(todolistID2));


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[todolistID2]).not.toBeDefined();
});

