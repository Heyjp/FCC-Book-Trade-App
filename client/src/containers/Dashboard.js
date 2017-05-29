import React from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios'

// CONTAINERS
import RequestContainer from './Requests.js'

// ACTIONS
import {setUserLibrary} from '../actions/login.js'

// COMPONENTS
import { Profile, CurrentBooks, RequestTab, OptionBar, AddBooks } from '../components/Profile.js';
import BooksList from '../components/Book.js';


class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      tabs: ['current', 'request', 'add'],
      title: '',
      author: '',
      userLibrary: [],
      requestedBook: [],
      requests: [1, 2],
      user: props.user
    }

    this.handleClick = this.handleClick.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateAuthor = this.updateAuthor.bind(this);
    this.getRequests = this.getRequests.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setUserLibrary = this.setUserLibrary.bind(this);
    this.handleBooks = this.handleBooks.bind(this);
    this.addBookToCollection = this.addBookToCollection.bind(this);
  }

  componentWillMount () {
    this.setUserLibrary();
    this.getRequests();
  }

  componentDidMount () {
    this.setState({ kimsu: "one"})
  }

  addBookToCollection () {
    let data = this.state.bookToAdd;
    axios.post('/api/add-book', data)
      .then(function (res) {
        console.log(res, "res data on add book axios")
      })
  }

  getRequests () {
    console.log("getting requests")
    let self = this;
    axios.get(`/api/get-trades?user=${this.state.user}`)
      .then(function (res) {
        console.log(res, "get-trades res");
        self.setState({
          requests: res.data
        })
      })
  }

  handleBooks (e, i) {
    let data = e;
    data.user = this.state.user;
    console.log(data, "data on handlebooks")
    this.setState({
      bookToAdd: data
    })
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
    axios.get(`/api/show-library?user=${user}`)
      .then(function (res) {
        self.props.dispatch(setUserLibrary(res.data))
      }).catch(function (err) {
        console.log(err, "this is err");
      })
  }

  handleSubmit () {
    let self = this;
    const {title, author} = this.state;
    axios.post('/api/book-search', {title, author})
    .then(function (res) {
      console.log(res, "handlesubmit res");
      self.setState({
        searchResults: res.data
      }, function () {
        console.log(self.state.searchResults, "this is searchResults after get-books");
      })
    })

    this.setState({
      title: '',
      author: ''
    })
  }

  render() {

    if (!this.state.user) {
      return (
        <Redirect to="/" />
      )
    }

    let activeComponent;

    if (!this.state.active) {
      activeComponent = <BooksList books={this.props.userLibrary}  />
    } else if (this.state.active === "current") {
      activeComponent = <BooksList books={this.props.userLibrary}  />
    } else if (this.state.active === "request") {
      activeComponent = <RequestContainer books={this.state.requests} />
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
          {this.state.searchResults && <BooksList books={this.state.searchResults} handleClick={this.handleBooks} />}
        </div>
      )
    } else {
      activeComponent = <BookList books={this.props.userLibrary} />
    }

      return (
        <div>
          <Profile />
          <div>
            <div>
              <OptionBar tabs={this.state.tabs} handleClick={this.handleClick} />
              <div>
                {activeComponent}
                {this.state.active === "add" && <button onClick={this.addBookToCollection}>Add Book</button>}
              </div>
            </div>
          </div>
        </div>
      )
    }

}

const mapStateToProps = (state) => {
  return {
    books: state.collection,
    user: state.loginReducer.user,
    userLibrary: state.loginReducer.userLibrary
  }
}

let dashBoard = connect(mapStateToProps)(DashBoard);

export default dashBoard;
