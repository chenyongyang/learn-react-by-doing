import React, { Component } from 'react'
import PropTypes from 'prop-types'; 

class TodoItem extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.deleteItem(this.props.index); // 这个方法需要传递删除项的index，那就从父组件传递过去
    }
    render(){
        return (
            /**
             * 组件拆分这个部分上，自己犯了一个错误
             * 子组件从父组件获取数据，循环渲染的操作应该在父组件上进行，子组件只能负责渲染
             * 2. 子组件仅仅是触发了父组件的函数
             */
            <li 
                onClick={this.handleClick}
                // react不会自动解析html代码，这是为了防止XSS攻击
                // 使用以下这个属性来对数据作进一步处理、解析
                dangerouslySetInnerHTML={
                    // dangerouslySetInnerHTML和在标签内渲染只能选其一，要渲染多个属性值，可以通过拼接
                    {__html: this.props.content + '-' + this.props.test}
                }
            >
            </li>
            // <ul>
            //     {
            //         this.props.content.map((item, index) => {
            //             return (
            //                 <li
            //                     key={index}
            //                     onClick={this.props.deleteItem(index)}
            //                 >{item}</li>
            //             )
            //         })
            //     }
            // </ul>
        )
    }
}

// 这里的属性检验和默认值设置无效，原因暂时未知
TodoItem.propTypes = {
    content: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired, // 要求它必须传
    deleteItem: PropTypes.func
}

TodoItem.defaultProps = { // 默认值只有在父组件没有传递的时候才生效，这里test在父组件上并没有声明
    test: 'this is the default value'
}

export default TodoItem;