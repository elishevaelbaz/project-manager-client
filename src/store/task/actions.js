import { SET_TASKS, FETCH_TASKS, ADD_TASK } from './types'
import { getTasks, addTask } from '../../api'

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
export const fetchTasks = () => dispatch => {
  dispatch({type: FETCH_TASKS})
  getTasks().then(tasks => {
    dispatch({ 
      type: SET_TASKS, 
      payload: tasks
    })
  })
}

export const postTask = (taskObj) => dispatch => {
  addTask(taskObj)
  .then(task => {
    dispatch({
      type: ADD_TASK,
      payload: task
    })
  })
}