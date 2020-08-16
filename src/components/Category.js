import React, { useEffect } from 'react'
import Task from './Task'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Card, CardContent } from 'semantic-ui-react'
import TaskForm from './TaskForm'
import { Droppable } from 'react-beautiful-dnd'
import { fetchAllComments } from '../store/comment/actions'
import PlaceholderCard from './PlaceholderCard'

const Category = ({ name, id, taskOrder}) => {

  const filteredTasks = useSelector(state => {
    return state.task.tasks.filter(task => task.category_id === id)} )
    console.log(name, filteredTasks.length)

    // console.log("taskOrder", taskOrder)
    // const sortedTasks = taskOrder.map(t => {
    //   return filteredTasks.find(task => task.id === t.id)})

      // console.log(filteredTasks)

    const sortedTasks = filteredTasks.sort((taskA, taskB) => (taskA.position > taskB.position) ? 1 : -1)
    console.log("SORTED", sortedTasks)
  const loading = useSelector(state => state.task.loading)
  // const currentBoard = useSelector(state => state.board.currentBoard)


  const dispatch = useDispatch()
  const taskIndex = (task) => {
    return filteredTasks.findIndex(t => t.name === task.name)
  }

  const comments = useSelector(state => state.comment.comments)

//   useEffect(() => {
//     // dispatch(fetchCurrentTask(match.params.id))
// // comments associated with this task
//     dispatch(fetchAllComments())
//   }, [dispatch])

  if (loading) return <PlaceholderCard />

  return(
  
    // <Grid.Column key={id}>
    <div >
      <Card className="categoryCard">
        
      <CardContent>{name}</CardContent>

      <Droppable droppableId={id.toString()}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
        {sortedTasks[0] && sortedTasks.map((task, index) => <Task key={task.id} task={task} count={sortedTasks.length} index={index} />)}
        {provided.placeholder}
        </div>
        )}
      </Droppable>
      <TaskForm categoryId={id}/>
      </Card>
      </div>
      // </Grid.Column>
  )
}

export default Category;