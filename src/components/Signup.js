import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const  SignUp = (props) => {
  const [signUpInput, setSignUpInput] = useState({
    username: "",
    password: ""
  })

  const handleChange = e => {
    setSignUpInput({...signUpInput, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    // TODO: make a fetch request to sign up the current user
    // then set that user in state in our App component
    props.handleSignUp(signUpInput)
        // fetch("http://localhost:3000/users", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(this.state)
    // })
    //   .then(r => r.json())
    //   .then(user => {
    //     this.props.handleLogin(user)
    //   })
  }

  

    return (
      <div>
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