import React from 'react';


const Modal = (props) => {
  return (
  <div className="modal" onClick={props.closeModal.bind(this)}>
    <div className="inner-box">
      <h4>{props.modal.bookTitle}</h4>
      <img src={props.modal.BookImg} width="100px" height="150px;" />
      <div>
        <ul>
          <li><a onClick={props.reqBook.bind(this, props.modal)}>Request Book</a></li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Modal;
