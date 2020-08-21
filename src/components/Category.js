import React, { useEffect, useState, createRef } from 'react'
import Task from './Task'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Card, CardContent, Form } from 'semantic-ui-react'
import TaskForm from './TaskForm'
import { Droppable } from 'react-beautiful-dnd'
import { fetchAllComments } from '../store/comment/actions'
import PlaceholderCard from './PlaceholderCard'
import { updateCategoryAction } from '../store/category/actions'
import { openForm } from '../store/modal/actions'

const Category = ({ name, id, taskOrder}) => {

  let tasks = useSelector(state => state.task.tasks)
  const query = useSelector(state => state.task.query)
  // filtering tasks by query string
  if (query.trim()){
    if (query[0] === "@"){
      tasks = tasks.filter(task => {
        // to make sure doesn't break if task doesn't have anyone assigned
        if (task.assigned_to){
          return task.assigned_to.toLowerCase().includes(query.slice(1).toLowerCase())
        }
      })
    }
    else{
      // searching task names and descriptions for a match
      tasks = tasks.filter(task => task.name.toLowerCase().includes(query.toLowerCase())
        || task.description.toLowerCase().includes(query.toLowerCase())
      )
    }
  }
  const filteredTasks = tasks.filter(task => task.category_id === id)

  const sortedTasks = filteredTasks.sort((taskA, taskB) => (taskA.position > taskB.position) ? 1 : -1)
  console.log("SORTED", sortedTasks)
  const loading = useSelector(state => state.task.loading)
  // const currentBoard = useSelector(state => state.board.currentBoard)

  const dispatch = useDispatch()
  const taskIndex = (task) => {
    return filteredTasks.findIndex(t => t.name === task.name)
  }

  const comments = useSelector(state => state.comment.comments)
  const isEditOpen = useSelector(state => state.modal.focus)

const inputRef = createRef()

const [toggleEdit, setToggleEdit] = useState(false)
const [categoryInput, setCategoryInput] = useState(name)

// if click anywhere else, dispatch(closeForm()) will be run
// when that happens, isEditOpen will be false
// so set toggleEdit to false which will change it to no longer be input field
useEffect(() => {
  if (!isEditOpen){
    setToggleEdit(false)
    // only update category names that were changed. otherwise will dispatch for all categories
    if (categoryInput !== name){
      dispatch(updateCategoryAction(id, {name: categoryInput}))
    }
  }
}, [isEditOpen])

const handleNameClick = () => {
  console.log("click", id)
  setToggleEdit(!toggleEdit)
  dispatch(openForm())
  // console.log(toggleEdit)
}

const handleChange = (e) => {
  setCategoryInput(e.target.value)
}

const handleSubmit = () => {
  const categoryObj = {
    name: categoryInput
  }

  dispatch(updateCategoryAction(id, categoryObj))
  setToggleEdit(false)
}

  if (loading) return <PlaceholderCard />

  return(
    <div >
      <Card className="categoryCard">
        

        { toggleEdit ? <Form onSubmit={() => handleSubmit()}><Form.Input className="category-input inputToggle" type="text" name="name" autoComplete="off" value={categoryInput} onChange={handleChange} /></Form>
          : <CardContent className="inputToggle" onClick={handleNameClick}>{name}</CardContent>
        }

        <Droppable droppableId={id.toString()}>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
          {sortedTasks[0] && sortedTasks.map((task, index) => <Task key={task.id} task={task} count={sortedTasks.length} index={index} />)}
          {provided.placeholder}
          </div>
          )}
        </Droppable>
        <TaskForm categoryId={id}/>
      </Card>
    </div>
  )
}

export default Category;