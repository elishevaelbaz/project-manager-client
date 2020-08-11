import React, { useState, useEffect} from 'react'
import { Form } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'


// import { Link } from 'react-router-dom'


const UpdateTask = () => {

const currentTask = useSelector(state => state.task.currentTask)

const [taskInfo, setTaskInfo] = useState({
  name: "",
  description: "",
  dueDate: null,
  category: "",
  position: null
})

  
const { name, description, dueDate,category, position } = taskInfo
  

useEffect(() => {
  // set isLoading state
  // setPokemonInfo({ ...pokemonInfo, isLoading: true })

  // setState callback version
  setTaskInfo({
      name: currentTask.name,
      description: currentTask.description,
      dueDate: currentTask.dueDate,
      category: currentTask.category,
      position: null
    })
  }, [])

  const handleChange = e => {
    setTaskInfo({...taskInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // PATCH
    console.log("clicky")

  }

    return (
    <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='name' name="name" placeholder='Task name' onChange={handleChange} />
          <Form.Input fluid label='description' name="description" placeholder='description' onChange={handleChange} />
          <Form.Input fluid label='category' name="category" placeholder='Task category' onChange={handleChange} />
          <Form.Input fluid label='dueDate' name="dueDate" placeholder='due date' onChange={handleChange} />
          <Form.Input fluid label='position' name="position" placeholder='Task position' onChange={handleChange} />
          {/* <Form.Field label="date" type={date}/> */}
            {/* <label>Date</label> */}
            {/* <input type="date">
          </Form.Field> */}
            
          {/* /> */}
        </Form.Group>
          
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }

export default UpdateTask