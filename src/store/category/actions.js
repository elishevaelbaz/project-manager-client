import { FETCH_CATEGORIES, SET_CATEGORIES, ADD_CATEGORY} from "./types"
import { getCategories, addCategory } from "../../api"


export const fetchCategories = (id) => dispatch => {
  dispatch({type: FETCH_CATEGORIES})
  getCategories(id).then(categories => {
    console.log(categories)
    dispatch({ 
      type: SET_CATEGORIES, 
      payload: categories
    })
   
    // dispatch({ 
    //   type: SET_CURRENT_BOARD, 
    //   payload: boards[0]
    // })
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