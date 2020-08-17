import { FETCH_ATTACHMENTS, SET_ATTACHMENTS, DELETE_ATTACHMENT, ADD_ATTACHMENT, UPDATE_ATTACHMENT, CLEAR_ATTACHMENTS } from './types'
import { getAttachments, deleteAttachment, addAttachment, updateAttachment } from '../../api'

//another syntax
export const fetchAttachments = (taskId) => dispatch => {
  dispatch({type: FETCH_ATTACHMENTS})
  getAttachments(taskId).then(attachments => {
    
    dispatch({ 
      type: SET_ATTACHMENTS, 
      payload: attachments
    })
   
  })
}

// export const fetchAllComments = () => dispatch => {
//   dispatch({type: FETCH_ATTACHMENTS})
//   getAllComments().then(comments => {
    
//     dispatch({ 
//       type: SET_ATTACHMENTS, 
//       payload: comments
//     })
   
//   })
// }

export const addAttachmentAction = (attachmentObj) => dispatch => {
  addAttachment(attachmentObj)
  .then(attachment => {
    console.log(attachment)
    dispatch({
      type: ADD_ATTACHMENT,
      payload: attachment
    })
  })
}

export const deleteAttachmentAction = (id) => dispatch => {
  deleteAttachment(id)
  .then(response => {
    console.log(response)
    dispatch({
      type: DELETE_ATTACHMENT,
      payload: id
    })
  })
}

export const editAttachment = (id, attachmentObj) => dispatch => {
  updateAttachment(id, attachmentObj)
  .then(response => {
    console.log(response)
    dispatch({
      type: UPDATE_ATTACHMENT,
      payload: attachmentObj
    })
  })   
}



