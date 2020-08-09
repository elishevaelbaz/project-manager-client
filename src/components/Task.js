import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTaskAction, updateTaskAction } from '../store/task/actions'
const Task = ({task}) => {
  console.log("TASK", task)
  

  const currentUser = useSelector(state => state.user.currentUser.username)

  const dispatch = useDispatch()

  const handleDeleteButton = (id) => {
    dispatch(deleteTaskAction(id))
  }

  const handleUpdateButton = (id) => {
    console.log("ID", id)
    const taskObj = { description: "hello"}
    dispatch(updateTaskAction(id, taskObj))
  }

  return(

    <Card
      // href='#card-example-link-card'
      key={task.id}
    >
      <Card.Content>
      {task.created_by === currentUser ? <Button key={task.id} negative onClick={() => handleDeleteButton(task.id)}>X</Button> : null}
      {task.created_by === currentUser ? <Button key={task.id} onClick={() => handleUpdateButton(task.id)}>Update task</Button> : null}

      {/* <Card.Href>#card-example-link-card</Card.Header> */}
      <Card.Header>{task.name}</Card.Header>
      <Card.Meta>{task.description}</Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>

    </Card.Content>
      </Card>
    )
    // <>
    // <h4>Task</h4>
    // <p>{task && task.name}</p>
    // <p>{task && task.description}</p>
    // <p>{task && task.category}</p>
    


    // </>
  
}

export default Task;