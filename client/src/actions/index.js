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
