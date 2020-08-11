import { FETCH_CATEGORIES, SET_CATEGORIES, ADD_CATEGORY } from "./types"
import { SET_CURRENT_BOARD } from "../board/types";

const defaultState = {
  categories: [],
  loading: false
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        loading: true
      }
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false
      } 
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload]
      } 
    // case SET_CURRENT_BOARD:

    //   return {
    //     ...state,
    //     currentBoard: action.payload
    //   }
    //   let id = actio
    //   let existingAuthor = state.filter(author => author.authorName === action.book.authorName)
    //   if (existingAuthor.length > 0) {
    //     return state;
    //   } else {
    //     return [...state, { authorName: action.book.authorName, id: uuid() }];
    //   }
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