import type {TasksType} from '../../Todolist';
import {AddTodolistActionType} from '../../reducers/todolist-reducer/todolist-reducer';

export const tasksReducer = (state: TasksType, action: AddTodolistActionType) => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return {...state, [action.payload.todolistID]: []}
    }
}
