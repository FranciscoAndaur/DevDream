import React from 'react';
import './App.css'
import { Grommet, Box, Button, Grid, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import MainContainer from './MainContainer';
import SignUp from './SignUp'
import Login from './Login'
import NavBar from './NavBar'
import Profile from './Profile'
import { Switch, Route, withRouter, Redirect, Link } from 'react-router-dom'


class AppGrid extends React.Component {
  state = {
    sidebar: true,
    setSidebar: true,
    currentUser: null
  }

  // log user in when component mounts
  componentDidMount() {
    // TODO: check if user is logged in
    // and set current user in state
    fetch("http://localhost:3000/autologin", {
      credentials: "include"
    })
      .then(r => {
        if (r.ok) {
          return r.json()
        } else {
          throw Error("Not logged in!")
        }
      })
      .then(user => {
        this.handleLogin(user)
      })
      .catch((err) => console.error(err))
  }

  updateUser = newUser => {
    this.setState({ currentUser: newUser })
  }

  handleLogin = currentUser => { 
    
    // set current user, then redirect to home page
    this.setState({ currentUser }, () => { 
      this.props.history.push('/home') 
    })
  }

  handleLogout = () => {
    fetch("http://localhost:3000/logout", {
      credentials: "include"
    })
      .then(r => r.json())
      .then(() => {
        this.setState({ currentUser: null }, () => {
          this.props.history.push('/')
        })
      })
  }

  setSidebar = () => {
    this.setState(prevState => ({
      sidebar: !prevState.sidebar,
      setSidebar: !prevState.setSidebar
    }))
  }

  render() { console.log("from render:", this.state)
    return (
      <Grommet full theme={grommet}>
        <Grid
          fill
          rows={['auto', 'flex']}
          columns={['auto', 'flex']}
          areas={[
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'sidebar', start: [0, 1], end: [0, 1] },
            { name: 'main', start: [1, 1], end: [1, 1] },
          ]}
        >
          <Box
            gridArea="header"
            direction="row"
            align="center"
            justify="between"
            pad={{ horizontal: 'medium', vertical: 'small' }}
            background="dark-3"
          >
            <NavBar />
            <Button onClick={this.setSidebar}>
              <Text size="large"><div className='img_logo'></div></Text>
            </Button>
        <Text>{this.state.currentUser ? <span>Welcome, {this.state.currentUser.name}</span> : null }</Text>
          </Box>

          {this.state.sidebar && (
            <Box
              gridArea="sidebar"
              background="dark-2"
              width="small"
              animation={[
                { type: 'fadeIn', duration: 300 },
                { type: 'slideRight', size: 'xlarge', duration: 150 },
              ]}
            >
              {['Profile', 'Settings', 'Sign-Out'].map(name => (
                <Button key={name} href="#" hoverIndicator>
                  <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                    <Link to={name}><Text>{name}</Text></Link>
                  </Box>
                </Button>
              ))}
            </Box>
          )}
          <Box
            gridArea="main"
            justify="center"
            align="center"
            background="dark-1" >

            <Switch>
            <Route path="/signup">
              <SignUp handleLogin={this.handleLogin} />
            </Route>
            <Route path="/login">
              <Login handleLogin={this.handleLogin} />
            </Route>
            <Route path="/profile">
              {this.state.currentUser ? <Profile currentUser={this.state.currentUser} updateUser={this.updateUser} /> : <Redirect to='/' />}
            </Route>
            <Route path="/home">
              {this.state.currentUser ? <h1>Welcome, {this.state.currentUser.username}</h1> : <Redirect to='/' />}
            </Route>
            <Route path="/">
              <h1>Please Login or Sign Up</h1>
            </Route>
            </Switch>
          </Box>
        </Grid>
      </Grommet>
    );
  }
};

export default withRouter(AppGrid)