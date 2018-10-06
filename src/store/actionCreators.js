import { CHANGE_INPUT_VALUE, ADD_LIST_ITEM, DELETE_LIST_ITEM } from './actionTypes';

export const inputChangeAction = (value) => {
    return {
        type: CHANGE_INPUT_VALUE,
        value
    };
};

export const addListAction = () => {
    return {
        type: ADD_LIST_ITEM,
    };
};

export const deleteListAction = (index) => {
    return {
        type: DELETE_LIST_ITEM,
        index
    };
};