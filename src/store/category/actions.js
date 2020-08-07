import { FETCH_CATEGORIES, SET_CATEGORIES} from "./types"
import { getCategories } from "../../api"


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
