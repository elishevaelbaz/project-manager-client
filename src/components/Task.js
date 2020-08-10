import React from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Button, Icon } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTaskAction, updateTaskAction, setCurrentTask, closeCurrentTask } from '../store/task/actions'
import Comment from './Comment'
import TaskDetail from './TaskDetail'

const Task = ({task}) => {
  console.log("TASK", task)
  

  const currentUser = useSelector(state => state.user.currentUser.username)
  const currentTask = useSelector(state => state.task.currentTask)


  const dispatch = useDispatch()

  let history = useHistory()

  const handleDelete = (id) => {
    dispatch(deleteTaskAction(id))
  }

  const handleUpdateButton = (id) => {
    console.log("ID", id)
    const taskObj = { description: "hello"}
    dispatch(updateTaskAction(id, taskObj))
  }

  const handleCardClick = (e) => {
    if (currentTask.name){
      dispatch(closeCurrentTask())
    }
    else if (e.target.className === "trash icon"){
      handleDelete(task.id)
    }
    else{
      // can we set it to just an id
      // dispatch(setCurrentTask(id))
      console.log("HEYYYYYY", e.target)
      dispatch(setCurrentTask(task))
      history.push(`/tasks/${task.id}`);
    }
    
    // return <TaskDetail task={task} />
  }

  const renderComments = () => {
    return task.comments.map(comment => <Comment key={comment.id} id={comment.id} text={comment.text} taskId={task.id} userId={comment.user_id} username={comment.username}/>)
  }

  return(

    <Card
      // href='#card-example-link-card'
      key={task.id}
      onClick={handleCardClick}
    >
      <Card.Content>
      {task.created_by === currentUser ? <Icon name="trash" onClick={() => handleDelete(task.id)} /> : null}
      {task.created_by === currentUser ? <Button key={task.id} onClick={() => handleUpdateButton(task.id)}>Update task</Button> : null}

      {/* <Card.Href>#card-example-link-card</Card.Header> */}
      <Card.Header>{task.name}</Card.Header>
      <Card.Meta>{task.description}</Card.Meta>

      {/* {currentTask.name === task.name && (<>
        <Card.Meta>Due Date:{task.due_date}</Card.Meta>
        <Card.Meta>Category{task.category_id}</Card.Meta>
        <Card.Meta>Added by: {task.created_by === currentUser ? "you" : task.created_by}</Card.Meta>
        {renderComments()}
      </>)} */}
    
    {/* can put this instead in a ternary and will show this */}
    {/* {currentTask.name === task.name &&  <TaskDetail task={task}/> } */}
      
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>

    </Card.Content>
      </Card>
    )
    

    // </>
  
}

export default Task;