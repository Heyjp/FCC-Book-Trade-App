const bookApp = (state = {books: []}, action) => {
  switch (action.type) {
    case "SET_LIBRARY":
      console.log("setting library")
      return {
        ...state,
        books: action.collection
      };
    case "SET_MODAL":
      return {
        ...state,
        modal: action.modal
      }
    case "SET_USER_LIBRARY":
      return {
        ...state,
        userLibrary: action.userLibrary
      }
    default:
      return state
  }
}

export default bookApp
