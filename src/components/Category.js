import React, { useEffect } from 'react'
import Task from './Task'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from 'semantic-ui-react'

// import { getTasks } from '../api'
// import { SET_TASKS } from '../store/types'
import { fetchTasks } from '../store/task/actions'

const Category = ({ name }) => {

  const tasks = useSelector(state => state.task.tasks)
  const loading = useSelector(state => state.task.loading)
  const currentBoard = useSelector(state => state.board.currentBoard)


  const dispatch = useDispatch()

  // hooks equivalent of componentDidMount
  // useEffect(() => {
  //   dispatch(fetchTasks())
  //   // getTasks()
  //   //   .then(tasks => dispatch({ type: SET_TASKS, payload: tasks}))
  // }, [dispatch]) //empty dependencies array - will only run when component is first rendered

  

  // included dispatch in the array becuase of react warning, but dispatch doesn't change, so will still be mount only
  if (loading) return <h2>Loading...</h2>

  return(
  
    <Grid.Column>
      {tasks[0] && tasks.map(task => <Task key={task.id} task={task} />)}
      {/* <li><Task /></li>
      <li><Task /></li>
      <li><Task /></li>
      <li><Task /></li> */}
    {/* </ul> */}
    </Grid.Column>
  )
}

export default Category;