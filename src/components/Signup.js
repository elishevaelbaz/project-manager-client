import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'semantic-ui-react'

const  SignUp = (props) => {
  const [signUpInput, setSignUpInput] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e, value) => {
    setSignUpInput({...signUpInput, [e.target.name]: value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.handleSignUp(signUpInput)
  }

    return (
      <div>
      {/* // <div className="signUp"> */}
        {/* <Form onSubmit={handleSubmit} className="signUp-form">
        
        
          <Form.Input label='Username' name="username" placeholder='username' onChange={( e, { value }) => handleChange}/>
          <Form.Input label='Password' name="password" placeholder='password' />
         

        <Form.Button onClick={handleSubmit}>Submit</Form.Button>
      </Form> */}
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>

        <label>Username</label>
        <input
          type="text"
          name="username"
          autoComplete="off"
          value={signUpInput.username}
          onChange={handleChange}
        />
        

        <label>Password</label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={signUpInput.password}
          onChange={handleChange}
        />

        <input type="submit" value="Signup" />
      </form>
      <Link to="/login" >Already have an account? Login here</Link>
      </div>
    )
  }

export default SignUp