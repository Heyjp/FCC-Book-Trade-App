import React from 'react';
import {Link} from 'react-router-dom';

const Nav = (props) => (
  <div className="navigation">
    <ul className="nav-bar">
      <li className="nav-item"><Link to="/">Main</Link></li>
      <li className="nav-item"><Link to="/about">About</Link></li>
      {!props.user && <li className="nav-item"><Link to="/login">Login</Link></li>}
      {!props.user && <li className="nav-item"><Link to="/signup">Signup</Link></li>}
      {props.user && <li className="nav-item"><Link to="/dashboard">Dashboard</Link></li>}
      {props.user && <li className="nav-item"><Link to="/profile">Profile</Link></li>}
      {props.user && <li className="nav-item"><Link to="/logout">Logout</Link></li>}
    </ul>
  </div>
)

export default Nav;
/*
Link Example
<li className="nav-item"><Link to="/user/sponjeh">User1</Link></li>
<li className="nav-item"><Link to="/user/kip">User2</Link></li>
*/
