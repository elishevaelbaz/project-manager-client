import { SET_BOARDS, SET_CURRENT_BOARD, FETCH_BOARDS, CHANGE_CURRENT_BOARD } from "./types"

const defaultState = {
  boards: [],
  currentBoard: "",
  loading: false
}

const reducer = (state = defaultState, action) => {
  console.log("boardReducer", action)
  let index;
  switch (action.type) {
    
    case FETCH_BOARDS:
      return {
        ...state,
        loading: true
      }  
    case SET_BOARDS:
      return {
        ...state,
        boards: action.payload,
        loading: false
      }
    case SET_CURRENT_BOARD:
      return {
        ...state,
        currentBoard: action.payload
      }
    case CHANGE_CURRENT_BOARD:
      index = state.boards.findIndex(board => board.name === action.payload)
      return {
        ...state,
        currentBoard: state.boards[index]
      }
      
  
    default:
      return state
  }
}

export default reducer