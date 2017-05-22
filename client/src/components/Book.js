import React from 'react';

const Book = (props) => (
  <div className="book" onClick={props.handleClick}>
    <h6>{props.book.title}</h6>
    <img src={props.book.image} width="150px" height="200px" />
  </div>
)

const BooksList = (props) => {
  if (props.handleClick && !props.cancelClick) {
    return (
      <div className="book-container">
        {props.books.map( (e, i) => (
          <Book key={i} book={e} handleClick={props.handleClick.bind(this, e, i)}/>
        ))}
      </div>
    )
  } else {
      return  (
        <div className="book-container">
          {props.books.map( (e, i) => (<Book key={i} book={e}/>))}
        </div>
      )
    }
}

export default BooksList;
