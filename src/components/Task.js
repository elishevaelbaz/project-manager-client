import React from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Icon, Dropdown } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTaskAction, setCurrentTask, closeCurrentTask, updatePositionAction } from '../store/task/actions'

const Task = ({task, count, index}) => {
  console.log("TASK", task)
  

  const currentUser = useSelector(state => state.user.currentUser.username)
  const currentTask = useSelector(state => state.task.currentTask)


  const dispatch = useDispatch()

  let history = useHistory()

  const handleDelete = (id) => {
    dispatch(deleteTaskAction(id))
  }

  const handleCardClick = (e) => {
    if (currentTask.name){
      dispatch(closeCurrentTask())
    }
    else if (e.target.className === "trash icon"){
      handleDelete(task.id)
    }
    else{
      // can we set it to just an id
      // dispatch(setCurrentTask(id))
      console.log("HEYYYYYY", e.target)
      dispatch(setCurrentTask(task))
      history.push(`/tasks/${task.id}`);
    }
    
    // return <TaskDetail task={task} />
  }

  // const renderComments = () => {
  //   return task.comments.map(comment => <Comment key={comment.id} id={comment.id} text={comment.text} taskId={task.id} userId={comment.user_id} username={comment.username}/>)
  // }

 //==========================
 let positionOptions = []

 for (let i = 0; i <= count; i++) {
   const option = {
    key: i, text: i, value: i
  };
   positionOptions.push(option)
 }
  // {
  //   key: 1, text: 1, value: 1
  // }, 
  // {
  //   key: 2, text: 2, value: 2
  // }
  // ,{
  //   key: 3, text: 3, value: 3
  // },
  // {key: 4, text: 4, value: 4
  // },
  // {
  //   key: 5, text: 5, value: 5
  // }]
 //==========================
//  const changePosition = (newIndex) => {
//   if (newIndex === 0){
//     if ()
//   }
//  }

 const handleSelect = (index) => {
   console.log(index)
   dispatch(updatePositionAction(task.id, {new_index: index, category_id: task.category_id}))
  // setTaskDetails({...taskDetails, category_id: categoryId })
}

  return(

    <Card
      // href='#card-example-link-card'
      key={task.id}
      onClick={handleCardClick}
    >
      <Card.Content>
      {task.created_by === currentUser ? <Icon name="trash" onClick={() => handleDelete(task.id)} /> : null}

      {/* <Card.Href>#card-example-link-card</Card.Header> */}
      <Card.Description>
      {task.name}
      </Card.Description>
      <Card.Meta>{task.position}</Card.Meta>
      <Card.Meta>{index}</Card.Meta>
      <Dropdown
    placeholder='Change position'
    fluid
    selection
    options={positionOptions}
    // defaultValue={currentCategoryId || null}
    onChange={(e, {value}) => handleSelect(value)}
    />
      {/* <Card.Meta>{task.description}</Card.Meta> */}

      {/* {currentTask.name === task.name && (<>
        <Card.Meta>Due Date:{task.due_date}</Card.Meta>
        <Card.Meta>Category{task.category_id}</Card.Meta>
        <Card.Meta>Added by: {task.created_by === currentUser ? "you" : task.created_by}</Card.Meta>
        {renderComments()}
      </>)} */}
    
    {/* can put this instead in a ternary and will show this */}
    {/* {currentTask.name === task.name &&  <TaskDetail task={task}/> } */}
      
      

    </Card.Content>
      </Card>
    )
    

    // </>
  
}

export default Task;