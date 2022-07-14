import {v1} from 'uuid';
import {removeTodolistAC, todolistsReducer} from './todolist-reducer';
import type {TodolistType} from '../Todolist';

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, todolistTitle: "What to learn", filter: "All"},
        {id: todolistId2, todolistTitle: "What to buy", filter: "All"}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
