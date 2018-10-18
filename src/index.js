import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import './index.css';

const TODO_ADD = 'TODO_ADD';
const TODO_TOGGLE = 'TODO_TOGGLE';
const FILTER_SET = 'FILTER_SET';

const todos = [
    {id:0, name: "Learn redux"},
    {id:1, name: "Buy new bag"}
];

function todoReducer(state=todos, action) {
    switch (action.type) {
        case TODO_ADD: {
            return applyAddToDo(state, action);
        }

        case TODO_TOGGLE : {
        return applyToggleTodo(state, action);
        }
        default : return state;
    }
}

function applyAddToDo(state, action) {
    const todo = Object.assign({}, action.todo, { completed: false });
    return state.concat(todo);
}

function applyToggleTodo(state, action) {
    return state.map(todo => todo.id === action.todo.id
        ? Object.assign({}, todo, { completed: !todo.completed })
        : todo
    );
}

    function TodoApp() {
    return <div>Todo App</div>;
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));