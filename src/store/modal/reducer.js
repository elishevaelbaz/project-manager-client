import { OPEN_MODAL, CLOSE_MODAL, CLEAR_MODAL, SET_MODAL } from "./types"

const defaultState = {
  isOpen: false,
  // task: {},
  comments: [],
  attachments: [],
  loading: false
}

const reducer = (state = defaultState, action) => {
  console.log("modalReducer", action)
  let index;
  switch (action.type) {
    
    case OPEN_MODAL:
      return {
        ...state,
        // task: action.payload,
        isOpen: true,
        loading: true
      }  
    case SET_MODAL:
      return {
        ...state,
        loading: false
      }  
    case CLOSE_MODAL:
      return {
        defaultState
      }
    default:
      return state
  }
}

export default reducer