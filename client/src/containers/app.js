import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import Main from '../containers/Main.js';
import Nav from '../components/Nav.js';
import DashBoard from '../containers/Dashboard.js'
import AuthContainer from '../containers/Auth.js'
import ProfileContainer from '../containers/Profile.js'

class Container extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Router>
        <div>
          <div>
            <h1>Header</h1>
          </div>

          <Nav />
          <hr />


          <Route exact path='/' component={Main} />
          <Route  path='/about' component={About} />
          <Route  path='/topics' component={Topics} />
          <Route  path='/dashboard' component={DashBoard} />
          <Route  path='/login' component={AuthContainer} />
          <Route  path='/signup' component={AuthContainer} />
          <Route  path='/profile' component={ProfileContainer} />
          <hr />
          <div>
            <p>Footer</p>
          </div>
        </div>
      </Router>
    )
  }
}

const About = () => (
  <div>
    <p>About</p>
  </div>
)


const Topics = () => (
  <div>
    <p>Topics</p>
  </div>
)

const mapStateToProps = (state) => {
  return {
    books: state.collection
  }
}

let container = connect(mapStateToProps)(Container)

export default container;
