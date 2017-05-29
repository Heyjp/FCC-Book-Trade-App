import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import Form from '../components/Form.js';
import {setLoginError, setLoginSuccess, setUser} from '../actions/login.js';
import axios from 'axios';

class AuthContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: "",
      route: props.location.pathname,
      user: props.user
    }

    this.route = props.location.pathname

    this.handleUser = this.handleUser.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.promiseCall = this.promiseCall.bind(this)
  }

  componentWillReceiveProps (props) {
    console.log("new props", props)
  }

  handleUser (e) {
    this.setState({
      username: e.target.value
    })
  }

  handlePass (e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault();
    let {username, password, route} = this.state;
    // Route is taken from  the route props and contains "/", slice to remove it.
    route = route.slice(1, route.length)
    this.promiseCall(username, password, route)
    this.setState({
      username: '',
      password: ''
    })
  }

  promiseCall (username, password, route) {
    let self = this;
    axios.post(`/api/${route}`, {username, password}).then(function (res) {

      // self.props.dispatch(setLoginSuccess(true));
      // get the username from res.data,
      // self.props.dispatch(setLoginError(false));
      self.props.dispatch(setUser(res.data))
    }).catch(function (err) {
      console.error(err, "err")
    })
  }


  render () {

    let route;

    this.state.route === "/login" ? route = "Login" : route = "Sign Up";
    // If user is logged in redirect from page
    if (this.props.user !== false) {
      return (
        <Redirect to='/' />
      )
    }

    return (
      <div>
        <Form
        route={route}
        pass={this.handlePass}
        user={this.handleUser}
        submit={this.handleSubmit}
        username={this.state.username}
        password={this.state.password}
         />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.loginReducer.isLoginPending,
    isLoginSuccess: state.loginReducer.isLoginSuccess,
    loginError: state.loginReducer.loginError,
    user: state.loginReducer.user
  };
}

export default connect(mapStateToProps)(AuthContainer);
