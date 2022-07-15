type StateType = {
    age: number
    childrenCount: number
    name: string
}
// type ActionType = {
//     type: string
//     [key: string]: any
// }

export const userReducer = (state: StateType, action: UserReducerActionType) => {
    switch (action.type) {
        case 'INCREMENT_AGE': return {
            ...state, age: state.age + 1
        }
            // state.age = state.age + 1;
            // return state;
        case 'INCREMENT_CHILDREN_COUNT': return {
                ...state, childrenCount: state.childrenCount + 1
            }
            // state.childrenCount = state.childrenCount + 1;
            // return state;
        case 'CHANGE-NAME': return  {
            ...state, name: 'Viktor'
        }
            // state.name = 'Viktor';
            // return state
        default:
            throw new Error("I don't understand this type")
    }
}

//actions
export const incrementAgeAC = (age: number) => {
    return {
        type: 'INCREMENT_AGE',
        payload: {age},
    } as const
}
export const incrementChildrenCountAC = (childrenCount: number) => {
    return {
        type: 'INCREMENT_CHILDREN_COUNT',
        payload: {childrenCount},
    } as const
}
export const changeNameAC = (name: string) => {
    return {
        type: 'CHANGE-NAME',
        payload: {name},
    } as const
}
//action types
export type IncrementAgeActionType = ReturnType<typeof incrementAgeAC>;
export type IncrementChildrenCountActionType = ReturnType<typeof incrementChildrenCountAC>;
export type ChangeNameActionType = ReturnType<typeof changeNameAC>;

export type UserReducerActionType =
    IncrementAgeActionType
    | IncrementChildrenCountActionType
    | ChangeNameActionType;