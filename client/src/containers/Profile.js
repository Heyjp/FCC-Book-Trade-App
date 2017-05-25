import React from 'react'
import axios from 'axios'

import {connect} from 'react-redux'
import {setProfile} from '../actions/user.js'

import Details from '../components/Details.js'

class ProfileContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      fields: ["Name", "City", "State"],
      Name: "",
      City: "",
      State: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearState = this.clearState.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
  }
  componentWillMount () {
    // API request to get initial profile info from server
    this.getUserDetails();
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps, "nextProps on Profile.js")
  }

  clearState () {
    this.setState({
      Name: "",
      City: "",
      State: ""
    })
  }

  // Run to get initial Name, City & State values
  getUserDetails () {
    let self = this;
    axios.get(`/api/get-profile?username=${this.props.User}`)
      .then(function (res) {
        let profile = res.data;
        delete profile._id;
        // sets initial profile
        self.props.dispatch(setProfile(profile));
      })
  }

  handleClick (ele) {
    if (this.state.active === ele) {
      this.setState({
        active: false
      })
    } else {
      this.setState({
        active: ele
      })
    }
  }


  handleChange (category, e) {
    // Take input values from form and create a new object with values to place on state
    let newState = {};
    newState[category] = e.target.value;
    this.setState(newState);
  }


  handleSubmit (category) {
    let self = this;
    // Take Persons details from state
    // Place into a single object for server
    let data = {};
    data[category] = this.state[category]

    console.log(data, "this is data on handlesubmit")

    // Send details to server to be handled
    axios.post('/api/update-profile', data)
      .then(function (res) {
        console.log(res, "this is res on update-profile")
        self.props.dispatch(setProfile(res.data));
        self.clearState();
      })
  }


  render () {
    if (!this.props.Profile) {
      return (<div>""</div>)
    }

    // For tracking input values on Details
    let inputValues ={
      Name: this.state.Name,
      City: this.state.City,
      State: this.state.State
    }

    return (
      <div>
        <h4>Profile</h4>
        <Details
        inputValues={inputValues}
        userProfile={this.props.Profile}
        fields={this.state.fields}
        active={this.state.active}
        handleClick={this.handleClick}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
         />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    Profile: state.userReducer.Profile,
    User: state.loginReducer.user
  }
}

let Profile = connect(mapStateToProps)(ProfileContainer);

export default Profile;
