import { SET_TASKS, FETCH_TASKS, ADD_TASK, DELETE_TASK, UPDATE_TASK, SET_CURRENT_TASK, CLOSE_CURRENT_TASK, UPDATE_POSITIONS_OPTIMISTIC, UPDATE_POSITIONS_PESSIMISTIC } from './types'
import { getTasks, addTask, deleteTask, updateTask, getCurrentTask, updatePosition } from '../../api'
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
    if (task.error){
      dispatch({
        type: SET_ERROR,
        payload: task.error
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
  updateTask(id, body)
  .then(updatedTask => {
    console.log(updatedTask)
    if (updatedTask.error){
      dispatch({
        type: SET_ERROR,
        payload: updatedTask.error
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

