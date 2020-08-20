import { ADD_LABEL, SET_LABELS, ADD_TASK_LABEL, SET_TASK_LABELS, FETCH_TASK_LABELS, DELETE_TASK_LABEL } from './types'
import { addLabel, getLabels, getTaskLabels, addTaskLabel, deleteTaskLabel, getAllTaskLabels } from '../../api'
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

export const fetchTaskLabels = (taskId) => dispatch => {
  dispatch({type: FETCH_TASK_LABELS})
  getTaskLabels(taskId).then(taskLabels => {
    console.log("taskLabels", taskLabels)
    dispatch({ 
      type: SET_TASK_LABELS, 
      payload: taskLabels
    })
   
  })
}

export const addTaskLabelAction = (taskLabelObj) => dispatch => {
  addTaskLabel(taskLabelObj)
  .then(taskLabel => {
    if (taskLabel.error){
      dispatch({
        type: SET_ERROR,
        payload: taskLabel.error
      })
    }
    else{
      console.log(taskLabel)
      dispatch({
        type: ADD_TASK_LABEL,
        payload: taskLabel
      })
    }
  })
}

export const deleteTaskLabelAction = (id) => dispatch => {
  deleteTaskLabel(id)
  .then(response => {
    console.log(response)
    dispatch({
      type: DELETE_TASK_LABEL,
      payload: id
    })
  })
}


export const fetchAllTaskLabels = (boardId) => dispatch => {
  dispatch({type: FETCH_TASK_LABELS})
  getAllTaskLabels(boardId).then(taskLabels => {
    console.log("taskLabels", taskLabels)
    dispatch({ 
      type: SET_TASK_LABELS, 
      payload: taskLabels
    })
   
  })
}


// export const postTask = (taskObj) => dispatch => {
//   addTask(taskObj)
//   .then(task => {
//     dispatch({
//       type: ADD_TASK,
//       payload: task
//     })
//   })
// }