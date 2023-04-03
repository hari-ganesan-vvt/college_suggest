import user from "../../models/userModel";
import {
  USER_LOGIN_SUCCESS,
  USER_GOOGLE_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_OTP_VERIFY,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_REGISTER_REQUEST,
} from "../Constants/UserConstants";

//login
export const userLogin = (phoneNumber) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    await user.userLogin(phoneNumber);
    dispatch({ type: USER_LOGIN_SUCCESS });
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

export const userGoogleLogin = (data) => async (dispatch) => {
  dispatch({ type: USER_GOOGLE_LOGIN, payload: data });
  localStorage.setItem("userInfo", JSON.stringify(data));
};

//otpcheck
export const userVerifyOtp = (otp) => async (dispatch) => {
  try {
    const { data } = await user.userVerifyOtp(otp);
    dispatch({ type: USER_OTP_VERIFY, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error);
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
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await user.userSignup(name, email, mobile);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
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
