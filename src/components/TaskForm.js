import React from 'react'
import { Form } from 'semantic-ui-react'

// import { Link } from 'react-router-dom'


class TaskForm extends React.Component {
  state = {
    name: "",
    description: "", 
    due_date: null,
    category_id: null
  }

  handleChange = e => {
    
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    // console.log(this.state)
    this.props.handleAddTask({...this.state})
    // this.props.handleLogin(this.state)
    // TODO: make a fetch request to login the current user
    // then set that user in state in our App component

  }

  render() {
    return (
    <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='name' name="name" placeholder='Task name' onChange={this.handleChange} />
          <Form.Input fluid label='description' name="description" placeholder='description' onChange={this.handleChange} />
          {/* <Form.Field label="date" type={date}/> */}
            {/* <label>Date</label> */}
            {/* <input type="date">
          </Form.Field> */}
            
          {/* /> */}
        </Form.Group>
          
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <h1>Login</h1>
//           <label>Username</label>
//           <input type="text" name="username" autoComplete="off" value={this.state.username} onChange={this.handleChange} />
//           <label>Password</label>
//           <input type="password" name="password" value={this.state.password} onChange={this.handleChange} autoComplete="current-password" />
//           <input type="submit" value="Login" />
//         </form>
//         <Link to="/signup" >Don't have an account yet? Sign up here</Link>
//       </div>
//     )
//   }
// }

export default TaskForm