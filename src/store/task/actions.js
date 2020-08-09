import { SET_TASKS, FETCH_TASKS, ADD_TASK, DELETE_TASK, UPDATE_TASK } from './types'
import { getTasks, addTask, deleteTask, updateTask } from '../../api'

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

export const addTaskAction = (taskObj) => dispatch => {
  addTask(taskObj)
  .then(task => {
    dispatch({
      type: ADD_TASK,
      payload: task
    })
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
    dispatch({
      type: UPDATE_TASK,
      payload: updatedTask
    })
  })
}