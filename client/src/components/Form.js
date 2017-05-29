import React from 'react';

const Form = (props) => {
  console.log(props, "moose")
  return (
    <div>
      <h2>{props.route}</h2>
        <form onSubmit={props.submit}>
            <div>
                <label>Username:</label>
                <input type="text" name="username" value={props.username} onChange={props.user}/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={props.password} onChange={props.pass}/>
            </div>
            <div>
                <input type="submit" value="Log In"/>
            </div>
        </form>
    </div>
  )
}

export default Form;
