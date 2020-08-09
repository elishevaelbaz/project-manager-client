import { SET_TASKS, FETCH_TASKS, ADD_TASK, DELETE_TASK, UPDATE_TASK } from "./types"

const defaultState = {
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
      case UPDATE_TASK:
        const updatedTasks = state.tasks.map(task => {
          if (task.id === action.payload.id){
            return {
              ...task, // do we need this?
              ...action.payload
            }
          }
          else{
              return task
            }
          })
          console.log("updatedTasks", updatedTasks)
      return {
        ...state,
        tasks: updatedTasks
      } 
      case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      } 
    default:
      return state
  }
}

export default reducer