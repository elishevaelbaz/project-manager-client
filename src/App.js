import React, { useEffect } from 'react';
import './App.css';
import SignUp from './components/SignUp';
import Header from './components/Header';
import CategoryContainer from './components/CategoryContainer';
import { useDispatch } from 'react-redux';
import { fetchBoards } from './store/board/actions';
import { signUpAction, loginAction, autoLoginAction} from './store/user/actions';
import Login from './components/Login';

const App = () => {

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
      {/* <SignUp handleSignUp={handleSignUp} /> */}
      <Login handleLogin={handleLogin} />
      <Header/>
      <CategoryContainer />
    </div>
  );
}

export default App;
