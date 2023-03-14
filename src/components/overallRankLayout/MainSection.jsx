import React, { useEffect, useState } from "react";
import predictorList from "../../models/predictorList.model";
import {
  MdHouse,
  MdMale,
  MdModeEdit,
  MdSearch,
  MdVerified,
  MdFemale,
  MdClose,
  MdMenu,
  MdFilterList,
} from "react-icons/md";
import _ from "lodash";
import Loading from "../Loading/Loading";
import MainCard from "./MainCard";

const MainSection = ({ getValueData }) => {
  //state
  const [courseList, setCourseList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByCollege, setFilterByCollege] = useState({
    rankId: getValueData?.rankId,
    casteId: getValueData?.casteId,
    genderId: getValueData?.genderId,
    homeStateId: getValueData?.stateId,
    filterStateId: "",
    cityId: "",
    abled: getValueData?.abled,
    courseList: "",
    sortBy: "",
    orderBy: "",
  });

  //findValues && selectedValues
  const findFormState = _.find(stateList, {
    stateId: parseInt(getValueData?.stateId),
  });

  const selectedStateValue = _.find(stateList, {
    stateId: parseInt(filterByCollege.filterStateId),
  });

  const selectedCourseValue = _.find(courseList, {
    courseId: parseInt(filterByCollege.courseList),
  });

  const handleSelectedAllClear = () => {
    setFilterByCollege({
      ...filterByCollege,
      filterStateId: "",
      cityId: "",
      courseList: "",
      sortBy: "",
      orderBy: "",
    });
  };

  //responseData
  const fetchDataFilter = (data) => {
    let college = _.uniqBy(data, "cs_collegename");
    for (let i = 0; i < college.length; i++) {
      let courseList = [];
      let filterCourse = [];
      let collegeData = _.filter(data, (e) => {
        return e.cs_collegename === college[i].cs_collegename;
      });
      for (let department of collegeData) {
        // console.log("department", department);
        if (
          !filterCourse.includes(department.j_course) &&
          !Array.isArray(department.j_course)
        ) {
          filterCourse.push(department.j_course);
          let course = _.chain(collegeData)
            .filter((e) => {
              return e.j_course === department.j_course;
            })
            .maxBy((e) => {
              return parseInt(e.j_closing_rank);
            })
            .value();

          courseList.push({
            [`${course.j_closing_rank}`]: {
              j_course_name: course.j_course,
              jFees: course.jFees,
              jSeats: course.jSeats,
              courseID: course.courseID,
              quotaId: course.quotaId,
            },
          });
        }
      }
      college[i].j_course = _.sortBy(courseList, (obj) =>
        parseInt(_.keys(obj)[0])
      ).reverse();
    }

    setCollegeList(college);
  };

  //form submitValues
  const responseSubmitData = async () => {
    if (collegeList.length === 0) {
      setLoading(true);
    }
    try {
      const response = await predictorList.formSubmitData(getValueData);
      fetchDataFilter(response.data.predictorResList);
      setLoading(false);
      setSearchTerm("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  //selected data
  const filterResData = async () => {
    try {
      const response = await predictorList.filterCourseList(filterByCollege);
      fetchDataFilter(response.data.predictorResList);
    } catch (error) {
      console.log(error);
    }
  };

  //stateList
  const predictorStateList = async () => {
    try {
      const response = await predictorList.stateList();

      let resultData = response.data.stateList.sort((a, b) => {
        if (a.stateName < b.stateName) {
          return -1;
        }
        if (a.stateName > b.stateName) {
          return 1;
        }
        return 0;
      });
      setStateList(resultData);
    } catch (err) {
      console.log(err);
    }
  };

  //courseList
  const predictorcourseList = async () => {
    try {
      const response = await predictorList.courseList();

      let resultData = response.data.predictorCourseList.sort((a, b) => {
        if (a.stateName < b.stateName) {
          return -1;
        }
        if (a.stateName > b.stateName) {
          return 1;
        }
        return 0;
      });

      setCourseList(resultData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilter = (name, value) => {
    setFilterByCollege({ ...filterByCollege, [name]: value });
  };

  //mobileShow footer
  const handleMenu = () => {
    setMenuShow(!menuShow);
  };

  useEffect(() => {
    predictorStateList();
    predictorcourseList();
  }, []);

  useEffect(() => {
    if (
      filterByCollege.filterStateId.length > 0 ||
      filterByCollege.courseList.length > 0 ||
      filterByCollege.sortBy.length > 0 ||
      filterByCollege.orderBy.length > 0 ||
      filterByCollege.cityId.length > 0
    ) {
      filterResData();
    } else {
      responseSubmitData();
    }
  }, [filterByCollege]);

  // console.log("collegeList", collegeList);
  return (
    <section className="main_sec">
      <div className="container ">
        {loading ? (
          <Loading />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="row">
            <>
              <div className="col-xl-8 col-lg-6 col-sm-12 custom-col-lay">
                <div className="mainblock">
                  {collegeList.length > 0 ? (
                    collegeList.map((listdata, index) => {
                      return (
                        <MainCard
                          listdata={listdata}
                          key={index}
                          stateInfo={findFormState}
                        />
                      );
                    })
                  ) : (
                    <div>No data found</div>
                  )}
                </div>
              </div>

              <div className="col-xl-4 col-lg-6 mobilehide">
                <div className="sticybx">
                  <div className="d-block">
                    <div className="cat-show-box" id="formValues">
                      {/* <div
                    className="catticked dark"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalFullscreenMd"
                    id=""
                  >
                    <span
                      className="material-icons cnlbutton"
                      style={{ color: "#000" }}
                    >
                      edit
                    </span>
                    <div className="ticktext" style={{ maxWidth: "100%" }}>
                      Edit
                    </div>
                  </div> */}
                      <button
                        className="e_btn"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalFullscreenMd"
                      >
                        <MdModeEdit className="m-edit-icon" />
                        Edit
                      </button>
                      <div className="catticked" id="">
                        <span
                          className="material-icons cnlbutton"
                          style={{ color: "#119d78" }}
                        >
                          <MdVerified />
                        </span>
                        <div className="ticktext" style={{ maxWidth: "100%" }}>
                          {getValueData?.rankId}
                        </div>
                      </div>
                      <div className="catticked" id="">
                        <span
                          className="material-icons cnlbutton"
                          style={{ color: "#119d78" }}
                        >
                          <MdHouse />
                        </span>
                        <div className="ticktext" style={{ maxWidth: "100%" }}>
                          {findFormState?.stateName}
                        </div>
                      </div>
                      <div className="catticked" id="">
                        <span
                          className="material-icons cnlbutton"
                          style={{ color: "#119d78" }}
                        >
                          {getValueData?.genderId === "1" ? (
                            <MdMale />
                          ) : getValueData?.genderId === "2" ? (
                            <MdFemale />
                          ) : null}
                        </span>

                        <div className="ticktext" style={{ maxWidth: "100%" }}>
                          {getValueData?.genderId === "1" ? "Male" : "Female"}
                        </div>
                      </div>
                      <div className="catticked" id="">
                        <span
                          className="material-icons cnlbutton"
                          style={{ color: "#119d78" }}
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M21 3v2h-2V3h-2v2h-2V3h-2v4l2 2v1H9V9l2-2V3H9v2H7V3H5v2H3V3H1v4l2 2v6l-2 2v4h9v-3c0-1.1.9-2 2-2s2 .9 2 2v3h9v-4l-2-2V9l2-2V3h-2z"></path>
                          </svg>
                        </span>

                        <div className="ticktext" style={{ maxWidth: "100%" }}>
                          {getValueData?.casteId}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-block mb-2">
                    <h3 className="fl_txt text-left">Filter</h3>
                    {filterByCollege?.filterStateId.length > 0 ||
                    filterByCollege?.courseList.length > 0 ||
                    filterByCollege?.sortBy.length > 0 ||
                    filterByCollege?.orderBy.length > 0 ? (
                      <div className="cat-show-box" id="desktopFilterTag">
                        <div
                          className="catticked"
                          id="FTclear"
                          // onclick="closeFilter('FTclear','all')"
                        >
                          <span
                            className="material-icons cnlbutton"
                            onClick={handleSelectedAllClear}
                          >
                            <MdClose />
                          </span>
                          <div className="ticktext">Clear All</div>
                        </div>

                        {filterByCollege.orderBy && (
                          <div className="catticked" id="FTorderasc">
                            <span
                              className="material-icons cnlbutton"
                              onClick={() =>
                                setFilterByCollege({
                                  ...filterByCollege,
                                  orderBy: "",
                                })
                              }
                            >
                              <MdClose />
                            </span>
                            <div className="ticktext">
                              {filterByCollege.orderBy == "asc"
                                ? "Ascending"
                                : "Decending"}
                            </div>
                          </div>
                        )}
                        {filterByCollege.sortBy && (
                          <div className="catticked" id="FTSortnirfRank">
                            <span
                              className="material-icons cnlbutton"
                              onClick={() =>
                                setFilterByCollege({
                                  ...filterByCollege,
                                  sortBy: "",
                                })
                              }
                            >
                              <MdClose />
                            </span>
                            <div className="ticktext">
                              {filterByCollege?.sortBy}
                            </div>
                          </div>
                        )}

                        {selectedCourseValue?.courseName && (
                          <div className="catticked" id="FTorderasc">
                            <span
                              className="material-icons cnlbutton"
                              onClick={() =>
                                setFilterByCollege({
                                  ...filterByCollege,
                                  courseList: "",
                                })
                              }
                            >
                              <MdClose />
                            </span>
                            <div className="ticktext">
                              {selectedCourseValue?.courseName.split("(")[0]}
                            </div>
                          </div>
                        )}

                        {selectedStateValue?.stateName && (
                          <div className="catticked" id="FTorderasc">
                            <span
                              className="material-icons cnlbutton"
                              onClick={() =>
                                setFilterByCollege({
                                  ...filterByCollege,
                                  filterStateId: "",
                                  cityId: "",
                                })
                              }
                            >
                              <MdClose />
                            </span>
                            <div className="ticktext">
                              {selectedStateValue?.stateName}
                            </div>
                          </div>
                        )}

                        {filterByCollege.cityId.length > 0 && (
                          <div className="catticked" id="FTorderasc">
                            <span
                              className="material-icons cnlbutton"
                              onClick={() =>
                                setFilterByCollege({
                                  ...filterByCollege,
                                  cityId: "",
                                })
                              }
                            >
                              <MdClose />
                            </span>
                            <div className="ticktext hari">
                              {collegeList[0]?.cityName}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>

                  <div
                    className="course-accordion accordion"
                    id="accordionCourse3"
                  >
                    <div className="accordion-item">
                      <button
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne1"
                        className="collapsed"
                        aria-expanded="false"
                        fdprocessedid="sxwxf"
                      >
                        Order by
                      </button>
                      <div
                        id="collapseOne1"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionCourse3"
                      >
                        <div className="accordion-body" id="stateFilter">
                          <div className="acc_heightbx">
                            <ul className="acc-list " id="state_list">
                              <li
                                onClick={() => handleFilter("orderBy", "asc")}
                              >
                                <label htmlFor="r1" className="customradio">
                                  <input
                                    type="radio"
                                    className="customradioinput"
                                    // name="orderBy"
                                    // value="asc"
                                    checked={filterByCollege.orderBy == "asc"}
                                    readOnly
                                  />
                                  <div className="radiobx">Ascending </div>
                                </label>
                              </li>
                              <li
                                onClick={() => handleFilter("orderBy", "desc")}
                              >
                                <label htmlFor="r2" className="customradio">
                                  <input
                                    type="radio"
                                    className="customradioinput"
                                    // name="orderBy"
                                    // value="desc"
                                    checked={filterByCollege.orderBy == "desc"}
                                    readOnly
                                  />
                                  <div className="radiobx">Descending</div>
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <button
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne2"
                        className="collapsed"
                        aria-expanded="false"
                        fdprocessedid="sxwxf"
                      >
                        Sort by
                      </button>
                      <div
                        id="collapseOne2"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionCourse3"
                      >
                        <div className="accordion-body" id="stateFilter">
                          <div className="acc_heightbx">
                            <ul className="acc-list " id="state_list">
                              <li
                                onClick={() =>
                                  handleFilter("sortBy", "closingRank")
                                }
                              >
                                <label htmlFor="r12" className="customradio">
                                  <input
                                    type="radio"
                                    className="customradioinput"
                                    checked={
                                      filterByCollege.sortBy === "closingRank"
                                    }
                                    readOnly
                                  />
                                  <div className="radiobx">Closing Rank</div>
                                </label>
                              </li>
                              <li
                                onClick={() =>
                                  handleFilter("sortBy", "nirfRank")
                                }
                              >
                                <label htmlFor="r13" className="customradio">
                                  <input
                                    type="radio"
                                    className="customradioinput"
                                    // name="sortBy"
                                    // value="nirfRank"
                                    checked={
                                      filterByCollege.sortBy === "nirfRank"
                                    }
                                    readOnly
                                  />
                                  <div className="radiobx">NIRF Rank </div>
                                </label>
                              </li>
                              <li
                                onClick={() =>
                                  handleFilter("sortBy", "medianSalary")
                                }
                              >
                                <label htmlFor="r22" className="customradio">
                                  <input
                                    type="radio"
                                    className="customradioinput"
                                    // name="sortBy"
                                    // value="medianSalary"
                                    checked={
                                      filterByCollege.sortBy === "medianSalary"
                                    }
                                    readOnly
                                  />
                                  <div className="radiobx">Median Salary</div>
                                </label>
                              </li>
                              <li
                                onClick={() =>
                                  handleFilter("sortBy", "placement")
                                }
                              >
                                <label htmlFor="r24" className="customradio">
                                  <input
                                    type="radio"
                                    className="customradioinput"
                                    // name="sortBy"
                                    // value="placement"
                                    checked={
                                      filterByCollege.sortBy == "placement"
                                    }
                                    readOnly
                                  />
                                  <div className="radiobx">Placement</div>
                                </label>
                              </li>
                              <li
                                onClick={() => handleFilter("sortBy", "fees")}
                              >
                                <label htmlFor="r25" className="customradio">
                                  <input
                                    type="radio"
                                    className="customradioinput"
                                    // name="sortBy"
                                    // value="fees"
                                    checked={filterByCollege.sortBy == "fees"}
                                    readOnly
                                  />
                                  <div className="radiobx">Fees</div>
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <button
                        className="collapsed1"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree3"
                        aria-expanded="true"
                        fdprocessedid="cm6dn"
                      >
                        Courses
                      </button>
                      <div
                        id="collapseThree3"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionCourse3"
                      >
                        <div className="accordion-body" id="ownerShipFilter">
                          <div className="sidebar-widget">
                            <div className="widget-search d-block w-100">
                              <form action="#" className="d-block">
                                <div className="search_block mini">
                                  <MdSearch className="sicn" />
                                  <input
                                    type="text"
                                    placeholder="Find Your Course"
                                    name="searchTerm"
                                    value={searchTerm}
                                    onChange={(e) =>
                                      setSearchTerm(e.target.value)
                                    }
                                  />
                                </div>
                              </form>
                            </div>
                          </div>

                          <div className="acc_heightbx">
                            <ul className="acc-list " id="ownershipnew">
                              {courseList.length !== 0 ? (
                                courseList
                                  .filter((courseItem) =>
                                    courseItem.courseName
                                      .toLowerCase()
                                      .includes(searchTerm.toLowerCase())
                                  )
                                  .map((courseItem) => {
                                    return (
                                      <li
                                        key={courseItem.courseId}
                                        onClick={() =>
                                          handleFilter(
                                            "courseList",
                                            courseItem.courseId.toString()
                                          )
                                        }
                                      >
                                        <label
                                          htmlFor={courseItem.courseId}
                                          className="customradio"
                                        >
                                          <input
                                            type="radio"
                                            className="customradioinput"
                                            checked={
                                              filterByCollege.courseList ===
                                              courseItem.courseId.toString()
                                            }
                                            readOnly
                                          />
                                          <div className="radiobx">
                                            {
                                              courseItem.courseName
                                              // .split(
                                              //   "("
                                              // )[0]
                                            }
                                          </div>
                                        </label>
                                      </li>
                                    );
                                  })
                              ) : (
                                <div>No course</div>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <button
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne4"
                        className="collapsed"
                        aria-expanded="false"
                        fdprocessedid="sxwxf"
                      >
                        State
                      </button>
                      <div
                        id="collapseOne4"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionCourse3"
                      >
                        <div className="accordion-body" id="stateFilter">
                          <div className="acc_heightbx">
                            <ul className="acc-list " id="ownershipnew">
                              {stateList &&
                                stateList.map((stateItem) => {
                                  // console.log("stateId", stateItem.stateId);
                                  return (
                                    <li
                                      key={stateItem.stateId}
                                      onClick={() =>
                                        handleFilter(
                                          "filterStateId",
                                          stateItem.stateId.toString()
                                        )
                                      }
                                    >
                                      <label
                                        htmlFor={stateItem.stateName}
                                        className="customradio"
                                      >
                                        <input
                                          type="radio"
                                          className="customradioinput"
                                          checked={
                                            filterByCollege.filterStateId ===
                                            stateItem.stateId.toString()
                                          }
                                          readOnly
                                        />
                                        {/* <input
                                        type="radio"
                                        id={stateItem.stateName}
                                        className="customradioinput"
                                        checked={
                                          filterByCollege.filterStateId ===
                                          stateItem.stateId.toString()
                                        }
                                      /> */}
                                        <div className="radiobx">
                                          {stateItem.stateName}
                                        </div>
                                      </label>
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {filterByCollege.filterStateId.length > 0 && (
                      <div className="accordion-item">
                        <button
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne5"
                          className="collapsed"
                          aria-expanded="false"
                          fdprocessedid="sxwxf"
                        >
                          City
                        </button>
                        <div
                          id="collapseOne5"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionCourse3"
                        >
                          <div className="accordion-body" id="stateFilter">
                            <div className="acc_heightbx">
                              <ul className="acc-list " id="ownershipnew">
                                {collegeList &&
                                  collegeList.map((city) => {
                                    // console.log(city?.cityId.toString());
                                    return (
                                      <li
                                        key={city.cityId}
                                        onClick={() =>
                                          handleFilter(
                                            "cityId",
                                            city.cityId.toString()
                                          )
                                        }
                                      >
                                        <label
                                          htmlFor={city.cityId}
                                          className="customradio"
                                        >
                                          <input
                                            type="radio"
                                            // id={city.cityId}
                                            className="customradioinput"
                                            checked={
                                              filterByCollege.cityId ==
                                              city.cityId
                                            }
                                            // filterByCollege.cityId ===
                                            // city.cityId.toString()

                                            readOnly
                                          />
                                          <div className="radiobx">
                                            {city?.cityName}
                                          </div>
                                        </label>
                                      </li>
                                    );
                                  })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          </div>
        )}
      </div>

      <div>
        <div className="fiter_Modal">
          <div className="fiter_Modal_body">
            <div className="fiter_Modal_head d-flex justify-content-between align-items-center">
              <h5>Filters</h5>
              <i className="material-icons closefiltermodal">
                <MdClose />
              </i>
            </div>

            <div className="f-body-warp">
              <div className="cat-blocks">
                <div className="cat_contents">
                  <i className="material-icons cnlbutton">
                    <MdClose />
                  </i>
                  <div className="ticktext">engineering</div>
                </div>
                <div className="cat_contents">
                  <i className="material-icons cnlbutton">
                    <MdClose />
                  </i>
                  <div className="ticktext">Civil engineering</div>
                </div>
                <div className="cat_contents">
                  <i className="material-icons cnlbutton">
                    <MdClose />
                  </i>
                  <div className="ticktext">Electrical Engineering</div>
                </div>
              </div>

              <div className="course-accordion accordion" id="accordionCourse2">
                {/* <div className="accordion-item">
                  <button
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne1m"
                    className="collapsed"
                    aria-expanded="false"
                    fdprocessedid="sxwxf"
                  >
                    Sort by
                  </button>
                  <div
                    id="collapseOne1m"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionCourse2"
                  >
                    <div className="accordion-body" id="stateFilter">
                      <div className="acc_heightbx">
                        <ul className="acc-list " id="state_list">
                          <li>
                            <label htmlFor="r1m" className="customradio">
                              <input
                                type="radio"
                                id="r1m"
                                className="customradioinput"
                                name="test1m"
                              />
                              <div className="radiobx">Median Salary </div>
                            </label>
                          </li>
                          <li>
                            <label htmlFor="r2m" className="customradio">
                              <input
                                type="radio"
                                id="r2m"
                                className="customradioinput"
                                name="test1m"
                              />
                              <div className="radiobx">Andhra Pradesh</div>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <div className="accordion-item">
                  <button
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne2m"
                    className="collapsed"
                    aria-expanded="false"
                    fdprocessedid="sxwxf"
                  >
                    Order by
                  </button>
                  <div
                    id="collapseOne2m"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionCourse2"
                  >
                    <div className="accordion-body" id="stateFilter">
                      <div className="acc_heightbx">
                        <ul className="acc-list " id="state_list">
                          <li>
                            <label htmlFor="r12m" className="customradio">
                              <input
                                type="radio"
                                id="r12m"
                                className="customradioinput"
                                name="test12m"
                              />
                              <div className="radiobx">Percentage </div>
                            </label>
                          </li>
                          <li>
                            <label htmlFor="r22m" className="customradio">
                              <input
                                type="radio"
                                id="r22m"
                                className="customradioinput"
                                name="test12m"
                              />
                              <div className="radiobx">Andhra Pradesh</div>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* <div className="accordion-item">
                  <button
                    className="collapsed1"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree3m"
                    aria-expanded="true"
                    fdprocessedid="cm6dn"
                  >
                    Courses
                  </button>
                  <div
                    id="collapseThree3m"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#accordionCourse2"
                  >
                    <div className="accordion-body" id="ownerShipFilter">
                      <div className="sidebar-widget">
                        <div className="widget-search d-block w-100">
                          <form action="#" className="d-block">
                            <div className="search_block mini">
                              <i className="material-icons sicn">
                                <MdSearch />
                              </i>
                              <input
                                type="text"
                                placeholder="Find Your Course"
                              />
                            </div>
                          </form>
                        </div>
                      </div>

                      <div className="acc_heightbx">
                        <ul className="acc-list " id="ownershipnew">
                          <li>
                            <label htmlFor="r13m" className="customradio">
                              <input
                                type="radio"
                                id="r13m"
                                className="customradioinput"
                                name="test13m"
                              />
                              <div className="radiobx">
                                Computer Science Engineering
                              </div>
                            </label>
                          </li>
                          <li>
                            <label htmlFor="r23m" className="customradio">
                              <input
                                type="radio"
                                id="r23m"
                                className="customradioinput"
                                name="test13m"
                              />
                              <div className="radiobx">
                                Electronics and Communication Engineering
                              </div>
                            </label>
                          </li>
                          <li>
                            <label htmlFor="r33m" className="customradio">
                              <input
                                type="radio"
                                id="r33m"
                                className="customradioinput"
                                name="test13m"
                              />
                              <div className="radiobx">
                                Electrical Engineering
                              </div>
                            </label>
                          </li>

                          <li>
                            <label htmlFor="r34m" className="customradio">
                              <input
                                type="radio"
                                id="r34m"
                                className="customradioinput"
                                name="test13m"
                              />
                              <div className="radiobx">Civil Engineering</div>
                            </label>
                          </li>

                          <li>
                            <label htmlFor="r35m" className="customradio">
                              <input
                                type="radio"
                                id="r35m"
                                className="customradioinput"
                                name="test13m"
                              />
                              <div className="radiobx">
                                Electrical and Electronics Engineering
                              </div>
                            </label>
                          </li>
                          <li>
                            <label htmlFor="r36m" className="customradio">
                              <input
                                type="radio"
                                id="r36m"
                                className="customradioinput"
                                name="test13m"
                              />
                              <div className="radiobx">
                                Mechanical Engineering
                              </div>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <div className="accordion-item">
                  <button
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne4m"
                    className="collapsed"
                    aria-expanded="false"
                    fdprocessedid="sxwxf"
                  >
                    State
                  </button>
                  <div
                    id="collapseOne4m"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionCourse2"
                  >
                    <div className="accordion-body" id="stateFilter">
                      <div className="acc_heightbx">
                        <ul className="acc-list " id="ownershipnew">
                          <li>
                            <label htmlFor="r134m" className="customradio">
                              <input
                                type="radio"
                                id="r134m"
                                className="customradioinput"
                                name="test134m"
                              />
                              <div className="radiobx">
                                Computer Science Engineering{" "}
                              </div>
                            </label>
                          </li>
                          <li>
                            <label htmlFor="r234m" className="customradio">
                              <input
                                type="radio"
                                id="r234m"
                                className="customradioinput"
                                name="test134m"
                              />
                              <div className="radiobx">
                                Electronics and Communication Engineering
                              </div>
                            </label>
                          </li>
                          <li>
                            <label htmlFor="r334m" className="customradio">
                              <input
                                type="radio"
                                id="r334m"
                                className="customradioinput"
                                name="test134m"
                              />
                              <div className="radiobx">
                                Electrical Engineering
                              </div>
                            </label>
                          </li>

                          <li>
                            <label htmlFor="r3334m" className="customradio">
                              <input
                                type="radio"
                                id="r3334m"
                                className="customradioinput"
                                name="test134m"
                              />
                              <div className="radiobx">Civil Engineering</div>
                            </label>
                          </li>

                          <li>
                            <label htmlFor="r354m" className="customradio">
                              <input
                                type="radio"
                                id="r354m"
                                className="customradioinput"
                                name="test134m"
                              />
                              <div className="radiobx">
                                Electrical and Electronics Engineering
                              </div>
                            </label>
                          </li>
                          <li>
                            <label htmlFor="r364m" className="customradio">
                              <input
                                type="radio"
                                id="r364m"
                                className="customradioinput"
                                name="test134m"
                              />
                              <div className="radiobx">
                                Mechanical Engineering
                              </div>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="accordion-item">
                  <button
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne5m"
                    className="collapsed"
                    aria-expanded="false"
                    fdprocessedid="sxwxf"
                  >
                    City
                  </button>
                  <div
                    id="collapseOne5m"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionCourse2"
                  >
                    <div className="accordion-body" id="stateFilter">
                      <div className="acc_heightbx">
                        <ul className="acc-list " id="ownershipnew">
                          <li>
                            <label htmlFor="r1345m" className="customradio">
                              <input
                                type="radio"
                                id="r1345m"
                                className="customradioinput"
                                name="test1345m"
                              />
                              <div className="radiobx">
                                Computer Science Engineering{" "}
                              </div>
                            </label>
                          </li>
                          <li>
                            <label htmlFor="r2345m" className="customradio">
                              <input
                                type="radio"
                                id="r2345m"
                                className="customradioinput"
                                name="test1345m"
                              />
                              <div className="radiobx">
                                Electronics and Communication Engineering
                              </div>
                            </label>
                          </li>
                          <li>
                            <label htmlFor="r3345m" className="customradio">
                              <input
                                type="radio"
                                id="r3345m"
                                className="customradioinput"
                                name="test1345m"
                              />
                              <div className="radiobx">
                                Electrical Engineering
                              </div>
                            </label>
                          </li>

                          <li>
                            <label htmlFor="r3445m" className="customradio">
                              <input
                                type="radio"
                                id="r3445m"
                                className="customradioinput"
                                name="test134m"
                              />
                              <div className="radiobx">Civil Engineering</div>
                            </label>
                          </li>

                          <li>
                            <label htmlFor="r3545m" className="customradio">
                              <input
                                type="radio"
                                id="r3545m"
                                className="customradioinput"
                                name="test134m"
                              />
                              <div className="radiobx">
                                Electrical and Electronics Engineering
                              </div>
                            </label>
                          </li>
                          <li>
                            <label htmlFor="r3645m" className="customradio">
                              <input
                                type="radio"
                                id="r3645m"
                                className="customradioinput"
                                name="test1345m"
                              />
                              <div className="radiobx">
                                Mechanical Engineering
                              </div>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb_container">
          <div
            className="mobile_tab_overlay"
            style={{ display: menuShow ? "block" : "none" }}
          ></div>

          <div className={`tab_con ${menuShow ? "active" : ""}`}>
            <div className="px-3 py-2">
              <div className="d-flex align-items-center mb-2">
                <div className="header-logo" style={{ margin: "auto" }}>
                  <a href="https://collegesuggest.com/">
                    <img
                      alt="College Suggest Logo"
                      title="College Suggest Logo"
                      src="https://collegesuggest.com/assets/images/logo.png"
                    />
                  </a>
                </div>
                <MdClose className="material-icons cls_mobilenav" />
              </div>
              <div
                id="London"
                className="tab"
                value="0"
                style={{
                  display: menuShow
                    ? "block"
                    : "none" || searchShow
                    ? "block"
                    : "none",
                }}
              >
                <div className="bloG-con">
                  <div className="mob-acc-body px-0" id="offcanvasMenu">
                    <div className="mobile-accordiun-wrap">
                      <ul className="main-menu lessons-list">
                        <li>
                          <a href="https://collegesuggest.com/">Home</a>
                        </li>
                        <li>
                          <a href="https://collegesuggest.com/about.html">
                            About
                          </a>
                        </li>

                        <li>
                          <div
                            className="course-accordion accordion"
                            id="accordionCourse4"
                          >
                            <ul className="d-block w-100 p-0">
                              <li>
                                <div className="accordion-item2 ac_it">
                                  <button
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseengineering"
                                  >
                                    <a>engineering</a>
                                  </button>
                                  <div
                                    id="collapseengineering"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionCourse4"
                                  >
                                    <div className="accordion-body ac_bd">
                                      <ul className="link">
                                        <li>
                                          <a
                                            href="https://collegesuggest.com/engineering/top-10-iit-engineering-colleges-in-india.html"
                                            id="topiit"
                                          >
                                            Top 10 IIT engineering Colleges in
                                            india
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="https://collegesuggest.com/engineering/top-10-nit-engineering-colleges-in-india.html"
                                            id="topiit"
                                          >
                                            Top 10 NIT engineering Colleges in
                                            india
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="https://collegesuggest.com/engineering/top-10-iiit-engineering-colleges-in-india.html"
                                            id="topiit"
                                          >
                                            Top 10 IIIT engineering Colleges in
                                            india
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="https://collegesuggest.com/engineering/top-10-gfti-engineering-colleges-in-india.html"
                                            id="topiit"
                                          >
                                            Top 10 GFTI engineering Colleges in
                                            india
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="https://collegesuggest.com/engineering/top-10-government-engineering-colleges-in-india.html"
                                            id="topiit"
                                          >
                                            Top 10 Government engineering
                                            Colleges in india
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="https://collegesuggest.com/engineering/top-10-private-engineering-colleges-in-india.html"
                                            id="topiit"
                                          >
                                            Top 10 Private engineering Colleges
                                            in india
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="accordion-item2 ac_it">
                                  <button
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapsemedical"
                                  >
                                    <a href="#">medical</a>
                                  </button>
                                  <div
                                    id="collapsemedical"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionCourse4"
                                  >
                                    <div className="accordion-body ac_bd">
                                      <ul className="link">
                                        <li>
                                          <a
                                            href="https://collegesuggest.com/medical/top-10-government-medical-colleges-in-india.html"
                                            id="topiit"
                                          >
                                            Top 10 Government medical Colleges
                                            in india
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="https://collegesuggest.com/medical/top-10-private-medical-colleges-in-india.html"
                                            id="topiit"
                                          >
                                            Top 10 Private medical Colleges in
                                            india
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </li>

                              <li>
                                <div className="accordion-item2 ac_it">
                                  <button
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapsedental"
                                  >
                                    <a href="#">dental</a>
                                  </button>
                                  <div
                                    id="collapsedental"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionCourse4"
                                  >
                                    <div className="accordion-body ac_bd">
                                      <ul className="link">
                                        <li>
                                          <a
                                            href="https://collegesuggest.com/dental/top-10-government-dental-colleges-in-india.html"
                                            id="topiit"
                                          >
                                            Top 10 Government dental Colleges in
                                            india
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="https://collegesuggest.com/dental/top-10-private-dental-colleges-in-india.html"
                                            id="topiit"
                                          >
                                            Top 10 Private dental Colleges in
                                            india
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </li>

                              <li>
                                <div className="accordion-item2 ac_it">
                                  <button
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapsearchitecture"
                                  >
                                    <a href="#">architecture</a>
                                  </button>
                                  <div
                                    id="collapsearchitecture"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionCourse4"
                                  >
                                    <div className="accordion-body ac_bd">
                                      <ul className="link">
                                        <li>
                                          <a
                                            href="https://collegesuggest.com/architecture/top-10-iit-architecture-colleges-in-india.html"
                                            id="topiit"
                                          >
                                            Top 10 IIT architecture Colleges in
                                            india
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="https://collegesuggest.com/architecture/top-10-nit-architecture-colleges-in-india.html"
                                            id="topiit"
                                          >
                                            Top 10 NIT architecture Colleges in
                                            india
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="https://collegesuggest.com/architecture/top-10-government-architecture-colleges-in-india.html"
                                            id="topiit"
                                          >
                                            Top 10 Government architecture
                                            Colleges in india
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="https://collegesuggest.com/architecture/top-10-private-architecture-colleges-in-india.html"
                                            id="topiit"
                                          >
                                            Top 10 Private architecture Colleges
                                            in india
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </li>

                              <li>
                                <div className="accordion-item2 ac_it">
                                  <button
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapsepharmacy"
                                  >
                                    <a href="#">pharmacy</a>
                                  </button>
                                  <div
                                    id="collapsepharmacy"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionCourse4"
                                  >
                                    <div className="accordion-body ac_bd">
                                      <ul className="link">
                                        <li>
                                          <a
                                            href="https://collegesuggest.com/pharmacy/top-10-government-pharmacy-colleges-in-india.html"
                                            id="topiit"
                                          >
                                            Top 10 Government pharmacy Colleges
                                            in india
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="https://collegesuggest.com/pharmacy/top-10-private-pharmacy-colleges-in-india.html"
                                            id="topiit"
                                          >
                                            Top 10 Private pharmacy Colleges in
                                            india
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </li>

                              <li>
                                <div className="accordion-item2 ac_it">
                                  <button
                                    className="collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseexam"
                                  >
                                    <a href="#">Exams</a>
                                  </button>
                                  <div
                                    id="collapseexam"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionCourse4"
                                  >
                                    <div className="accordion-body ac_bd">
                                      <ul className="link">
                                        <li>
                                          <a href="https://collegesuggest.com/engineering-exam/entrance-exams.html">
                                            engineering Exam
                                          </a>
                                        </li>
                                        <li>
                                          <a href="https://collegesuggest.com/medical-exam/entrance-exams.html">
                                            medical Exam
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </li>

                        <li>
                          {" "}
                          <a href="https://collegesuggest.com/rankPredictor.html">
                            Predictions
                          </a>
                        </li>
                        <li>
                          {" "}
                          <a href="https://collegesuggest.com/contact.html">
                            Contact
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div
                id="Paris"
                className="tab"
                value="1"
                style={{
                  display: menuShow
                    ? "block"
                    : "none" || searchShow
                    ? "block"
                    : "none",
                }}
              >
                <div className="d-flex border-bottom border-light mb-2">
                  <h3 className="menu-title">Search</h3>
                </div>
                <div className="from-group align-items-center s_bcon">
                  <div className="form-outline d-flex custom_bar">
                    <input
                      type="text"
                      name="searchTheCollege"
                      id="searchTheCollege"
                      placeholder="Search Colleges &amp; more"
                      className="mb-0"
                    />
                    <i className="material-icons s_cur">
                      <MdSearch />
                    </i>
                  </div>
                  <div id="searchresult"></div>
                </div>
              </div>
            </div>
          </div>

          <ul className="mb_warp_bx">
            <li
              className="block m_block_list d-flex align-items-center justify-content-center tab-control elements"
              value="0"
              onClick={handleMenu}
            >
              <i className="material-icons m_nav_icn me-1">
                <MdMenu />
              </i>
              <p className="text-center m_nav_txt">Menu</p>
            </li>
            <li
              className="block m_block_list d-flex align-items-center justify-content-center tab-control elements"
              value="1"
              onClick={() => setSearchShow(!searchShow)}
            >
              <i className="material-icons  m_nav_icn me-1">
                <MdSearch />
              </i>
              <p className="text-center m_nav_txt">search</p>
            </li>
            <li className="block d-flex align-items-center justify-content-center">
              <button className="openpop">
                <i className="material-icons vm me-2">
                  <MdFilterList />
                </i>
                Filters
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
