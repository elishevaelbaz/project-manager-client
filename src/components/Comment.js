import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
// import { deleteCommentAction, updateCommentAction } from '../store/comment/actions'

const Comment = ({id, text, userId, taskId}) => {
  

  const currentUser = useSelector(state => state.user.currentUser.username)

  const handleDelete = (id) => {
    // dispatch(deleteCommentAction(id))
  }

  // const handleUpdateButton = (id) => {
  //   console.log("ID", id)
  //   const taskObj = { description: "hello"}
  //   dispatch(updateCommentAction(id, taskObj))
  // }

  return(
    <>
    <p>COMMENT: {text}</p>
    {userId === currentUser && <i className="trash icon" onClick={() => handleDelete(id)} ></i>}
{/*   <Button key={task.id} negative onClick={() => handleDeleteButton(task.id)}>X</Button> : null} */}
      {/*  {task.created_by === currentUser ? <Button key={task.id} onClick={() => handleUpdateButton(task.id)}>Update task</Button> : null} */}

    </>



    
    
    )
    

  
}

export default Comment;