import { FETCH_CATEGORIES, SET_CATEGORIES, ADD_CATEGORY, UPDATE_CATEGORY} from "./types"
import { getCategories, addCategory, updateCategory } from "../../api"


export const fetchCategories = (id) => dispatch => {
  dispatch({type: FETCH_CATEGORIES})
  getCategories(id).then(categories => {
    console.log(categories)
    dispatch({ 
      type: SET_CATEGORIES, 
      payload: categories
    })
  })
}

export const addCategoryAction = (categoryObj) => dispatch => {
  addCategory(categoryObj)
  .then(category => {
    dispatch({
      type: ADD_CATEGORY,
      payload: category
    })
  })
}

export const updateCategoryAction = (id, categoryObj) => dispatch => {
  updateCategory(id, categoryObj)
  .then(updatedCategory => {
    console.log(updatedCategory)
    dispatch({
      type: UPDATE_CATEGORY,
      payload: updatedCategory
    })
  })   
}