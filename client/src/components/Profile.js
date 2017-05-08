import React from 'react';

export const Profile = () => (
  <div>
    <h1>Profile</h1>
  </div>
)

/*
<ul>
  <li onClick={props.handleClick.bind(this, "request")}>Book Requests</li>
  <li onClick={props.handleClick.bind(this, "add")}>Add Books to Library</li>
  <li onClick={props.handleClick.bind(this, "current")}>Current Library</li>
</ul>
*/

export const OptionBar = (props) => (
  <div>
    <ul>
      {props.tabs.map(function (e, i) {
        console.log(e, i, "this is probs.tabs");
        return <li onClick={props.handleClick.bind(this, i)}>{e}</li>
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

export const CurrentBooks = () => (
  <div>
    <h4>Current Books</h4>
    <ul>
      <li>Book</li>
      <li>Book</li>
      <li>Book</li>
      <li>Book</li>
    </ul>
  </div>
)

export const AddBooks = () => (
  <div>
    <h4>Add Book</h4>
    <div>
      <input type="text" placeholder="search" />
      <button>Submit</button>
      </div>
  </div>
)
