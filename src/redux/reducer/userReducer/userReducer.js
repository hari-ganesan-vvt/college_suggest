export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_SUCCESS":
      return { user: action.payload };
    case "USER_LOGOUT_FAIL":
      return { error: action.payload };
    case "USER_OTP_VERIFY":
      return { isLoggedIn: true, userInfo: action.payload };
    case "USER_LOGOUT":
      return { isLoggedIn: false, userInfo: null };
    default:
      return state;
  }
};

export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_SUCCESS":
      return { userInfo: action.payload };
    case "USER_REGISTER_FAIL":
      return { error: action.payload };

    default:
      return state;
  }
};
