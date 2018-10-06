// 使用actionCreator统一创建action
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION } from './actionTypes';
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