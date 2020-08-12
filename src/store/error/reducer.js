import { SET_ERROR, HIDE_ERROR } from "./types"

const defaultState = {
  error: null,
  isOpen: false
}

const reducer = (state = defaultState, action) => {
  console.log("errorReducer", action)
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isOpen: true
      }
    case HIDE_ERROR:
      return {
        ...state,
        error: null,
        isOpen: false
      }
    default:
      return state
  }
}

export default reducer