import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import phones from './phones';
import phonesPage from './phonesPage'
import phonePage from './phonePage'

export default history => {
  return  combineReducers({
    router: connectRouter(history),
    phones,
    phonesPage,
    phonePage
  })
}

