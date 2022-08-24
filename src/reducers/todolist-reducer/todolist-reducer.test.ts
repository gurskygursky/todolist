import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from '../todolist-reducer/todolist-reducer';
import {v1} from 'uuid';
import {TaskFilterType, TodolistType} from '../../Todolist';

let startState: TodolistType[] = [];
let todolistID1: string;
let todolistID2: string;

beforeEach(() => {

    todolistID1 = v1();
    todolistID2 = v1();

    startState = [
        {id: todolistID1, todolistTitle: "What to learn", filter: "All"},
        {id: todolistID2, todolistTitle: "What to buy", filter: "All"},
    ]
})
test('correct todolist should be removed', () => {
    // let todolistID1 = v1();
    // let todolistID2 = v1();

    // const startState: TodolistType[] = [
    //     {id: todolistID1, todolistTitle: "What to learn", filter: "All"},
    //     {id: todolistID2, todolistTitle: "What to buy", filter: "All"},
    // ]

    const endState = todolistReducer(startState, removeTodolistAC(todolistID1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
});

test('correct todolist should be added', () => {
    // let todolistID1 = v1();
    // let todolistID2 = v1();
    //
    // let newTodolistTitle = "New Todolist";
    //
    // const startState: TodolistType[] = [
    //     {id: todolistID1, todolistTitle: "What to learn", filter: "All"},
    //     {id: todolistID2, todolistTitle: "What to buy", filter: "All"},
    // ]

    const endState = todolistReducer(startState, addTodolistAC('New Todolist'));

    expect(endState.length).toBe(3);
    expect(endState[2].todolistTitle).toBe('New Todolist');
    expect(endState[2].todolistTitle).toEqual('New Todolist');
});

test('correct todolist should change its name', () => {
    // let todolistID1 = v1();
    // let todolistID2 = v1();
    //
    // let newTodolistTitle = "New Todolist";
    //
    // const startState: Array<TodolistType> = [
    //     {id: todolistID1, todolistTitle: "What to learn", filter: "All"},
    //     {id: todolistID2, todolistTitle: "What to buy", filter: "All"}
    // ]
    //
    // const action = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     id: todolistID2,
    //     todolistTitle: newTodolistTitle
    // };

    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistID2, 'New Todolist'));

    expect(endState[0].todolistTitle).toBe("What to learn");
    expect(endState[1].todolistTitle).toBe('New Todolist');
});

test('correct filter of todolist should be changed', () => {
    // let todolistID1 = v1();
    // let todolistID2 = v1();
    //
    // let newFilter: TaskFilterType = "Completed";
    //
    // const startState: TodolistType[] = [
    //     {id: todolistID1, todolistTitle: "What to learn", filter: "All"},
    //     {id: todolistID2, todolistTitle: "What to buy", filter: "All"}
    // ]

    // const action = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     id: todolistID2,
    //     filter: newFilter
    // };

    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistID2, 'Completed'));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe('Completed');
});
