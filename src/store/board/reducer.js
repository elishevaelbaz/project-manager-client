import { SET_BOARDS, SET_CURRENT_BOARD, FETCH_BOARDS, CHANGE_CURRENT_BOARD, ADD_BOARD, ADD_MEMBER, SET_MEMBERS, SET_LABELS, ADD_LABEL, ADD_TASK_LABEL } from "./types"

const defaultState = {
  boards: [],
  currentBoard: "",
  members: [],
  labels: [],
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
        return {
          ...state,
          members: [...state.members, action.payload]
        }
      case SET_MEMBERS:
        return {
          ...state,
          members: action.payload
        }
      // case ADD_LABEL:
      //   return {
      //     ...state,
      //     labels: [...state.labels, action.payload]
      //   }
      // case SET_LABELS:
      //   return {
      //     ...state,
      //     labels: action.payload
      //   }
      // case ADD_TASK_LABEL:
      //   const updatedLabels = state.labels.map(label => {
      //     if (label.id === action.payload.label_id){
      //       return {
      //         ...label
      //       }
      //     }
      //     else{
      //       return label
      //     }
      //     )}
      //   return {
      //     ...state,
      //     labels: [...state.labels, action.payload]
      //   }
    default:
      return state
  }
}

export default reducer