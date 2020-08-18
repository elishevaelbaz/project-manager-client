import React, { useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Icon, Dropdown, Modal, Button, Form, Header, Comment } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTaskAction, setCurrentTask, closeCurrentTask, updatePositionAction, updateTaskAction } from '../store/task/actions'
import { addCommentAction, fetchComments } from '../store/comment/actions'
import { fetchAttachments, deleteAttachmentAction } from '../store/attachment/actions'
import { Draggable } from 'react-beautiful-dnd'
import CommentComp from './Comment'
import AssigneeDropdown from './AssigneeDropdown'
import { CLEAR_COMMENTS } from '../store/comment/types'
import CategoryDropdown from './CategoryDropdown'
import AttachmentForm from './AttachmentForm'
import { CLEAR_ATTACHMENTS } from '../store/attachment/types'
import { openModal } from '../store/modal/actions'
import TaskModal from './TaskModal'

const Task = ({task, count, index,}) => {
  console.log("TASK", task)
  
  const [open, setOpen] = React.useState(false)
  const [newComment, setNewComment] = useState("")
  const [newAssignee, setNewAssignee] = useState("")

  const [toggleEdit, setToggleEdit] = useState({
    name: false,
    description: false, 
    category_id: false,
    assigned_to: false,
    position: false
  })
  const [taskInput, setTaskInput] = useState({
    ...task
  })

  const [attachment, setAttachment] = useState({
    image: {},
    video: {}
  })


  const currentUser = useSelector(state => state.user.currentUser.username)
  const currentTask = useSelector(state => state.task.currentTask)
  const currentCategory = useSelector(state => state.category.categories.find(c => c.id === task.category_id))
  const categories = useSelector(state => state.category.categories)
const tasks = useSelector(state => state.task.tasks)
 const comments = useSelector(state => state.comment.comments)
 const attachments = useSelector(state => state.attachment.attachments)

 const members = useSelector(state => state.board.members)

 const modalIsOpen = useSelector(state => state.modal.isOpen)

  const dispatch = useDispatch()


  // if separate out the modal, move this useeffect there
  // so don't have to fetch all the comments at once
//     useEffect(() => {
//     // dispatch(fetchCurrentTask(match.params.id))
// // comments associated with this task
//     // dispatch(fetchComments(task.id))
//   }, [dispatch, task])

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

  const handleDeleteAttachment = (id) =>{
    dispatch(deleteAttachmentAction(id))
  }

  const renderComments = () =>  comments.map(comment => <CommentComp key={comment.id} id={comment.id} text={comment.text} taskId={task.id} userId={comment.user_id} username={comment.username} avatar={comment.avatar}/>)
  

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
  // console.log("currentTask", currentTask)
  // console.log("task", task)

  const commentObj = {
    text: newComment,
    task_id: task.id
  }
  dispatch(addCommentAction(commentObj))
  setNewComment("")
}


