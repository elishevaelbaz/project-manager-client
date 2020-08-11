import React, { useState } from 'react'
import {  Icon, Form } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCommentAction, updateCommentAction, editComment } from '../store/comment/actions'

const Comment = ({id, text, userId, taskId, username}) => {
  

  const currentUser = useSelector(state => state.user.currentUser.username)

  const [toggleEdit, setToggleEdit] = useState(false)
  const [textInput, setTextInput] = useState(text)


  const dispatch = useDispatch()
  
  const handleDelete = (id) => {
    dispatch(deleteCommentAction(id))
  }

  const handleCommentClick = () => {
    setToggleEdit(true)
  }
  const handleChange = (e) => {
    setTextInput(e.target.value)
  }

  const handleSubmit = () => {
    const commentObj = {
      id: id,
      text: textInput,
    }
    dispatch(editComment(id, commentObj))
    setToggleEdit(false)
  }

  
  return(
    <>

    { toggleEdit ?  <Form onSubmit={handleSubmit}><Form.Input type="text" name="comment" autoComplete="off" value={textInput} onChange={handleChange} /></Form>
      : <p>COMMENT: {text}
      {/* <Icon name="trash icon" onClick={() => handleDelete(id)} ></Icon> */}
        {username === currentUser && <span>
          <Icon name="trash" onClick={() => handleDelete(id)} ></Icon>
          <Icon name="edit" onClick={handleCommentClick} ></Icon>
        </span>}
      </p>
    }
    </>

    
    
    )
    

  
}

export default Comment;