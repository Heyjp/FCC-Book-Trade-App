import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import BooksList from '../components/Book.js'
import Modal from '../components/Modal.js'

import {setLibrary, setModal} from '../actions/index.js'


class Main extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      books: [],
      isOpen: false,
      modal: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getBooks = this.getBooks.bind(this);
  }

  componentWillMount () {
    this.getBooks();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      books: nextProps.books,
      modal: nextProps.modal
    })
  }

  getBooks () {
    let self = this;
    axios.get('/api/books')
      .then(function (res) {
        self.props.dispatch(setLibrary(res.data))
      }).catch(function (err) {
        console.log(err, "this is err");
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

  handleClick (modal) {
    this.props.dispatch(setModal(modal))
    this.toggleModal();
  }

  requestBook (object, e) {
    e.stopPropagation();
    axios.post('/api/request', object)
      .then(function (res) {
        console.log(res, "this is res on requestBook")
      })
  }

  render () {
    return (
      <div className="main-container">
        <div>
          <p>Main</p>
        </div>
        <BooksList books={this.state.books} toggleModal={this.handleClick} />
        {
          this.state.isOpen ? <Modal modal={this.props.modal} reqBook={this.requestBook} closeModal={this.toggleModal}/> : ""
        }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    books: state.bookApp.books,
    modal: state.bookApp.modal
  }
}

let main = connect(mapStateToProps)(Main)

export default main;
