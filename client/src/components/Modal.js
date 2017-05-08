import React from 'react';


const Modal = (props) => (
  <div className="modal" onClick={props.closeModal}>
    <div className="inner-box">
      <h1>new modal</h1>
    </div>
  </div>
)

export default Modal;
