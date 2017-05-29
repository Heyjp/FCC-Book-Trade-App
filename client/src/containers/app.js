import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import Main from '../containers/Main.js';
import Nav from '../components/Nav.js';
import DashBoard from '../containers/Dashboard.js'
import AuthContainer from '../containers/Auth.js'
import ProfileContainer from '../containers/Profile.js'
import About from '../components/About.js'
import User from '../containers/Users.js'

class Container extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Router>
        <div className="app-body">
          <Nav user={this.props.user}/>

          <div className="app-wrapper">
            <Route exact path='/' component={Main} />
            <Route  path='/about' component={About} />
            <Route  path='/login' component={AuthContainer} />
            <Route  path='/signup' component={AuthContainer} />
            <Route  path='/profile' component={ProfileContainer} />
            <Route  path='/dashboard' component={DashBoard} />
            <Route  path='/user/:userId' component={User} />
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state, "this is state on App container")
  return {
    books: state.collection,
    user: state.loginReducer.user
  }
}

let container = connect(mapStateToProps)(Container)

export default container;
