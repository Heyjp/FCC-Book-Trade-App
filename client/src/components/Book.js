import React from 'react';

const Book = () => (
  <div className="book">
    <h6>Book Title</h6>
    <img src="images/book.jpg" width="150px" height="200px" />
  </div>
)

const BooksList = (props) => {
    return (
      <div className="book-container">
        {props.books.map( (e) => (
          <Book />
        ))}
      </div>
    )
}

export default BooksList;
