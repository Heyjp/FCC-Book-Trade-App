const bookApp = (state = {books: []}, action) => {
  switch (action.type) {
    case "SET_LIBRARY":
      return {
        ...state,
        books: action.collection
      };
    case "SET_MODAL":
      return {
        ...state,
        modal: action.modal
      }
    default:
      return state
  }
}

export default bookApp
