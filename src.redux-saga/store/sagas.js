import { takeEvery, put } from 'redux-saga/effects';
import { GET_INIT_LIST } from './actionTypes';
import { getInitListAction } from './actionCreators';
import axios from 'axios';

function* initList() {
    try {
        const res = yield axios.get('http://localhost:3001/api/initlist');
        const action = getInitListAction(res.data);
        yield put(action); // 不加yield，数据就出不来，难道它也是异步？
    } catch (e) {
        console.log(e, '接口请求失败');
    }
}


function* mySaga() {
    yield takeEvery(GET_INIT_LIST, initList);
}

export default mySaga;