import { SET_LABELS, ADD_LABEL, ADD_TASK_LABEL, SET_TASK_LABELS, FETCH_TASK_LABELS, DELETE_TASK_LABEL } from "./types"

const defaultState = {
  labels: [],
  taskLabels: []
}

const reducer = (state = defaultState, action) => {
  console.log("labelReducer", action)
  switch (action.type) {
    case ADD_LABEL:
      return {
        ...state,
        labels: [...state.labels, action.payload]
      }
    case SET_LABELS:
      return {
        ...state,
        labels: action.payload
      }
    case FETCH_TASK_LABELS:
      return {
        ...state,
        loading: true
      }  
    case SET_TASK_LABELS:
      return {
        ...state,
        taskLabels: action.payload,
        loading: false
      }
    case ADD_TASK_LABEL:
      return {
        ...state,
        taskLabels: [...state.taskLabels, action.payload]
      }
    case DELETE_TASK_LABEL:
      return {
        ...state,
        taskLabels: state.taskLabels.filter(taskLabel => taskLabel.id !== action.payload)
      } 
    default:
      return state
  }
}

export default reducer