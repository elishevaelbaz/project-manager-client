import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentBoard } from '../store/board/actions';


const BoardDropdown = () => {
  
  const boards = useSelector(state => state.board.boards)
  // const currentBoard = useSelector(state => state.currentBoard)
  const dispatch = useDispatch()

  const handleDropdownClick = (e) => {
    console.log(e.target.textContent) //board.name

    dispatch(changeCurrentBoard(e.target.textContent))
  }
  return (
    <Dropdown icon="table" text=' Boards' >
      <Dropdown.Menu>
        {/* Errors out when signout */}
        {boards && boards.map(board => <Dropdown.Item key={board.id} text={board.name} onClick={handleDropdownClick}/>)}
        
        <Dropdown.Item text='Open...' description='ctrl + o' />
        <Dropdown.Item icon='folder' text='Move to folder' />

        <Dropdown.Divider />
        <Dropdown.Item text='Download As...' />
       
      </Dropdown.Menu>
    </Dropdown>
  )
}
export default BoardDropdown

