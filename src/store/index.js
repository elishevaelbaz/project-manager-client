import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import taskReducer from './task/reducer'
import categoryReducer from './category/reducer'
import boardReducer from './board/reducer'

const rootReducer = combineReducers({
  task: taskReducer,
  category: categoryReducer,
  board: boardReducer

})
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
    )
  )

export default store