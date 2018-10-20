import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { createLogger } from 'redux-logger';
import './index.css';

const TODO_ADD = 'TODO_ADD';
const TODO_TOGGLE = 'TODO_TOGGLE';
const FILTER_SET = 'FILTER_SET';
const logger = createLogger();

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
    const todo = { ...action.todo, completed: false };
    return [...state, todo];
}

function applyToggleTodo(state, action) {
    return state.map(todo => todo.id === action.todo.id
        ? { ...todo,  completed: !todo.completed }
        : todo
    );
}

function filterReducer(state = 'SHOW_ALL', action) {
    switch(action.type) {
        case FILTER_SET : {
            return applySetFilter(state, action);
        }
        default : return state;
    }
}

function applySetFilter(state, action) {
    return action.filter;
}

function doAddTodo(id, name) {
    return {
        type: TODO_ADD,
        todo: {id, name}
    };
}

function doToggleTodo(id) {
    return {
      type: TODO_TOGGLE,
      todo: {id}
    };
}

function doSetFilter(filter) {
    return {
        type: FILTER_SET,
        filter,
    };
}

const rootReducer = combineReducers({
    todoState: todoReducer,
    filterState: filterReducer
});

const store = createStore(rootReducer, undefined, applyMiddleware(logger));


   function TodoApp({ todos, onToggleTodo }) {
    return <TodoList
        todos={todos}
        onToggleTodo={onToggleTodo}
    />;
    }

    function mapStateToProps(state) {
       return {
           todos: state.todoState
       };
    }

    function mapDispatchToProps(dispatch) {
       return {
           onToggleTodo: id => dispatch(doToggleTodo(id))
       };
    }


    const ConnectedTodoApp = connect(mapStateToProps, mapDispatchToProps)(TodoApp);

    function TodoList({ todos, onToggleTodo }) {
    return (
        <div>
            {todos.map(todo => <TodoItem
                key={todo.id}
                todo={todo}
                onToggleTodo={onToggleTodo}
                />)}
        </div>
    );
    }

    function TodoItem({ todo, onToggleTodo }) {
    const { name, id, completed } = todo;
    return (
        <div>
            {name}
            <button
                type="button"
                onClick={() => onToggleTodo(id)}
            >
                {completed ? "Incomplete" : "Complete"}
            </button>
        </div>
    );
}

    ReactDOM.render(
        <Provider store={ store }>
            <ConnectedTodoApp/>
        </Provider>, document.getElementById('root'));

