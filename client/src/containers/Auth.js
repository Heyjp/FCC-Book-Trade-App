import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import Form from '../components/Form.js';
import {setLoginError, setLoginSuccess} from '../actions/login.js';
import axios from 'axios';

class AuthContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: "",
      route: props.location.pathname
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
    route = route.slice(1, route.length)
    this.promiseCall(username, password, route)
    this.setState({
      username: '',
      password: ''
    })
  }

  promiseCall (username, password, route) {
    let self = this;
    console.log("promise call being sent")
    axios.post(`/api/${route}`, {username, password}).then(function (res) {
      console.log(res, "data");
      self.props.dispatch(setLoginSuccess(true))
      self.props.dispatch(setLoginError(false))
    }).catch(function (err) {
      console.error(err, "err")
    })
  }


  render () {

    if (this.props.isLoginSuccess) {
      return (
        <Redirect to='/' />
      )
    }

    return (
      <div>
        <Form
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
    loginError: state.loginReducer.loginError
  };
}

export default connect(mapStateToProps)(AuthContainer);
