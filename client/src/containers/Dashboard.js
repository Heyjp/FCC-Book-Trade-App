import React from 'react';

import { Profile, CurrentBooks, RequestTab, OptionBar, AddBooks } from '../components/Profile.js'

class DashBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      tabs: ['current', 'request', 'add']
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (i) {
    console.log("this is e", i);
    let result = this.state.tabs[i];
    this.setState({
      active: result
    })
  }

  render() {

    let activeComponent;

    if (!this.state.active) {
      activeComponent = <CurrentBooks />
    } else if (this.state.active === "current") {
      activeComponent = <CurrentBooks />
    } else if (this.state.active === "request") {
      activeComponent = <RequestTab />
    } else if (this.state.active === "add") {
      activeComponent = <AddBooks />
    } else {
      activeComponent = <CurrentBooks />
    }

      return (
        <div>
          <Profile />
          <div>
            <div>
              <OptionBar tabs={this.state.tabs} handleClick={this.handleClick} />
              <div>
                {activeComponent}
              </div>
            </div>
          </div>
        </div>
      )
    }

}
export default DashBoard;
