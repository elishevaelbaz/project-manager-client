import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import Header from './components/Header';
import CategoryContainer from './components/CategoryContainer';
import BoardContainer from './components/BoardContainer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards } from './store/board/actions';
import { signUpAction, loginAction, autoLoginAction} from './store/user/actions';
import Login from './components/Login';
import { closeForm } from './store/modal/actions';


const App = () => {

  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(autoLoginAction())
    
    
    // getTasks()
    //   .then(tasks => dispatch({ type: SET_TASKS, payload: tasks}))
  }, [dispatch])

  // fetch boards in app, when the currentUser changes, so have acces in redux
  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch, currentUser])

  const handleSignUp = (signUpInfo) => {
    // set current user, then redirect to home page
    const { username, password } = signUpInfo
    dispatch(signUpAction(username, password))
    // this.setState({ currentUser }, () => {
    //   this.props.history.push('/home')
    // })
  }

  const handleLogin = loginInfo => {
    // set current user, then redirect to home page
    const { username, password } = loginInfo
    dispatch(loginAction(username, password))
    // this.setState({ currentUser }, () => {
    //   this.props.history.push('/home')
    // })
  }
  const onDragEnd = result => {
    //TODO: reorder the column
  }

  const handleClick = (e) => {
    if (!e.target.className.includes("inputToggle") && (!e.target.parentNode.parentNode.className.includes("inputToggle"))){
console.log(e.target.parentNode.parentNode)
      console.log("gotcha", e.target.className)
      dispatch(closeForm())
    }
  }

  return (
    // <DragDropContext onDragEnd={onDragEnd}>

    <div className="App" onClick={handleClick}>
      {/* <Route exact path="/" /> */}
      <Header/>
      <Switch>
      {/* <Route exact path="/">
        {currentUser ? <BoardContainer /> : <Redirect to='/login' />}
      </Route> */}
      <Route exact path="/boards/:id">
        {currentUser && <CategoryContainer />}
      </Route>
      <Route exact path="/boards">
        {currentUser ? <BoardContainer /> : <Redirect to='/login' />}
      </Route>
      
      
      <Route path="/signup">
        {currentUser ?  <Redirect to='/boards' /> : <SignUp handleSignUp={handleSignUp} />}  
      </Route>
      <Route path="/login">
        {currentUser ?  <Redirect to='/boards' /> : <Login handleLogin={handleLogin} />} 
      </Route>
      <Route path="/">
        {currentUser ?  <CategoryContainer/> : <Login handleLogin={handleLogin} />}  
      </Route>
      

      {/* history.push(`/tasks/${task.id}`); */}
      {/* <Route path="/boards/:id" render={routeProps => (
              <CategoryContainer {...routeProps} />
              )} /> */}
      </Switch>

     
      
   
    </div>
    // </DragDropContext>
  );
}

export default App;
