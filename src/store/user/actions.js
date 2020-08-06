import { SET_CURRENT_USER, LOGOUT_USER} from './types'
import { signUp, login, autoLogin, logout } from '../../api'

export const signUpAction = (username, password) => dispatch => {
  signUp(username, password).then(newUser => {
    console.log(newUser)
    if (newUser.messages){
      // setErrors(newUser.messages)
    }
    else{
      dispatch({
        type: SET_CURRENT_USER,
        payload: newUser
      })
      // props.handleLogIn(newUser)
      // props.history.push("/")
    }
  })
}


export const loginAction = (username, password) => dispatch => {
  login(username, password).then(user => {

    console.log("login user", user)
    // if login was successful
    if (user.username){
      dispatch({
        type: SET_CURRENT_USER,
        payload: user
      })
    }
    else{
      // setError(user.message)
    }
  })
}

export const autoLoginAction = () => dispatch => {
  autoLogin()
    .then(user => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: user
      })
    })
    .catch((err) => console.error(err))
}

export const logoutAction = () => dispatch => {
  logout()
    .then(logoutResponse => {
      dispatch({
        // type: 'USER_LOGOUT',
        type: LOGOUT_USER,
      })
      // this.setState({
      //   currentUser: null,
      //   message: logoutResponse.message
      // })
    })
}

