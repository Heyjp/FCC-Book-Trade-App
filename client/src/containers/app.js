import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Main from '../containers/Main.js';

class Container extends React.Component {

  render () {
    return (
      <Router>
        <div>
          <div>
            <h1>Header</h1>
          </div>

          <div>
            <ul>
              <Link to="/">Main</Link>
              <Link to="/about">About</Link>
              <Link to="/topics">Topics</Link>
            </ul>
          </div>
          <hr />


          <Route exact path='/' component={Main} />
          <Route exact path='/about' component={About} />
          <Route exact path='/topics' component={Topics} />

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
