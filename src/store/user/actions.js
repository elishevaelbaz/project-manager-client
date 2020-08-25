import { SET_CURRENT_USER, LOGOUT_USER} from './types'
import { signUp, login, autoLogin, logout } from '../../api'
import { SET_ERROR } from '../error/types'

export const signUpAction = (username, password) => dispatch => {
  signUp(username, password).then(newUser => {
    console.log(newUser)
    if (newUser.messages){
        dispatch({
          type: SET_ERROR,
          payload: newUser.messages
        })
      }
    else{
      dispatch({
        type: SET_CURRENT_USER,
        payload: newUser
      })
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
      dispatch({
        type: SET_ERROR,
        payload: user.message
      })
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

