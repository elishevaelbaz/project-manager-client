import { SET_TASKS, FETCH_TASKS, ADD_TASK, DELETE_TASK, UPDATE_TASK, SET_CURRENT_TASK, CLOSE_CURRENT_TASK, UPDATE_POSITIONS_OPTIMISTIC, UPDATE_POSITIONS_PESSIMISTIC, SET_FILTER, CLEAR_FILTER } from "./types"
import { OPEN_MODAL, CLOSE_MODAL } from "../modal/types";

const defaultState = {
  tasks: [],
  currentTask: {},
  loading: false,
  filterBy: ""
}

const reducer = (state = defaultState, action) => {
  console.log("taskReducer", action)
  let updatedTasks;

  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        loading: true
      }  
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false
      } 
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      }
      case SET_CURRENT_TASK:
        return {
          ...state,
          currentTask: action.payload,
          loading: false
      }
      case CLOSE_CURRENT_TASK:
        return {
          ...state,
          currentTask: {}
      }
      case UPDATE_TASK:
        updatedTasks = state.tasks.map(task => {
          if (task.id === action.payload.id){
            return {
              // ...task, // do we need this?
              ...action.payload
            }
          }
          else{
              return task
            }
          })
          console.log("updatedTasks", updatedTasks)
      return {
        ...state,
        tasks: updatedTasks,
        currentTask: action.payload // update currentTask - see change on screen immediately
      }



      case UPDATE_POSITIONS_OPTIMISTIC:
        console.log("action.payload", JSON.stringify(action.payload))
        updatedTasks = state.tasks.map((task, indx) => {
          console.log("indx=", indx, "task=", JSON.stringify(task))
          const { payload } = action
          
          // moving task within the same category
          // start category === end category
          if (payload.prev_category_id === payload.category_id){
            console.log("same category")


            const top = Math.min(payload.position, payload.prev_position)
            const bottom = Math.max(payload.position, payload.prev_position)

            //task itself 
            if (task.id === payload.id ){
              const updatedTask = {...payload}
              // remove prev_category_id and prev_position before putting action.payload in state
              delete updatedTask.prev_category_id
              delete updatedTask.prev_position
              console.log("tasks itself", task)
              
              return updatedTask
            }
            // unaffected 
            // in a different category or above top or below bottom 
            else if ((task.category_id !== payload.category_id) || (task.position < top) || (task.position > bottom) ){
              console.log("unaffected")
              return task
            }
            // affected tasks
            else{
              console.log("affected")
              // moving task lower down on the screen
              if (payload.position > payload.prev_position){
                console.log("moving task lower down")
                // tasks in the same category, between old position and new position
                if (task.category_id === payload.category_id && task.position > payload.prev_position && task.position <= payload.position){
                  console.log("moving down affected ")
                  return {
                    ...task,
                    position: task.position - 1
                  }
                }
                else{
                  console.log("moving task down - shouldn't get here")
                }
              }
              //moving task higher up on screen
              else{
                console.log("moving task higher up")
                if (task.category_id === payload.category_id && task.position >= payload.position && task.position < payload.prev_position){
                  console.log("moving up affected ")
                  return {
                    ...task,
                    position: task.position + 1
                  }
                }
                else{
                  console.log("moving task up - shouldn't get here")
                }
              }
            }      
          }
          // moving task to a different category
          else{
            console.log("moving task to diff category")
            //task itself 
            if (task.id === payload.id ){
              const updatedTask = {...payload}
              // remove prev_category_id and prev_position before putting action.payload in state
              delete updatedTask.prev_category_id
              delete updatedTask.prev_position
              console.log("tasks itself", task)
              
              return updatedTask
            }
            // unaffected tasks
            // not in source or destination category
            // or in source category, above prev task position
            // or in destination category, above new task position 
            else if ((task.category_id !== payload.category_id && task.category_id !== payload.prev_category_id)
              || (task.category_id === payload.prev_category_id && task.position < payload.prev_position)
              || (task.category_id === payload.category_id && task.position < payload.position) ){
                console.log("unaffected")
                return task
            }
            // affected            
            else{
              console.log("affected")
            // in source category, below prev_position (move up one)
              if (task.category_id === payload.prev_category_id && task.position > payload.prev_position){
                console.log("affected in source category")
                // console.log("eee",task, task.position)
                return {
                  ...task,
                  position: task.position - 1
                }
              }
              // in destination category, equal to or below prev_position (move down one)
              else if (task.category_id === payload.category_id && task.position >= payload.position){
                console.log("affected in destination category")
                return {
                  ...task,
                  position: task.position + 1
                }
              }
              else{
                console.log("shouldn't get here - affected")
              }
            }
          }
        })

        console.log("updatedTasks in reducer", updatedTasks)

        return {
          ...state,
          tasks: updatedTasks,
        }


        case UPDATE_POSITIONS_PESSIMISTIC:
          console.log("action.payload", action.payload)
          let updated = state.tasks.map(task => {
            let updatedTask = action.payload.new_category_tasks.find(t => t.id === task.id)
            return updatedTask ? updatedTask : task
          })
          updated = updated.map(task => {
            let updatedTask = action.payload.old_category_tasks.find(t => t.id === task.id)
            return updatedTask ? updatedTask : task
          })
          console.log("updatedTasks reducer", updated)
          return {
            ...state,
            tasks: updated,
          }
      case SET_FILTER:
        return {
          ...state,
          filterBy: action.payload
        }

      case CLEAR_FILTER:
        return {
          ...state,
          filterBy: ""
        }
      case OPEN_MODAL:
        return {
          ...state,
          currentTask: action.payload
        }

      //clear currentTask to avoid jumpiness on next open
      case CLOSE_MODAL:
        return {
          ...state,
          currentTask: {}
        } 
      case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      } 
    default:
      return state
  }
}

export default reducer