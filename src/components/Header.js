import React from 'react'
import BoardDropdown from './BoardDropdown'
import { useSelector } from 'react-redux';

const Header = () => {

  const currentBoard = useSelector(state => state.board.currentBoard)
  console.log(currentBoard)
  return(
    <div>
    <h1>Welcome, user. You are viewing {currentBoard.name}</h1>
    <BoardDropdown />
    </div>
  )
}

export default Header;