import React, { useEffect }  from 'react'
import { Card, Button } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTaskAction, updateTaskAction, fetchCurrentTask } from '../store/task/actions'
import Comment from './Comment'
import { withRouter } from 'react-router-dom'
const TaskDetail = ({match}) => {
  // console.log("PROPS", props)
  

  const currentUser = useSelector(state => state.user.currentUser.username)
  const currentTask = useSelector(state => state.task.currentTask)


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentTask(match.params.id))
  }, [dispatch])



  const handleDeleteButton = (id) => {
    dispatch(deleteTaskAction(id))
  }

  const handleUpdateButton = (id) => {
    console.log("ID", id)
    const taskObj = { description: "hello"}
    dispatch(updateTaskAction(id, taskObj))
  }

  const renderComments = () => {
    return currentTask.comments.map(comment => <Comment key={comment.id} id={comment.id} text={comment.text} taskId={currentTask.id} userId={comment.user_id} username={comment.username}/>)
  }

  return(

    <Card
      // href='#card-example-link-card'
      key={currentTask.id}
    >
      <Card.Content>
      {currentTask.created_by === currentUser ? <Button key={currentTask.id} negative onClick={() => handleDeleteButton(currentTask.id)}>X</Button> : null}
      {currentTask.created_by === currentUser ? <Button key={currentTask.id} onClick={() => handleUpdateButton(currentTask.id)}>Update currentTask</Button> : null}
      
      {/* <Card.Href>#card-example-link-card</Card.Header> */}
      <Card.Header>{currentTask.name}</Card.Header>
      <Card.Meta>{currentTask.description}</Card.Meta>
      <Card.Meta>Due Date:{currentTask.due_date}</Card.Meta>
      <Card.Meta>Category{currentTask.category_id}</Card.Meta>
      <Card.Meta>Added by: {currentTask.created_by === currentUser ? "you" : currentTask.created_by}</Card.Meta>
        {currentTask.comments && renderComments()}
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

export default withRouter(TaskDetail);