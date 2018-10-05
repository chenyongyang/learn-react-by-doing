import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
class TodoList extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue: '',
            list: []
        };
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleBtn = this.handleBtn.bind(this)
        this.handleItemDelete = this.handleItemDelete.bind(this)
    }
    render(){
        return (
            <Fragment>
                <label htmlFor='input'>请输入内容：</label>
                <input
                    id='input'
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                />
                <button
                    onClick={this.handleBtn}
                >提交
                </button>
                {
                    this.state.list.map((item, index) => {
                        return (
                            <TodoItem 
                                content={item}
                                index={index}
                                key={index}
                                /**
                                 * 事件绑定函数的参数不需要在这里声明
                                 * 父组件传递给子组件的函数要手动绑定this
                                 * 因为当子组件接收到父组件的属性值，也就是
                                 * this.handleItemDelete
                                 * 这个this到了子组件，就指向了子组件，问题是子组件自己并没有声明这个函数
                                 * 原本希望的是这个this是指向父组件，因此要手动绑定
                                 */
                                deleteItem={this.handleItemDelete}
                            />
                        )
                    })
                }
            </Fragment>
        )
    }
    handleInputChange(e){
        const inputValue = e.target.value;
        this.setState(()=>{
            return {
                inputValue
            }
        })
    }
    handleBtn(){
        this.setState((prevState)=>{ // 这里会传入一个默认参数prevState，指向修改前的state对象
            return {
                list: [...prevState.list, prevState.inputValue],
                inputValue: ''
            }
        })
        
    }
    handleItemDelete(index,value){
        console.log(value)
        const list = [...this.state.list];
        list.splice(index ,1);
        this.setState(() => {
            return {
                list
            }
        })
    }
}

export default TodoList;