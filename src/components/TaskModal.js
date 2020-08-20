
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Icon, Modal, Button, Form, Header, Comment, Popup } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTaskAction } from '../store/task/actions'
import { addCommentAction, fetchComments } from '../store/comment/actions'
import { fetchAttachments, deleteAttachmentAction } from '../store/attachment/actions'
import CommentComp from './Comment'
import AssigneeDropdown from './AssigneeDropdown'
import CategoryDropdown from './CategoryDropdown'
import AttachmentForm from './AttachmentForm'
import { CLOSE_MODAL } from '../store/modal/types'
import { openForm } from '../store/modal/actions'
import AddLabel from './AddLabel'


const TaskModal = () => {

  const currentUser = useSelector(state => state.user.currentUser.username)

  const open = useSelector(state => state.modal.isOpen)
  
  const currentTask = useSelector(state => state.task.currentTask)
  const currentCategory = useSelector(state => state.category.categories.find(c => c.id === currentTask.category_id))
  const categories = useSelector(state => state.category.categories)
  const members = useSelector(state => state.board.members)
  const tasks = useSelector(state => state.task.tasks)
  const comments = useSelector(state => state.comment.comments)
  const attachments = useSelector(state => state.attachment.attachments)
  const isEditOpen = useSelector(state => state.modal.focus)


  const [newComment, setNewComment] = useState("")
  const [newAssignee, setNewAssignee] = useState("")

  const defaultToggleEdit = {
    name: false,
    description: false, 
    category_id: false,
    assigned_to: false,
    position: false
  }
  const [toggleEdit, setToggleEdit] = useState({
    ...defaultToggleEdit
  })
  const [taskInput, setTaskInput] = useState({
    ...currentTask
  })

  // see category.js for explanation
  useEffect(() => {
    // also checking that the objects are not the same
    // using JSON.stringify because the objects are passed by value not reference, they will never be ===
    if (!isEditOpen && JSON.stringify(taskInput) !== JSON.stringify(currentTask)){
      console.log(taskInput)
      console.log(currentTask)
      setToggleEdit({...defaultToggleEdit})
        console.log("currentTask", currentTask)
        // only update tasks that were changed. otherwise will dispatch for all tasks
        dispatch(updateTaskAction(currentTask.id, taskInput))
    }
  }, [isEditOpen, taskInput])

  const dispatch = useDispatch()

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value)
  }
  
  const handleNewCommentSubmit = e => {
    e.preventDefault()
    console.log(newComment)
  
    const commentObj = {
      text: newComment,
      task_id: currentTask.id
    }
    dispatch(addCommentAction(commentObj))
    setNewComment("")
  }
  
  const handleAssigneeDropdownClick = (member) => {
    console.log("member", member)
    setNewAssignee(member)
    const body = {...currentTask, assigned_to: member}
    console.log("BODY", body)
    dispatch(updateTaskAction(currentTask.id, body))
  }
  
  const  handleCategoryDropdownClick = (categoryId) => {
    const numTasksInCategory = tasks.filter(t => t.category_id === categoryId).length

    const body = {...currentTask, category_id: categoryId, position: numTasksInCategory + 1} //last in the category (gem for position starts with 1)
    console.log("BODY", body)
    dispatch(updateTaskAction(currentTask.id, body))
  }
  
  
  const handleEditClick = taskPart => {
    console.log("handleEditClick")
    setToggleEdit({
      ...toggleEdit, [taskPart]: true
    })
    dispatch(openForm())
    console.log("EDIT", toggleEdit)
  }

  const handleChange = (e) => {
    console.log(e.target.name)

    if (e.target.name === "name"){
      console.log("Ahhhh!")
    }
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
    dispatch(updateTaskAction(currentTask.id, taskObj))
    setToggleEdit({
      ...toggleEdit, [taskPart]: false 
    })
  }

  const handleDeleteAttachment = (id) =>{
    dispatch(deleteAttachmentAction(id))
  }

  const renderComments = () =>  comments.map(comment => <CommentComp key={comment.id} id={comment.id} text={comment.text} taskId={currentTask.id} userId={comment.user_id} username={comment.username} avatar={comment.avatar}/>)
    
  return (
  <Modal
    onClose={() => {
      dispatch({type: CLOSE_MODAL})}}
      // onOpen={() => setOpen(true)}
      open={open}
      // trigger={<Button>Show Modal</Button>}
  >
    <Modal.Content >
      <Modal.Description>
        <Button 
        icon='close' 
        onClick={() => {dispatch({type: CLOSE_MODAL})}}
        />
        <h4 style={{display:"inline", paddingRight:"5px"}}><Icon name='book'/>Title:</h4>
      
        { toggleEdit.name ?  <Form onSubmit={() => handleSubmit("name")}>
          {/* <Form.Input className="inputToggle" 
            type="text" name="name" 
            autoComplete="off" 
            value={taskInput.name} 
            onChange={handleChange} 
          /> */}
          <Form.Input
            type="text" name="name" 
            autoComplete="off" 
            value={taskInput.name} 
            onChange={handleChange} 
          />
          </Form>
      : <><Header style={{display:"inline"}} className="inputToggle"> {currentTask.name}
        {/* <span>
        </span> */}
      </Header>
      {/* if want icon to be same size, put inside the header */}
          <Icon name="pencil" className="editIcon" onClick={() => handleEditClick("name")} ></Icon>
          </>
    }
    <br/>
          <br/>

{/* <h4>Assigned to:</h4> */}
        <span>
        <h4 style={{display:"inline", paddingRight:"5px"}}>Assigned to: </h4>
          <AssigneeDropdown currentAssignee={currentTask.assigned_to} members={members} handleSelect={handleAssigneeDropdownClick}/>
          </span>
          <br/>
          <br/>

          <h4 style={{display:"inline", paddingRight:"5px"}}>Category:</h4>
          {/* <p>{currentCategory && currentCategory.name}</p> */}

          {/* <Form.Input fluid  > */}
            <CategoryDropdown inline categories={categories} currentCategoryId={currentTask.category_id} handleSelect={handleCategoryDropdownClick}/>
          {/* </Form.Input> */}
          
          
            <h4><Icon name='bars'/>
            Description
          </h4>

          { toggleEdit.description ?  <Form onSubmit={() => handleSubmit("description")}><Form.Input className="inputToggle" type="text" name="description" autoComplete="off" value={taskInput.description} onChange={handleChange} /></Form>
      : <p className="inputToggle"> {currentTask.description ? currentTask.description : "No description yet..."}
      {/* nested ternary ^ */}
        <span>
          <Icon name="pencil" className="editIcon" onClick={() => handleEditClick("description")} ></Icon>
        </span>
      </p>
    }

        <h4><Icon name='attach'onClick={null}/>
          Attachments
        </h4>
        <AttachmentForm taskId={currentTask.id} />
        {attachments && attachments.map(attachment => <><img src={attachment.image} />
        {attachment.username === currentUser && <Icon name="trash" onClick={() => handleDeleteAttachment(attachment.id)} ></Icon>}
        </>)}


        
        <AddLabel key={currentTask.id} taskId={currentTask.id} />
       




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
  </Modal>
 )
}

export default TaskModal
