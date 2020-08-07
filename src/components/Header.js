import React from 'react'
import BoardDropdown from './BoardDropdown'
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../store/user/actions';
import { Link } from 'react-router-dom';
import { postTask } from '../store/task/actions';
import { Modal, Button } from 'semantic-ui-react'
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
    <BoardDropdown />
    <Link to="/login" >
      <button onClick={handleLogout}>Logout</button>
    </Link>
    {/* <Button onClick={handleAddTask}>Add Task</Button> */}

    
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