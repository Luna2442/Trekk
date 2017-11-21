import reducer from './reducers';
import { applyMiddleware, createStore, compose } from 'redux'

export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())