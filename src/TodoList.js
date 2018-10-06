import React from 'react';
import { connect } from 'react-redux';
import { inputChangeAction, addListAction, deleteListAction } from './store/actionCreators';

// UI组件/无状态组件
const TodoList = (props) =>{
    const { inputValue, list, handleInputChange, handleBtnClick, handleItemDelete } = props;
    return (
        <div>
            <input
                value={inputValue}
                onChange={handleInputChange}
            />
            <button
                onClick={handleBtnClick}
            >提交</button>
            <ul>
                {
                    list.map((item, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => {
                                    handleItemDelete(index);
                                }}
                            >{item}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}


// 把store的state映射到组件的props
const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue,
        list: state.list
    }
}

// 把store.dispatch映射到组件的props
// 派发action去改变store里的数据
// 把这样的操作放到mapDispatchToProps里面
// 它能够让props里的方法能够调用dispatch，去操作store里的数据
const mapDispatchToProps = (dispatch) => {
    return {
        handleInputChange(e) {
            const action = inputChangeAction(e.target.value);
            dispatch(action);
        },
        handleBtnClick(){
            const action = addListAction();
            dispatch(action);
        },
        handleItemDelete(index){
            const action = deleteListAction(index);
            dispatch(action);
        }
    }
}
// 把todolist组件连接到store
// connect把UI组件和业务逻辑连接一起，最后导出的是容器组件
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);