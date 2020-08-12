import React, { useState } from 'react'
import { Form, Dropdown } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

// import { Link } from 'react-router-dom'

const TaskForm = (props) => {

  const categories = useSelector(state => state.category.categories)

  const [taskInput, setTaskInput] = useState({
    name: "",
    description: "", 
    due_date: null,
    category: ""
  })

  const handleChange = e => {

    setTaskInput({...taskInput, [e.target.name]: e.target.value })
  }

  const  handleDropdownClick = (e) => {
    setTaskInput({...taskInput, category: e.target.textContent })
    console.log(e.target)
    console.log(e.target.id)
  }

  const  handleSubmit = e => {
    e.preventDefault()
    // console.log(state)
    props.handleAddTask(taskInput)
    // props.handleLogin(state)
    // TODO: make a fetch request to login the current user
    // then set that user in state in our App component

  }

    return (
    <Form onSubmit={handleSubmit}>
      <br />
      <h3>Add a Task:</h3>
        <Form.Group widths='equal'>
          <Form.Input fluid label='name' name="name" placeholder='Task name' onChange={handleChange} />
          <Form.Input fluid label='description' name="description" placeholder='description' onChange={handleChange} />
          {/* <Form.Field label="date" type={date}/> */}
            {/* <label>Date</label> */}
            {/* <input type="date">
          </Form.Field> */}
            
          {/* /> */}
        
        <Dropdown text='Category'>
      <Dropdown.Menu>
        {/* Errors out when signout */}
        {categories.map(category => <Dropdown.Item key={category.id} id={category.id}  text={category.name} onClick={handleDropdownClick}/>)}
        
       
      </Dropdown.Menu>
    </Dropdown>

    </Form.Group>
          
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }


export default TaskForm