import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DropStickNav from "../components/comparedComponents/DropStickNav";
import predictorList from "../models/predictorListModel";

const ComparisonScreen = () => {
  const search = useLocation().search;
  const studId = new URLSearchParams(search).get("studId");

  const [comparedValues, setComparedValues] = useState([]);
  const [isPlacementShow, setIsPlacementShow] = useState(false);
  const [isGraduationsShow, setIsGraduationsShow] = useState(false);

  useEffect(() => {
    const getComparedItem = async () => {
      const response = await predictorList.comparisonCollege(studId);
      setComparedValues(response.data.predictorCompareCollegeDetails);
    };
    getComparedItem();
  }, []);

  return (
    <React.Fragment>
      {/* !-- hero-sec-starts-here --> */}
      <section className="hero_sec clg-sugg_green pb-0">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-sm-12">
              <div className="d-block heroleftcon">
                <h1 className="text-white t2">
                  Which College is right for you?
                </h1>
                {/*  <!-- comparison-boxes-here --> */}
                <div className="comparesec">
                  <div className="topcompare-bx">
                    <div className="row">
                      {comparedValues &&
                        comparedValues.map((compare) => {
                          return (
                            <div className="col" key={compare.collegeId}>
                              <div className="comprecon">
                                <div className="thum-block">
                                  <div className="colg_thmbs">
                                    <img
                                      src={`https://collegesuggest.com/assets/images/${compare.collegeLogo}`}
                                      alt={compare.collegeShortName}
                                    />
                                  </div>
                                  <span className="clgname">
                                    {compare.collegeShortName}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                      {/* <div className="col">
                        <div className="comprecon">
                          <div className="thum-block">
                            <div className="colg_thmbs">
                              <img src={dummyLogo} alt="" />
                            </div>
                            <span className="clgname">IIT Delhi</span>
                          </div>
                        </div>
                      </div>

                      <div className="col mobilehide">
                        <div className="comprecon">
                          <div className="thum-block">
                            <div className="colg_thmbs">
                              <img src={dummyLogo1} alt="" />
                            </div>
                            <span className="clgname">IIT Madras</span>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                {/* <!-- comparison-ends-here --> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <DropStickNav data={comparedValues} />

      {/* <!-- main-section-start-here --> */}
      <section className="main_sec">
        <div className="container ">
          <div className="comparesec">
            <div className="boxconblocks">
              <div className="title_bx">
                <h2>College Rankings</h2>
              </div>
              <div className="detail_bx_warp">
                <div className="row">
                  <div className="col">
                    <div className="com_detailbx highlighted">
                      <div className="detailtop">1</div>
                      <span className="detailtop2">Ranked by NIRF</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx highlighted">
                      <div className="detailtop">2</div>
                      <span className="detailtop2">Ranked by NIRF</span>
                    </div>
                  </div>
                  <div className="col mobilehide highlighted">
                    <div className="com_detailbx">
                      <div className="detailtop">1</div>
                      <span className="detailtop2">Ranked by NIRF</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="com_detailbx highlighted">
                      <div className="detailtop">90.04</div>
                      <span className="detailtop2">NAAC Score</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx highlighted">
                      <div className="detailtop">88.12</div>
                      <span className="detailtop2">NAAC Score</span>
                    </div>
                  </div>
                  <div className="col mobilehide highlighted">
                    <div className="com_detailbx">
                      <div className="detailtop">90.04</div>
                      <span className="detailtop2">NAAC Score</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="boxconblocks">
              <div className="title_bx">
                <h2>College Details</h2>
              </div>
              <div className="detail_bx_warp">
                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1959</div>
                      <span className="detailtop2">Estd Year</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1959</div>
                      <span className="detailtop2">Estd Year</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">1959</div>
                      <span className="detailtop2">Estd Year</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">Government</div>
                      <span className="detailtop2">Ownership</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">Government</div>
                      <span className="detailtop2">Ownership</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">Government</div>
                      <span className="detailtop2">Ownership</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">611.332</div>
                      <span className="detailtop2">Campus Size</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">320</div>
                      <span className="detailtop2">Campus Size</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">611.322</div>
                      <span className="detailtop2">Campus Size</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1799</div>
                      <span className="detailtop2">Total Students Intake</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">2773</div>
                      <span className="detailtop2">Total Students Intake</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">1799</div>
                      <span className="detailtop2">Total Students Intake</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1799</div>
                      <span className="detailtop2">Total Enrollment</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">2773</div>
                      <span className="detailtop2">Total Enrollment</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">1799</div>
                      <span className="detailtop2">Total Enrollment</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">645</div>
                      <span className="detailtop2">Total Faculty</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">826</div>
                      <span className="detailtop2">Total Faculty</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">645</div>
                      <span className="detailtop2">Total Faculty</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="boxconblocks">
              <div className="title_bx">
                <h2>College Facilities</h2>
              </div>
              <div className="detail_bx_warp">
                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <svg
                        className="icn"
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <mask
                          id="mask0_100_802"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="8"
                          y="8"
                          width="24"
                          height="24"
                        >
                          <rect
                            x="8"
                            y="8"
                            width="24"
                            height="24"
                            fill="#D9D9D9"
                          />
                        </mask>
                        <g mask="url(#mask0_100_802)">
                          <path
                            d="M17.5496 26L11.8496 20.3L13.2746 18.875L17.5496 23.15L26.7246 13.975L28.1496 15.4L17.5496 26Z"
                            fill="#202124"
                          />
                        </g>
                        <rect
                          x="0.5"
                          y="0.5"
                          width="39"
                          height="39"
                          rx="19.5"
                          stroke="black"
                        />
                      </svg>

                      <span className="detailtop2">Boys Hostel</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <svg
                        className="icn"
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <mask
                          id="mask0_100_802"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="8"
                          y="8"
                          width="24"
                          height="24"
                        >
                          <rect
                            x="8"
                            y="8"
                            width="24"
                            height="24"
                            fill="#D9D9D9"
                          />
                        </mask>
                        <g mask="url(#mask0_100_802)">
                          <path
                            d="M17.5496 26L11.8496 20.3L13.2746 18.875L17.5496 23.15L26.7246 13.975L28.1496 15.4L17.5496 26Z"
                            fill="#202124"
                          />
                        </g>
                        <rect
                          x="0.5"
                          y="0.5"
                          width="39"
                          height="39"
                          rx="19.5"
                          stroke="black"
                        />
                      </svg>
                      <span className="detailtop2">Boys Hostel</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <svg
                        className="icn"
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <mask
                          id="mask0_100_802"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="8"
                          y="8"
                          width="24"
                          height="24"
                        >
                          <rect
                            x="8"
                            y="8"
                            width="24"
                            height="24"
                            fill="#D9D9D9"
                          />
                        </mask>
                        <g mask="url(#mask0_100_802)">
                          <path
                            d="M17.5496 26L11.8496 20.3L13.2746 18.875L17.5496 23.15L26.7246 13.975L28.1496 15.4L17.5496 26Z"
                            fill="#202124"
                          />
                        </g>
                        <rect
                          x="0.5"
                          y="0.5"
                          width="39"
                          height="39"
                          rx="19.5"
                          stroke="black"
                        />
                      </svg>
                      <span className="detailtop2">Boys Hostel</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <svg
                        className="icn"
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <mask
                          id="mask0_100_802"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="8"
                          y="8"
                          width="24"
                          height="24"
                        >
                          <rect
                            x="8"
                            y="8"
                            width="24"
                            height="24"
                            fill="#D9D9D9"
                          />
                        </mask>
                        <g mask="url(#mask0_100_802)">
                          <path
                            d="M17.5496 26L11.8496 20.3L13.2746 18.875L17.5496 23.15L26.7246 13.975L28.1496 15.4L17.5496 26Z"
                            fill="#202124"
                          />
                        </g>
                        <rect
                          x="0.5"
                          y="0.5"
                          width="39"
                          height="39"
                          rx="19.5"
                          stroke="black"
                        />
                      </svg>
                      <span className="detailtop2">Girls Hostel</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <svg
                        className="icn"
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <mask
                          id="mask0_100_802"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="8"
                          y="8"
                          width="24"
                          height="24"
                        >
                          <rect
                            x="8"
                            y="8"
                            width="24"
                            height="24"
                            fill="#D9D9D9"
                          />
                        </mask>
                        <g mask="url(#mask0_100_802)">
                          <path
                            d="M17.5496 26L11.8496 20.3L13.2746 18.875L17.5496 23.15L26.7246 13.975L28.1496 15.4L17.5496 26Z"
                            fill="#202124"
                          />
                        </g>
                        <rect
                          x="0.5"
                          y="0.5"
                          width="39"
                          height="39"
                          rx="19.5"
                          stroke="black"
                        />
                      </svg>
                      <span className="detailtop2">Girls Hostel</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <svg
                        className="icn"
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <mask
                          id="mask0_100_802"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="8"
                          y="8"
                          width="24"
                          height="24"
                        >
                          <rect
                            x="8"
                            y="8"
                            width="24"
                            height="24"
                            fill="#D9D9D9"
                          />
                        </mask>
                        <g mask="url(#mask0_100_802)">
                          <path
                            d="M17.5496 26L11.8496 20.3L13.2746 18.875L17.5496 23.15L26.7246 13.975L28.1496 15.4L17.5496 26Z"
                            fill="#202124"
                          />
                        </g>
                        <rect
                          x="0.5"
                          y="0.5"
                          width="39"
                          height="39"
                          rx="19.5"
                          stroke="black"
                        />
                      </svg>
                      <span className="detailtop2">Girls Hostel</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <svg
                        className="icn"
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <mask
                          id="mask0_100_802"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="8"
                          y="8"
                          width="24"
                          height="24"
                        >
                          <rect
                            x="8"
                            y="8"
                            width="24"
                            height="24"
                            fill="#D9D9D9"
                          />
                        </mask>
                        <g mask="url(#mask0_100_802)">
                          <path
                            d="M17.5496 26L11.8496 20.3L13.2746 18.875L17.5496 23.15L26.7246 13.975L28.1496 15.4L17.5496 26Z"
                            fill="#202124"
                          />
                        </g>
                        <rect
                          x="0.5"
                          y="0.5"
                          width="39"
                          height="39"
                          rx="19.5"
                          stroke="black"
                        />
                      </svg>
                      <span className="detailtop2">Library</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <svg
                        className="icn"
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <mask
                          id="mask0_100_802"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="8"
                          y="8"
                          width="24"
                          height="24"
                        >
                          <rect
                            x="8"
                            y="8"
                            width="24"
                            height="24"
                            fill="#D9D9D9"
                          />
                        </mask>
                        <g mask="url(#mask0_100_802)">
                          <path
                            d="M17.5496 26L11.8496 20.3L13.2746 18.875L17.5496 23.15L26.7246 13.975L28.1496 15.4L17.5496 26Z"
                            fill="#202124"
                          />
                        </g>
                        <rect
                          x="0.5"
                          y="0.5"
                          width="39"
                          height="39"
                          rx="19.5"
                          stroke="black"
                        />
                      </svg>
                      <span className="detailtop2">Library</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <svg
                        className="icn"
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <mask
                          id="mask0_100_802"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="8"
                          y="8"
                          width="24"
                          height="24"
                        >
                          <rect
                            x="8"
                            y="8"
                            width="24"
                            height="24"
                            fill="#D9D9D9"
                          />
                        </mask>
                        <g mask="url(#mask0_100_802)">
                          <path
                            d="M17.5496 26L11.8496 20.3L13.2746 18.875L17.5496 23.15L26.7246 13.975L28.1496 15.4L17.5496 26Z"
                            fill="#202124"
                          />
                        </g>
                        <rect
                          x="0.5"
                          y="0.5"
                          width="39"
                          height="39"
                          rx="19.5"
                          stroke="black"
                        />
                      </svg>
                      <span className="detailtop2">Library</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="boxconblocks">
              <div className="title_bx">
                <h2>Sanctioned (Approved) Intake</h2>
              </div>
              <div className="detail_bx_warp">
                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">500</div>
                      <span className="detailtop2">PG [2 Year]</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1576</div>
                      <span className="detailtop2">PG [2 Year]</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">500</div>
                      <span className="detailtop2">PG [2 Year]</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">245</div>
                      <span className="detailtop2">PG [3 Year]</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">-</div>
                      <span className="detailtop2">Ownership</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">245</div>
                      <span className="detailtop2">PG [3 Year]</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">877</div>
                      <span className="detailtop2">UG [4 Year]</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1071</div>
                      <span className="detailtop2">UG [4 Year]</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">877</div>
                      <span className="detailtop2">UG [4 Year]</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">177</div>
                      <span className="detailtop2">UG [5 Year]</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">126</div>
                      <span className="detailtop2">UG [5 Year]</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">177</div>
                      <span className="detailtop2">UG [5 Year]</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="boxconblocks">
              <div className="title_bx">
                <h2>Student Strength</h2>
              </div>
              <div className="detail_bx_warp">
                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">6272</div>
                      <span className="detailtop2">Total students</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">7024</div>
                      <span className="detailtop2">Total students</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">6272</div>
                      <span className="detailtop2">Total students</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">5243</div>
                      <span className="detailtop2">Boys</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">5872</div>
                      <span className="detailtop2">Boys</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">5243</div>
                      <span className="detailtop2">Boys</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1029</div>
                      <span className="detailtop2">Girls</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1152</div>
                      <span className="detailtop2">Girls</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">1152</div>
                      <span className="detailtop2">Girls</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1028</div>
                      <span className="detailtop2">Within State</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">580</div>
                      <span className="detailtop2">Within State</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">1028</div>
                      <span className="detailtop2">Within State</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">5190</div>
                      <span className="detailtop2">Outside State</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">6360</div>
                      <span className="detailtop2">Outside State</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">5190</div>
                      <span className="detailtop2">Outside State</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">54</div>
                      <span className="detailtop2">Outside Country</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">84</div>
                      <span className="detailtop2">Outside Country</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">54</div>
                      <span className="detailtop2">Outside Country</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1066</div>
                      <span className="detailtop2">Economic Backward</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">321</div>
                      <span className="detailtop2">Economic Backward</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">1066</div>
                      <span className="detailtop2">Economic Backward</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">3051</div>
                      <span className="detailtop2">Socially Challenged</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">3241</div>
                      <span className="detailtop2">Socially Challenged</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">3051</div>
                      <span className="detailtop2">Socially Challenged</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="boxconblocks">
              <div className="title_bx">
                <h2>UG</h2>
              </div>
              <div className="detail_bx_warp">
                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1054</div>
                      <span className="detailtop2">Filled Seats</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1197</div>
                      <span className="detailtop2">Filled Seats</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">1054</div>
                      <span className="detailtop2">Filled Seats</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1177</div>
                      <span className="detailtop2">
                        No of Students Graduated
                      </span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1633</div>
                      <span className="detailtop2">
                        No of Students Graduated
                      </span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">1177</div>
                      <span className="detailtop2">
                        No of Students Graduated
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">985</div>
                      <span className="detailtop2">No of Students Placed</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">997</div>
                      <span className="detailtop2">No of Students Placed</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">985</div>
                      <span className="detailtop2">No of Students Placed</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">15L</div>
                      <span className="detailtop2">UG Salary</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">17.6L</div>
                      <span className="detailtop2">UG Salary</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">1028</div>
                      <span className="detailtop2">UG Salary</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="boxconblocks">
              <div className="title_bx">
                <h2>UG Across Year Graduations</h2>
                <button
                  className={`graphbtn ${isGraduationsShow ? "active" : ""}`}
                  data-open="graphbox1"
                  data-box="graphdata1"
                  onClick={() => setIsGraduationsShow(!isGraduationsShow)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <mask
                      id="mask0_167_1053"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_167_1053)">
                      <path
                        d="M7 17H9V12H7V17ZM15 17H17V7H15V17ZM11 17H13V14H11V17ZM11 12H13V10H11V12ZM5 21C4.45 21 3.979 20.8043 3.587 20.413C3.19567 20.021 3 19.55 3 19V5C3 4.45 3.19567 3.979 3.587 3.587C3.979 3.19567 4.45 3 5 3H19C19.55 3 20.021 3.19567 20.413 3.587C20.8043 3.979 21 4.45 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.021 20.8043 19.55 21 19 21H5Z"
                        fill="#202124"
                      />
                    </g>
                  </svg>
                  <span>Graph</span>
                </button>
              </div>

              {/* <!-- graph-container-here --> */}
              {isGraduationsShow ? (
                <div className="graphcon active" id="graphbox1">
                  <div className="content_grap">
                    <ul className="d-flex align-items-center graphnavbtnwarp">
                      <li className="d-block">
                        <button className="graphnavbtn">
                          <span className="color1"></span>2022
                        </button>
                      </li>
                      <li className="d-block">
                        <button className="graphnavbtn">
                          <span className="color2"></span>2021
                        </button>
                      </li>
                      <li className="d-block">
                        <button className="graphnavbtn">
                          <span className="color3"></span>2020
                        </button>
                      </li>
                    </ul>

                    <div
                      id="chart1"
                      style={{ width: "100%", minHeight: "400px" }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="detail_bx_warp" id="graphdata1">
                  <div className="row">
                    <div className="col">
                      <div className="com_detailbx">
                        <div className="detailtop">79.04</div>
                        <span className="detailtop2">2020</span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="com_detailbx">
                        <div className="detailtop">81.03</div>
                        <span className="detailtop2">2020</span>
                      </div>
                    </div>
                    <div className="col mobilehide">
                      <div className="com_detailbx">
                        <div className="detailtop">79.04</div>
                        <span className="detailtop2">2020</span>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="com_detailbx">
                        <div className="detailtop">80.43</div>
                        <span className="detailtop2">2021</span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="com_detailbx">
                        <div className="detailtop">86.55</div>
                        <span className="detailtop2">2021</span>
                      </div>
                    </div>
                    <div className="col mobilehide">
                      <div className="com_detailbx">
                        <div className="detailtop">80.43</div>
                        <span className="detailtop2">2021</span>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="com_detailbx">
                        <div className="detailtop">89.42</div>
                        <span className="detailtop2">2022</span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="com_detailbx">
                        <div className="detailtop">89.60</div>
                        <span className="detailtop2">2022</span>
                      </div>
                    </div>
                    <div className="col mobilehide">
                      <div className="com_detailbx">
                        <div className="detailtop">89.42</div>
                        <span className="detailtop2">2022</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* <!-- graph-container-ends-here --> */}
            </div>

            <div className="boxconblocks">
              <div className="title_bx">
                <h2>UG Across Year Placements</h2>
                <button
                  className={`graphbtn ${isPlacementShow ? "active" : ""}`}
                  data-open="graphbox2"
                  data-box="graphdata2"
                  onClick={() => setIsPlacementShow(!isPlacementShow)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <mask
                      id="mask0_167_1053"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_167_1053)">
                      <path
                        d="M7 17H9V12H7V17ZM15 17H17V7H15V17ZM11 17H13V14H11V17ZM11 12H13V10H11V12ZM5 21C4.45 21 3.979 20.8043 3.587 20.413C3.19567 20.021 3 19.55 3 19V5C3 4.45 3.19567 3.979 3.587 3.587C3.979 3.19567 4.45 3 5 3H19C19.55 3 20.021 3.19567 20.413 3.587C20.8043 3.979 21 4.45 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.021 20.8043 19.55 21 19 21H5Z"
                        fill="#202124"
                      />
                    </g>
                  </svg>
                  <span>Graph</span>
                </button>
              </div>

              {/* <!-- graph-container-here --> */}
              {isPlacementShow ? (
                <div className="graphcon active" id="graphbox2">
                  <div className="content_grap">
                    <ul className="d-flex align-items-center graphnavbtnwarp">
                      <li className="d-block">
                        <button className="graphnavbtn">
                          <span className="color1"></span>2022
                        </button>
                      </li>
                      <li className="d-block">
                        <button className="graphnavbtn">
                          <span className="color2"></span>2021
                        </button>
                      </li>
                      <li className="d-block">
                        <button className="graphnavbtn">
                          <span className="color3"></span>2020
                        </button>
                      </li>
                    </ul>
                    <div
                      id="chart2"
                      style={{ width: "100%", minHeight: "400px" }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="detail_bx_warp" id="graphdata2">
                  <div className="row">
                    <div className="col">
                      <div className="com_detailbx">
                        <div className="detailtop">90.24</div>
                        <span className="detailtop2">2020</span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="com_detailbx">
                        <div className="detailtop">92.18</div>
                        <span className="detailtop2">2020</span>
                      </div>
                    </div>
                    <div className="col mobilehide">
                      <div className="com_detailbx">
                        <div className="detailtop">90.24</div>
                        <span className="detailtop2">2020</span>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="com_detailbx">
                        <div className="detailtop">86.40</div>
                        <span className="detailtop2">2021</span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="com_detailbx">
                        <div className="detailtop">91.25</div>
                        <span className="detailtop2">2021</span>
                      </div>
                    </div>
                    <div className="col mobilehide">
                      <div className="com_detailbx">
                        <div className="detailtop">86.40</div>
                        <span className="detailtop2">2021</span>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="com_detailbx">
                        <div className="detailtop">90.97</div>
                        <span className="detailtop2">2022</span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="com_detailbx">
                        <div className="detailtop">94.75</div>
                        <span className="detailtop2">2022</span>
                      </div>
                    </div>
                    <div className="col mobilehide">
                      <div className="com_detailbx">
                        <div className="detailtop">90.97</div>
                        <span className="detailtop2">2022</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* <!-- graph-container-ends-here --> */}
            </div>

            <div className="boxconblocks">
              <div className="title_bx">
                <h2>Ph.D</h2>
                <button
                  className="graphbtn"
                  data-open="graphbox3"
                  data-box="graphdata3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <mask
                      id="mask0_167_1053"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_167_1053)">
                      <path
                        d="M7 17H9V12H7V17ZM15 17H17V7H15V17ZM11 17H13V14H11V17ZM11 12H13V10H11V12ZM5 21C4.45 21 3.979 20.8043 3.587 20.413C3.19567 20.021 3 19.55 3 19V5C3 4.45 3.19567 3.979 3.587 3.587C3.979 3.19567 4.45 3 5 3H19C19.55 3 20.021 3.19567 20.413 3.587C20.8043 3.979 21 4.45 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.021 20.8043 19.55 21 19 21H5Z"
                        fill="#202124"
                      />
                    </g>
                  </svg>
                  <span>Graph</span>
                </button>
              </div>
              <div className="graphcon" id="graphbox3">
                <div className="content_grap">
                  <ul className="d-flex align-items-center graphnavbtnwarp">
                    <li className="d-block">
                      <button className="graphnavbtn">
                        <span className="color1"></span>2022
                      </button>
                    </li>
                    <li className="d-block">
                      <button className="graphnavbtn">
                        <span className="color2"></span>2021
                      </button>
                    </li>
                    <li className="d-block">
                      <button className="graphnavbtn">
                        <span className="color3"></span>2020
                      </button>
                    </li>
                  </ul>
                  <div
                    id="chart3"
                    style={{ width: "100%", minHeight: "400px" }}
                  ></div>
                </div>
              </div>
              <div className="detail_bx_warp" id="graphdata3">
                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">2168</div>
                      <span className="detailtop2">Pursuing</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">2826</div>
                      <span className="detailtop2">Pursuing</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">2168</div>
                      <span className="detailtop2">Pursuing</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">86.40</div>
                      <span className="detailtop2">Graduated</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">91.25</div>
                      <span className="detailtop2">Graduated</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">86.40</div>
                      <span className="detailtop2">Graduated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="boxconblocks">
              <div className="title_bx">
                <h2>IPR</h2>
                <button
                  className="graphbtn"
                  data-open="graphbox4"
                  data-box="graphdata4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <mask
                      id="mask0_167_1053"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_167_1053)">
                      <path
                        d="M7 17H9V12H7V17ZM15 17H17V7H15V17ZM11 17H13V14H11V17ZM11 12H13V10H11V12ZM5 21C4.45 21 3.979 20.8043 3.587 20.413C3.19567 20.021 3 19.55 3 19V5C3 4.45 3.19567 3.979 3.587 3.587C3.979 3.19567 4.45 3 5 3H19C19.55 3 20.021 3.19567 20.413 3.587C20.8043 3.979 21 4.45 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.021 20.8043 19.55 21 19 21H5Z"
                        fill="#202124"
                      />
                    </g>
                  </svg>
                  <span>Graph</span>
                </button>
              </div>
              <div className="graphcon" id="graphbox4">
                <div className="content_grap">
                  <ul className="d-flex align-items-center graphnavbtnwarp">
                    <li className="d-block">
                      <button className="graphnavbtn">
                        <span className="color1"></span>2022
                      </button>
                    </li>
                    <li className="d-block">
                      <button className="graphnavbtn">
                        <span className="color2"></span>2021
                      </button>
                    </li>
                    <li className="d-block">
                      <button className="graphnavbtn">
                        <span className="color3"></span>2020
                      </button>
                    </li>
                  </ul>
                  <div
                    id="chart4"
                    style={{ width: "100%", minHeight: "400px" }}
                  ></div>
                </div>
              </div>
              <div className="detail_bx_warp" id="graphdata4">
                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">476</div>
                      <span className="detailtop2">Patents Published</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">264</div>
                      <span className="detailtop2">Patents Published</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">476</div>
                      <span className="detailtop2">Patents Published</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">212</div>
                      <span className="detailtop2">Patents Granted</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">108</div>
                      <span className="detailtop2">Patents Granted</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">212</div>
                      <span className="detailtop2">Patents Granted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="boxconblocks">
              <div className="title_bx">
                <h2>Funds</h2>
              </div>
              <div className="detail_bx_warp">
                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">777</div>
                      <span className="detailtop2">Sponsored Research</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">581</div>
                      <span className="detailtop2">Sponsored Research</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">777</div>
                      <span className="detailtop2">Sponsored Research</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">91</div>
                      <span className="detailtop2">Consultancy Project</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">205</div>
                      <span className="detailtop2">Consultancy Project</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">91</div>
                      <span className="detailtop2">Consultancy Project</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="boxconblocks">
              <div className="title_bx">
                <h2>Capital Expenditure</h2>
                <button
                  className="graphbtn"
                  data-open="graphbox5"
                  data-box="graphdata5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <mask
                      id="mask0_167_1053"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_167_1053)">
                      <path
                        d="M7 17H9V12H7V17ZM15 17H17V7H15V17ZM11 17H13V14H11V17ZM11 12H13V10H11V12ZM5 21C4.45 21 3.979 20.8043 3.587 20.413C3.19567 20.021 3 19.55 3 19V5C3 4.45 3.19567 3.979 3.587 3.587C3.979 3.19567 4.45 3 5 3H19C19.55 3 20.021 3.19567 20.413 3.587C20.8043 3.979 21 4.45 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.021 20.8043 19.55 21 19 21H5Z"
                        fill="#202124"
                      />
                    </g>
                  </svg>
                  <span>Graph</span>
                </button>
              </div>
              <div className="graphcon" id="graphbox5">
                <div className="content_grap">
                  <ul className="d-flex align-items-center graphnavbtnwarp">
                    <li className="d-block">
                      <button className="graphnavbtn">
                        <span className="color1"></span>2022
                      </button>
                    </li>
                    <li className="d-block">
                      <button className="graphnavbtn">
                        <span className="color2"></span>2021
                      </button>
                    </li>
                    <li className="d-block">
                      <button className="graphnavbtn">
                        <span className="color3"></span>2020
                      </button>
                    </li>
                  </ul>
                  <div
                    id="chart5"
                    style={{ width: "100%", minHeight: "400px" }}
                  ></div>
                </div>
              </div>
              <div className="detail_bx_warp" id="graphdata5">
                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1,74,81,85,180</div>
                      <span className="detailtop2">Total</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">2,64,36,34,282</div>
                      <span className="detailtop2">Total</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">1,74,81,85,180</div>
                      <span className="detailtop2">Total</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">27,07,77,306</div>
                      <span className="detailtop2">Library</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1,04,10,62,870</div>
                      <span className="detailtop2">Library</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">27,07,77,306</div>
                      <span className="detailtop2">Library</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1,47,26,90,290</div>
                      <span className="detailtop2">New Equipment</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1,59,91,72,098</div>
                      <span className="detailtop2">New Equipment</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">1,47,26,90,290</div>
                      <span className="detailtop2">New Equipment</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">47,17,584</div>
                      <span className="detailtop2">Engineering Workshops</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">17,33,99,314</div>
                      <span className="detailtop2">Engineering Workshops</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">47,17,584</div>
                      <span className="detailtop2">Engineering Workshops</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">5,84,77,394</div>
                      <span className="detailtop2">
                        Creation of Capital Assets
                      </span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">87,52,56,347</div>
                      <span className="detailtop2">
                        Creation of Capital Assets
                      </span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">5,84,77,394</div>
                      <span className="detailtop2">
                        Creation of Capital Assets
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="boxconblocks">
              <div className="title_bx">
                <h2>Operational Expenditure</h2>
                <button
                  className="graphbtn"
                  data-open="graphbox6"
                  data-box="graphdata6"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <mask
                      id="mask0_167_1053"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_167_1053)">
                      <path
                        d="M7 17H9V12H7V17ZM15 17H17V7H15V17ZM11 17H13V14H11V17ZM11 12H13V10H11V12ZM5 21C4.45 21 3.979 20.8043 3.587 20.413C3.19567 20.021 3 19.55 3 19V5C3 4.45 3.19567 3.979 3.587 3.587C3.979 3.19567 4.45 3 5 3H19C19.55 3 20.021 3.19567 20.413 3.587C20.8043 3.979 21 4.45 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.021 20.8043 19.55 21 19 21H5Z"
                        fill="#202124"
                      />
                    </g>
                  </svg>
                  <span>Graph</span>
                </button>
              </div>
              <div className="graphcon" id="graphbox6">
                <div className="content_grap">
                  <ul className="d-flex align-items-center graphnavbtnwarp">
                    <li className="d-block">
                      <button className="graphnavbtn">
                        <span className="color1"></span>2022
                      </button>
                    </li>
                    <li className="d-block">
                      <button className="graphnavbtn">
                        <span className="color2"></span>2021
                      </button>
                    </li>
                    <li className="d-block">
                      <button className="graphnavbtn">
                        <span className="color3"></span>2020
                      </button>
                    </li>
                  </ul>
                  <div
                    id="chart6"
                    style={{ width: "100%", minHeight: "400px" }}
                  ></div>
                </div>
              </div>
              <div className="detail_bx_warp" id="graphdata6">
                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1,74,81,85,180</div>
                      <span className="detailtop2">Total</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">2,64,36,34,282</div>
                      <span className="detailtop2">Total</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">1,74,81,85,180</div>
                      <span className="detailtop2">Total</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">27,07,77,306</div>
                      <span className="detailtop2">Salaries</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1,04,10,62,870</div>
                      <span className="detailtop2">Salaries</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">27,07,77,306</div>
                      <span className="detailtop2">Salaries</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1,47,26,90,290</div>
                      <span className="detailtop2">
                        Maintenance of Academic Infrastructure
                      </span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">1,59,91,72,098</div>
                      <span className="detailtop2">
                        Maintenance of Academic Infrastructure
                      </span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">1,47,26,90,290</div>
                      <span className="detailtop2">
                        Maintenance of Academic Infrastructure
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">47,17,584</div>
                      <span className="detailtop2">
                        Seminars / Conferences / Workshops
                      </span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">17,33,99,314</div>
                      <span className="detailtop2">
                        Seminars / Conferences / Workshops
                      </span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">47,17,584</div>
                      <span className="detailtop2">
                        Seminars / Conferences / Workshops
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="boxconblocks">
              <div className="title_bx">
                <h2>Awards</h2>
              </div>
              <div className="detail_bx_warp">
                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">0</div>
                      <span className="detailtop2">Faculty</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">0</div>
                      <span className="detailtop2">Faculty</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">0</div>
                      <span className="detailtop2">Faculty</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">0</div>
                      <span className="detailtop2">Student</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">0</div>
                      <span className="detailtop2">Student</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">0</div>
                      <span className="detailtop2">Student</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="boxconblocks">
              <div className="title_bx">
                <h2>Faculty Details</h2>
                <button
                  className="graphbtn"
                  data-open="graphbox7"
                  data-box="graphdata7"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <mask
                      id="mask0_167_1053"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_167_1053)">
                      <path
                        d="M7 17H9V12H7V17ZM15 17H17V7H15V17ZM11 17H13V14H11V17ZM11 12H13V10H11V12ZM5 21C4.45 21 3.979 20.8043 3.587 20.413C3.19567 20.021 3 19.55 3 19V5C3 4.45 3.19567 3.979 3.587 3.587C3.979 3.19567 4.45 3 5 3H19C19.55 3 20.021 3.19567 20.413 3.587C20.8043 3.979 21 4.45 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.021 20.8043 19.55 21 19 21H5Z"
                        fill="#202124"
                      />
                    </g>
                  </svg>
                  <span>Graph</span>
                </button>
              </div>
              <div className="graphcon" id="graphbox7">
                <div className="content_grap">
                  <ul className="d-flex align-items-center graphnavbtnwarp">
                    <li className="d-block">
                      <button className="graphnavbtn">
                        <span className="color1"></span>2022
                      </button>
                    </li>
                    <li className="d-block">
                      <button className="graphnavbtn">
                        <span className="color2"></span>2021
                      </button>
                    </li>
                    <li className="d-block">
                      <button className="graphnavbtn">
                        <span className="color3"></span>2020
                      </button>
                    </li>
                  </ul>
                  <div
                    id="chart7"
                    style={{ width: "100%", minHeight: "400px" }}
                  ></div>
                </div>
              </div>
              <div className="detail_bx_warp" id="graphdata7">
                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">645</div>
                      <span className="detailtop2">Total Faculties Count</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">826</div>
                      <span className="detailtop2">Total Faculties Count</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">645</div>
                      <span className="detailtop2">Total Faculties Count</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">644</div>
                      <span className="detailtop2">Ph.D Holders</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">804</div>
                      <span className="detailtop2">Ph.D Holders</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">644</div>
                      <span className="detailtop2">Ph.D Holders</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">10:1</div>
                      <span className="detailtop2">Faculty Student Ratio</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">9:1</div>
                      <span className="detailtop2">Faculty Student Ratio</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">10:1</div>
                      <span className="detailtop2">Faculty Student Ratio</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="boxconblocks">
              <div className="title_bx">
                <h2>Fee Structure</h2>
              </div>
              <div className="detail_bx_warp">
                <div className="row">
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">208750</div>
                      <span className="detailtop2">Fee Structure</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="com_detailbx">
                      <div className="detailtop">221100</div>
                      <span className="detailtop2">Fee Structure</span>
                    </div>
                  </div>
                  <div className="col mobilehide">
                    <div className="com_detailbx">
                      <div className="detailtop">208750</div>
                      <span className="detailtop2">Fee Structure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- main-section-ends-here --> */}
    </React.Fragment>
  );
};

export default ComparisonScreen;
