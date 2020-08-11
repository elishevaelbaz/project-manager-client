import { SET_BOARDS, SET_CURRENT_BOARD, FETCH_BOARDS, CHANGE_CURRENT_BOARD, ADD_BOARD } from './types'
import { getBoards, addBoard } from '../../api'
import { fetchCategories } from '../category/actions'

//another syntax
export const fetchBoards = () => dispatch => {
  dispatch({type: FETCH_BOARDS})
  getBoards().then(boards => {
    console.log(boards)
    dispatch({ 
      type: SET_BOARDS, 
      payload: boards
    })
    // setCurrentBoard(boards[0].id)
    // dispatch({ 
    //   type: SET_CURRENT_BOARD, 
    //   payload: boards[0].id
    // })
  })
}

export const addBoardAction = (boardObj) => dispatch => {
  addBoard(boardObj)
  .then(board => {
    dispatch({
      type: ADD_BOARD,
      payload: board
    })
  })
}

// export const SOME_ACTION = 'SOME_ACTION';
// export function someAction() {
//   return (dispatch, getState) => {
//     const {items} = getState().otherReducer;

//     dispatch(anotherAction(items));
//   }
// }

export const changeCurrentBoard = (boardName) => dispatch => {
  dispatch({
    type: CHANGE_CURRENT_BOARD, payload: boardName
  })
  // let id = 
  // fetchCategories(boardName)
}

export const setCurrentBoard = (id) => dispatch => {
  dispatch({ 
    type: SET_CURRENT_BOARD, 
    payload: id
  })
  // fetchCategories(boards[0].id)
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