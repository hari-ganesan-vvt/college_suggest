import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userSignupReducer } from "./reducer/userReducer";
import { filterChangeReducer } from "./reducer/filterChangeReducer";
import { compareReducer } from "./reducer/compareReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  filterChange: filterChangeReducer,
  compare: compareReducer,
});

const compareItemsFromLocalStorage = localStorage.getItem("compareItems")
  ? JSON.parse(localStorage.getItem("compareItems"))
  : [];

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  compare: {
    compareItem: compareItemsFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
