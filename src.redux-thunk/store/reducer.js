import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION } from './actionTypes';

// 初始化数据
const defaultState = {
    inputValue: '',
    list: []
};

// reducer可以接收state，但不能修改state，这就是进行数据深拷贝的原因
export default (state = defaultState, action) => {
    // reducer自动接收store的action
    // reducer的作用就是拿到当前的数据和要操作的信息
    // 然后对数据进行处理
    // 最后将处理完的数据返回给store
    if (action.type === CHANGE_INPUT_VALUE){ // 通过action.type来进行区分不同的操作
        // reducer不能直接修改state，需要对数据进行深拷贝
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        // 返回新数据给store
        return newState;
    }
    if (action.type === INIT_LIST_ACTION) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list = action.data;
        return newState;
    }
    if (action.type === ADD_TODO_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue = '';
        return newState; // 返回新数据给store
    }
    if (action.type === DELETE_TODO_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.index, 1);
        return newState;
    }
    return state; // 这一句是组件初始化时的数据来源
}