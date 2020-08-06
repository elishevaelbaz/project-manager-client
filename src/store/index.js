import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import taskReducer from './task/reducer'
import categoryReducer from './category/reducer'
import boardReducer from './board/reducer'
import userReducer from './user/reducer'

// changed from rootReducer to appReducer
const appReducer = combineReducers({
  task: taskReducer,
  category: categoryReducer,
  board: boardReducer,
  user: userReducer

})

// and addded this for logging out without mutating
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}


const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
    )
  )

export default store