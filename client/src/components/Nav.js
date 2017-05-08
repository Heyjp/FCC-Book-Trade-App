import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => (
  <div>
    <ul>
      <li><Link to="/">Main</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/topics">Topics</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">Signup</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
    </ul>
  </div>
)

export default Nav;