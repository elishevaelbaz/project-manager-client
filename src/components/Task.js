import React from 'react'
import { Card } from 'semantic-ui-react'
const Task = ({task}) => {
  // console.log(task)

  return(

    <Card
      href='#card-example-link-card'
      header={task.name}
      meta={task.description}
      description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
    />
    )
    // <>
    // <h4>Task</h4>
    // <p>{task && task.name}</p>
    // <p>{task && task.description}</p>
    // <p>{task && task.category}</p>
    


    // </>
  
}

export default Task;