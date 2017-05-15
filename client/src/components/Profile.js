import React from 'react';
import axios from 'axios';

export const Profile = () => (
  <div>
    <h1>Profile</h1>
  </div>
)

export const OptionBar = (props) => (
  <div>
    <ul>
      {props.tabs.map(function (e, i) {
        return <li onClick={props.handleClick.bind(this, i)} key={i}>{e}</li>
      })}
    </ul>
  </div>
)

export const RequestTab = () => (
  <div>
    <h4>Requests</h4>
    <ul>
      <li>Book</li>
      <li>Book</li>
      <li>Book</li>
      <li>Book</li>
    </ul>
  </div>
)

export const CurrentBooks = (props) => (
  <div>
    <h4>Current Books</h4>
    <ul>
      {props.books.map(function (e) {
        return <li>{e}</li>
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
