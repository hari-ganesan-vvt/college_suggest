import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userGoogleLogin,
  userLogin,
  userSignup,
  userVerifyOtp,
} from "../redux/Action/userAction";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useGoogleLogin } from "@react-oauth/google";
import Assets from "../imports/assets.imports";
import axios from "axios";

const LoginSidebar = () => {
  const dispatch = useDispatch();

  const userLoginInfo = useSelector((state) => state.userLogin);
  const { loading } = userLoginInfo;

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  //signup
  const handleSignup = (e) => {
    e.preventDefault();
    if (username === "" || email === "" || mobile === "") {
      toast.error("Field is required");
    } else {
      dispatch(userSignup(username, email, mobile));
      dispatch(userLogin(mobile));
      setTimeout(() => {
        setShowOtp(true);
        setUserName("");
        setEmail("");
        setMobile("");
      }, 3000);
    }
  };

  //login
  const handleLogin = (e) => {
    e.preventDefault();
    if (phoneNumber === "") {
      toast.error("Mobile is required");
    } else {
      dispatch(userLogin(phoneNumber));
      setTimeout(() => {
        toast.success("OTP Send");
        setShowOtp(true);
        setPhoneNumber("");
      }, 3000);
    }
  };

  //verifyOTP
  const handleverifyOTP = (e) => {
    e.preventDefault();
    if (otp === "") {
      toast.error("Please Enter the OTP");
    } else {
      dispatch(userVerifyOtp(otp));
      setTimeout(() => {
        setShowOtp(false);
        setOtp("");
      }, 3000);
    }
  };

  //googleLogin
  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          dispatch(userGoogleLogin(res.data));
          // setTimeout(() => {
          //   // window.location.reload(true);
          // }, 2000);
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <div
      className="offcanvas offcanvas-end customlog-modal"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <button
          type="button"
          className="btn-close d-blok ms-auto"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="d-block">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item w-50" role="presentation">
              <button
                className="nav-link navlinkcustom active w-100"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#loginbx"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Login
              </button>
            </li>
            <li className="nav-item w-50" role="presentation">
              <button
                className="nav-link navlinkcustom w-100"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#signupbx"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Signup
              </button>
            </li>
          </ul>
        </div>

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="loginbx"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabIndex="0"
          >
            {showOtp ? (
              <form className="d-block w-100" onSubmit={handleverifyOTP}>
                <div className="siderbarform">
                  <div className="form-row">
                    <label htmlFor="#">OTP Number</label>
                    <input
                      type="text"
                      placeholder="Enter Your OTP Here.."
                      value={otp}
                      name="otp"
                      onChange={(e) =>
                        setOtp(
                          e.target.value
                            .replace(/[^0-9.]/g, "")
                            .replace(/(\..*)\./g, "$1")
                        )
                      }
                      maxLength="6"
                      minLength="6"
                    />
                  </div>

                  <div className="mt-3">Resend OTP</div>
                  <button
                    type="submit"
                    className="clg-sug-primebtn w-100"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                  >
                    Submit
                  </button>
                </div>
              </form>
            ) : (
              <>
                <form
                  action="#"
                  className="d-block w-100"
                  onSubmit={handleLogin}
                >
                  <div className="siderbarform">
                    <div className="form-row">
                      <label htmlFor="#">Phone Number</label>
                      <input
                        type="text"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        name="phoneNumber"
                        onChange={(e) =>
                          setPhoneNumber(
                            e.target.value
                              .replace(/[^0-9.]/g, "")
                              .replace(/(\..*)\./g, "$1")
                          )
                        }
                        maxLength="10"
                        minLength="10"
                      />
                    </div>
                    <button type="submit" className="clg-sug-primebtn w-100">
                      {loading ? <BeatLoader color="#ffffff" /> : "Login"}
                    </button>
                  </div>
                </form>

                <div className="d-flex justify-content-center align-items-center mt-2">
                  <a className="socialicn-links">
                    <img
                      src={Assets.googleIcon}
                      alt="google images"
                      onClick={() => googleLogin()}
                    />
                  </a>

                  <a href="#" className="socialicn-links">
                    <img src={Assets.facebookIcon} alt="facbook images" />
                  </a>
                </div>
              </>
            )}
          </div>

          <div
            className="tab-pane fade"
            id="signupbx"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabIndex="0"
          >
            {showOtp ? (
              <form className="d-block w-100" onSubmit={handleverifyOTP}>
                <div className="siderbarform">
                  <div className="form-row">
                    <label htmlFor="#">OTP Number</label>
                    <input
                      type="text"
                      placeholder="Enter Your OTP Here.."
                      value={otp}
                      name="otp"
                      onChange={(e) =>
                        setOtp(
                          e.target.value
                            .replace(/[^0-9.]/g, "")
                            .replace(/(\..*)\./g, "$1")
                        )
                      }
                      maxLength="6"
                      minLength="6"
                    />
                  </div>

                  <div className="mt-3">Resend OTP</div>
                  <button
                    type="submit"
                    className="clg-sug-primebtn w-100"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                  >
                    Submit
                  </button>
                </div>
              </form>
            ) : (
              <form
                action="#"
                className="d-block w-100"
                onSubmit={handleSignup}
              >
                <div className="siderbarform">
                  <div className="form-row">
                    <label htmlFor="#">Username</label>
                    <input
                      type="text"
                      placeholder="Name"
                      name="username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>

                  <div className="form-row">
                    <label htmlFor="#">Mobile Number</label>
                    <input
                      type="text"
                      placeholder="Contact number"
                      name="mobile"
                      value={mobile}
                      onChange={(e) =>
                        setMobile(
                          e.target.value
                            .replace(/[^0-9.]/g, "")
                            .replace(/(\..*)\./g, "$1")
                        )
                      }
                      minLength="10"
                      maxLength="10"
                    />
                  </div>

                  <div className="form-row">
                    <label htmlFor="#">Email</label>
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="clg-sug-primebtn w-100">
                    {loading ? <BeatLoader color="#ffffff" /> : "Signup"}
                  </button>
                </div>
              </form>
            )}

            <div className="d-flex justify-content-center align-items-center mt-2">
              <a className="socialicn-links" onClick={() => googleLogin()}>
                <img src={Assets.googleIcon} alt="google images" />
              </a>

              <a href="#" className="socialicn-links">
                <img src={Assets.facebookIcon} alt="facbook images" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSidebar;
