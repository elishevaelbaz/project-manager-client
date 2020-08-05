import { SET_TASKS } from "./types"

const defaultState = {
  boards: [{name: "helloBoard"}, {name: "board numero dos"}],
  tasks: [
    {name: "Elisheva's task", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", category: "todos"},
    {name: "task2", description: "Nullam luctus porta velit at congue. Donec a accumsan erat.", category: "in progress"},
    {name: "task3", description: "Mauris sagittis tempus ultricies.", category: "complete"}
  ]
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload
      }
      
    //   break;
  
    default:
      return state
  }
}

export default reducer