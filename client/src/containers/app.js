import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';

import Main from '../containers/Main.js';
import Nav from '../components/Nav.js';
import DashBoard from '../containers/Dashboard.js'
import LoginForm from '../components/Form.js'

import setLibrary from '../actions'

class Container extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.getBooks();
  }

  getBooks () {
    let self = this;
    axios.get('/api/books')
      .then(function (res) {
        console.log(res, "this is res");
        dispatch(setLibrary(res.data));
      })
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
          <Route  path='/login' component={LoginForm} />
          <Route  path='/signup' component={LoginForm} />

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

export default Container;
