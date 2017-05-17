import React from 'react';
import axios from 'axios';

import BooksList from './Book.js'

export const Profile = () => (
  <div>
    <h1>Profile</h1>
  </div>
)

export const OptionBar = (props) => (
  <div>
    <ul>
      {props.tabs.map(function (e, i) {
        return <li onClick={props.handleClick.bind(this, i)} key={i}>{e}</li>;
      })}
    </ul>
  </div>
)

export const AddBooks = (props) => (
  <div>
    <h4>Add Book</h4>
    <div>
      <input type="text" placeholder="Book Title" value={props.title} onChange={props.updateTitle}/>
      <input type="text" placeholder="Author" value={props.author} onChange={props.updateAuthor}/>
      <button onClick={props.submitBook}>Submit</button>
      </div>
  </div>
)

export const RequestTab = (props) => (
  <div>
    <h4>Requests</h4>
    {props.books.length > 1 && <BooksList books={props.books} />}
    {props.books.length > 1 && <BooksList books={props.books} />}
  </div>
)
