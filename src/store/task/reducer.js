import { SET_TASKS, FETCH_TASKS, ADD_TASK } from "./types"

const defaultState = {
  boards: [{name: "helloBoard"}, {name: "board numero dos"}],
  tasks: [],
  loading: false
}

const reducer = (state = defaultState, action) => {
  console.log("taskReducer", action)
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        loading: true
      }  
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false
      } 
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      } 
    default:
      return state
  }
}

export default reducer