import React, { useState } from 'react'
import { Form, Comment } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCommentAction, editComment } from '../store/comment/actions'

const CommentComp = ({id, text, username, avatar}) => {
  

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
  
    <Comment>
      <Comment.Avatar as='a' src={`https://react.semantic-ui.com/images/avatar/small/${avatar}.jpg`} />
      <Comment.Content>
        <Comment.Author>{username === currentUser ? "You" :username}</Comment.Author>
        { toggleEdit ?  <Form onSubmit={handleSubmit}><Form.Input type="text" name="comment" autoComplete="off" value={textInput} onChange={handleChange} /></Form>
      : <>
        <Comment.Text>{text}</Comment.Text> 
        {username === currentUser && 
  
          <Comment.Actions>
            <Comment.Action onClick={handleCommentClick}>Edit </Comment.Action>
            <Comment.Action onClick={() => handleDelete(id)}> Delete</Comment.Action>
          
          </Comment.Actions>}
        </>}
      </Comment.Content>
    </Comment> 
  )
}

export default CommentComp