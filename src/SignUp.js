import React from 'react'
import { Box } from 'grommet';
import './LogIn.scss'

class SignUp extends React.Component {
  state = {
    name: this.props.name,
    email: "",
    password: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    // TODO: make a fetch request to sign up the current user
    // then set that user in state in our App component
    fetch("https://damp-falls-17213.herokuapp.com/users", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(r => r.json())
      .then(user => {
        this.props.handleLogin(user)
      })
  }

  render() { console.log(this.props)
    const { name, email, password } = this.state

    return (
      <>
      <br/>
            <br/>
            <br/>
      <Box
        direction="row"
        border={{ color: 'brand', size: 'large' }}
        pad="medium"
      >
        <form onSubmit={this.handleSubmit}>
          <div className="form-structor">
            <div className="signup">
              <h2 className="form-title" id="login"><span>or</span>Sign Up</h2>
              <div className="form-holder">
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  placeholder="Name"
                />
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  placeholder="Email"
                />
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  placeholder="Password"
                />
              </div>
              <button className="submit-btn">Sign Up</button>
            </div>
          </div>

        </form>

      </Box>
      <br/>
      <br/>
      <br/>
      </>
    )
  }
}

export default SignUp
