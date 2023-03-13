import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userSignupReducer,
} from "./reducer/userReducer/userReducer";
import thunk from "redux-thunk";
import { filterChangeReducer } from "./reducer/filterChange/filterChange";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  filterChange: filterChangeReducer,
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
