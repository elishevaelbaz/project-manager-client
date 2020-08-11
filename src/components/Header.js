import React, { useState, useEffect } from 'react'
import BoardDropdown from './BoardDropdown'
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../store/user/actions';
import { Link } from 'react-router-dom';
import { postTask } from '../store/task/actions';
import { Modal, Button, Menu, Popup, Form } from 'semantic-ui-react'
import TaskForm from './TaskForm';
import { addMemberAction, getMembersAction } from '../store/board/actions';

const Header = () => {

  const currentBoard = useSelector(state => state.board.currentBoard)
  const members = useSelector(state => state.board.members)
  const currentUser = useSelector(state => state.user.currentUser)
  console.log("currentBoard", currentBoard)

  const [newMemberInput, setNewMemberInput] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    if (currentBoard){
      dispatch(getMembersAction(currentBoard.id))
    }
  }, [currentBoard])

  const handleLogout = () => {
    dispatch(logoutAction())
  }
  
  const handleChange = (e) => {
    setNewMemberInput(e.target.value)
  }

  const handleAddMember = (e) => {
    console.log(newMemberInput)
    const memberObj = {
      username: newMemberInput,
      board_id: currentBoard.id
    }
    dispatch(addMemberAction(memberObj))
  }

  
  return(
    <div>
    <h1>Welcome, {currentUser ? currentUser.username : "user"}. You are viewing {currentBoard &&currentBoard.name}</h1>
    
    {/* <Button onClick={handleAddTask}>Add Task</Button> */}
    { currentUser && 
    <Menu >
    <Menu.Item></Menu.Item>
      {  currentBoard &&  <Menu.Item>{currentBoard.name}</Menu.Item>}
    <Menu.Item>
    <BoardDropdown />
    </Menu.Item>

    

    
    {currentBoard && <Menu.Item>
      <Menu.Item>{members.length > 1 ? `${members.length} members` : "you are the only member" }</Menu.Item>
    <Popup
    // icon='plus '
            trigger={<Button icon=' address card' content='Invite' />}
            content={<Form onSubmit={handleAddMember}>
            <Form.Input  name="name" label="Invite to board" placeholder='username' onChange={handleChange} />
        
            </Form>}
            on='click'
            // open={isOpen}
            // onOpen={handleOpen}
          />
    
    </Menu.Item>}
    <Menu.Item>
  
      <Link to="/login" >
        <Button onClick={handleLogout}>Logout</Button>
      </Link>
    </Menu.Item>
  </Menu>

    }
    
    {/* <Modal
      trigger={<Button>Add Task</Button>}
      header='Add a task'
      content='Call Benjamin regarding the reports.'
      actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
    /> */}



 



    </div>
  )
}

export default Header;