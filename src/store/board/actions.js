import { SET_BOARDS, SET_CURRENT_BOARD, FETCH_BOARDS, CHANGE_CURRENT_BOARD } from './types'
import { getBoards } from '../../api'

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
export const fetchBoards = () => dispatch => {
  dispatch({type: FETCH_BOARDS})
  getBoards().then(boards => {
    dispatch({ 
      type: SET_BOARDS, 
      payload: boards
    })
    dispatch({ 
      type: SET_CURRENT_BOARD, 
      payload: boards[0]
    })
  })
}


export const changeCurrentBoard = (boardName) => dispatch => {
  dispatch({type: CHANGE_CURRENT_BOARD, payload: boardName})
}
// export const fetchBoards = () => dispatch => {
//   dispatch({type: SET_CURRENT_BOARD})
//   getBoards().then(boards => {
//     dispatch({ 
//       type: SET_BOARDS, 
//       payload: boards
//     })
//   })
// }


// export const postTask = (taskObj) => dispatch => {
//   addTask(taskObj)
//   .then(task => {
//     dispatch({
//       type: ADD_TASK,
//       payload: task
//     })
//   })
// }