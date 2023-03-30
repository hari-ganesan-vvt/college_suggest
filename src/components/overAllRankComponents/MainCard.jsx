import React, { useEffect, useState } from "react";
import { MdOutlinePayments, MdSearch, MdHouse } from "react-icons/md";
import { useSelector } from "react-redux";
import Assets from "../../imports/assets.imports";
import Carousel from "./Carousel";

const MainCard = ({ listdata, stateInfo }) => {
  const getValueData = sessionStorage.getItem("_values")
    ? JSON.parse(sessionStorage.getItem("_values"))
    : null;

  const filterChange = useSelector(
    (state) => state.filterChange.predictorChangeData
  );
  const [courseList, setCourseList] = useState(listdata.j_course);
  const [filterData, setFilterData] = useState(listdata.j_course);

  const rankFilterBased = () => {
    const rank_Id = Number(getValueData?.rankId);
    let percentCalc = (rank_Id / 100) * 10;

    const minRank = rank_Id - percentCalc;
    const maxRank = rank_Id + percentCalc;

    switch (filterChange) {
      case "MEDIUM_UPDATED":
        const mediumChanged = filterData.filter((e) => {
          return Object.keys(e)[0] >= minRank && Object.keys(e)[0] <= maxRank;
        });
        setCourseList(mediumChanged);
        break;
      case "HIGH_UPDATED":
        const highChanged = filterData.filter((e) => {
          return Object.keys(e)[0] > maxRank;
        });
        setCourseList(highChanged);
        break;
      case "LOW_UPDATED":
        const lowChanged = filterData.filter((e) => {
          return Object.keys(e)[0] < minRank;
        });
        setCourseList(lowChanged);
        break;
      case "ALL":
        setCourseList(listdata.j_course);
        break;
    }
  };

  const rankBasedChange = (college) => {
    const rank_Id = Number(getValueData?.rankId);
    const closing_rankId = Number(college);
    let percentCalc = (rank_Id / 100) * 10;

    const minRank = rank_Id - percentCalc;
    const maxRank = rank_Id + percentCalc;

    if (closing_rankId >= minRank && closing_rankId <= maxRank) {
      return Assets.mediumEmoji;
    } else if (closing_rankId > maxRank) {
      return Assets.highEmoji;
    } else if (closing_rankId < minRank) {
      return Assets.lowEmoji;
    }
  };

  useEffect(() => {
    setCourseList(listdata.j_course);
    setFilterData(listdata.j_course);
  }, [listdata]);

  useEffect(() => {
    rankFilterBased();
  }, [filterChange, filterData]);

  // console.log(courseList);
  return (
    <>
      {courseList.length !== 0 && (
        <div className="main_card">
          <div className="main_card_head d-flex align-items-center">
            <div className="m-logo_bx">
              <img
                src={
                  listdata.cs_collegelogo !== ""
                    ? `https://collegesuggest.com/assets/images/${listdata.cs_collegelogo}`
                    : Assets.noLogoImg
                }
                alt="collegeLogo"
              />
            </div>
            <div className="m-logo_bx_right">
              <a className="titlelinks">{listdata.cs_collegename}</a>

              {stateInfo.stateName === listdata.stateName && (
                <span className="material-icons m_logo_bx_icn">
                  <MdHouse />
                </span>
              )}

              <p className="locationpara">
                {listdata.cityName},{listdata?.stateName}
              </p>
            </div>
          </div>
          <div className="main_card_body">
            <div className="search_block">
              <MdSearch className="sicn" />
              <input type="text" placeholder="Find Your Course" />

              <div className="s_list_modal">
                <ul>
                  <li className="courseId">
                    <a>
                      <div>
                        <div className="minimg">
                          <svg
                            className="allsvg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 20 12"
                            fill="none"
                          >
                            <path
                              d="M7.075 6.99998H1C0.716667 6.99998 0.479333 6.90398 0.288 6.71198C0.0960001 6.52064 0 6.28331 0 5.99998C0 5.71664 0.0960001 5.47898 0.288 5.28698C0.479333 5.09564 0.716667 4.99998 1 4.99998H7.075L4.75 2.64998C4.56667 2.46664 4.471 2.23764 4.463 1.96298C4.45433 1.68764 4.55 1.44998 4.75 1.24998C4.93333 1.06664 5.16667 0.974976 5.45 0.974976C5.73333 0.974976 5.96667 1.06664 6.15 1.24998L10.2 5.29998C10.4 5.49998 10.5 5.73331 10.5 5.99998C10.5 6.26664 10.4 6.49998 10.2 6.69998L6.15 10.75C5.96667 10.9333 5.73767 11.0293 5.463 11.038C5.18767 11.046 4.95 10.95 4.75 10.75C4.56667 10.5666 4.475 10.3333 4.475 10.05C4.475 9.76664 4.56667 9.53331 4.75 9.34998L7.075 6.99998ZM12 2.99998C11.7167 2.99998 11.4793 2.90398 11.288 2.71198C11.096 2.52064 11 2.28331 11 1.99998C11 1.71664 11.096 1.47898 11.288 1.28698C11.4793 1.09564 11.7167 0.999976 12 0.999976H19C19.2833 0.999976 19.5207 1.09564 19.712 1.28698C19.904 1.47898 20 1.71664 20 1.99998C20 2.28331 19.904 2.52064 19.712 2.71198C19.5207 2.90398 19.2833 2.99998 19 2.99998H12ZM12 11C11.7167 11 11.4793 10.904 11.288 10.712C11.096 10.5206 11 10.2833 11 9.99998C11 9.71664 11.096 9.47898 11.288 9.28698C11.4793 9.09564 11.7167 8.99998 12 8.99998H19C19.2833 8.99998 19.5207 9.09564 19.712 9.28698C19.904 9.47898 20 9.71664 20 9.99998C20 10.2833 19.904 10.5206 19.712 10.712C19.5207 10.904 19.2833 11 19 11H12ZM15 6.99998C14.7167 6.99998 14.4793 6.90398 14.288 6.71198C14.096 6.52064 14 6.28331 14 5.99998C14 5.71664 14.096 5.47898 14.288 5.28698C14.4793 5.09564 14.7167 4.99998 15 4.99998H19C19.2833 4.99998 19.5207 5.09564 19.712 5.28698C19.904 5.47898 20 5.71664 20 5.99998C20 6.28331 19.904 6.52064 19.712 6.71198C19.5207 6.90398 19.2833 6.99998 19 6.99998H15Z"
                              fill="#202124"
                            ></path>
                          </svg>
                        </div>
                        <div className="d-block">
                          <h3 className="titlelinks mini">OverAll</h3>
                        </div>
                      </div>
                    </a>
                  </li>
                  {courseList &&
                    courseList.map((course, i) => {
                      return (
                        <li key={i}>
                          <a href="#">
                            <div>
                              <div className="minimg">
                                <img
                                  src={rankBasedChange(Object.keys(course)[0])}
                                  alt="emoji"
                                />
                              </div>
                              <div className="d-block">
                                <h3 className="titlelinks mini">
                                  {Object.values(course)[0].j_course_name}
                                </h3>
                              </div>
                            </div>
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>

            <div className="row hint-row">
              <div className="col-md-9 col-sm-12">
                <p className="hintpara">
                  Your Chances are&nbsp;
                  {(filterChange === "ALL" && "Good") ||
                    (filterChange === "LOW_UPDATED" && "Low") ||
                    (filterChange === "MEDIUM_UPDATED" && "Medium") ||
                    (filterChange === "HIGH_UPDATED" && "High")}
                  &nbsp;in&nbsp;
                  {courseList?.length} out of &nbsp;
                  {listdata.j_course.length} Courses
                </p>
              </div>

              <div className="col-md-3 col-sm-12">
                <div href="#" className="graylinktxt text-right">
                  <MdOutlinePayments /> Overall Fees
                </div>
              </div>
            </div>

            <Carousel listdata={courseList} />
          </div>
        </div>
      )}
    </>
  );
};

export default MainCard;
