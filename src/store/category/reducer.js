import { FETCH_CATEGORIES, SET_CATEGORIES, ADD_CATEGORY, REORDER_CATEGORY_TASKS, REORDER_CATEGORIES_TASKS } from "./types"
import { SET_CURRENT_BOARD } from "../board/types";

const defaultState = {
  categories: [],
  loading: false
}

let updatedCategories;

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

      case REORDER_CATEGORY_TASKS:


        updatedCategories = state.categories.map(category => {
          if (category.id === action.payload.id){
            return {
              // ...task, // do we need this?
              ...action.payload
            }
          }
          else{
              return category
            }
          })
          // console.log("updatedTasks", updatedTasks)
            return {
        ...state,
        categories: updatedCategories
      }
      case REORDER_CATEGORIES_TASKS:

        updatedCategories = state.categories.map(category => {
          if (category.id === action.payload.start.id){
            return {
              // ...task, // do we need this?
              ...action.payload.start
            }
          }
          else if (category.id === action.payload.finish.id){
            return {
              // ...task, // do we need this?
              ...action.payload.finish
            }
          }
          else{
              return category
            }
          })
          // console.log("updatedTasks", updatedTasks)
            return {
        ...state,
        categories: updatedCategories
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