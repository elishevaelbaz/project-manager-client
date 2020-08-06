import React from 'react'
import BoardDropdown from './BoardDropdown'
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../store/user/actions';

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
    <h1>Welcome, {currentUser ? currentUser.username : "user"}. You are viewing {currentBoard.name}</h1>
    <BoardDropdown />
    <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Header;