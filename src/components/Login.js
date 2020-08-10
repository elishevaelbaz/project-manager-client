import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Login = (props) => {

  const [loginInput, setLoginInput] = useState({
    username: "",
    password: ""
  })

  const handleChange = e => {
    setLoginInput({...loginInput, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.handleLogin(loginInput)
    // TODO: make a fetch request to login the current user
    // then set that user in state in our App component

  }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label>Username</label>
          <input type="text" name="username" autoComplete="off" value={loginInput.username} onChange={handleChange} />
          <label>Password</label>
          <input type="password" name="password" value={loginInput.password} onChange={handleChange} autoComplete="current-password" />
          <input type="submit" value="Login" />
        </form>
        <Link to="/signup" >Don't have an account yet? Sign up here</Link>
      </div>
    )
  }


export default Login