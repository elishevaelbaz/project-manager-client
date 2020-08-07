import React, { useEffect } from 'react';
import Category from './Category'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoards } from '../store/board/actions'
import { fetchCategories } from '../store/category/actions';
import { fetchTasks } from '../store/task/actions';

const CategoryContainer = () => {

  const currentBoard = useSelector(state => state.board.currentBoard)
  // const loading = useSelector(state => state.categories.loading)

  const categories = useSelector(state => state.category.categories)
  const tasks = useSelector(state => state.task.tasks)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBoards())
    
    
    // getTasks()
    //   .then(tasks => dispatch({ type: SET_TASKS, payload: tasks}))
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchCategories(currentBoard.id))

    // dispatch(fetchTasks(currentBoard.id))
  }, [currentBoard])

  const renderCategories = () => {
    console.log(categories)
    categories && categories.map(category => <Category key={category.id} name={category.name} />)
  }

  return(
    <div>
    <h1>CategoryContainer</h1>
    {/* {loading ? <h2>Loading...</h2> : renderCategories()} */}
    {currentBoard && categories && renderCategories()}
    </div>
  )
}

export default CategoryContainer;