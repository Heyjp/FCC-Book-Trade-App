import React from 'react'

import BooksList from '../components/Book.js'

class Main extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      books: [1, 2, 3, 4, 5]
    }
  }


  render () {
    return (
      <div className="main-container">
        <div>
          <p>Main</p>
        </div>
        <BooksList books={this.state.books} />
      </div>
    )
  }

}








export default Main;
