import { FETCH_COMMENTS, SET_COMMENTS, DELETE_COMMENT, ADD_COMMENT, UPDATE_COMMENT } from './types'
import { getComments, deleteComment, addComment, updateComment } from '../../api'

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

// export const fetchAllComments = () => dispatch => {
//   dispatch({type: FETCH_COMMENTS})
//   getAllComments().then(comments => {
    
//     dispatch({ 
//       type: SET_COMMENTS, 
//       payload: comments
//     })
   
//   })
// }

export const addCommentAction = (commentObj) => dispatch => {
  addComment(commentObj)
  .then(comment => {
    dispatch({
      type: ADD_COMMENT,
      payload: comment
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

export const editComment = (id, commentObj) => dispatch => {
  updateComment(id, commentObj)
  .then(response => {
    console.log(response)
    dispatch({
      type: UPDATE_COMMENT,
      payload: commentObj
    })
  })   
}



