import { SET_TASKS, FETCH_TASKS, ADD_TASK, DELETE_TASK, UPDATE_TASK, SET_CURRENT_TASK, CLOSE_CURRENT_TASK, UPDATE_TASK_POSITION } from './types'
import { getTasks, addTask, deleteTask, updateTask, getCurrentTask, updatePosition } from '../../api'
import { SET_ERROR } from '../error/types'
// import { SET_ORDER } from '../category/types'

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

    // const ids = tasks.map(task => ({"id": task.id, "category_id:": task.category_id}))
    // dispatch({
    //   type: SET_ORDER,
    //   payload:tasks
    // })


    // const updated = state.categories.forEach(category => {
    //   let tasks = action.payload.filter(t => t.category_id === category.id)
    //   tasks.map(t => t.id)


    //   let tasks = action.payload.filter(t => t.category_id === category.id)
    //   return updatedTask ? updatedTask : task
    // })



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
  console.log(body)
  dispatch({
    type: UPDATE_TASK,
    payload: body
  })
  updatePosition (id, body)
  .then(updatedTasks => {
    console.log("updatedTasks, action", updatedTasks)
    if (!updatedTasks.exception){
      console.log("LLL")
      dispatch({
        type: UPDATE_TASK_POSITION,
        payload: updatedTasks
      })
    }



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
  })
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

