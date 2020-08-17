import React, { useState, useEffect } from 'react'
import BoardDropdown from './BoardDropdown'
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../store/user/actions';
import { Link } from 'react-router-dom';
import { Image, Button, Menu, Popup, Form, Icon, Input, Search} from 'semantic-ui-react'
import { addMemberAction, getMembersAction } from '../store/board/actions';
import ErrorNotification from './ErrorNotification';

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
  }, [currentBoard, dispatch])

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
    <div className="page-header">
    
    {/* <Button onClick={handleAddTask}>Add Task</Button> */}
    { currentUser && 
    <Menu >
    {/* <Menu.Item></Menu.Item> */}
      {  currentBoard &&  <Menu.Item>{currentBoard.name}</Menu.Item>}
    <Menu.Item>
    <BoardDropdown />
    </Menu.Item>

    

    
    {currentBoard && <>
    <Menu.Item>
      {members.length === 1 ? "you are the only member" : <Popup trigger={<p> {members.length} members</p>}>
      <Popup.Content>
      {members.map(member => <span><Image src={`https://react.semantic-ui.com/images/avatar/small/${member.avatar}.jpg`} alt="avatar" avatar /><p key={member.username}>{member.username}</p></span>)}
    </Popup.Content>
      </Popup>     
         }
         </Menu.Item>
      <Menu.Item><Popup
    // icon='plus '
            trigger={<p><Icon.Group size='large'>
            <Icon name='users' />
            <Icon corner name='add' />
          </Icon.Group>
          Invite</p>
        }
            content={<Form onSubmit={handleAddMember}>
            <Form.Input  name="name" label="Invite to board" placeholder='username' onChange={handleChange} />
        
            </Form>}
            on='click'
            // open={isOpen}
            // onOpen={handleOpen}
          /></Menu.Item>
    
    </>}

          <Menu.Item>
            <Search icon='search' placeholder='Search tasks... ' />
          </Menu.Item>
          {/* <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          /> */}
            
    <Menu.Item  position='right'>
  
      <Link to="/login" >
        <Button onClick={handleLogout}>Logout</Button>
      </Link>
    </Menu.Item>
  </Menu>



    }
    <ErrorNotification />
    
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