import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'semantic-ui-react'

const  SignUp = (props) => {
  const [signUpInput, setSignUpInput] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    console.log(e)
    console.log(e.target.value)
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
        
        <div className="signup-container">
          <h1 className="signup-header">Create an Account</h1>
          <Form.Input label='Username' name="username" placeholder='username' onChange={( e) => handleChange}/>
          <br />
          <Form.Input label='Password' name="password" placeholder='password' type="password"/>
          <br />
         

        <Form.Button onClick={handleSubmit}>Submit</Form.Button>
        <br />
      {/* </Form> */}
      {/* <form onSubmit={handleSubmit}>
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
      </form> */}
      <Link to="/login" >Already have an account? Log in here</Link>

      </div>

{/* <div className="container" id="container">
	<div className="form-container sign-up-container">
		<form action="#">
			<h1>Create Account</h1> */}
		
			{/* <span>or use your email for registration</span> */}
			{/* <input type="username" placeholder="Username" autoComplete="off"
          value={signUpInput.username}
          onChange={handleChange} />
			<input type="password" placeholder="Password" autoComplete="off"
          value={signUpInput.password}
          onChange={handleChange}/>
			<button>Sign Up</button>
		</form>
	</div>
	<div className="form-container sign-in-container">
		<form action="#">
			<h1>Sign in</h1>
			<div className="social-container">
				<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
				<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
				<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your account</span>
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button>Sign In</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button className="ghost" id="signIn">Sign In</button>
			</div>
			<div className="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button className="ghost" id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
</div>

<footer>
	<p>
		Created with <i className="fa fa-heart"></i> by
		<a target="_blank" href="https://florin-pop.com">Florin Pop</a>
		- Read how I created this and how you can join the challenge
		<a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
	</p>
</footer> */}



      </>
    )
  }

export default SignUp