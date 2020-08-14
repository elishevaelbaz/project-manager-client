import React, { useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Icon, Dropdown, Modal, Button, Form, Header } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTaskAction, setCurrentTask, closeCurrentTask, updatePositionAction } from '../store/task/actions'
import { addCommentAction, fetchComments } from '../store/comment/actions'
import { Draggable } from 'react-beautiful-dnd'
import Comment from './Comment'

const Task = ({task, count, index}) => {
  console.log("TASK", task)
  
  const [open, setOpen] = React.useState(false)
  const [newComment, setNewComment] = useState("")


  const currentUser = useSelector(state => state.user.currentUser.username)
  const currentTask = useSelector(state => state.task.currentTask)
  const currentCategory = useSelector(state => state.category.categories.find(c => c.id === task.category_id))

 const comments = useSelector(state => state.comment.comments)
  const dispatch = useDispatch()


  // if separate out the modal, moce this useeffect there
  //so don't have to fetch all the comments at once
    useEffect(() => {
    // dispatch(fetchCurrentTask(match.params.id))
// comments associated with this task
    dispatch(fetchComments(task.id))
  }, [dispatch, task])

  let history = useHistory()

  const handleDelete = (id) => {
    dispatch(deleteTaskAction(id))
  }

  // const handleCardClick = (e) => {
  //   if (currentTask.name){
  //     dispatch(closeCurrentTask())
  //   }
  //   else if (e.target.className === "trash icon"){
  //     handleDelete(task.id)
  //   }
  //   else{
  //     // can we set it to just an id
  //     // dispatch(setCurrentTask(id))
  //     console.log("HEYYYYYY", e.target)
  //     dispatch(setCurrentTask(task))
  //     history.push(`/tasks/${task.id}`);
  //   }
    
  //   // return <TaskDetail task={task} />
  // }

  const renderComments = () => {
    return comments.map(comment => <Comment key={comment.id} id={comment.id} text={comment.text} taskId={task.id} userId={comment.user_id} username={comment.username}/>)
  }

 //==========================
 let positionOptions = []

 for (let i = 1; i <= count; i++) {
   const option = {
    key: i, text: i, value: i
  };
   positionOptions.push(option)
 }
  
 //==========================
//  const changePosition = (newIndex) => {
//   if (newIndex === 0){
//     if ()
//   }
//  }

 const handleSelect = (index) => {
   console.log(index)
   dispatch(updatePositionAction(task.id, {new_index: index, category_id: task.category_id}))
  // setTaskDetails({...taskDetails, category_id: categoryId })
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
  setNewComment("")
}

  return(
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, ) => (

      
<div {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}>
    <Card
      // href='#card-example-link-card'
      key={task.id}
      onClick={() => setOpen(true)}
      
    >
      <Card.Content>
      {task.created_by === currentUser ? <Icon name="trash" onClick={() => handleDelete(task.id)} /> : null}

      {/* <Card.Href>#card-example-link-card</Card.Header> */}
      <Card.Description>
      {task.name}
      </Card.Description>
      <Card.Meta>{task.position}</Card.Meta>
      <Card.Meta>{index}</Card.Meta>
      <Dropdown
    placeholder='Change position'
    fluid
    selection
    options={positionOptions}
    // defaultValue={currentCategoryId || null}
    onChange={(e, {value}) => handleSelect(value)}
    />
      {/* <Card.Meta>{task.description}</Card.Meta> */}


      {/* {currentTask.name === task.name && (<>
        <Card.Meta>Due Date:{task.due_date}</Card.Meta>
        <Card.Meta>Category{task.category_id}</Card.Meta>
        <Card.Meta>Added by: {task.created_by === currentUser ? "you" : task.created_by}</Card.Meta>
        {renderComments()}
      </>)} */}
    
    {/* can put this instead in a ternary and will show this */}
    {/* {currentTask.name === task.name &&  <TaskDetail task={task}/> } */}
      
      

    </Card.Content>
      </Card>


  <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    // trigger={<Button>Show Modal</Button>}
  >
    <Modal.Content >
        <Modal.Description>
        <Button icon='close' onClick={() => setOpen(false)}/>
        <Header>{task.name}</Header>
          <h4>
            Category:
          </h4>
          <p>{currentCategory && currentCategory.name}</p>
          
            <h4><Icon name='bars'/>
            Description
          </h4>
          <p>{task.description}</p>
          <p>hey</p>
          <h4>
            Activity
          </h4>
          {comments && renderComments()}
        <Form onSubmit={handleNewCommentSubmit}>
          <Form.Input type="text" name="newComment" autoComplete="off" value={newComment} placeholder="Add a comment" onChange={handleNewCommentChange} />
        </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
    </Modal.Actions>
  </Modal>
      
      </div>
    )}
    </Draggable>
    // </>
    )
}

export default Task;