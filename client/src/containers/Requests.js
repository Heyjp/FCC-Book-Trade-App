import React from 'react';

import {RequestTab} from '../components/Profile.js'

class RequestContainer extends React.Component {

  constructor(props) {
    super(props);

    console.log(props, "this is props on requestcontainer")
  }



  render () {
    return (
      <div>
        <RequestTab books={this.props.books} />
      </div>
    )
  }

}


export default RequestContainer;
