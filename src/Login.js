import React from 'react'
import './LogIn.scss'

class Login extends React.Component {
  state = {
    name: "",
    email: "",
    password: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    // TODO: make a fetch request to login the current user
    // then set that user in state in our App component
    fetch("http://localhost:3000/login", {
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

  render() {
    const { name, email, password } = this.state
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="form-structor">
            <div className="signup">
              <h2 className="form-title" id="login"><span>or</span>Log In</h2>
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
              <button className="submit-btn">Log In</button>
            </div>

          </div>
        </form>
      </>
    )
  }
}

export default Login