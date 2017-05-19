import React from 'react';
import axios from 'axios'

import {connect} from 'react-redux';

import {RequestTab} from '../components/Profile.js'

class RequestContainer extends React.Component {

  constructor(props) {
    super(props);
    console.log(props, "this is props on requestcontainer");

    this.acceptTrade = this.acceptTrade.bind(this);
  }

  // Make 3 requests, accept and reject incoming requests
  // Cancel outgoing requests
  acceptTrade (data) {
    console.log(data, "this is data on accepttrade");
    let user = this.props.user
    axios.post(`/api/accept-trade?user=${user}`, data)
      .then(function (res) {
        console.log(res, "this is res");
      })
  }

  rejectTrade (data) {

  }

  cancelBookRequest (data) {

  }

  render () {
    return (
      <div>
        <RequestTab
          books={this.props.books}
          acceptTrade={this.acceptTrade}
          rejectTrade={this.rejectTrade}
          cancelReq={this.cancelBookRequest}
          />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  console.log(state, "this is state on mainjs")
  return {
    user: state.loginReducer.user
  }
}

let Container = connect(mapStateToProps)(RequestContainer)



export default Container;
