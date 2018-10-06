import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList'
import { Provider } from 'react-redux';
import store from './store';

const App = (
    // 使得在Provider中所有的组件，都有能力获取store的state
    <Provider store={ store }>
        <TodoList/>
    </Provider>
);

ReactDOM.render(App, document.getElementById('root'));
