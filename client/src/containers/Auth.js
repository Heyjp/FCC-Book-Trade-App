import React from 'react';
import {connect} from 'react-redux';

import Form from '../components/Form.js';

class AuthContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: "",
      route: "login"
    }
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
    this.props.login(email, password, route);
    this.setState({
      email: '',
      password: ''
    })
  }


  render () {
    return (
      <div>
        <Form pass={this.handlePass} user={this.handleUser} submit={this.handleSubmit} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password, route) => dispatch(login(email, password, route))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
