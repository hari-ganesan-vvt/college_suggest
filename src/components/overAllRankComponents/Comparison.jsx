import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdCompareArrows, MdOutlineAddCircle, MdClose } from "react-icons/md";
import { addRemoveCompare } from "../../redux/Action/compareAction";
import predictorList from "../../models/predictorListModel";
import { toast } from "react-toastify";

const Comparison = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin.userInfo);
  const compareItem = useSelector((state) => state.compareList.comparedItem);
  const userBookMark = useSelector((state) => state.bookMarkList.bookMarkItem);

  const [comparedValues, setComparedValues] = useState([]);
  const [collegeCount, setCollegeCount] = useState(0);

  const compareRemove = async (item) => {
    const comparedItem = {
      collegeId: item.collegeId,
      userId: user.userId || user.existUserId,
    };

    const response = await predictorList.compareAddCollege(comparedItem);
    dispatch(addRemoveCompare(response.data));
    toast.success("college successfully removed");
  };

  //collegeCompared
  const getComparedList = async () => {
    const response = await predictorList.comparisonCollege(
      user.userId || user.existUserId
    );
    setComparedValues(response.data.predictorCompareCollegeDetails);
  };

  //collegeComparedCount
  const getCollegeCount = async () => {
    const response = await predictorList.collegeCount(
      user.userId || user.existUserId
    );
    setCollegeCount(response.data.collegecount);
  };

  //bookMarkList
  const getBookMarkList = async () => {
    const response = await predictorList.userBookMarkList(
      user.userId || user.existUserId
    );
    localStorage.setItem(
      "bookMarkItems",
      JSON.stringify(response.data.bookMarkColleges)
    );
  };

  const compareCollege = () => {
    if (collegeCount === 1) {
      return (
        <>
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
        </>
      );
    } else if (collegeCount == 2) {
      return (
        <div className="mb_wrap_cols2 sec mobilehide">
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
      );
    }
  };
  useEffect(() => {
    getBookMarkList();
  }, [userBookMark]);

  useEffect(() => {
    getComparedList();
    getCollegeCount();
  }, [compareItem]);

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
              <div className="d-block">
                <h5
                  className="modal-title h4 comp_data"
                  id="exampleModalXlLabel"
                >
                  Colleges in your compare queue
                </h5>
                <span className="minihintmsg">
                  (you need to select <span>3</span> colleges to compare)
                </span>
              </div>

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
                  {comparedValues.length > 0 ? (
                    comparedValues.map((compared, i) => {
                      return (
                        <div className="mb_wrap_cols2 first" key={i}>
                          <div className="mb_wrap_colsinbx2">
                            <div className="added_clgbx2 " id="box10">
                              <div className="d-block rel">
                                <span
                                  className="close_com_img2"
                                  data-boxes="box10"
                                  onClick={() => compareRemove(compared)}
                                >
                                  <MdClose />
                                </span>

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
                  {compareCollege()}
                </div>
              </div>
              {comparedValues.length === 3 && (
                <Link
                  target="_blank"
                  className="cmnwbtn2"
                  to={`/predictor/predictor-main/comparison?studId=${
                    user.userId || user.existUserId
                  }`}
                >
                  Compare Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
