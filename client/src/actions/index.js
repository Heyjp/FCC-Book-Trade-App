export const setLibrary = (collection) => {
  return {
    type: 'SET_LIBRARY',
    collection
  }
}

export const setUserLibrary = (userLibrary) => {
  return {
    type: 'SET_LIBRARY',
    userLibrary
  }
}

export const setModal = (modal) => {
  return {
    type: "SET_MODAL",
    modal
  }
}

export const setRequests = (requests) => {
  return {
    type: "SET_REQUESTS",
    requests
  }
}

export const cancelRequest = (book) => {
  return {
    type: "CANCEL_REQUEST",
    book
  }
}

export const userLogout = () => {
  return {
    type: 'USER_LOGOUT'
  }
}
