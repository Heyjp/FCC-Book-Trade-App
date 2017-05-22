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
        {props.books.inc.length >= 1 && <div>
          <h6>Incoming Requests</h6>
          <BooksList
            books={props.books.inc}
            key={1}
            handleClick={props.handleClick}
          />
         </div>
       }
        {props.books.out.length >= 1 && <div>
                                          <h6>Requested Trades</h6>
                                          <BooksList
                                            books={props.books.out}
                                            key={2}
                                            handleClick={props.handleClick}
                                            />
                                        </div>
        }
    </div>
  )
