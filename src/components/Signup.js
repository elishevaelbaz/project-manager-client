import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'semantic-ui-react'

const  SignUp = (props) => {
  const [signUpInput, setSignUpInput] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e, {value}) => {
    console.log(e)
    console.log(value)
    setSignUpInput({...signUpInput, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(signUpInput)
    props.handleSignUp(signUpInput)
  }

    return (
      <>
      {/* // <div className="signUp"> */}
        {/* <Form onSubmit={handleSubmit} className="signUp-form"> */}
        
        <div className="signin-container">
          <div>
            <h1 id="signin-logo" className="logo">Managely</h1>
            <h3>The simple, yet effective project management tool</h3>
            <h3>fit for all your collaborative needs</h3>
          </div>

          <div className="signin-form-container">

            <h1 className="signin-header">Create an Account</h1>
            <Form>
            <Form.Input label='Username' name="username" placeholder='username' autoComplete="off" onChange={handleChange}/>
            <br />
            <Form.Input label='Password' name="password" placeholder='password' type="password" autoComplete="off" onChange={handleChange}/>
            <br />
          

          <Form.Button onClick={handleSubmit}>Submit</Form.Button>
          </Form>
          <br />
      
          <Link to="/login" className="landing-page-text">Already have an account? Log in here</Link>
        </div>
      </div>
      </>
    )
  }

export default SignUp