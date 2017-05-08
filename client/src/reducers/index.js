const bookApp = (state = {}, action) => {
  switch (action.type) {
    case "SET_LIBRARY":
      return {
        books: action.collection
      }
    default:
      return state
  }
}

export default bookApp
