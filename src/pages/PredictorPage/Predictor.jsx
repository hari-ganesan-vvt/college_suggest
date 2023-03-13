import React, { useEffect } from "react";
import LoginSidebar from "../../components/loginSidebar/LoginSidebar";
import Modal from "../../components/predictorLayout/Modal";
import Form from "../../components/predictorLayout/Form";
import Assets from "../../imports/assets.imports";

const Predictor = () => {
  useEffect(() => {
    sessionStorage.removeItem("_values");
  }, []);
  return (
    <div className="predictor">
      <section className="hero_sec clg-sugg_green">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-6 col-sm-12">
              <div className="d-block heroleftcon">
                <h1 className="text-white mobile_youtubebtnrel">
                  Predictor for JEE Main College
                  <svg
                    data-bs-toggle="modal"
                    href="#exampleModalToggleutube"
                    className="mobile_youtubebtn"
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="none"
                  >
                    <circle cx="16.5" cy="16.5" r="16.5" fill="white" />
                    <g clipPath="url(#clip0_172_602)">
                      <path
                        d="M25.5804 12.0276C25.4714 11.6357 25.2588 11.2784 24.9638 10.9913C24.6688 10.7042 24.3016 10.4974 23.8989 10.3913C22.4245 10 16.4904 10 16.4904 10C16.4904 10 10.556 10.0118 9.08155 10.4031C8.67881 10.5092 8.31164 10.7161 8.01662 11.0032C7.7216 11.2903 7.50902 11.6476 7.40005 12.0396C6.95407 14.5889 6.78107 18.4734 7.4123 20.9207C7.52128 21.3126 7.73386 21.6699 8.02888 21.957C8.3239 22.2441 8.69106 22.451 9.0938 22.5571C10.5682 22.9484 16.5025 22.9484 16.5025 22.9484C16.5025 22.9484 22.4366 22.9484 23.911 22.5571C24.3137 22.451 24.6809 22.2441 24.9759 21.957C25.271 21.6699 25.4836 21.3126 25.5926 20.9207C26.063 18.3678 26.2079 14.4857 25.5804 12.0277V12.0276Z"
                        fill="#FF0000"
                      />
                      <path
                        d="M14.6016 19.2488L19.5243 16.4742L14.6016 13.6995V19.2488Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_172_602">
                        <rect
                          x="7"
                          y="10"
                          width="19"
                          height="13"
                          rx="4"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </h1>

                {/* <!-- newly-added--hero-list-here --> */}
                <div className="heroulistbx" id="heroulist-bx">
                  <ul>
                    <li>
                      Find Your Dream Institution with Our Easy-to-Use predictor
                      Tool.
                    </li>
                    <li>
                      Predict Your Chances of Admission Based on Rank, Home
                      State, Gender, and Category.
                    </li>
                    <li>
                      Prestigious universities like NITs, IIITs, and CFTIs are
                      among the several States/Institutions that accept
                      admission with JEE Main.
                    </li>
                    <li>
                      Get Your Personalized JEE Main 2023 Report with Top
                      Predicted Colleges for JoSAA and State Level Counseling.
                    </li>
                    <li>
                      college prediction outcomes for the overall JEE JoSAA
                      counseling.
                    </li>
                  </ul>
                  <span className="r_btnnew" id="rbtn">
                    Read More...
                  </span>
                </div>
                {/* <!-- newly-added--hero-list-here --> */}
              </div>
            </div>
            <div className="col-xl-7 col-lg-6 col-sm-12 mobilehide">
              <div
                className="heroutube"
                data-bs-toggle="modal"
                href="#exampleModalToggleutube"
                role="button"
              >
                <img src={Assets.dummyThumb} alt="thumb" />
              </div>
            </div>
          </div>
        </div>
        <Modal />
      </section>
      <Form />
      <LoginSidebar />
    </div>
  );
};

export default Predictor;
