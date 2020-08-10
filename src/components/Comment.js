import React from 'react'
import {  Icon } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCommentAction, updateCommentAction } from '../store/comment/actions'

const Comment = ({id, text, userId, taskId, username}) => {
  

  const currentUser = useSelector(state => state.user.currentUser.username)

  const dispatch = useDispatch()
  
  const handleDelete = (id) => {
    dispatch(deleteCommentAction(id))
    // console.log("click")
  }

  // const handleUpdateButton = (id) => {
  //   console.log("ID", id)
  //   const taskObj = { description: "hello"}
  //   dispatch(updateCommentAction(id, taskObj))
  // }

  return(
    <>

    
      <p>COMMENT: {text}
      {/* <Icon name="trash icon" onClick={() => handleDelete(id)} ></Icon> */}
        {username === currentUser && <span>
          <Icon name="trash" onClick={() => handleDelete(id)} ></Icon>
        </span>}
      </p>
    </>

    
    
    )
    

  
}

export default Comment;