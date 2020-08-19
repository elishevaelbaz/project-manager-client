import { OPEN_MODAL, CLOSE_MODAL, CLEAR_MODAL, OPEN_EDIT_FORM, CLOSE_EDIT_FORM } from './types'
import { CLEAR_FILTER } from '../task/types'
// import { getBoards, addBoard, addMember, getMembers } from '../../api'
// import { SET_ERROR } from '../error/types'
// import { fetchCategories } from '../category/actions'

//another syntax
export const openModal = (task) => dispatch => {
  dispatch({
    type: OPEN_MODAL,
    payload: task})
}

export const closeModal = () => dispatch => {
  dispatch({type: CLOSE_MODAL})
}

export const clearFilter = () => dispatch => {
  dispatch({type: CLEAR_FILTER})
}

export const openForm = () => dispatch => {
  dispatch({type: OPEN_EDIT_FORM})
}

export const closeForm = () => dispatch => {
  dispatch({type: CLOSE_EDIT_FORM})
}


// export const changeCurrentBoard = (boardName) => dispatch => {
//   dispatch({
//     type: CHANGE_CURRENT_BOARD, payload: boardName
//   })
//   // let id = 
//   // fetchCategories(boardName)
// }

// export const setCurrentBoard = (id) => dispatch => {
//   dispatch({ 
//     type: SET_CURRENT_BOARD, 
//     payload: id
//   })
//   // fetchCategories(boards[0].id)
// }

// export const addMemberAction = (memberObj) => dispatch => {
//   addMember(memberObj)
//   .then(member => {
//     if (member.error){
//       dispatch({
//         type: SET_ERROR,
//         payload: member.error
//       })
//     }
//     else{
//       console.log(member)
//       dispatch({
//         type: ADD_MEMBER,
//         payload: member
//       })
//     }
//   })
// }

// export const getMembersAction = (boardId) => dispatch => {
//   getMembers(boardId).then(members => {
//     console.log("members", members)
//     dispatch({ 
//       type: SET_MEMBERS, 
//       payload: members
//     })
//   })
// }



// // export const postTask = (taskObj) => dispatch => {
// //   addTask(taskObj)
// //   .then(task => {
// //     dispatch({
// //       type: ADD_TASK,
// //       payload: task
// //     })
// //   })
// // }