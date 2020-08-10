import { FETCH_COMMENTS, SET_COMMENTS, DELETE_COMMENT } from './types'
import { getComments, deleteComment } from '../../api'

//another syntax
export const fetchComments = (taskId) => dispatch => {
  dispatch({type: FETCH_COMMENTS})
  getComments(taskId).then(comments => {
    
    dispatch({ 
      type: SET_COMMENTS, 
      payload: comments
    })
   
  })
}

export const deleteCommentAction = (id) => dispatch => {
  deleteComment(id)
  .then(response => {
    console.log(response)
    dispatch({
      type: DELETE_COMMENT,
      payload: id
    })
  })
}


