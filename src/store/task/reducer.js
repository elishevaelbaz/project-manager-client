import { SET_TASKS, FETCH_TASKS, ADD_TASK, DELETE_TASK, UPDATE_TASK, SET_CURRENT_TASK, CLOSE_CURRENT_TASK, UPDATE_TASK_POSITION } from "./types"

const defaultState = {
  tasks: [],
  currentTask: {},
  loading: false
}

const reducer = (state = defaultState, action) => {
  console.log("taskReducer", action)
  let updatedTasks;

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
      case SET_CURRENT_TASK:
        return {
          ...state,
          currentTask: action.payload,
          loading: false
      }
      case CLOSE_CURRENT_TASK:
        return {
          ...state,
          currentTask: {}
      }
      case UPDATE_TASK:
        updatedTasks = state.tasks.map(task => {
          if (task.id === action.payload.id){
            return {
              // ...task, // do we need this?
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
        tasks: updatedTasks,
        currentTask: action.payload // update currentTask - see change on screen immediately
      }
      case UPDATE_TASK_POSITION:
      const updated = state.tasks.map(task => {
        for (const element of action.payload) {
          if (task.id === element.id){
            console.log("el", element)
            console.log("task ", task)

            return {
              // ...task, // do we need this?
              
              ...element
            }
          }
          else{
            return task
          }
        }
        return updated

      })
          console.log("updatedTasks reducer", updated)
      return {
        ...state,
        tasks: updated,
        // currentTask: action.payload // update currentTask - see change on screen immediately
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