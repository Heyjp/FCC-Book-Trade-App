import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'

import loginAuth from '../actions/login.js'

import {setUserLibrary} from "../actions/index.js"
import { Profile, CurrentBooks, RequestTab, OptionBar, AddBooks } from '../components/Profile.js';
import BookList from '../components/Book.js';


class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      tabs: ['current', 'request', 'add'],
      title: '',
      author: '',
      searchResults: [],
      user: props.user

    }

    this.handleClick = this.handleClick.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateAuthor = this.updateAuthor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setUserLibrary = this.setUserLibrary.bind(this);
  }

  componentWillMount () {
    this.setUserLibrary();
  }

  handleClick (i) {
    let result = this.state.tabs[i];
    this.setState({
      active: result
    })
  }

  updateTitle (e) {
    this.setState({
      title: e.target.value
    })
  }

  updateAuthor (e) {
    this.setState({
      author: e.target.value
    })
  }

  setUserLibrary () {
    let self = this;
    let user = this.state.user;
    console.log(user, "this is user");
    axios.get(`/api/show-library?user=${user}`)
      .then(function (res) {
        console.log(res, "dashboard getBooks")
        // self.props.dispatch(setUserLibrary(res.data))
      }).catch(function (err) {
        console.log(err, "this is err");
      })
  }

  handleSubmit () {
    let self = this;
    const {title, author} = this.state;
    axios.post('/api/book-search', {title, author})
    .then(function (res) {
      self.setState({
        searchResults: res.data
      })
    })

    this.setState({
      title: '',
      author: ''
    })
  }

  render() {

    let activeComponent;


    if (!this.state.active) {
      activeComponent = <CurrentBooks books={this.props.books} />
    } else if (this.state.active === "current") {
      activeComponent = <CurrentBooks books={this.props.books} />
    } else if (this.state.active === "request") {
      activeComponent = <RequestTab />
    } else if (this.state.active === "add") {
      activeComponent =  (
        <div>
          <AddBooks
                                 title={this.state.title}
                                 author={this.state.author}
                                 updateTitle={this.updateTitle}
                                 updateAuthor={this.updateAuthor}
                                 submitBook={this.handleSubmit}
                                 />
          <BookList books={this.state.searchResults} />
        </div>
      )
    } else {
      activeComponent = <CurrentBooks books={this.props.books} />
    }

      return (
        <div>
          <Profile />
          <div>
            <div>
              <OptionBar tabs={this.state.tabs} handleClick={this.handleClick} />
              <div>
                {activeComponent}
              </div>
            </div>
          </div>
        </div>
      )
    }

}

const mapStateToProps = (state) => {
  console.log(state, "this is state on dashboard");
  return {
    books: state.collection,
    user: state.loginReducer.user
  }
}

let dashBoard = connect(mapStateToProps)(DashBoard);

export default dashBoard;
