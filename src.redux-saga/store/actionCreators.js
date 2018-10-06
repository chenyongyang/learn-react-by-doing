// 使用actionCreator统一创建action
import { GET_INIT_LIST, CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION } from './actionTypes';
export const getInputChangeAction = (value) => {
    return {
        type: CHANGE_INPUT_VALUE,
        value
    }
}

export const getInitListAction = (data) => {
    return {
        type: INIT_LIST_ACTION,
        data
    }
}

export const getAddItemAction = () => {
    return {
        type: ADD_TODO_ITEM
    }
}

export const getDeleteItemAction = (index) => {
    return {
        type: DELETE_TODO_ITEM,
        index
    }
}

// 封装一些 原本写在组件钩子函数的 异步操作 redux-thunk
export const getTodoList = () => {
    // 本来actionCreator只能返回js对象
    // 引入redux-thunk之后，就可以返回函数
    // 通常在这个返回的函数中执行一些异步操作，比如ajax请求
    // return (dispatch) => {
    //     axios.get('http://localhost:3001/api/initlist')
    //         .then((res) => {
    //             const data = res.data;
    //             // 取到接口的数据后，封装成action，传递给store
    //             const action = getInitListAction(data);
    //             // 返回的函数有一个默认参数为dispatch，可以直接用它来将action传递给store
    //             dispatch(action);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }
}

// redux-saga
export const getInitList = () => {
    return {
        type: GET_INIT_LIST
    }
}