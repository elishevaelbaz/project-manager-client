import { OPEN_MODAL, CLOSE_MODAL, CLEAR_MODAL, SET_MODAL, OPEN_EDIT_FORM, CLOSE_EDIT_FORM } from "./types"

const defaultState = {
  isOpen: false,
  // loading: false
  focus: false
}

const reducer = (state = defaultState, action) => {
  console.log("modalReducer", action)
  let index;
  switch (action.type) {
    
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        // loading: true
      }  
    case SET_MODAL:
      return {
        ...state,
        // loading: false
      }  
    case CLOSE_MODAL:
      return {
        defaultState
      }
    case OPEN_EDIT_FORM:
      return {
        ...state,
        focus: true

      }
    case CLOSE_EDIT_FORM:
      return {
        ...state,
        focus: false
      }
    default:
      return state
  }
}

export default reducer