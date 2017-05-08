import React from 'react';

const Book = (props) => (
  <div className="book" onClick={props.handleClick}>
    <h6>Book Title</h6>
    <img src="images/book.jpg" width="150px" height="200px" />
  </div>
)

const BooksList = (props) => {
    return (
      <div className="book-container">
        {props.books.map( (e, i) => (
          <Book key={i} handleClick={props.toggleModal.bind(this, i)}/>
        ))}
      </div>
    )
}

export default BooksList;
