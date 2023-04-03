import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userSignupReducer } from "./reducer/userReducer";
import { filterChangeReducer } from "./reducer/filterChangeReducer";
import { addRemovecompareReducer } from "./reducer/compareReducer";
import { addRemoveBookMarkReducer } from "./reducer/bookMarkReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  filterChange: filterChangeReducer,
  compareList: addRemovecompareReducer,
  bookMarkList: addRemoveBookMarkReducer,
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
