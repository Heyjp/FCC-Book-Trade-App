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

    this.state = {
      active: false,
      tabs: ["/", "/about", "/login", "/signup", "/dashboard", "/profile", "/logout" ],
      icons: ["001-home.png", '266-question.png', "183-switch.png", "116-user-plus.png", "033-books.png", "114-user.png", "183-switch.png"]
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.setState({
      active: e
    })
  }

  render () {
    return (
      <Router>
        <div className="app-body">
          <Nav
            user={this.props.user}
            handleClick={this.handleClick}
            active={this.state.active}
            tabs={this.state.tabs}
            icons={this.state.icons}
           />

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
