import user from "../../models/user.model";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_OTP_VERIFY,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../Constants/UserConstants";

//login
export const userLogin = (phoneNumber) => async (dispatch) => {
  try {
    const { data } = await user.userLogin(phoneNumber);
    dispatch({ type: USER_LOGIN_REQUEST, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL,
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
    dispatch({ type: USER_OTP_VERIFY, payload: data });
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
    dispatch({ type: USER_LOGOUT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

//signup
export const userSignup = (name, email, mobile) => async (dispatch) => {
  try {
    const { data } = await user.userSignup(name, email, mobile);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
