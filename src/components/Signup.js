import React from 'react'
import { Link } from 'react-router-dom'

class SignUp extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    // TODO: make a fetch request to sign up the current user
    // then set that user in state in our App component
    this.props.handleSignUp(this.state)
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

  render() {
    const { username, password} = this.state

    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <h1>Signup</h1>

        <label>Username</label>
        <input
          type="text"
          name="username"
          autoComplete="off"
          value={username}
          onChange={this.handleChange}
        />
        

        <label>Password</label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={this.handleChange}
        />

        <input type="submit" value="Signup" />
      </form>
      <Link to="/login" >Already have an account? Login here</Link>
      </div>
    )
  }
}

export default SignUp