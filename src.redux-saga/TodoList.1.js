import React, { Component } from 'react';
import { Input, Button, List } from 'antd';
import 'antd/dist/antd.css'
import store from './store/index.js'
import { getInputChangeAction, getAddItemAction, getDeleteItemAction } from './store/actionCreators'

class TodoList extends Component{

    constructor(props){
        super(props);
        this.state = store.getState(); // 组件获取store的数据
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        // 订阅了store的改变，一旦改变就会执行handleStoreChange
        store.subscribe(this.handleStoreChange);
    }

    render(){
        return (
            <div>
                <div style={{margin: '10px'}}>
                    <Input
                        value={this.state.inputValue}
                        placeholder="请输入内容"
                        style={{width:'300px',marginRight: '10px'}}
                        onChange={this.handleInputChange}
                    />
                    <Button 
                        type="primary"
                        onClick={this.handleButtonClick}
                    >
                        提交
                    </Button>
                    <List
                        style={{marginTop:'10px', width: '300px'}}
                        header={<h3>TodoList</h3>}
                        bordered
                        dataSource={this.state.list}
                        renderItem={(item, index) => (<List.Item onClick={this.handleItemDelete.bind(this, index)}>{item}</List.Item>)}
                        // 以上写法会报错：意思是不能在render中触发render
                        // render函数必须是一个纯函数，涉及到什么是纯函数、函数式编程
                        // 具体讲就是在renderItem执行时，又执行了handleItemDelete
                        // 解决办法：使用bind 既修改了this 又传递了参数 又不会立即执行
                        // Cannot update during an existing state transition (such as within `render`). 
                        // Render methods should be a pure function of props and state.
                    />
                </div>
            </div>
        )
    }

    handleInputChange(e){
        // 如何让组件上的数据和redux的store连接起来
        // 首先创建一句借书的话，描述要做什么事情
        const action = getInputChangeAction(e.target.value);
        // 将这句话告诉图书管理员
        store.dispatch(action);
        // 当reducer处理完数据以后，store的state就更新了
        // 这时候组件就要去获取最新的store的state
        // 我自己的想法是，在事件处理函数中，再一次调用store.getState()方法，然后调用this.setState
        // 但是这样做有一个弊端：在每个处理函数中，我都需要去重复store.getState() this.setState()
        // 能否把这个获取store数据，更新组件数据封装成一个函数呢？
        // 答案就是store.subscribe，组件订阅store的数据，只要数据一更新，就执行handleStoreChange
        // const { inputValue, list } = store.getState();
        // this.setState(() => {
        //     return {
        //         inputValue,
        //         list
        //     }
        // })
        // 图书管理员自己不知道书的信息，要去查手册
        // 他要带着当前的previousState，和接收到的action去查Reducer
        // 这一步是自动完成的
        // 一旦store接收到这个action，就会自动把这个action转发给reducer
    }

    handleStoreChange(){
        this.setState(store.getState());
    }

    handleButtonClick(){
        const action = getAddItemAction();
        store.dispatch(action);
    }

    handleItemDelete(index){
        const action = getDeleteItemAction(index);
        store.dispatch(action);
    }
}

export default TodoList;