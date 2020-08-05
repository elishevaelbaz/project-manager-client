import React from 'react'

const Task = ({task}) => {
  // console.log(task)

  return(
    <>
    <p>Task</p>
    <p>{task && task.name}</p>
    <p>{task && task.description}</p>
    <p>{task && task.category}</p>
    


    </>
  )
}

export default Task;