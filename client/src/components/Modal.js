import React from 'react';


const Modal = (props) => {
  console.log(props, "this is props on Modal");
  let self = this;
  return (
  <div className="modal" onClick={props.closeModal.bind(this)}>
    <div className="inner-box">
      <h4>{props.modal.title}</h4>
      <img src={props.modal.image} width="100px" height="150px;" />
      <div>
        <ul>
          <li><a onClick={props.handleClick.bind(this, "accept")} >Request Book</a></li>
          <li><a onClick={props.handleClick.bind(this, "cancel")}>Cancel Request</a></li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Modal;


// onClick={props.reqBook.bind(this, props.modal)}
