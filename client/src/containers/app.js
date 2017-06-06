import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

import {BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import Main from '../containers/Main.js';
import Nav from '../components/Nav.js';
import DashBoard from '../containers/Dashboard.js'
import AuthContainer from '../containers/Auth.js'
import ProfileContainer from '../containers/Profile.js'
import About from '../components/About.js'
import User from '../containers/Users.js'
import Logout from '../containers/Logout.js'

import AnimationExample from '../containers/animationExample.js'


class Container extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      tabs: ["/", "/about", "/login", "/signup", "/dashboard", "/profile", "/logout", '/animation' ],
      icons: ["001-home.png", '266-question.png', "183-switch.png", "116-user-plus.png", "033-books.png", "114-user.png", "183-switch.png", "033-books.png"],
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(props) {
    console.log(props, "this is props on Container");
  }

  handleClick (e) {

    this.setState({
      active: e
    })

  }

  render () {
    /*
    const MyComp = (props) => {
      console.log(props, "this is props of MyComp");
        const {pathname} = props.location;
        switch (pathname) {
          case '/':
            return <Main />
          case '/about':
            return <About />
          case '/login':
            return <AuthContainer />
          case '/signup':
            return <AuthContainer />
          case '/dashboard':
            return <DashBoard />
          case '/profile':
            return <ProfileContainer />
          case '/logout':
            return <Logout />
          default:
            return <User />
        }
    }
*/
    return (
      <Router>
        <Route render={({location}) => (
            <div className="app-body">

              <Nav
                user={this.props.user}
                handleClick={this.handleClick}
                active={this.state.active}
                tabs={this.state.tabs}
                icons={this.state.icons}
               />

               <div className="app-wrapper">
                 <CSSTransitionGroup
                   transitionName="example"
                   transitionEnterTimeout={300}
                   transitionLeaveTimeout={500}
                 >
                    <Switch location={location} key={location.key}>
                       <Route exact path='/'  component={Main} />
                       <Route  path='/login'  component={AuthContainer} />
                       <Route  path='/about'  component={About} />
                       <Route  path='/signup'   component={AuthContainer} />
                       <Route  path='/profile'  component={ProfileContainer} />
                       <Route  path='/dashboard'  component={DashBoard} />
                       <Route  path='/user/:userId'  component={User} />
                       <Route path='/logout'  component={Logout} />
                    </Switch>
                 </CSSTransitionGroup>
               </div>
            </div>
          )
        }/>
      </Router>
    )
  }
}

let CompArray = [
  {id: 1, property: Main, link: '/'},
  {id: 2, property: About, link: '/about'},
  {id: 3, property: AuthContainer, link: '/login'},
  {id: 4, property: AuthContainer, link: '/signup'},
  {id: 5, property: DashBoard, link: '/dashboard'},
  {id: 6, property: ProfileContainer, link: '/profile'},
  {id: 7, property: Logout, link: '/logout'},
  {id: 8, property: User, link: '/user/:userId'}
]

/*

<Route exact path='/'  component={Main} />
<Route  path='/login' key={3} component={AuthContainer} />
<Route  path='/about' key={2} component={About} />
<Route  path='/signup' key={4}  component={AuthContainer} />
<Route  path='/profile' key={5} component={ProfileContainer} />
<Route  path='/dashboard' key={6} component={DashBoard} />
<Route  path='/user/:userId' key={6} component={User} />
<Route path='/logout' key={7} component={Logout} />
<Route path='/animation' key={7} component={AnimationExample} />

<Route path='/' location={location} key={location.key} render={MyComp} />

*/

const mapStateToProps = (state) => {
  return {
    books: state.collection,
    user: state.loginReducer.user
  }
}

let container = connect(mapStateToProps)(Container)

export default container;
