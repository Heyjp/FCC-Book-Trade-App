import { combineReducers } from 'redux'
import loginReducer from './login'
import bookApp from './main'

const bookClub = combineReducers({
  loginReducer,
  bookApp
})

export default bookClub;
