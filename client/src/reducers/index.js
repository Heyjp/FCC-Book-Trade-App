import { combineReducers } from 'redux'

import loginReducer from './login'
import bookApp from './main'
import userReducer from './user'

const bookClub = combineReducers({
  loginReducer,
  bookApp,
  userReducer
})

export default bookClub;
