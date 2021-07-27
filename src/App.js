import React from 'react';
import './App.css'
import { Grommet, Box, Button, Grid, Text, Heading, Layer, Form, FormField, TextInput } from 'grommet';

import { grommet } from 'grommet/themes';
import MainContainer from './MainContainer';
import SignUp from './SignUp'
import Login from './Login'
import NavBar from './NavBar'
import Profile from './Profile'
import { Switch, Route, withRouter, Redirect, Link } from 'react-router-dom'
import { CloudUpload } from 'grommet-icons';
import CommentDreamForm from './Components/Main/RIght/CommentDreamForm';


class App extends React.Component {
  state = {
    name: "",
    sidebar: false,
    setSidebar: true,
    currentUser: null,
    showDreamButton: null,
    posts: [],
    showForm: false,
    setShow: false,
  }

  userName = React.createRef()

  // log user in when component mounts
  componentDidMount() {
    this.fetchDreams()
    this.autologinFetch()
  }



  fetchDreams = () => {
    fetch("https://secure-hollows-75074.herokuapp.com/posts")
      .then(r => r.json())
      .then(postsArray => {
        this.setState({
          posts: postsArray
        })
      })
  }

  autologinFetch = () => {
    fetch("https://secure-hollows-75074.herokuapp.com/autologin", {
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
    this.setState({ newUser }, () => {
      this.props.history.push('/home')
    })
  }

  handleLogin = currentUser => {
    // set current user, then redirect to home page
    this.setState({ currentUser }, () => {
      this.props.history.push('/home')
    })
  }

  handleName = (e) => {
    console.log('name change!!')
    e.preventDefault()
    this.setState({
      name: this.userName.current.value
    });
    this.props.history.push('/signup')
  }


  handleLogout = () => {
    fetch("https://secure-hollows-75074.herokuapp.com/logout", {
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

  setShow = () => {
    this.setState(prevState => ({
      show: !prevState.show,
      setShow: !prevState
    }))
  }

  handleDeleteDream = (justinTimberlake) => {
    this.setState(prevState => ({
      posts: prevState.posts.filter((post) => post.id !== justinTimberlake.id)
    }))
  }

  handleAddNewDream = (newDream) => {
    this.setState(prevState => ({
      posts: [ ...prevState.posts, newDream]
    }))
  }

  handleAddNewComment = (newComment) => {
    const updatedPosts = this.state.posts.map(post => {
      if (
        post.id === newComment.post.id){
          return{
            ...post,
            comments: [...post.comments, newComment]
          }
        }
        else{
          return post
        }
    })
    this.setState(prevState => ({
      ...prevState,
      posts: [...updatedPosts]
      
    }))
  }

  render() { console.log("from APP:",this.state.posts)
    const newcostumetheme = {
      secondary: {

        color: 'text',
        padding: {
          horizontal: '8px',
          vertical: '4px',
        }
      }
    }
    return (
      <Grommet full theme={grommet} >
        <Grid
          fill="horizontal"

          rows={['auto', 'flex']}
          columns={['auto', 'flex']}
          responsive="true"
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
            background="dark-1"
          >
            <NavBar />
            <Button onClick={this.setSidebar}>
              <Text size="large"><div className='img_logo'></div></Text>
            </Button>
            <Text>{this.state.currentUser
              ? <span>Welcome, {this.state.currentUser.name}
              </span>
              : null}</Text>
              {this.state.currentUser ? <CommentDreamForm
              user={this.state.currentUser}
              handleAddNewDream={this.handleAddNewDream}

              /> : null }
          </Box>

          {this.state.sidebar && (
            <Box
              gridArea="sidebar"
              background="dark-1"
              width="small"
              animation={[
                { type: 'fadeIn', duration: 1000 },
                { type: 'slideRight', size: 'xlarge', duration: 2000 },
              ]}
            >
              {['Profile', 'Settings', 'Sign-Out'].map(name => {
                if (name === 'Sign-Out') {
                  return (
                    <Button onClick={this.handleLogout} key={name} hoverIndicator>
                      <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                        <Link to={name}><Text>{name}</Text></Link>
                      </Box>
                    </Button>
                  )
                }
                else {
                  return (
                    <Button key={name} hoverIndicator>
                      <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                        <Link to={name}><Text>{name}</Text></Link>
                      </Box>
                    </Button>
                  )
                }
              })}
            </Box>
          )}
          <Box
            gridArea="main"
            justify="center"
            align="center"
            background="dark-2" >
            <Switch>
              <Route path="/signup">
                <SignUp handleLogin={this.handleLogin} name={this.state.name} />
              </Route>
              <Route path="/login">
                <Login handleLogin={this.handleLogin} />
              </Route>
              <Route path="/profile">
                {this.state.currentUser
                  ? <Profile
                    currentUser={this.state.currentUser}
                    updateUser={this.updateUser} />
                  : <Redirect to='/' />}
              </Route>
              <Route path="/home">
                {this.state.currentUser
                  ? <MainContainer
                    handleDeleteDream={this.handleDeleteDream}
                    posts={this.state.posts}
                    comment={this.state.comment}
                    handleAddNewComment={this.handleAddNewComment}
                    currentUser={this.state.currentUser} />
                  : <Redirect to='/' />}
              </Route>
              <Route path="/">
                <br />
                <br />
                <br />
                <br />
                <br />
                <Heading margin="none" size="large">Dive deep into</Heading>
                <Heading margin="none" size="large">the mind of</Heading>
                <Heading margin="none" size="large">
          <form onSubmit={this.handleName}>
              <input
                className="landingInput"
                id="text-input"
                placeholder="[your name]"
                name= "name"
                ref={this.userName}
              />
              {/* <Button href="/signup"
                // typed={this.props.typedName}
                style={{margin: '0 auto'}}
                label="Sign Up" onClick={() => { }} secondary /> */}
          </form>
        </Heading>
                <br /><br />
                <br />



                <h5>Already a member? <a href="/Login">Sign in.</a></h5>


                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

              </Route>
            </Switch>
          </Box>
        </Grid>
      </Grommet>
    );
  }
};

export default withRouter(App)
