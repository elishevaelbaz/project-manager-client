import { SET_BOARDS, SET_CURRENT_BOARD, FETCH_BOARDS, CHANGE_CURRENT_BOARD, ADD_BOARD, ADD_MEMBER } from "./types"

const defaultState = {
  boards: [],
  currentBoard: "",
  members: [],
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
    case ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.payload]
      }
    case SET_BOARDS:
      return {
        ...state,
        boards: action.payload,
        loading: false
      }
    case SET_CURRENT_BOARD:
      const currentBoard = state.boards.find(board => board.id === action.payload)
      console.log("HHHH", currentBoard)
      return {
        ...state,
        currentBoard: currentBoard
      }
    case CHANGE_CURRENT_BOARD:
      index = state.boards.findIndex(board => board.name === action.payload)
      return {
        ...state,
        currentBoard: state.boards[index]
      }
      case ADD_MEMBER:
        // index = state.boards.findIndex(board => board.name === action.payload)
        return {
          // ...state,
          // currentBoard: state.boards[index]
        }
      
  
    default:
      return state
  }
}

export default reducer