import React from 'react'

import BooksList from '../components/Book.js'
import Modal from '../components/Modal.js'

class Main extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      books: [1, 2, 3, 4, 5],
      isOpen: false,

    }

    this.handleClick = this.handleClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal () {
    this.setState({
      isOpen: false
    })
  }

  handleClick (props) {
      console.log(props, "this is props on handleClick")
     this.state.isOpen ? this.setState({
       isOpen: false
     }) :
     this.setState({
       isOpen: true
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
          this.state.isOpen ? <Modal closeModal={this.closeModal}/> : ""
        }
      </div>
    )
  }

}

export default Main;
