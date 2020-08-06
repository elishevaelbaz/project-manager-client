import { SET_CURRENT_USER, LOGOUT_USER } from "./types"

const defaultState = {
  currentUser: null
}

const reducer = (state = defaultState, action) => {
  console.log("userReducer", action)
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }  
      // remove this eventually but keeping for now so we still have the other info
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: null
      }  
    default:
      return state
  }
}

export default reducer