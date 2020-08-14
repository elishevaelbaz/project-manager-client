import React, { useState }  from 'react'
import { Card, Form } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import {  updateTaskAction } from '../store/task/actions'
import CategoryDropdown from './CategoryDropdown'

const EditTaskForm = ({ task, categories, currentCategory}) => {
  const { description, category_id, dueDate, id, name, position, assigned_to} = task
  console.log(category_id)

  // const category = useSelector(state => {
  //   return state.category.categories.find(category => category.id === category_id)
  // })

  // const currentCategory = categories.find(category => category.id === category_id)

  const dispatch = useDispatch()
  const [taskDetails, setTaskDetails] = useState({
    name: name,
    description: description,
    category_id: category_id, // currentCategory.name, //currentCategory.id,
    dueDate: dueDate,
    position: position,
    assigned_to: assigned_to
   })

   console.log(taskDetails, task.name, name)
  
   const handleChange = e => {
    // const category = categories.find(c => c.name === e.target.textContent)

    setTaskDetails({...taskDetails, [e.target.name]: e.target.value })
    console.log("taskDetails", taskDetails)
  }


//this is when form is submitted
const handleSubmit = e => {
    e.preventDefault()
    console.log(taskDetails)

    dispatch(updateTaskAction(id, taskDetails))
    
  }

  const handleSelect = (categoryId) => {
    setTaskDetails({...taskDetails, category_id: categoryId })
  }

  console.log(task)
  return(
    <Card>
      <Card.Content>
      <Form onSubmit={handleSubmit}>
        {/* <Form.Group widths='equal'> */}
          <Form.Input fluid label='name' name="name" placeholder='Task name' value={taskDetails.name} onChange={handleChange} />
          <Form.Input fluid label='description' name="description" placeholder='description' value={taskDetails.description} onChange={handleChange} />
          {/* put a dropdown for category and datepicker */}
          <Form.Input fluid label='category'>
            <CategoryDropdown categories={categories} currentCategoryId={currentCategory && currentCategory.id} handleSelect={handleSelect}/>
            </Form.Input>
          {/* <Form.Input fluid label='category' name="category" placeholder='Task category' value={taskDetails.category} onChange={handleChange} /> */}
          <Form.Input fluid label='dueDate' name="dueDate" placeholder='due date' value={taskDetails.dueDate} onChange={handleChange} />
          <Form.Input fluid label='position' name="position" placeholder='Task position' value={taskDetails.position} onChange={handleChange} />
          {/* <Form.Field label="date" type={date}/> */}
            {/* <label>Date</label> */}
            {/* <input type="date">
          </Form.Field> */}
            
          {/* /> */}
        {/* </Form.Group> */}
          
        <Form.Button>Submit</Form.Button>
      </Form>
      </Card.Content>
      </Card>

  )
        }

    //     <Card.Content>
    //   {currentTask.created_by === currentUser ? <Icon name="trash" onClick={() => handleDelete(currentTask.id)} /> : null}
    //   {currentTask.created_by === currentUser ? <Button key={currentTask.id} onClick={() => handleUpdateButton(currentTask.id)}>Update currentTask</Button> : null}
      
    //   {/* <Card.Href>#card-example-link-card</Card.Header>  */}
    //   <Card.Header> 
    //     {toggleEdit ?  <Form.Input type="text" name="name" autoComplete="off" value={name} onChange={handleNameChange} />
    //       : <Card.Header onClick={handleNameClick} onSubmit={console.log("HEY:")}>{currentTask.name}</Card.Header> }
    //   </Card.Header>

    //       <Card.Header>{currentTask.name}</Card.Header>
     
      
     
    //   <Card.Meta>{currentTask.description}</Card.Meta>
    //   <Card.Meta>Due Date:{currentTask.due_date}</Card.Meta>
    //   <Card.Meta>Category{currentTask.category_id}</Card.Meta>
    //   <Card.Meta>Added by: {currentTask.created_by === currentUser ? "you" : currentTask.created_by}</Card.Meta>
    //     {comments && renderComments()}
    //     <Form onSubmit={handleNewCommentSubmit}>
    //       <Form.Input type="text" name="newComment" autoComplete="off" value={newComment} onChange={handleNewCommentChange} />
    //     </Form>
    //   {/* <Card.Description>
    //     Matthew is a musician living in Nashville.
    //   </Card.Description> */}

    // </Card.Content>

  export default EditTaskForm