import rootReducer from './reducers/index';
import { applyMiddleware, createStore, compose } from 'redux'
import { createLogger } from 'redux-logger'
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'

const middleware = applyMiddleware(promise(), thunk, createLogger())
let extraSauce = null
// eslint-disable-next-line
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    extraSauce = compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
} else {
    extraSauce = middleware
}

export default createStore(rootReducer, extraSauce)