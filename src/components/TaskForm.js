import React, { useState } from 'react'
import { Form, Dropdown, Popup, Button } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import CategoryDropdown from './CategoryDropdown'
import { addTaskAction } from '../store/task/actions'

// import { Link } from 'react-router-dom'

const TaskForm = ({ categoryId }) => {

  

  const [taskInput, setTaskInput] = useState({
    name: "",
    description: ""
  })

  const dispatch = useDispatch()

  const handleChange = e => {

    setTaskInput({...taskInput, [e.target.name]: e.target.value })
  }

  // const  handleDropdownClick = (categoryId) => {
  //   const category = categories.find(c => c.name === e.target.textContent)
  //   setTaskInput({...taskInput, category_id: category.id })
  //   console.log(e.target)
  //   console.log(e.target.id)
  // }

  // const handleSelect = (categoryId) => {
    // setTaskInput({...taskInput, category_id: categoryId })
  // }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(taskInput)
    const taskObj = {...taskInput, category_id: categoryId }

    console.log(taskObj)
    dispatch(addTaskAction(taskObj))

    // props.handleAddTask(taskInput)

    // props.handleLogin(state)
    // TODO: make a fetch request to login the current user
    // then set that user in state in our App component

  }

    return (
    // <Form >
    //     <Form.Group widths='equal'>
    //       <Form.Input fluid label='name' name="name" placeholder='Task name' onChange={handleChange} />
    //       <Form.Input fluid label='description' name="description" placeholder='description' onChange={handleChange} />
    //       {/* <Form.Field label="date" type={date}/> */}
    //         {/* <label>Date</label> */}
    //         {/* <input type="date">
    //       </Form.Field> */}
            
    //       {/* /> */}

    //       <Form.Input fluid label='category'>
    //         <CategoryDropdown categories={categories} handleSelect={handleDropdownClick}/>
    //         </Form.Input>

    // </Form.Group>
          
    //     <Form.Button>Submit</Form.Button>
    //   </Form>



      <Popup
        trigger={<Button icon='add' content='Add a task' />}
        content={<Form onSubmit={handleSubmit}>

        <Form.Input  label='name' name="name" placeholder='Task name' onChange={handleChange} />

        <Form.Input  label='description' name="description" placeholder='description' onChange={handleChange} />

        <Form.Button color='violet'>Submit</Form.Button>
                </Form>}
        on='click'
        // open={isOpen}
        // onOpen={handleOpen}
      />
    )
  }


export default TaskForm