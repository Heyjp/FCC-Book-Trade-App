import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'

import loginAuth from '../actions/login.js'

import { Profile, CurrentBooks, RequestTab, OptionBar, AddBooks } from '../components/Profile.js';
import BookList from '../components/Book.js';


class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      active: false,
      tabs: ['current', 'request', 'add'],
      title: '',
      author: '',
      searchResults: []
    }

    this.handleClick = this.handleClick.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateAuthor = this.updateAuthor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit () {
    console.log("handling submit")
    let self = this;
    const {title, author} = this.state;
    axios.post('/api/book-search', {title, author})
    .then(function (res) {
      console.log(res);
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
      activeComponent = <CurrentBooks />
    } else if (this.state.active === "current") {
      activeComponent = <CurrentBooks />
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
      activeComponent = <CurrentBooks />
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
  return {
    books: state.collection
  }
}

let dashBoard = connect(mapStateToProps)(DashBoard);

export default dashBoard;
