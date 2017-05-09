import React from 'react';

const Book = (props) => (
  <div className="book" onClick={props.handleClick}>
    <h6>{props.book.bookTitle}</h6>
    <img src={props.book.BookImg} width="150px" height="200px" />
  </div>
)

const BooksList = (props) => {
    return (
      <div className="book-container">
        {props.books.map( (e, i) => (
          <Book key={i} book={e} handleClick={props.toggleModal.bind(this, e, i)}/>
        ))}
      </div>
    )
}

export default BooksList;
