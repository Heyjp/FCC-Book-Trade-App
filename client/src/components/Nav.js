import React from 'react';
import {Link} from 'react-router-dom';

const Nav = (props) => (
  <div className="navigation">
    <ul className="nav-bar">
      {props.tabs.map(function (e, i) {
        let activeClass = e === props.active ? "active" : "";
        // Conditonally render out depending on user login status
        if (props.user === false && (e === "/profile" || e === "/dashboard" || e === "/logout") ) {
          return;
        }
        if (props.user && (e === "/login" || e === "/signup")) {
          return;
        }
        return (<li className={`nav-item ${activeClass}`} onClick={props.handleClick.bind(this, e)}>
                  <Link to={`${e}`}>
                    <img src={`/images/${props.icons[i]}`} width="20px" height="20px"/>
                  </Link>
                </li>
               )
      })
    }
    </ul>
  </div>
)

export default Nav;
/*
Link Example
<li className="nav-item"><Link to="/user/sponjeh">User1</Link></li>
<li className="nav-item"><Link to="/user/kip">User2</Link></li>
*/


/*

  <li className="nav-item" onClick={props.handleClick.bind(this, "home")}><Link to="/"><img src="/images/001-home.png" width="20px" height="20px"/></Link></li>
  <li className="nav-item" onClick={props.handleClick.bind(this, "about")}><Link to="/about"><img src="/images/266-question.png" width="20px" height="20px"/></Link></li>
  {!props.user && <li className="nav-item" onClick={props.handleClick.bind(this, "login")}><Link to="/login"><img src="/images/116-user-plus.png" width="20px" height="20px"/></Link></li>}
  {!props.user && <li className="nav-item" onClick={props.handleClick.bind(this, "signup")}><Link to="/signup" onClick={props.handleClick.bind(this, "home")}><img src="/images/183-switch.png" width="20px" height="20px"/></Link></li>}
  {props.user && <li className="nav-item" onClick={props.handleClick.bind(this, "dashboard")}><Link to="/dashboard"><img src="/images/033-books.png" width="20px" height="20px"/></Link></li>}
  {props.user && <li className="nav-item" onClick={props.handleClick.bind(this, "profile")}><Link to="/profile"><img src="/images/114-user.png" width="20px" height="20px"/></Link></li>}
  {props.user && <li className="nav-item" onClick={props.handleClick.bind(this, "logout")}><Link to="/logout"><img src="/images/183-switch.png" width="20px" height="20px"/></Link></li>}

*/
