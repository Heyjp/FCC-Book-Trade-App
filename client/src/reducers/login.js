const loginReducer = (state = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null,
  user: false
}, action) => {
  console.log(action, "this is action");
  switch (action.type) {
    case "SET_LOGIN_PENDING":
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });

    case "SET_LOGIN_SUCCESS":
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case "SET_LOGIN_ERROR":
      return Object.assign({}, state, {
        loginError: action.loginError
      });

    case "SET_USER":
      return Object.assign({}, state, {
        user: action.user
      });
    default:
      return state;
  }
}

export default loginReducer;
