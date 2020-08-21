import { FETCH_CATEGORIES, SET_CATEGORIES, ADD_CATEGORY, REORDER_CATEGORY_TASKS, REORDER_CATEGORIES_TASKS, UPDATE_CATEGORY } from "./types"

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
    case UPDATE_CATEGORY:
      const updatedCategories = state.categories.map(category => {
        if (category.id === action.payload.id){
          return {
            ...category,
            ...action.payload
          }
        }
        else {
          return category
        }
      })
      return {
        ...state,
        categories: updatedCategories
      } 
    default:
      return state
  }
}

export default reducer