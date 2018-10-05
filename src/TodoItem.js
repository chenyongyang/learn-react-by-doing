import React, { Component } from 'react'
import PropTypes from 'prop-types'; 

class TodoItem extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        // 这里设置为false，可以避免父组件更新时，子组件也更新；但是这个怎么区分是真的更新还是假更新呢
        // 原来这个函数接收两个参数，可以通过判断当前参数值和下一个参数值是否相同，来决定组件是否更新
        // 这样操作提升了性能，避免组件作无意义的虚拟dom比对
        if(nextProps.content !== this.props.content){
            return true;
        }else{
            return false;
        }
    }

    /**
     * componentWillReceiveProps触发条件：
     * 1. 一个组件从父组件接收参数
     * 2. 父组件的render函数被重新执行
     * 如果这个组件是第一次存在于父组件，则不会被执行
     * 如果这个组件已经存在于父组件，再次渲染时，就会执行
     * 第一次渲染可以，但是之后再渲染那就需要考虑一下了
     */
    componentWillReceiveProps() {
        console.log('child componentWillReceiveProps')
    }

    // 当组件即将被销毁时
    componentWillUnmount(){
        console.log('child componentWillUnmount')
    }

    handleClick(){
        this.props.deleteItem(this.props.index); // 这个方法需要传递删除项的index，那就从父组件传递过去
    }
    render(){
        console.log('child render')
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
    content: PropTypes.string.isRequired, // 要求它必须传
    index: PropTypes.oneOfType([PropTypes.number,PropTypes.string]), // index类型可以二选一
    deleteItem: PropTypes.func
}

TodoItem.defaultProps = { // 默认值只有在父组件没有传递的时候才生效，这里test在父组件上并没有声明
    test: 'this is the default value'
}

export default TodoItem;