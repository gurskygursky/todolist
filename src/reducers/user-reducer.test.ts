import {changeNameAC, incrementAgeAC, incrementChildrenCountAC, userReducer} from './user-reducer';

test('user reducer should increment only age', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

    const endState = userReducer(startState, incrementAgeAC(startState.age + 1));

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
    expect(endState.name).toEqual('Dimych');
});

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };
    // your code here
    const endState = userReducer(startState, incrementChildrenCountAC(startState.childrenCount + 1));

    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(3);
    expect(endState.name).toEqual('Dimych');
});
test('user reducer should change name of user', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych' };
    const newName = 'Viktor';
    const endState = userReducer(startState, changeNameAC(newName));

    expect(endState.name).toBe(newName);
    expect(endState.name).toEqual('Viktor');
});