const handleAssigneeDropdownClick = (member) => {
  console.log("member", member)
    // const member = members.find(m => m.username === e.target.textContent)
    setNewAssignee(member)
    const body = {...task, assigned_to: member}
    console.log("BODY", body)
    dispatch(updateTaskAction(task.id, body))
    // console.log(e.target)
    // console.log(e.target.id)
  }

  const  handleCategoryDropdownClick = (categoryId) => {
    const numTasksInCategory = tasks.filter(t => t.category_id === categoryId).length

    const body = {...task, category_id: categoryId, position: numTasksInCategory + 1} //last in the category (gem for position starts with 1)
    console.log("BODY", body)
    dispatch(updateTaskAction(task.id, body))

  }


  const handleEditClick = taskPart => {
    setToggleEdit({
      ...toggleEdit, [taskPart]: true
    })
    console.log("EDIT", toggleEdit)
  }

  const handleChange = (e) => {
    console.log(e.target.name)
    setTaskInput({...taskInput, [e.target.name]: e.target.value})
  }


  const handleSubmit = (taskPart) => {
    console.log("taskpart", taskPart)
    // console.log(e.target.name.taskPart, "e")
    // e.preventDefault()
    const taskObj = {
      ...taskInput

    }
    console.log("taskObj", taskObj)
    dispatch(updateTaskAction(task.id, taskObj))
    setToggleEdit({
      ...toggleEdit, [taskPart]: false 
    })
  }

  // const handleAttachmentChange = (e) => {
  //   e.persist()
  //   setAttachment({
  //     ...attachment,
  //     [e.target.name]: e.target.files[0]
  //   })
  // }

  // const handleAttachmentSubmit = (e) => {
   
  //   e.preventDefault()
  //   const form = new FormData()
  //   form.append("image", attachment.image)
  //   form.append("video", attachment.video)
  //   form.task_id = task.id
  //   console.log("form", JSON.stringify(form))
  //   console.log(attachment)
  //   fetch(`http://localhost:3000/attachments`, {
  //       method: "POST",
  //       credentials: "include",
  //       body: form
  //   })
  // }

  return(
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, ) => (

      
      <div {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}>
        <Card
          // href='#card-example-link-card'
          key={task.id}
          onClick={() => {
            // dispatch({type: "OPEN_MODAL"})
            dispatch(fetchComments(task.id))
            dispatch(fetchAttachments(task.id))
            dispatch(openModal(task))

            // setOpen(true)
          }}
          
        >
          <Card.Content>
          {task.created_by === currentUser ? <Icon name="trash" onClick={() => handleDelete(task.id)} /> : null}

          {/* <Card.Href>#card-example-link-card</Card.Header> */}
            <Card.Description>
            {task.name}
            </Card.Description>
            {/* <Card.Meta>{task.position}</Card.Meta>
            <Card.Meta>{index}</Card.Meta> */}
            {/* <Dropdown
          placeholder='Change position'
          fluid
          selection
          options={positionOptions}
          // defaultValue={currentCategoryId || null}
          onChange={(e, {value}) => handleSelect(value)}
          /> */}
          <Card.Content extra>
      {comments.filter(c => c.task_id === task.id) ? 
        <Icon name='comment outline' /> : null}
   
    </Card.Content>
            {/* <Card.Meta><Icon comment outline/></Card.Meta> */}


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

      {modalIsOpen && <TaskModal />}

  {/* <Modal
    onClose={() => {
      setOpen(false)}}
    onOpen={() => setOpen(true)}
    open={open}
    // trigger={<Button>Show Modal</Button>}
  >
    <Modal.Content >
        <Modal.Description>
        <Button icon='close' onClick={() => {
          // to avoid the jump of old comments when opening a modal
          dispatch({type: CLEAR_COMMENTS})
          dispatch({type: CLEAR_ATTACHMENTS})

          setOpen(false)
          }}/>
          <h4><Icon name='book'/>
            Title:
          </h4>
      


        { toggleEdit.name ?  <Form onSubmit={() => handleSubmit("name")}><Form.Input type="text" name="name" autoComplete="off" value={taskInput.name} onChange={handleChange} /></Form>
      : <Header> {task.name}
        <span>
          <Icon name="pencil" className="editIcon" onClick={() => handleEditClick("name")} ></Icon>
        </span>
      </Header>
    }

        <span>
          Assigned to:
          <AssigneeDropdown currentAssignee={task.assigned_to} members={members} handleSelect={handleAssigneeDropdownClick}/>
          </span>

          <h4>Category:
          </h4>
          <p>{currentCategory && currentCategory.name}</p>

          <Form.Input fluid >
            <CategoryDropdown categories={categories} currentCategoryId={task.category_id} handleSelect={handleCategoryDropdownClick}/>
          </Form.Input>
          
            <h4><Icon name='bars'/>
            Description
          </h4>

          { toggleEdit.description ?  <Form onSubmit={() => handleSubmit("description")}><Form.Input type="text" name="description" autoComplete="off" value={taskInput.description} onChange={handleChange} /></Form>
      : <p> {task.description ? task.description : "No description yet..."} */}
      {/* nested ternary ^ */}
        {/* <span>
          <Icon name="pencil" className="editIcon" onClick={() => handleEditClick("description")} ></Icon>
        </span>
      </p>
    }

        <h4><Icon name='attach'onClick={null}/>
            Attachments
          </h4>
          <AttachmentForm taskId={task.id} /> */}
          {/* <Form ><Form.Input type="file" name="image" autoComplete="off" onChange={handleAttachmentChange} />
          <Button type='submit' onClick={handleAttachmentSubmit}>Submit</Button></Form>
           */}
           {/* {attachments && attachments.map(attachment => <><img src={attachment.image} />
           {attachment.username === currentUser && <Icon name="trash" onClick={() => handleDeleteAttachment(attachment.id)} ></Icon>}
           </>)}





          <h4>
            Comments
          </h4>
          <Comment.Group>
          {comments && renderComments()}
          </Comment.Group>
        <Form onSubmit={handleNewCommentSubmit}>
          <Form.Input type="text" name="newComment" autoComplete="off" value={newComment} placeholder="Add a comment" onChange={handleNewCommentChange} />
          
        </Form>
        </Modal.Description>
      </Modal.Content>
  </Modal> */}
      
      </div>
    )}
    </Draggable>
    // </>
    )
}

export default Task;