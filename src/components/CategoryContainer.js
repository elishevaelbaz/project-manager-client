import React, { useEffect } from 'react';
import Category from './Category'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoards, setCurrentBoard } from '../store/board/actions'
import { fetchCategories } from '../store/category/actions';
import { addTaskAction, fetchTasks } from '../store/task/actions';
import { Grid, Container } from 'semantic-ui-react'
import TaskForm from './TaskForm';


const CategoryContainer = ({match}) => {
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

  const handleAddTask = (taskObj) => {
    // ======================
    // hardcoding category for now
    if (!taskObj.category_id){
      taskObj.category_id = categories[0].id
    }
    console.log(taskObj)
    dispatch(addTaskAction(taskObj))
  }

  return(
    <Container>
      { categories[0] && <TaskForm handleAddTask={handleAddTask}/>}

    <Grid columns={categories.length}>
      <Grid.Row>
        {categories.map(category => <Category key={category.id} name={category.name} />)}
      </Grid.Row>

    </Grid>
    </Container>
    
  )
}

export default CategoryContainer;