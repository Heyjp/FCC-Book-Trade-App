import React from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios'

import NotificationSystem from 'react-notification-system';

// CONTAINERS
import RequestContainer from './Requests.js'

// ACTIONS
import {setUserLibrary} from '../actions/login.js'
import {setLibrary, setModal} from '../actions/index.js'

// COMPONENTS
import { Profile, CurrentBooks, RequestTab, OptionBar, AddBooks } from '../components/Profile.js';
import BooksList from '../components/Book.js';
import Modal from '../components/Modal.js';


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
      user: props.user,
      isOpen: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateAuthor = this.updateAuthor.bind(this);
    this.getRequests = this.getRequests.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setUserLibrary = this.setUserLibrary.bind(this);
    this.handleBooks = this.handleBooks.bind(this);
    this.addBookToCollection = this.addBookToCollection.bind(this);
    this.bookAddNotification = this.bookAddNotification.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillMount () {
    this.setUserLibrary();
    this.getRequests();
  }


  addBookToCollection (object, e) {
    e.stopPropagation();
    let self = this;
    console.log(object, e, "addBookToCollection")

    axios.post('/api/add-book', self.props.modal)
      .then(function (res) {
        console.log(res, "res data on add book axios")
        self.bookAddNotification();
        self.toggleModal();
        self.setUserLibrary();
      })

  }

  bookAddNotification () {
    console.log("book Add Notification running");
    return this.refs.notificationSystem.addNotification({
       message: "Book successfully requested",
       level: 'success',
       position: 'tc'
     })
  }

  cancelTrade () {

    /*
      axios.post('/api/cancel-trade', data)
        .then(function (data) {

      })

    */
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
    console.log(e, "this is handleBooks")
    this.props.dispatch(setModal(data))
    this.toggleModal();

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
      self.setState({
        searchResults: res.data
      });
    })

    this.setState({
      title: '',
      author: ''
    })
  }

  toggleModal (e) {
    this.state.isOpen ? this.setState({
      isOpen: false
    }) :
    this.setState({
      isOpen: true
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
      activeComponent = (
      <div>
        <RequestContainer books={this.state.requests} handleClick={this.handleBooks}/>
      </div>
      )
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
          {
            this.state.isOpen ? <Modal modal={this.props.modal} addBook={true} handleClick={this.addBookToCollection} closeModal={this.toggleModal}/> : ""
          }
        </div>
      )
    } else {
      activeComponent = <BookList books={this.props.userLibrary} />
    }

      return (
        <div>
          <Profile />
          <NotificationSystem ref="notificationSystem" />
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

// {this.state.active === "add" && <button onClick={this.addBookToCollection}>Add Book</button>}

const mapStateToProps = (state) => {
  console.log(state, "this is tate on dashboard");
  return {
    books: state.collection,
    modal: state.bookApp.modal,
    user: state.loginReducer.user,
    userLibrary: state.loginReducer.userLibrary
  }
}

let dashBoard = connect(mapStateToProps)(DashBoard);

export default dashBoard;
