import React, { useState, useRef } from 'react'
import { Form, Popup, Button, Icon} from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { addTaskAction } from '../store/task/actions'

const TaskForm = ({ categoryId }) => {

  const node = useRef();

  const [isOpen, setIsOpen] = useState(false)

  const [taskInput, setTaskInput] = useState({
    name: "",
    description: ""
  })
 

  const dispatch = useDispatch()

  const handleChange = e => {

    setTaskInput({...taskInput, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(taskInput)
    const taskObj = {...taskInput, category_id: categoryId }

    console.log(taskObj)
    dispatch(addTaskAction(taskObj))
    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

    return (
       <Popup
        ref={node}
        trigger={<Button icon='add' content='Add a task' onClick={() => setIsOpen(!isOpen)} />}
        content={<Form onSubmit={handleSubmit}>

      <Icon name='close' onClick={handleClose} className="corner" />

        <Form.Input  label='name' name="name" placeholder='Task name' autoComplete="off" onChange={handleChange} />

        <Form.Input  label='description' name="description" placeholder='description' autoComplete="off" onChange={handleChange} />

        <Form.Button color='violet'>Submit</Form.Button>
                </Form>}
        on='click'
        open={isOpen}
        // onOpen={handleOpen}
      />
    )
  }


export default TaskForm