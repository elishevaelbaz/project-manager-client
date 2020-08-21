import React, { useState, useEffect } from 'react'
import BoardDropdown from './BoardDropdown'
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../store/user/actions';
import { Link, withRouter } from 'react-router-dom';
import { Image, Button, Menu, Popup, Form, Icon, Checkbox, Search, Dropdown, Input} from 'semantic-ui-react'
import { addMemberAction, getMembersAction, clearCurrentBoard } from '../store/board/actions';
import ErrorNotification from './ErrorNotification';
import { setFilter, clearFilter } from '../store/task/actions';
import SearchBar from './SearchBar';

const Header = ({history}) => {

  const currentBoard = useSelector(state => state.board.currentBoard)
  const members = useSelector(state => state.board.members)
  const currentUser = useSelector(state => state.user.currentUser)
  const filter = useSelector(state => state.task.query)

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

  // hardcoding to filter assigned tasks
  const handleFilter = (e) => {
    console.log("filter")
    console.log(e.target)
    dispatch(setFilter(currentUser.username))
  }

  const handleClearFilter = () => {
    dispatch(clearFilter())
  }

  const handleLogoClick = () => {
    history.push("/boards")
    // clear out current board so header doesn't have all the things, invite, search etc
    dispatch(clearCurrentBoard())
  }

  
  return(
    <div className="page-header">
    
    {/* <Button onClick={handleAddTask}>Add Task</Button> */}
    { currentUser && 
    <Menu >
    <Menu.Item className="logo header-logo" onClick={handleLogoClick}>Managely</Menu.Item>
      {  currentBoard &&  <><Menu.Item>{currentBoard.name}</Menu.Item>
    <Menu.Item>
    <BoardDropdown />
    </Menu.Item>
   
    <Menu.Item>
      {members.length === 1 ? "you are the only member" : <Popup trigger={<p> {members.length} members</p>}>
      <Popup.Content>
      {members.map(member => <span><Image src={`https://react.semantic-ui.com/images/avatar/small/${member.avatar}.jpg`} alt="avatar" avatar /><p key={member.username}>{member.username}</p></span>)}
    </Popup.Content>
      </Popup>     
         }
         </Menu.Item>
      <Menu.Item><Popup
            trigger={<p className="pointer"><Icon.Group size='large'>
              
            <Icon name='users' />
            <Icon corner name='add' />
          </Icon.Group>
          Invite</p>
        }
            content={<Form onSubmit={handleAddMember}>
            <Form.Input  name="name" label="Invite to board" placeholder='username' autoComplete="off" onChange={handleChange} />
        
            </Form>}
            on='click'
            // open={isOpen}
            // onOpen={handleOpen}
          /></Menu.Item>
    
    </>}

{currentBoard &&
          <Popup flowing trigger={<Menu.Item >
            <SearchBar/>
            {/* <Search icon='search' placeholder='Search tasks... ' /> */}
          </Menu.Item>} >
            <Popup.Content>type to search by task title or description </Popup.Content>
            <Popup.Content>use @&lt;member_name&gt; to search for tasks assigned to a specific member </Popup.Content>
            </Popup>}
          

          
         { filter && <Menu.Item>
            <Icon name="filter" />
            {`Filtering tasks`}
            <Icon name="close" onClick={handleClearFilter}/>
            </Menu.Item>}
    
     {/* putting search bar on right */}
      {/* {currentBoard ? <Menu.Item>
  
        <Link to="/login" >
          <Button onClick={handleLogout}>Logout</Button>
        </Link>
      </Menu.Item> : 
      <Menu.Item  position="right">
        <Link to="/login" >
          <Button onClick={handleLogout}>Logout</Button>
        </Link>
      </Menu.Item>}      
     */}
    <Menu.Item position="right">
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

export default withRouter(Header);