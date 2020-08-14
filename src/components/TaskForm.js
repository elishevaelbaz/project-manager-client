import React, { useState, useEffect, useRef } from 'react'
import { Form, Dropdown, Popup, Button } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import CategoryDropdown from './CategoryDropdown'
import { addTaskAction } from '../store/task/actions'

// import { Link } from 'react-router-dom'

const TaskForm = ({ categoryId }) => {

  const node = useRef();

  const [isOpen, setIsOpen] = useState(false)

  const [taskInput, setTaskInput] = useState({
    name: "",
    description: ""
  })

  // const handleClickOutside = e => {
  //   console.log("clicking anywhere");
  //   console.log(e.target)
  //   console.log(node.current)
  //   // if (node.current.contains(e.target)) {
  //   //   // inside click
  //   //   return;
  //   // }
  //   // outside click
  //   setIsOpen(false);
  // };

  // useEffect(() => {
  //   if (isOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isOpen]);


  

  

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
    setIsOpen(false)

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
        ref={node}
        trigger={<Button icon='add' content='Add a task' onClick={() => setIsOpen(!isOpen)} />}
        content={<Form onSubmit={handleSubmit}>

        <Form.Input  label='name' name="name" placeholder='Task name' onChange={handleChange} />

        <Form.Input  label='description' name="description" placeholder='description' onChange={handleChange} />

        <Form.Button color='violet'>Submit</Form.Button>
                </Form>}
        on='click'
        open={isOpen}
        // onOpen={handleOpen}
      />
    )
  }


export default TaskForm