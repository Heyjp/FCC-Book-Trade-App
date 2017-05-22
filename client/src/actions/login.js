import axios from 'axios';

const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const SET_USER = 'SET_USER';
const SET_USER_LIBRARY = 'SET_USER_LIBRARY';
const SET_REQUEST_MODAL = "SET_REQUEST_MODAL";

export function setUser(user) {
  return {
    type: SET_USER,
    user
  };
}

export function setUserLibrary(userLibrary) {
  return {
    type: SET_USER_LIBRARY,
    userLibrary
  };
}

export function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}

export function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

export function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError: loginError
  }
}

export function setReqModal(requestModal) {
  console.log(requestModal, "this is action setReqModal")
  return {
    type: SET_REQUEST_MODAL,
    requestModal
  };
}
