import { ADD_LABEL, SET_LABELS } from './types'
import { addLabel, getLabels } from '../../api'
import { SET_ERROR } from '../error/types'


export const addLabelAction = (labelObj) => dispatch => {
  addLabel(labelObj)
  .then(label => {
    if (label.error){
      dispatch({
        type: SET_ERROR,
        payload: label.error
      })
    }
    else{
      console.log(label)
      dispatch({
        type: ADD_LABEL,
        payload: label
      })
      // dispatch({type: FETCH_TASK_LABELS})  
    }
  })
}

export const fetchLabels = (boardId) => dispatch => {
  getLabels(boardId).then(labels => {
    console.log("labels", labels)
    dispatch({ 
      type: SET_LABELS, 
      payload: labels
    })
  })
}
