import { FETCH_COMMENTS, SET_COMMENTS, DELETE_COMMENT, ADD_COMMENT } from './types'

const defaultState = {
  comments: [],
  loading: false
}

const reducer = (state = defaultState, action) => {
  console.log("commentReducer", action)
  // let index;
  switch (action.type) {
    
    case FETCH_COMMENTS:
      return {
        ...state,
        loading: true
      }  
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      }
      case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload]
      }
   
      case DELETE_COMMENT:
        return {
          ...state,
          comments: state.comments.filter(comment => comment.id !== action.payload)
        } 
      
  
    default:
      return state
  }
}

export default reducer