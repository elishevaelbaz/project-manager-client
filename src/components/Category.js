import React from 'react'
import Task from './Task'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Card, CardContent } from 'semantic-ui-react'
import TaskForm from './TaskForm'

const Category = ({ name, id }) => {

  const filteredTasks = useSelector(state => {
    return state.task.tasks.filter(task => task.category_id === id)} )
    console.log(name, filteredTasks.length)

    const sortedTasks = filteredTasks.sort((taskA, taskB) => (taskA.position > taskB.position) ? 1 : -1)
    console.log("SORTED", sortedTasks)
  const loading = useSelector(state => state.task.loading)
  // const currentBoard = useSelector(state => state.board.currentBoard)


  // const dispatch = useDispatch()
  const taskIndex = (task) => {
    return filteredTasks.findIndex(t => t.name === task.name)
  }

  if (loading) return <h2>Loading...</h2>

  return(
  
    // <Grid.Column key={id}>
    <div >
      <Card className="categoryCard">
        
      <CardContent>{name}</CardContent>
      {sortedTasks[0] && sortedTasks.map(task => <Task key={task.id} task={task} count={sortedTasks.length} index={taskIndex(task)}/>)}

      <TaskForm categoryId={id}/>
      </Card>
      </div>
      // </Grid.Column>
  )
}

export default Category;