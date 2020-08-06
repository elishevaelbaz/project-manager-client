import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import Header from './components/Header';
import CategoryContainer from './components/CategoryContainer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards } from './store/board/actions';
import { signUpAction, loginAction, autoLoginAction} from './store/user/actions';
import Login from './components/Login';

const App = () => {

  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(autoLoginAction())
    
    dispatch(fetchBoards())
    // getTasks()
    //   .then(tasks => dispatch({ type: SET_TASKS, payload: tasks}))
  }, [dispatch])

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

  return (
    <div className="App">
      {/* <Route exact path="/" /> */}
      <Header/>
      <Switch>
      <Route exact path="/">
        {currentUser ? <CategoryContainer /> : <Redirect to='/login' />}
      </Route>
      <Route path="/signup">
        {currentUser ?  <Redirect to='/' /> : <SignUp handleSignUp={handleSignUp} />}  
      </Route>
      <Route path="/login">
        {currentUser ?  <Redirect to='/' /> : <Login handleLogin={handleLogin} />} 
      </Route>
      </Switch>

      {/* <SignUp handleSignUp={handleSignUp} /> */}
      {/* <Login handleLogin={handleLogin} /> */}
      
   
    </div>
  );
}

export default App;
