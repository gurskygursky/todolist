import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolist-reducer';
import type {TodolistType} from '../Todolist';
import {TaskFilterType} from '../Todolist';

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        {id: todolistId1, todolistTitle: 'What to learn', filter: 'All'},
        {id: todolistId2, todolistTitle: 'What to buy', filter: 'All'}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New Todolist';

    const startState: TodolistType[] = [
        {id: todolistId1, todolistTitle: 'What to learn', filter: 'All'},
        {id: todolistId2, todolistTitle: 'What to buy', filter: 'All'}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].todolistTitle).toBe(newTodolistTitle);
    expect(endState[2].todolistTitle).toEqual('New Todolist');
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New Todolist';

    const startState: TodolistType[] = [
        {id: todolistId1, todolistTitle: 'What to learn', filter: 'All'},
        {id: todolistId2, todolistTitle: 'What to buy', filter: 'All'}
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].todolistTitle).toBe('What to learn');
    expect(endState[1].todolistTitle).toBe(newTodolistTitle);
    expect(endState[1].todolistTitle).toEqual('New Todolist');
});
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: TaskFilterType = 'Completed';

    const startState: TodolistType[] = [
        {id: todolistId1, todolistTitle: 'What to learn', filter: 'All'},
        {id: todolistId2, todolistTitle: 'What to buy', filter: 'All'}
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe('All');
    expect(endState[1].filter).toBe(newFilter);
    expect(endState[1].todolistTitle).toEqual('What to buy');
});
