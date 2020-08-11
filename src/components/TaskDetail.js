import React, { useEffect, useState }  from 'react'
import { Card, Button, Icon, Header, Form } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTaskAction, updateTaskAction, fetchCurrentTask } from '../store/task/actions'
import Comment from './Comment'
import { withRouter } from 'react-router-dom'
import { fetchComments, addCommentAction } from '../store/comment/actions'
import EditTaskForm from './EditTaskForm'

const TaskDetail = ({ match, history }) => {
  

  const currentUser = useSelector(state => state.user.currentUser.username)
  const currentTask = useSelector(state => state.task.currentTask)
  const comments = useSelector(state => state.comment.comments)

  
  
  const categoryName = useSelector(state => {
    return state.category.categories.find(category => category.id === currentTask.category_id)})


  const [toggleEdit, setToggleEdit] = useState(false)
  const unmutatedTask = {...currentTask}
  const [name, setName] = useState(currentTask.name)

  const [newComment, setNewComment] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentTask(match.params.id))
// comments associated with this task
    dispatch(fetchComments(match.params.id))
  }, [dispatch])



  const handleDelete = (id) => {
    dispatch(deleteTaskAction(id))
    history.goBack();
  }

  const handleUpdateButton = (id) => {
    console.log("ID", id)
    const taskObj = { description: "hello"}
    dispatch(updateTaskAction(id, taskObj))
  }

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value)
  }

  const handleNewCommentSubmit = e => {
    e.preventDefault()
    console.log("submit")
    console.log(newComment)
    const commentObj = {
      text: newComment,
      task_id: currentTask.id
    }
    dispatch(addCommentAction(commentObj))
  }

  const handleNameClick = () => {
    setToggleEdit(true)
  }

  const handleNameChange = e => {
    // setLoginInput({...loginInput, [e.target.name]: e.target.value })
    setName(e.target.value)
    console.log(e.target.value)

  }

  // const handleClick = (e) => {
  //   console.log(e.target)
  //   if (e.target.value !== tname) {setToggleEdit(false)}
  //   // return < UpdateTask />
  // }

  const renderComments = () => {
    return comments.map(comment => <Comment key={comment.id} id={comment.id} text={comment.text} taskId={currentTask.id} userId={comment.user_id} username={comment.username}/>)
  }

  return(

    <div>
    <Card
      // href='#card-example-link-card'
      key={currentTask.id}
      // onClick={handleClick}
    >
      <Card.Content>
      {currentTask.created_by === currentUser ? <Icon name="trash" onClick={() => handleDelete(currentTask.id)} /> : null}
      
      {/* <Card.Href>#card-example-link-card</Card.Header>  */}
      <Card.Header> 
        {toggleEdit ?  <Form.Input type="text" name="name" autoComplete="off" value={name} onChange={handleNameChange} />
          : <Card.Header onClick={handleNameClick} onSubmit={console.log("HEY:")}>{currentTask.name}</Card.Header> }
      </Card.Header>

          <Card.Header>{currentTask.name}</Card.Header>
     
      
     
      <Card.Meta>{currentTask.description}</Card.Meta>
      <Card.Meta>Due Date:{currentTask.due_date}</Card.Meta>
      <Card.Meta>Category: {currentTask.category_id}</Card.Meta>
      <Card.Meta>Added by: {currentTask.created_by === currentUser ? "you" : currentTask.created_by}</Card.Meta>
        {comments && renderComments()}
        <Form onSubmit={handleNewCommentSubmit}>
          <Form.Input type="text" name="newComment" autoComplete="off" value={newComment} placeholder="Add a comment" onChange={handleNewCommentChange} />
        </Form>
      {/* <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description> */}

    </Card.Content>
      </Card>

{/* <EditTaskForm task={currentTask} name={currentTask.name}/> */}
      </div>
    )
  
}

export default withRouter(TaskDetail);