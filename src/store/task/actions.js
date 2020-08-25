import { SET_TASKS, FETCH_TASKS, ADD_TASK, DELETE_TASK, UPDATE_TASK, SET_CURRENT_TASK,
   CLOSE_CURRENT_TASK, UPDATE_POSITIONS_OPTIMISTIC, UPDATE_POSITIONS_PESSIMISTIC,
    SET_FILTER, CLEAR_FILTER, ADD_TASK_LABEL, FETCH_TASK_LABELS, SET_TASK_LABELS, DELETE_TASK_LABEL} from './types'
import { getTasks, addTask, deleteTask, updateTask, getCurrentTask, updatePosition,
  getTaskLabels, addTaskLabel, deleteTaskLabel } from '../../api'
import { SET_ERROR } from '../error/types'

//thunky action
// export const fetchTasks = () => {
//   return function(dispatch){
//     getTasks()
//     .then(tasks => dispatch({ 
//       type: SET_TASKS, 
//       payload: tasks
//     }))
//   }
// }

//another syntax
export const fetchTasks = (id) => dispatch => {
  dispatch({type: FETCH_TASKS})
  getTasks(id).then(tasks => {
    dispatch({ 
      type: SET_TASKS, 
      payload: tasks
    })
  })
}

export const fetchCurrentTask = (id) => dispatch => {
  dispatch({type: FETCH_TASKS})
  getCurrentTask(id).then(task => {
    console.log(task)
    dispatch({ 
      type: SET_CURRENT_TASK, 
      payload: task
    })
  })
}

export const addTaskAction = (taskObj) => dispatch => {
  addTask(taskObj)
  .then(task => {
    if (task.errors){
      dispatch({
        type: SET_ERROR,
        payload: task.errors
      })
    }
    else{
      dispatch({
        type: ADD_TASK,
        payload: task
      })
    }
  })
}

export const deleteTaskAction = (id) => dispatch => {
  deleteTask(id)
  .then(response => {
    console.log(response)
    dispatch({
      type: DELETE_TASK,
      payload: id
    })
  })
}

export const updateTaskAction = (id, body) => dispatch => {
  console.log("Action", id, body)
  updateTask(id, body)
  .then(updatedTask => {
    console.log(updatedTask)
    if (updatedTask.errors){
      dispatch({
        type: SET_ERROR,
        payload: updatedTask.errors
      })
    }
    else{
    dispatch({
      type: UPDATE_TASK,
      payload: updatedTask
    })
  }
  })
}

export const updatePositionAction = (id, body) => dispatch => {
  console.log("updatePositionAction - body", JSON.stringify(body))
  // optimistic rendering
  dispatch({
    type: UPDATE_POSITIONS_OPTIMISTIC,
    payload: body
  })
  updatePosition (id, body)
  .then(updatedTasks => {
    console.log("updatedTasks, action", updatedTasks)
    if (!updatedTasks.exception){
      dispatch({
        type: UPDATE_POSITIONS_PESSIMISTIC,
        payload: updatedTasks
      })
    }
  })



  //   if (updatedTask.error){
  //     dispatch({
  //       type: SET_ERROR,
  //       payload: updatedTask.error
  //     })
  //   }
  //   else{
  //   dispatch({
  //     type: UPDATE_TASK,
  //     payload: updatedTask
  //   })
  // }

}


//remove this???
export const setCurrentTask = (task) => dispatch => {
  dispatch({ 
    type: SET_CURRENT_TASK, 
    payload: task
  })
}

export const closeCurrentTask = () => dispatch => {
  dispatch({ 
    type: CLOSE_CURRENT_TASK, 
  })
}

export const setFilter = (filterQuery) => dispatch => {
  dispatch({
    type: SET_FILTER,
    payload: filterQuery
  })
}

export const clearFilter = () => dispatch => {
  dispatch({
    type: CLEAR_FILTER,
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

    // errors not being sent back from api yet
    if (taskLabel.errors){
      dispatch({
        type: SET_ERROR,
        payload: taskLabel.errors
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
