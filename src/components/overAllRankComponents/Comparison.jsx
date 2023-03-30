import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdCompareArrows, MdOutlineAddCircle, MdClose } from "react-icons/md";
import predictorList from "../../models/predictorListModel";
import { RemoveToCompare } from "../../redux/Action/compareAction";

const Comparison = () => {
  const dispatch = useDispatch();
  const compareItem = useSelector((state) => state.compare.compareItem);
  const user = useSelector((state) => state.userLogin.userInfo);

  const [comparedValues, setComparedValues] = useState([]);

  const compareRemove = () => {
    const comparedItem = {
      collegeId: 10,
      userId: 452,
    };
    dispatch(RemoveToCompare(comparedItem));
  };
  useEffect(() => {
    const getComparedList = async () => {
      const response = await predictorList.comparisonCollege(user.userId);
      setComparedValues(response.data.predictorCompareCollegeDetails);
      window.localStorage.setItem(
        "compareItems",
        JSON.stringify(response.data.predictorCompareCollegeDetails)
      );
    };
    getComparedList();
  }, [compareItem]);

  console.log("comparedValues", comparedValues);
  return (
    <div>
      <button
        className="comparrison_btn2 modal-toggle"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalXl1"
        title="Click Comparision to Add colleges"
      >
        <div id="compra_warp1">
          <div className="compra_warp2">
            <span className="CM_text2 mobilehide">Comparison</span>
            <span className="material-icons c_arrows2">
              <MdCompareArrows />
            </span>

            <div className="nos2" id="cc_count">
              {comparedValues.length}
            </div>
          </div>
        </div>
      </button>
      <div
        className="modal fade"
        id="exampleModalXl1"
        tabIndex="-1"
        aria-labelledby="exampleModalXlLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog comparedialog modal-xl">
          <div className="modal-content">
            <div className="modal-header headcustomcompare">
              <h5 className="modal-title h4 comp_data" id="exampleModalXlLabel">
                Colleges in your compare queue
              </h5>
              <i
                className="material-icons closecomparebtn_custom"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <MdClose />
              </i>
            </div>
            <div className="compareTmp_Data" id="compareListData">
              <div className="modal-body overflow-hidden p-0">
                <div className="mb_wrap2">
                  {comparedValues.length === 1 ? (
                    comparedValues.map((compared, i) => {
                      return (
                        <React.Fragment key={i}>
                          <div className="mb_wrap_cols2 first">
                            <div className="mb_wrap_colsinbx2">
                              <div className="added_clgbx2" id="box10">
                                <div className="d-block rel">
                                  <a
                                    className="close_com_img2"
                                    data-boxes="box10"
                                    onClick={compareRemove}
                                  >
                                    <MdClose />
                                  </a>

                                  <div className="added_collegescontent2">
                                    <div className="logobx2">
                                      <img
                                        src={`https://collegesuggest.com//assets/images/${compared.collegeLogo}`}
                                        alt=""
                                      />
                                    </div>
                                    <p className="text22">
                                      {compared.collegeName}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mb_wrap_cols2 ">
                            <div className="mb_wrap_colsinbx2">
                              <a
                                href="#"
                                className="adderlistbtn"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalXl2"
                              >
                                <i className="material-icons c_icn">
                                  <MdOutlineAddCircle />
                                </i>
                              </a>
                            </div>
                          </div>
                          <div className="mb_wrap_cols2 mobilehide">
                            <div className="mb_wrap_colsinbx2">
                              <a
                                href="#"
                                className="adderlistbtn"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalXl2"
                              >
                                <i className="material-icons c_icn">
                                  <MdOutlineAddCircle />
                                </i>
                              </a>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })
                  ) : comparedValues.length === 2 ? (
                    comparedValues.map((compared, i) => {
                      return (
                        <>
                          <div className="mb_wrap_cols2 sec" key={i}>
                            <div className="mb_wrap_colsinbx2">
                              <a
                                href="#"
                                className="adderlistbtn"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalXl2"
                              >
                                <i className="material-icons c_icn">
                                  <MdOutlineAddCircle />
                                </i>
                              </a>
                              <div className="added_clgbx2" id="box10">
                                <div className="d-block rel">
                                  <a
                                    className="close_com_img2"
                                    data-boxes="box10"
                                  >
                                    <MdClose />
                                  </a>

                                  <div className="added_collegescontent2">
                                    <div className="logobx2">
                                      <img
                                        src={`https://collegesuggest.com/assets/images/${compared.collegeLogo}`}
                                        alt="collegeLogo"
                                      />
                                    </div>
                                    <p className="text22">
                                      {compared.collegeName}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : comparedValues.length === 3 ? (
                    comparedValues.map((compared, i) => {
                      console.log(compared.collegeId);
                      return (
                        <>
                          <div className="mb_wrap_cols2 third" key={i}>
                            <div className="mb_wrap_colsinbx2">
                              <a
                                href="#"
                                className="adderlistbtn"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalXl2"
                              >
                                <i className="material-icons c_icn">
                                  <MdOutlineAddCircle />
                                </i>
                              </a>
                              <div className="added_clgbx2" id="box10">
                                <div className="d-block rel">
                                  <a
                                    className="close_com_img2"
                                    data-boxes="box10"
                                    onClick={compareRemove}
                                  >
                                    <MdClose />
                                  </a>

                                  <div className="added_collegescontent2">
                                    <div className="logobx2">
                                      <img
                                        src={`https://collegesuggest.com/assets/images/${compared.collegeLogo}`}
                                        alt=""
                                      />
                                    </div>
                                    <p className="text22">
                                      {compared.collegeName}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <React.Fragment>
                      <div className="mb_wrap_cols2 default">
                        <div className="mb_wrap_colsinbx2">
                          <a
                            href="#"
                            className="adderlistbtn"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalXl2"
                          >
                            <i className="material-icons c_icn">
                              <MdOutlineAddCircle />
                            </i>
                          </a>
                        </div>
                      </div>
                      <div className="mb_wrap_cols2 ">
                        <div className="mb_wrap_colsinbx2">
                          <a
                            href="#"
                            className="adderlistbtn"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalXl2"
                          >
                            <i className="material-icons c_icn">
                              <MdOutlineAddCircle />
                            </i>
                          </a>
                        </div>
                      </div>
                      <div className="mb_wrap_cols2 mobilehide">
                        <div className="mb_wrap_colsinbx2">
                          <a
                            href="#"
                            className="adderlistbtn"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalXl2"
                          >
                            <i className="material-icons c_icn">
                              <MdOutlineAddCircle />
                            </i>
                          </a>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
              {comparedValues.length === 3 && (
                <a
                  // href="https://cs.collegesuggest.com/predictors/jee-mains/comparison.php?studId=565"
                  target="_blank"
                  className="cmnwbtn2"
                >
                  Compare Now
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
