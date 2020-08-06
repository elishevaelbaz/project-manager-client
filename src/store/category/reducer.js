import {  } from "./types"

const defaultState = {
  categories: []
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    // case SET_TASKS:
    //   return {
    //     ...state,
    //     tasks: action.payload
    //   }
      
  
    default:
      return state
  }
}

export default reducer