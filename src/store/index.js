import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import taskReducer from './task/reducer'
import commentReducer from './comment/reducer'
import categoryReducer from './category/reducer'
import boardReducer from './board/reducer'
import userReducer from './user/reducer'
import attachmentReducer from './attachment/reducer'
import labelReducer from './label/reducer'
import modalReducer from './modal/reducer'
import errorReducer from './error/reducer'
import { LOGOUT_USER } from './user/types'

// changed from rootReducer to appReducer
const appReducer = combineReducers({
  task: taskReducer,
  comment: commentReducer,
  category: categoryReducer,
  board: boardReducer,
  user: userReducer,
  attachment: attachmentReducer,
  label: labelReducer,
  modal: modalReducer,
  error: errorReducer

})

// and addded this for logging out without mutating
const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
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