import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import authReducer from './redux/reducers/authReducer'
import docReducer from './redux/reducers/docReducer'

const reducer = combineReducers({
    auth: authReducer,
    doc: docReducer
})

const middleware = [thunk]

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(...middleware)))

export default store
