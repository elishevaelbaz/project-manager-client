import React, { useEffect } from 'react'
import Task from './Task'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks } from '../api'
import { SET_TASKS } from '../store/types'

const Category = () => {

  const tasks = useSelector(state => state.tasks)

  const dispatch = useDispatch()

  // hooks equivalent of componentDidMount
  useEffect(() => {
    getTasks()
      .then(tasks => dispatch({ type: SET_TASKS, payload: tasks}))
  }, [dispatch]) //empty dependencies array - will only run when component is first rendered

  // included dispatch in the array becuase of react warning, but dispatch doesn't change, so will still be mount only
  return(
    <div>
    <h1>ToDos</h1>
    <ul>
      {tasks.map(task => <li key={task.name}><Task task={task} /></li>)}
      <li><Task /></li>
      <li><Task /></li>
      <li><Task /></li>
      <li><Task /></li>
    </ul>
    </div>
  )
}

export default Category;