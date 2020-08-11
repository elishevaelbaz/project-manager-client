import React, { useEffect, useState } from 'react';
import Category from './Category'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoards, setCurrentBoard } from '../store/board/actions'
import { fetchCategories, addCategoryAction } from '../store/category/actions';
import { addTaskAction, fetchTasks } from '../store/task/actions';
import { Grid, Container, Form } from 'semantic-ui-react'
import TaskForm from './TaskForm';


const CategoryContainer = ({match}) => {

  const [name, setName] = useState("")

 console.log("MATCH", match)
  const currentBoard = useSelector(state => state.board.currentBoard)
  // const loading = useSelector(state => state.categories.loading)

  const categories = useSelector(state => state.category.categories)
  const tasks = useSelector(state => state.task.tasks)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])

  useEffect(() => {
    if (currentBoard) {
      dispatch(fetchCategories(currentBoard.id))
      dispatch(fetchTasks(currentBoard.id))

    }
    else {
      // dispatch(setCurrentBoard(parseInt(match.params.id)))
    }

  }, [currentBoard])

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleAddCategory = (e) => {
    e.preventDefault()
    const categoryObj = {
      name,
      board_id: currentBoard.id

    }
    dispatch(addCategoryAction(categoryObj))
  }

  

  const handleAddTask = (taskObj) => {
    // ======================
    // if they don't choose a category, use the first category
    if (!taskObj.category){
      taskObj.category = categories[0].name
    }
    console.log(taskObj)
    dispatch(addTaskAction(taskObj))
  }

  return(
    <Container>
      { categories[0] && <TaskForm handleAddTask={handleAddTask}/>}

    <Grid columns={categories.length + 1}>
      <Grid.Row>
        {categories.map(category => <Category key={category.id} name={category.name} id={category.id}/>)}
      
      {<Form onSubmit={handleAddCategory}>
    <Form.Input  name="name" label="Add a category" placeholder='Category name' onChange={handleChange} />

    </Form>}
    </Grid.Row>
    </Grid>

    {categories.length === 0 && <h1>Add categories to begin</h1>}
    
    </Container>
    
  )
}

export default CategoryContainer;