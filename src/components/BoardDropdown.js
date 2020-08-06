import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { useSelector } from 'react-redux';


const BoardDropdown = () => {
  
  const boards = useSelector(state => state.task.boards)
  // const currentBoard = useSelector(state => state.currentBoard)

  return (
    <Dropdown text='Boards'>
      <Dropdown.Menu>
        {boards.map(board => <Dropdown.Item key={board.name} text={board.name}/>)}
        
        <Dropdown.Item text='Open...' description='ctrl + o' />
        <Dropdown.Item icon='folder' text='Move to folder' />

        <Dropdown.Divider />
        <Dropdown.Item text='Download As...' />
       
      </Dropdown.Menu>
    </Dropdown>
  )
}
export default BoardDropdown

