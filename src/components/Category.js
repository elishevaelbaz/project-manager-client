import React from 'react'
import Task from './Task'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Card, CardContent } from 'semantic-ui-react'
import TaskForm from './TaskForm'

const Category = ({ name, id }) => {

  const filteredTasks = useSelector(state => {
    return state.task.tasks.filter(task => task.category_id === id)} )
  const loading = useSelector(state => state.task.loading)
  // const currentBoard = useSelector(state => state.board.currentBoard)


  // const dispatch = useDispatch()

  // hooks equivalent of componentDidMount
  // useEffect(() => {
  //   dispatch(fetchTasks())
  //   // getTasks()
  //   //   .then(tasks => dispatch({ type: SET_TASKS, payload: tasks}))
  // }, [dispatch]) //empty dependencies array - will only run when component is first rendered

  

  // included dispatch in the array becuase of react warning, but dispatch doesn't change, so will still be mount only
  if (loading) return <h2>Loading...</h2>

  return(
  
    <Grid.Column key={id}>
      <Card className="categoryCard">
        
      <CardContent>{name}</CardContent>
      {filteredTasks[0] && filteredTasks.map(task => <Task key={task.id} task={task} />)}

      <TaskForm categoryId={id}/>
      </Card>
      </Grid.Column>
  )
}

export default Category;