import React from 'react';
import { Input, Button, List } from 'antd';
import 'antd/dist/antd.css'

// 无状态组件，它的性能比较高，它就是一个函数，类组件要多执行一些生命周期函数
const TodoListUI = (props) => {
    return(
        <div style={{ margin: '10px' }}>
            <Input
                value={props.inputValue}
                placeholder="请输入内容"
                style={{ width: '300px', marginRight: '10px' }}
                onChange={props.handleInputChange}
            />
            <Button
                type="primary"
                onClick={props.handleButtonClick}
            >提交</Button>
            <List
                style={{ marginTop: '10px', width: '300px' }}
                header={<h3>TodoList</h3>}
                bordered
                dataSource={props.list}
                // onclick触发的只是函数体，并能传递参数
                renderItem={(item, index) => (<List.Item onClick={() => {
                    props.handleItemDelete(index);
                }}>{item}</List.Item>)}
            />
        </div>
    )
}


// class TodoListUI extends Component{
//     render(){
//         return (
//             <div style={{ margin: '10px' }}>
//                 <Input
//                     value={this.props.inputValue}
//                     placeholder="请输入内容"
//                     style={{ width: '300px', marginRight: '10px' }}
//                     onChange={this.props.handleInputChange}
//                 />
//                 <Button
//                     type="primary"
//                     onClick={this.props.handleButtonClick}
//                 >
//                     提交
//                 </Button>
//                 <List
//                     style={{ marginTop: '10px', width: '300px' }}
//                     header={<h3>TodoList</h3>}
//                     bordered
//                     dataSource={this.props.list}
//                     // onclick触发的只是函数体，并能传递参数
//                     renderItem={(item, index) => (<List.Item onClick={() => {
//                         this.props.handleItemDelete(index);
//                     }}>{item}</List.Item>)}
//                 />
//             </div>
//         )
//     }
// }

export default TodoListUI;