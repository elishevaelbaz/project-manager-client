import { SET_LABELS, ADD_LABEL } from "./types"

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
    default:
      return state
  }
}

export default reducer