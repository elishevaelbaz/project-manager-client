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
