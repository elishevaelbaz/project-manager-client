import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'semantic-ui-react'

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
  }

    return (
      <div className="signin-container">
        <div>
          <h1 id="signin-logo" className="logo">Managely</h1>
          <h3>The simple, yet effective project management tool</h3>
          <h3>fit for all your collaborative needs</h3>
        </div>
        <div className="signin-form-container">
          <Form onSubmit={handleSubmit}>
          <h1 className="signin-header">Log in</h1>
          <Form.Input label='Username' name="username" placeholder='username' autoComplete="off" onChange={handleChange}/>
          <br />
          <Form.Input label='Password' name="password" placeholder='password' type="password" autoComplete="off" onChange={handleChange}/>
          <br />
          <Form.Button onClick={handleSubmit}>Submit</Form.Button>
          </Form>
          <br />
          <Link to="/signup" className="landing-page-text">Don't have an account yet? Sign up here</Link>
        </div>
      </div>
    )
  }


export default Login