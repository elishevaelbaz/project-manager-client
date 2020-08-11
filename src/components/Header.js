import React from 'react'
import BoardDropdown from './BoardDropdown'
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../store/user/actions';
import { Link } from 'react-router-dom';
import { postTask } from '../store/task/actions';
import { Modal, Button, Menu, Popup, Form } from 'semantic-ui-react'
import TaskForm from './TaskForm';

const Header = () => {

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutAction())
  }

  const currentBoard = useSelector(state => state.board.currentBoard)
  const currentUser = useSelector(state => state.user.currentUser)
  console.log(currentBoard)
  return(
    <div>
    <h1>Welcome, {currentUser ? currentUser.username : "user"}. You are viewing {currentBoard &&currentBoard.name}</h1>
    
    address card
    {/* <Button onClick={handleAddTask}>Add Task</Button> */}
    <Menu >
    <Menu.Item></Menu.Item>
      {  currentBoard &&  <Menu.Item>{currentBoard.name}</Menu.Item>}
    <Menu.Item>
    <BoardDropdown />
    </Menu.Item>

    
    {currentBoard && <Menu.Item>
    <Popup
    // icon='plus '
            trigger={<Button icon=' address card' content='Invite' />}
            content={<Form onSubmit={null}>
            <Form.Input  name="name" label="Invite to board" placeholder='username' onChange={null} />
        
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