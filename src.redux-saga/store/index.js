import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'; // 引入saga中间件
import reducer from './reducer'
import todoSaga from './sagas' // 封装异步操作的单独文件

const sagaMiddleware = createSagaMiddleware(); // 创建saga中间件

const composeEnhancers = 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) 
    : compose;

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware) // 使用saga中间件
);

const store = createStore(
    reducer,
    // redux_devtools_extension也是redux的中间件
    // 这里配置的都是redux的中间件
    enhancer
);

sagaMiddleware.run(todoSaga);

export default store;