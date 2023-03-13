import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdPerson,
  MdDashboard,
  MdOutlineArrowDropDown,
  MdOutlineExpandMore,
  MdStar,
  MdNotifications,
  MdVpnKey,
  MdOutlineLogout,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/Action/userAction/userAction";
import { toast } from "react-toastify";
import LoginSidebar from "../loginSidebar/LoginSidebar";
import user from "../../models/user.model";
import Assets from "../../imports/assets.imports";

const Navbar = () => {
  const dispatch = useDispatch();
  const menuRef = useRef();

  const userAuth = useSelector((state) => state.userLogin);
  const [profileShow, setProfileShow] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const { userInfo } = userAuth;

  //getUserDetails
  const getUserDetails = async () => {
    try {
      const { data } = await user.userDetails(userInfo?.userId);
      setUserDetails(data.userDetails);
    } catch (error) {
      console.log(error);
    }
  };

  //logout
  const handleLogout = () => {
    const { userId } = userInfo;
    dispatch(userLogout(userId));
    toast.success("Logout Successfull");
  };

  useEffect(() => {
    getUserDetails();
  }, [userInfo]);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setProfileShow(false);
        console.log();
      }
    };

    window.addEventListener("mousedown", handler);
    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <nav>
      <header>
        <div className="container">
          <div className="nav_warp">
            <Link to="/" className="logo_bx">
              <img src={Assets.Logo} alt="top logo" />
            </Link>
            <div className="nav_links_warp">
              <ul className="nav_underlist">
                <li className="nav_list_block">
                  <Link to="/" className="nav__link">
                    Home
                  </Link>
                </li>
                <li className="nav_list_block">
                  <Link to="" className="nav__link">
                    Engineering
                    <MdOutlineExpandMore className="arrowup" />
                  </Link>
                  <ul className="megamenu">
                    <li>
                      <Link
                        to=""
                        href="https://cs.collegesuggest.com/engineering/top-10-iit-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 IIT Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-nit-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 NIT Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-iiit-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 IIIT Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-gfti-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 GFTI Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-government-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 Government Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-private-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 Private Colleges in india
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav_list_block">
                  <Link href="#" className="nav__link">
                    Medical
                    <MdOutlineExpandMore className="arrowup" />
                  </Link>
                  <ul className="megamenu">
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-iit-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 IIT Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-nit-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 NIT Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-iiit-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 IIIT Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-gfti-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 GFTI Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-government-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 Government Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-private-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 Private Colleges in india
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav_list_block">
                  <Link href="#" className="nav__link">
                    Dental <MdOutlineExpandMore className="arrowup" />
                  </Link>
                  <ul className="megamenu">
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-iit-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 IIT Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-nit-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 NIT Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-iiit-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 IIIT Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-gfti-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 GFTI Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-government-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 Government Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-private-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 Private Colleges in india
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav_list_block">
                  <Link href="#" className="nav__link">
                    Architecture
                    <MdOutlineExpandMore className="arrowup" />
                  </Link>
                  <ul className="megamenu">
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-iit-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 IIT Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-nit-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 NIT Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-iiit-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 IIIT Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-gfti-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 GFTI Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-government-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 Government Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-private-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 Private Colleges in india
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav_list_block">
                  <Link href="#" className="nav__link">
                    Pharmacy
                    <MdOutlineExpandMore className="arrowup" />
                  </Link>
                  <ul className="megamenu">
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-iit-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 IIT Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-nit-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 NIT Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-iiit-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 IIIT Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-gfti-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 GFTI Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://cs.collegesuggest.com/engineering/top-10-government-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 Government Colleges in india
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="nav__link"
                        href="https://cs.collegesuggest.com/engineering/top-10-private-engineering-colleges-in-india.html"
                        id="topiit"
                      >
                        Top 10 Private Colleges in india
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav_list_block">
                  <Link href="#" className="nav__link">
                    Exam
                  </Link>
                </li>
                <li className="nav_list_block">
                  <Link to="/predictor" className="nav__link">
                    Predictions
                  </Link>
                </li>
              </ul>
            </div>

            {userInfo ? (
              <div
                className="toplinks"
                onClick={() => setProfileShow(!profileShow)}
                ref={menuRef}
              >
                <div className="rio-ulogin">
                  <div className="us_img hid">
                    <img
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80"
                      alt=""
                    />
                  </div>
                  <div className="pname user-profile hiddenname">
                    <div className="d-flex align-items-center">
                      <span className="uname">{userDetails[0]?.name}</span>
                      <MdOutlineArrowDropDown className="material-icons" />
                    </div>
                  </div>

                  <div
                    className={
                      profileShow
                        ? "user-dropdown user-show active"
                        : "user-dropdown user-show"
                    }
                  >
                    <div className="m-pthumb">
                      <span className="ipc -in">
                        <div className="us_img">
                          <img
                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80"
                            alt=""
                          />
                        </div>
                        <em>{userDetails[0]?.name}</em>
                      </span>
                    </div>
                    <ul className="dropcontent">
                      <li className="droplist">
                        <Link to="">
                          <MdDashboard className="material-icons" /> Predictor
                          Dashboard
                        </Link>
                      </li>
                      <li className="droplist">
                        <Link to="/profile">
                          <MdPerson className="material-icons" /> My Account
                        </Link>
                      </li>
                      <li className="droplist">
                        <a href="https://collegesuggest.com/bookmarks.html">
                          <MdStar className="material-icons" />
                          Bookmark
                        </a>
                      </li>
                      <li className="droplist">
                        <a href="https://collegesuggest.com/notification.html">
                          <MdNotifications className="material-icons" />
                          Notification
                        </a>
                      </li>
                      <li className="droplist">
                        <a href="https://collegesuggest.com/changepassword.html">
                          <MdVpnKey className="material-icons" />
                          Change Password
                        </a>
                      </li>
                      <li
                        className="droplist"
                        onClick={() => setProfileShow(false)}
                      >
                        <button
                          href="#"
                          type="submit"
                          className="d-flex link mg-g"
                          onClick={handleLogout}
                        >
                          <MdOutlineLogout className="material-icons" />
                          Logout
                        </button>
                        {/* <form id="id0005">
                          <input type="hidden" name="stud_id" value="453" />
                          <button
                            href="#"
                            type="submit"
                            className="d-flex link mg-g"
                            onClick={handleLogout}
                          >
                            <MdOutlineLogout className="material-icons" />
                            Logout
                          </button>
                        </form> */}
                      </li>
                    </ul>
                  </div>
                </div>
                <span className="more-vert mob user-profile ms-1">
                  <MdPerson className="material-icons" />
                </span>
              </div>
            ) : (
              <button
                className="clg-sug-primebtn"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                Sign in/Sign up
              </button>
            )}
          </div>
        </div>
      </header>
      <LoginSidebar />
    </nav>
  );
};

export default Navbar;
