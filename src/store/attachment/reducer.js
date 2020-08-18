import { FETCH_ATTACHMENTS, SET_ATTACHMENTS, DELETE_ATTACHMENT, ADD_ATTACHMENT, UPDATE_ATTACHMENT, CLEAR_ATTACHMENTS } from './types'
import { CLOSE_MODAL } from '../modal/types'

const defaultState = {
  attachments: [],
  loading: false
}

const reducer = (state = defaultState, action) => {
  console.log("attachmentReducer", action)
  // let index;
  switch (action.type) {
    
    case FETCH_ATTACHMENTS:
      return {
        ...state,
        loading: true
      }  
    case SET_ATTACHMENTS:
      return {
        ...state,
        attachments: action.payload,
        loading: false
      }
    case ADD_ATTACHMENT:
      return {
        ...state,
        attachments: [...state.attachments, action.payload]
      }
   
      // form editing before save
    case UPDATE_ATTACHMENT:
      const updatedAttachments = state.attachments.map(attachment => {
        if (attachment.id === action.payload.id){
          return {
            ...attachment,
            ...action.payload
          }
        }
        else {
          return attachment
        }
      })
      return {
        ...state,
        attachments: updatedAttachments
      } 
      //clear attachments to avoid jumpiness on next open
      case CLOSE_MODAL:
        return {
          ...state,
          attachments: []
        } 

      case DELETE_ATTACHMENT:
        return {
          ...state,
          attachments: state.attachments.filter(attachment => attachment.id !== action.payload)
        } 
      
  
    default:
      return state
  }
}

export default reducer