import React, { Component } from 'react';
import store from './store/index.js';
import { getInputChangeAction, getAddItemAction, getDeleteItemAction, getInitListAction } from './store/actionCreators'
import TodoListUI from './TodoListUI';
import axios from 'axios';


class TodoListContainer extends Component {

    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
        store.subscribe(this.handleStoreChange);
    }

    render() {
        return (
            <div>
                <TodoListUI
                    inputValue={this.state.inputValue}
                    list={this.state.list}
                    handleInputChange={this.handleInputChange}
                    handleButtonClick={this.handleButtonClick}
                    handleItemDelete={this.handleItemDelete}
                />
            </div>
        )
    }

    componentDidMount(){
        axios.get('http://localhost:3001/api/initlist')
            .then((res) => {
                const data = res.data;
                // 取到接口的数据后，封装成action，传递给store
                const action = getInitListAction(data);
                // 返回的函数有一个默认参数为dispatch，可以直接用它来将action传递给store
                store.dispatch(action);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    handleInputChange(e) {
        const action = getInputChangeAction(e.target.value);
        store.dispatch(action);
    }

    handleStoreChange() {
        this.setState(store.getState());
    }

    handleButtonClick() {
        const action = getAddItemAction();
        store.dispatch(action);
    }

    handleItemDelete(index) {
        const action = getDeleteItemAction(index);
        store.dispatch(action);
    }
}

export default TodoListContainer;