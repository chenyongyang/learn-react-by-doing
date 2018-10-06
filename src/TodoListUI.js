import React, { Component } from 'react';
import { Input, Button, List } from 'antd';
import 'antd/dist/antd.css'

class TodoListUI extends Component{
    render(){
        return (
            <div style={{ margin: '10px' }}>
                <Input
                    value={this.props.inputValue}
                    placeholder="请输入内容"
                    style={{ width: '300px', marginRight: '10px' }}
                    onChange={this.props.handleInputChange}
                />
                <Button
                    type="primary"
                    onClick={this.props.handleButtonClick}
                >
                    提交
                </Button>
                <List
                    style={{ marginTop: '10px', width: '300px' }}
                    header={<h3>TodoList</h3>}
                    bordered
                    dataSource={this.props.list}
                    // onclick触发的只是函数体，并能传递参数
                    renderItem={(item, index) => (<List.Item onClick={() => {
                        this.props.handleItemDelete(index);
                    }}>{item}</List.Item>)}
                />
            </div>
        )
    }
}

export default TodoListUI;