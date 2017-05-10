import React from 'react';

const Form = (props) => (
  <div>
    <h2>Login</h2>
      <form onSubmit={props.submit}>
          <div>
              <label>Username:</label>
              <input type="text" name="username" onChange={props.user}/>
          </div>
          <div>
              <label>Password:</label>
              <input type="password" name="password" onChange={props.pass}/>
          </div>
          <div>
              <input type="submit" value="Log In"/>
          </div>
      </form>
  </div>
)

export default Form;
