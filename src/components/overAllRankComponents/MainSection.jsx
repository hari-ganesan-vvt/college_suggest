import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
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
import predictorList from "../../models/predictorListModel";
import Loading from "../Loading";
import Comparison from "./Comparison";
import MainCard from "./MainCard";
import * as Yup from "yup";

const MainSection = ({ getValueData, onChange }) => {
  const selectRecommended = useSelector(
    (state) => state.filterChange.predictorChangeData
  );

  //initial values
  const initialState = {
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
  };

  //state
  const [courseList, setCourseList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [casteList, setCasteList] = useState([]);
  const [collegeList, setCollegeList] = useState([]);

  const [filterByCollege, setFilterByCollege] = useState(initialState);
  const [initialValues, setInitialValues] = useState(getValueData);
  const [loading, setLoading] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [filterMobileShow, setFilterMobileShow] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  //findValues && selectedValues
  const findFormState = stateList.find(
    (state) => state.stateId === parseInt(initialValues?.stateId)
  );
  const selectedStateValue = stateList.find(
    (state) => state.stateId === parseInt(filterByCollege.filterStateId)
  );

  const selectedCourseValue = courseList.find(
    (course) => course.courseId === parseInt(filterByCollege.courseList)
  );

  //responseData
  const fetchDataFilter = (data) => {
    let college = _.uniqBy(data, "cs_collegename");

    for (let i = 0; i < college.length; i++) {
      let allCourseBasedList = [];
      let filterCourse = [];
      let collegeData = _.filter(data, (e) => {
        return e.cs_collegename === college[i].cs_collegename;
      });

      for (let department of collegeData) {
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
              return (
                Number(e.j_closing_rank) &&
                (e.jFees.length > 0 ? Number(e.jFees) : 0)
              );
            })
            .value();

          allCourseBasedList.push({
            [`${course.j_closing_rank}`]: {
              j_course_name: course.j_course,
              jFees: course.jFees,
              jSeats: course.jSeats,
              cSno: course.cs_sno,
              collegeId: course.collegeId,
              seatId: course.seatId,
              genderId: course.genderId,
              courseID: course.courseID,
              quotaId: course.quotaId,
            },
          });
        }
      }
      college[i].j_course = _.sortBy(allCourseBasedList, (obj) =>
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
      const response = await predictorList.formSubmitData(initialValues);
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

  //CasteList
  const predictorCasteList = async () => {
    try {
      const response = await predictorList.casteList();
      setCasteList(response.data.predictorCasteList);
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

  //handlerFunctions
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

  const handleFilter = (name, value) => {
    setFilterByCollege({ ...filterByCollege, [name]: value });
  };

  const updateRecommended = () => {
    setFilterByCollege({
      ...filterByCollege,
      sortBy: "medianSalary",
      orderBy: "asc",
    });
  };

  //validation
  const validationSchema = Yup.object().shape({
    rankType: Yup.string().required("Rank Type is required!"),
    rankId: Yup.string().required("Rank is required!"),
    stateId: Yup.string().required("State is required!"),
    casteId: Yup.string().required("Caste is required!"),
    genderId: Yup.string().required("Gender is required!"),
  });

  //formik
  const { values, handleChange, errors, touched, handleSubmit } = useFormik({
    initialValues: {
      rankType: initialValues?.rankType,
      rankId: initialValues?.rankId,
      stateId: initialValues?.stateId,
      casteId: initialValues?.casteId,
      genderId: initialValues?.genderId,
      abled: initialValues?.abled,
    },
    validationSchema,
    onSubmit: (values) => {
      setInitialValues(values);
      onChange();
    },
  });

  //component Mounding && updateding
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
  }, [filterByCollege, initialValues]);

  // useEffect(() => {
  //   if (selectRecommended === "RECOMMENDED_UPDATED") {
  //     updateRecommended();
  //   } else if (
  //     (selectRecommended === "MEDIUM_UPDATED" &&
  //       filterByCollege.sortBy.length > 0) ||
  //     filterByCollege.orderBy.length > 0
  //   ) {
  //     setFilterByCollege({
  //       ...filterByCollege,
  //       sortBy: "",
  //       orderBy: "",
  //     });
  //   }
  // }, [selectRecommended]);
  useEffect(() => {
    window.sessionStorage.setItem("_values", JSON.stringify(initialValues));
  }, [initialValues]);

  useEffect(() => {
    predictorStateList();
    predictorcourseList();
    predictorCasteList();
  }, []);

  return (
    <>
      <section className="main_sec">
        <div className="container ">
          {loading ? (
            <Loading />
          ) : error ? (
            <div>{error}</div>
          ) : (
            <>
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
                              updateRecommended={updateRecommended}
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
                          <button
                            className="e_btn"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalFullscreenMd"
                            // onClick={updateRecommended}
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
                            <div
                              className="ticktext"
                              style={{ maxWidth: "100%" }}
                            >
                              {initialValues?.rankId}
                            </div>
                          </div>
                          <div className="catticked" id="">
                            <span
                              className="material-icons cnlbutton"
                              style={{ color: "#119d78" }}
                            >
                              <MdHouse />
                            </span>
                            <div
                              className="ticktext"
                              style={{ maxWidth: "100%" }}
                            >
                              {findFormState?.stateName}
                            </div>
                          </div>
                          <div className="catticked" id="">
                            <span
                              className="material-icons cnlbutton"
                              style={{ color: "#119d78" }}
                            >
                              {initialValues?.genderId === "1" ? (
                                <MdMale />
                              ) : initialValues?.genderId === "2" ? (
                                <MdFemale />
                              ) : null}
                            </span>

                            <div
                              className="ticktext"
                              style={{ maxWidth: "100%" }}
                            >
                              {initialValues?.genderId === "1"
                                ? "Male"
                                : "Female"}
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

                            <div
                              className="ticktext"
                              style={{ maxWidth: "100%" }}
                            >
                              {initialValues?.casteId}
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
                                  {
                                    selectedCourseValue?.courseName.split(
                                      "("
                                    )[0]
                                  }
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
                                    onClick={() =>
                                      handleFilter("orderBy", "asc")
                                    }
                                  >
                                    <label htmlFor="r1" className="customradio">
                                      <input
                                        type="radio"
                                        className="customradioinput"
                                        // name="orderBy"
                                        // value="asc"
                                        checked={
                                          filterByCollege.orderBy == "asc"
                                        }
                                        readOnly
                                      />
                                      <div className="radiobx">Ascending </div>
                                    </label>
                                  </li>
                                  <li
                                    onClick={() =>
                                      handleFilter("orderBy", "desc")
                                    }
                                  >
                                    <label htmlFor="r2" className="customradio">
                                      <input
                                        type="radio"
                                        className="customradioinput"
                                        // name="orderBy"
                                        // value="desc"
                                        checked={
                                          filterByCollege.orderBy == "desc"
                                        }
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
                                    <label
                                      htmlFor="r12"
                                      className="customradio"
                                    >
                                      <input
                                        type="radio"
                                        className="customradioinput"
                                        checked={
                                          filterByCollege.sortBy ===
                                          "closingRank"
                                        }
                                        readOnly
                                      />
                                      <div className="radiobx">
                                        Closing Rank
                                      </div>
                                    </label>
                                  </li>
                                  <li
                                    onClick={() =>
                                      handleFilter("sortBy", "nirfRank")
                                    }
                                  >
                                    <label
                                      htmlFor="r13"
                                      className="customradio"
                                    >
                                      <input
                                        type="radio"
                                        className="customradioinput"
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
                                    <label
                                      htmlFor="r22"
                                      className="customradio"
                                    >
                                      <input
                                        type="radio"
                                        className="customradioinput"
                                        checked={
                                          filterByCollege.sortBy ===
                                          "medianSalary"
                                        }
                                        readOnly
                                      />
                                      <div className="radiobx">
                                        Median Salary
                                      </div>
                                    </label>
                                  </li>
                                  <li
                                    onClick={() =>
                                      handleFilter("sortBy", "placement")
                                    }
                                  >
                                    <label
                                      htmlFor="r24"
                                      className="customradio"
                                    >
                                      <input
                                        type="radio"
                                        className="customradioinput"
                                        checked={
                                          filterByCollege.sortBy == "placement"
                                        }
                                        readOnly
                                      />
                                      <div className="radiobx">Placement</div>
                                    </label>
                                  </li>
                                  <li
                                    onClick={() =>
                                      handleFilter("sortBy", "fees")
                                    }
                                  >
                                    <label
                                      htmlFor="r25"
                                      className="customradio"
                                    >
                                      <input
                                        type="radio"
                                        className="customradioinput"
                                        checked={
                                          filterByCollege.sortBy == "fees"
                                        }
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
                            <div
                              className="accordion-body"
                              id="ownerShipFilter"
                            >
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
                                    stateList.map((stateItem, index) => {
                                      return (
                                        <li
                                          key={index}
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
                                                className="customradioinput"
                                                checked={
                                                  filterByCollege.cityId ==
                                                  city.cityId
                                                }
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

              {/* comparison */}
              <Comparison />
              {/* compare Modal list button */}
              <div
                className="modal fade predictSearchModal"
                id="exampleModalXl2"
                tabIndex="-1"
                aria-labelledby="exampleModalXlLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog comparedialog modal-xl">
                  <div className="modal-content">
                    <div className="modal-header headcustomcompare">
                      <h5
                        className="modal-title h4 comp_data"
                        id="exampleModalXlLabel"
                      >
                        Select colleges to Compare
                      </h5>
                      <i
                        className="material-icons closecomparebtn_custom"
                        id="selectCollegeClose"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <MdClose />
                      </i>
                    </div>
                    <div className="modal-body overflow-hidden comparelistboxheight">
                      <div className="search_block">
                        <i className="material-icons sicn">
                          <MdSearch />
                        </i>
                        <input
                          type="text"
                          placeholder="Find Your Colleges"
                          id="searchPredictCollege"
                        />
                        <div
                          className="s_list_modal listheight"
                          id="searchCollegeList"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* mobile filter modal */}
        <div>
          <div className={`fiter_Modal ${filterMobileShow ? "active" : " "}`}>
            <div className="fiter_Modal_body">
              <div className="fiter_Modal_head d-flex justify-content-between align-items-center">
                <h5>Filters</h5>
                <i
                  className="material-icons closefiltermodal"
                  onClick={() => setFilterMobileShow(false)}
                >
                  <MdClose />
                </i>
              </div>

              <div className="d-block" style={{ padding: "0px 20px" }}>
                <div className="cat-show-box" id="formValues">
                  <div className="catticked" id="">
                    <span
                      className="material-icons cnlbutton"
                      style={{ color: "#119d78" }}
                    >
                      <MdVerified />
                    </span>
                    <div className="ticktext" style={{ maxWidth: "100%" }}>
                      {initialValues?.rankId}
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
                      {initialValues?.genderId === "1" ? (
                        <MdMale />
                      ) : initialValues?.genderId === "2" ? (
                        <MdFemale />
                      ) : null}
                    </span>

                    <div className="ticktext" style={{ maxWidth: "100%" }}>
                      {initialValues?.genderId === "1" ? "Male" : "Female"}
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
                      {initialValues?.casteId}
                    </div>
                  </div>
                  {/* <div className="catticked" id="">
                    <span
                      className="material-icons cnlbutton"
                      style={{ color: "#119d78" }}
                    >
                      <MdVerified />
                    </span>
                    <div className="ticktext" style={{ maxWidth: "100%" }}>
                      15000
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
                      TamilNadu
                    </div>
                  </div>
                  <div className="catticked" id="">
                    <span
                      className="material-icons cnlbutton"
                      style={{ color: "#119d78" }}
                    >
                      <MdMale />
                    </span>
                    <div className="ticktext" style={{ maxWidth: "100%" }}>
                      Male
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
                      OPEN
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="f-body-warp">
                {filterByCollege?.filterStateId.length > 0 ||
                filterByCollege?.courseList.length > 0 ||
                filterByCollege?.sortBy.length > 0 ||
                filterByCollege?.orderBy.length > 0 ? (
                  <div className="cat-blocks">
                    <div className="cat_contents">
                      <i className="material-icons cnlbutton">
                        <MdClose />
                      </i>
                      <div className="ticktext">Clear All</div>
                    </div>
                    {filterByCollege.orderBy && (
                      <div className="cat_contents">
                        <i
                          className="material-icons cnlbutton"
                          onClick={() =>
                            setFilterByCollege({
                              ...filterByCollege,
                              orderBy: "",
                            })
                          }
                        >
                          <MdClose />
                        </i>
                        <div className="ticktext">
                          {filterByCollege.orderBy == "asc"
                            ? "Ascending"
                            : "Decending"}
                        </div>
                      </div>
                    )}

                    {filterByCollege.sortBy && (
                      <div className="cat_contents">
                        <i
                          className="material-icons cnlbutton"
                          onClick={() =>
                            setFilterByCollege({
                              ...filterByCollege,
                              sortBy: "",
                            })
                          }
                        >
                          <MdClose />
                        </i>
                        <div className="ticktext">
                          {" "}
                          {filterByCollege?.sortBy}
                        </div>
                      </div>
                    )}

                    {selectedCourseValue?.courseName && (
                      <div className="cat_contents">
                        <i
                          className="material-icons cnlbutton"
                          onClick={() =>
                            setFilterByCollege({
                              ...filterByCollege,
                              courseList: "",
                            })
                          }
                        >
                          <MdClose />
                        </i>
                        <div className="ticktext">
                          {selectedCourseValue?.courseName.split("(")[0]}
                        </div>
                      </div>
                    )}

                    {selectedStateValue?.stateName && (
                      <div className="cat_contents">
                        <i
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
                        </i>
                        <div className="ticktext">
                          {" "}
                          {selectedStateValue?.stateName}
                        </div>
                      </div>
                    )}

                    {filterByCollege.cityId.length > 0 && (
                      <div className="cat_contents">
                        <i
                          className="material-icons cnlbutton"
                          onClick={() =>
                            setFilterByCollege({
                              ...filterByCollege,
                              cityId: "",
                            })
                          }
                        >
                          <MdClose />
                        </i>
                        <div className="ticktext">
                          {" "}
                          {collegeList[0]?.cityName}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}

                <div
                  className="course-accordion accordion"
                  id="accordionCourse2"
                >
                  <div className="accordion-item">
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
                            <li onClick={() => handleFilter("orderBy", "asc")}>
                              <label htmlFor="r1m" className="customradio">
                                <input
                                  type="radio"
                                  id="r1m"
                                  className="customradioinput"
                                  checked={filterByCollege.orderBy == "asc"}
                                  readOnly
                                />
                                <div className="radiobx">Ascending </div>
                              </label>
                            </li>
                            <li onClick={() => handleFilter("orderBy", "desc")}>
                              <label htmlFor="r2m" className="customradio">
                                <input
                                  type="radio"
                                  id="r2m"
                                  className="customradioinput"
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
                            <li
                              onClick={() =>
                                handleFilter("sortBy", "closingRank")
                              }
                            >
                              <label htmlFor="r12m" className="customradio">
                                <input
                                  type="radio"
                                  id="r12m"
                                  className="customradioinput"
                                  checked={
                                    filterByCollege.sortBy === "closingRank"
                                  }
                                  readOnly
                                />
                                <div className="radiobx">Closing Rank </div>
                              </label>
                            </li>
                            <li
                              onClick={() => handleFilter("sortBy", "nirfRank")}
                            >
                              <label htmlFor="r22m" className="customradio">
                                <input
                                  type="radio"
                                  id="r22m"
                                  className="customradioinput"
                                  checked={
                                    filterByCollege.sortBy === "nirfRank"
                                  }
                                  readOnly
                                />
                                <div className="radiobx">NIRF Rank</div>
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
                                  checked={
                                    filterByCollege.sortBy == "placement"
                                  }
                                  readOnly
                                />
                                <div className="radiobx">Placement</div>
                              </label>
                            </li>
                            <li onClick={() => handleFilter("sortBy", "fees")}>
                              <label htmlFor="r25" className="customradio">
                                <input
                                  type="radio"
                                  className="customradioinput"
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
                            {stateList &&
                              stateList.map((stateItem, index) => {
                                return (
                                  <li
                                    key={index}
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
                                          className="customradioinput"
                                          checked={
                                            filterByCollege.cityId ==
                                            city.cityId
                                          }
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
          </div>

          <div className="mb_container">
            <div
              className="mobile_tab_overlay"
              style={{
                display: menuShow ? "block" : "none",
              }}
            ></div>

            <div
              className={`tab_con ${
                menuShow ? "active" : "" || searchShow ? "active" : ""
              }`}
            >
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
                  <MdClose
                    className="material-icons cls_mobilenav"
                    onClick={() => {
                      setMenuShow(false);
                      setSearchShow(false);
                    }}
                  />
                </div>
                <div
                  id="London"
                  className="tab"
                  value="0"
                  style={{
                    display: menuShow ? "block" : "none",
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
                                              Top 10 IIIT engineering Colleges
                                              in india
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://collegesuggest.com/engineering/top-10-gfti-engineering-colleges-in-india.html"
                                              id="topiit"
                                            >
                                              Top 10 GFTI engineering Colleges
                                              in india
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
                                              Top 10 Private engineering
                                              Colleges in india
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
                                              Top 10 Government dental Colleges
                                              in india
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
                                              Top 10 IIT architecture Colleges
                                              in india
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://collegesuggest.com/architecture/top-10-nit-architecture-colleges-in-india.html"
                                              id="topiit"
                                            >
                                              Top 10 NIT architecture Colleges
                                              in india
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
                                              Top 10 Private architecture
                                              Colleges in india
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
                                              Top 10 Government pharmacy
                                              Colleges in india
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://collegesuggest.com/pharmacy/top-10-private-pharmacy-colleges-in-india.html"
                                              id="topiit"
                                            >
                                              Top 10 Private pharmacy Colleges
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
                            <a href="https://collegesuggest.com/rankPredictor.html">
                              Predictions
                            </a>
                          </li>
                          <li>
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
                    display: searchShow ? "block" : "none",
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
                onClick={() => {
                  setMenuShow(true);
                  setSearchShow(false);
                }}
              >
                <i className="material-icons m_nav_icn me-1">
                  <MdMenu />
                </i>
                <p className="text-center m_nav_txt">Menu</p>
              </li>
              <li
                className={`block m_block_list d-flex align-items-center justify-content-center tab-control elements ${
                  searchShow ? "active" : " "
                }`}
                value="1"
                onClick={() => setSearchShow(true)}
              >
                <i className="material-icons  m_nav_icn me-1">
                  <MdSearch />
                </i>
                <p className="text-center m_nav_txt">search</p>
              </li>
              <li className="block d-flex align-items-center justify-content-center">
                <button
                  className="openpop"
                  onClick={() => setFilterMobileShow(true)}
                >
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

      {/* Edit Modal */}
      <div
        className="modal fade p-0"
        id="exampleModalFullscreenMd"
        tabIndex="-1"
        aria-labelledby="exampleModalFullscreenMdLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen-md-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title edittitle h4 text-dark"
                id="exampleModalFullscreenMdLabel"
              >
                <MdModeEdit className="m-edit-icon cnlbutton vm text-dark me-1" />
                Edit
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="tabbx">
                <ul
                  className="tabbxhead nav nav-pills"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected=""
                    >
                      Value Based
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link "
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected=""
                    >
                      Course Based
                    </button>
                  </li>
                </ul>

                <div className="tabblock p-4">
                  <h3>Enter JEE Main Paper 1 Exam Details</h3>

                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <div className="tab_warp">
                        <div className="fromblock d-block">
                          <form
                            method="POST"
                            id="valueForm"
                            onSubmit={handleSubmit}
                            className="needs-validation"
                            noValidate
                          >
                            <div className="chectop mt-2 mb-2">
                              <label htmlFor="r1" className="customradio">
                                <input
                                  type="radio"
                                  id="r1"
                                  className="customradioinput"
                                  name="rankType"
                                  value="Category Rank"
                                  checked={values.rankType === "Category Rank"}
                                  onChange={handleChange}
                                />
                                <div className="radiobx">Category Rank</div>
                              </label>
                              <label htmlFor="r2" className="customradio">
                                <input
                                  type="radio"
                                  id="r2"
                                  className="customradioinput"
                                  name="rankType"
                                  value="General Rank"
                                  checked={values.rankType === "General Rank"}
                                  onChange={handleChange}
                                />
                                <div className="radiobx">General Rank</div>
                              </label>
                            </div>
                            <div className="form-row">
                              <label htmlFor="#">
                                JEE Main Paper 1 &nbsp;
                                <span id="rankType" name="rankType">
                                  {values?.rankType}
                                </span>
                              </label>
                              <input
                                type="text"
                                id="rank"
                                name="rankId"
                                placeholder="Enter Your Rank"
                                onChange={handleChange}
                                value={values.rankId}
                                // onkeypress="return onlyNumberKey(event)"
                              />
                            </div>
                            <div className="form-row">
                              <label htmlFor="#">Select your Home State</label>
                              <select
                                id="stateName"
                                name="stateId"
                                className="form-select"
                                aria-label="Default select example"
                                onChange={handleChange}
                                value={values.stateId}
                                // onchange="hiddenState()"
                              >
                                <option value={"DEFAULT"} disabled>
                                  Select your Home State
                                </option>
                                {stateList &&
                                  stateList.map((state) => (
                                    <option
                                      value={state.stateId}
                                      key={state.stateId}
                                    >
                                      {state.stateName}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="form-row">
                              <label htmlFor="#">Caste Group</label>
                              <select
                                id="casteName"
                                name="casteId"
                                className="form-select"
                                aria-label="Default select example"
                                onChange={handleChange}
                                value={values.casteId}
                              >
                                <option value={"DEFAULT"} disabled>
                                  Select Caste
                                </option>
                                {casteList &&
                                  casteList.map((caste, i) => (
                                    <option value={caste.casteName} key={i}>
                                      {caste.casteName}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="form-row">
                              <label htmlFor="#">Gender</label>
                              <div className="chectop m-0">
                                <label htmlFor="r4" className="customradio">
                                  <input
                                    type="radio"
                                    id="r4"
                                    className="customradioinput"
                                    name="genderId"
                                    value="2"
                                    checked={values.genderId === "2"}
                                    onChange={handleChange}
                                  />
                                  <div className="radiobx">Female</div>
                                </label>
                                <label htmlFor="r5" className="customradio">
                                  <input
                                    type="radio"
                                    id="r5"
                                    className="customradioinput"
                                    name="genderId"
                                    value="1"
                                    checked={values.genderId === "1"}
                                    onChange={handleChange}
                                  />
                                  <div className="radiobx">Male</div>
                                </label>
                              </div>
                            </div>
                            <div className="form-row">
                              <label htmlFor="#">
                                Are You Specially Abled?
                              </label>
                              <div className="chectop m-0">
                                <label htmlFor="r6" className="customradio">
                                  <input
                                    type="radio"
                                    id="r6"
                                    className="customradioinput"
                                    name="abled"
                                    value="1"
                                    checked={values.abled === "1"}
                                    onChange={handleChange}
                                  />
                                  <div className="radiobx">Yes</div>
                                </label>
                                <label htmlFor="r7" className="customradio">
                                  <input
                                    type="radio"
                                    id="r7"
                                    className="customradioinput"
                                    name="abled"
                                    value="0"
                                    checked={values.abled === "0"}
                                    onChange={handleChange}
                                  />
                                  <div className="radiobx">No</div>
                                </label>
                              </div>
                            </div>

                            <input
                              type="submit"
                              data-bs-dismiss="modal"
                              className="clg-sug-primebtn mt-2 submitbtn"
                              // onclick="rankScorePercentage()"
                              value="Submit"
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade "
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                    >
                      <div className="tab_warp">
                        <div className="fromblock d-block">
                          <form method="POST" id="courseForm">
                            <div
                              className="chectop"
                              style={{ marginBottom: "25px" }}
                            >
                              <label htmlFor="r11" className="customradio">
                                <input
                                  type="radio"
                                  id="r11"
                                  className="customradioinput"
                                  name="rankType"
                                  value="Category Rank"
                                  checked={values.rankType === "Category Rank"}
                                  onChange={handleChange}
                                />
                                <div className="radiobx">Category Rank</div>
                              </label>
                              <label htmlFor="r12" className="customradio">
                                <input
                                  type="radio"
                                  id="r12"
                                  className="customradioinput"
                                  name="rankType"
                                  value="Genaral Rank"
                                  checked={values.rankType === "Genaral Rank"}
                                  onChange={handleChange}
                                />
                                <div className="radiobx">General Rank</div>
                              </label>
                            </div>
                            <div className="form-row">
                              <label htmlFor="#">
                                JEE Main Paper 1&nbsp;
                                <span id="csrankType" name="rankType">
                                  Category Rank
                                </span>
                              </label>
                              <input
                                type="text"
                                id="courseRank"
                                name="rankId"
                                placeholder="Enter Your Rank"
                                onChange={handleChange}
                                value={values.rankId}
                                // onkeypress="return onlyNumberKey(event)"
                              />
                            </div>
                            <div className="form-row">
                              <label htmlFor="#">Course</label>
                              <select
                                id="courseList"
                                name="courseList"
                                className="form-select"
                                aria-label="Default select example"
                              >
                                <option value={"DEFAULT"} disabled>
                                  Select course
                                </option>
                                {courseList &&
                                  courseList.map((course) => (
                                    <option
                                      value={course.courseId}
                                      key={course.courseId}
                                    >
                                      {course.courseName}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="form-row">
                              <label htmlFor="#">Select your Home State</label>
                              <select
                                id="courseStateName"
                                name="stateName"
                                className="form-select"
                                aria-label="Default select example"
                                onChange={handleChange}
                                value={values.stateId}
                                // onchange="hiddenState()"
                              >
                                <option>Select your Home State</option>
                                {stateList &&
                                  stateList.map((state) => (
                                    <option
                                      value={state.stateId}
                                      key={state.stateId}
                                    >
                                      {state.stateName}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="form-row">
                              <label htmlFor="#">Caste Group</label>
                              <select
                                id="courseCasteName"
                                name="casteId"
                                className="form-select"
                                aria-label="Default select example"
                                onChange={handleChange}
                                value={values.casteId}
                              >
                                <option value={"DEFAULT"} disabled>
                                  Select Caste
                                </option>
                                {casteList &&
                                  casteList.map((caste, i) => (
                                    <option value={caste.casteName} key={i}>
                                      {caste.casteName}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="form-row">
                              <label htmlFor="#">Gender</label>
                              <div className="chectop m-0">
                                <label htmlFor="r41" className="customradio">
                                  <input
                                    type="radio"
                                    id="r41"
                                    className="customradioinput"
                                    name="genderId"
                                    value="2"
                                    checked={values.genderId === "2"}
                                    onChange={handleChange}
                                  />
                                  <div className="radiobx">Female</div>
                                </label>
                                <label htmlFor="r51" className="customradio">
                                  <input
                                    type="radio"
                                    id="r51"
                                    className="customradioinput"
                                    name="genderId"
                                    value="1"
                                    checked={values.genderId === "1"}
                                    onChange={handleChange}
                                  />
                                  <div className="radiobx">Male</div>
                                </label>
                              </div>
                            </div>
                            <div className="form-row">
                              <label htmlFor="#">
                                Are You Specially Abled?
                              </label>
                              <div className="chectop m-0">
                                <label htmlFor="r61" className="customradio">
                                  <input
                                    type="radio"
                                    id="r61"
                                    className="customradioinput"
                                    name="abled"
                                    value="1"
                                    checked={values.abled === "1"}
                                    onChange={handleChange}
                                  />
                                  <div className="radiobx">Yes</div>
                                </label>
                                <label htmlFor="r71" className="customradio">
                                  <input
                                    type="radio"
                                    id="r71"
                                    className="customradioinput"
                                    name="abled"
                                    value="0"
                                    checked={values.abled === "0"}
                                    onChange={handleChange}
                                  />
                                  <div className="radiobx">No</div>
                                </label>
                              </div>
                            </div>

                            <input
                              type="button"
                              className="clg-sug-primebtn submitbtn close"
                              data-bs-dismiss="modal"
                              // onclick="courseBased()"
                              name="course"
                              value="Submit"
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSection;
