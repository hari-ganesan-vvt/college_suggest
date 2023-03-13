import user from "../../../models/user.model";

//login
export const userLogin = (phoneNumber) => async (dispatch) => {
  try {
    const { data } = await user.userLogin(phoneNumber);
    // console.log(data);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//otpcheck
export const userVerifyOtp = (otp) => async (dispatch) => {
  try {
    const { data } = await user.userVerifyOtp(otp);
    dispatch({ type: "USER_OTP_VERIFY", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: "USER_OTP_FAIL",
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

//logout
export const userLogout = (userId) => async (dispatch) => {
  try {
    const { data } = await user.userLogout(userId);
    localStorage.removeItem("userInfo");
    dispatch({ type: "USER_LOGOUT", payload: data });
  } catch (error) {
    console.log(error);
  }
};

//signup
export const userSignup = (name, email, mobile) => async (dispatch) => {
  try {
    const { data } = await user.userSignup(name, email, mobile);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
