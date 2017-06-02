import React from 'react';
import axios from 'axios'
import {connect} from 'react-redux';

import {setReqModal} from "../actions/login.js";
import {setModal} from '../actions/index.js'

import {RequestTab} from '../components/Profile.js'
import Modal from '../components/Modal.js'


class RequestContainer extends React.Component {

  constructor(props) {
    super(props);

    this.handleReq = this.handleReq.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      isOpen: false
    }
  }

  // Make 3 requests, accept and reject incoming requests
  // Cancel outgoing requests
  handleReq (option, e) {
    e.stopPropagation();
    let data = this.props.modal
    let user = this.props.user

    option === "accept" ? axios.post(`/api/accept-trade?user=${user}`, data)
      .then(function (res) {
        console.log(res, "this is res");
      })
    :
      axios.post(`/api/cancel-trade?user=${user}`, data)
        .then(function (res) {
          console.log(res, "this is res");
        })
  }

  toggleModal (e) {
    this.state.isOpen ? this.setState({
      isOpen: false
    }) :
    this.setState({
      isOpen: true
    })
  }

  handleClick (modal) {
    console.log("handleClick requestContainer", modal)
    this.props.dispatch(setReqModal(modal))
    this.toggleModal();
  }

  render () {
    let isActive = this.state.isOpen
    let acceptOrCancel = this.props.modal === this.props.user
    return (
      <div>
        <RequestTab
          books={this.props.books}
          handleClick={this.handleClick}
        />
          {isActive && <Modal              
                        modal={this.props.modal}
                        closeModal={this.toggleModal}
                        handleClick={this.handleReq}
                        owner={acceptOrCancel}
                         /> }
      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
    modal: state.loginReducer.requestModal
  }
}

let Container = connect(mapStateToProps)(RequestContainer)



export default Container;
