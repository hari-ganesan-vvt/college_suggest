import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdCompareArrows, MdOutlineAddCircle, MdClose } from "react-icons/md";
import predictorList from "../../models/predictorListModel";

const Comparison = () => {
  const compareItems = useSelector((state) => state.compare.compareItem);

  const [comparedValues, setComparedValues] = useState([]);

  useEffect(() => {
    const getCompareList = async () => {
      const response = await predictorList.comparisonCollege();
      setComparedValues(response.data.predictorCompareCollegeDetails);
    };
    getCompareList();
  }, [compareItems]);

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

                      <div className="added_clgbx2" id="box10">
                        <div className="d-block rel">
                          <a className="close_com_img2" data-boxes="box10">
                            <MdClose />
                          </a>

                          <div className="added_collegescontent2">
                            <div className="logobx2">
                              <img
                                src="https://cs.collegesuggest.com//assets/images/national-institute-of-1661752942.webp"
                                alt=""
                              />
                            </div>
                            <p className="text22">
                              National Institute of Technology Tiruchirappalli
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

                      <div className="added_clgbx2" id="box10">
                        <div className="d-block rel">
                          <a className="close_com_img2" data-boxes="box10">
                            <MdClose />
                          </a>

                          <div className="added_collegescontent2">
                            <div className="logobx2">
                              <img
                                src="https://cs.collegesuggest.com//assets/images/national-institute-of-1661752942.webp"
                                alt=""
                              />
                            </div>
                            <p className="text22">
                              National Institute of Technology Tiruchirappalli
                            </p>
                          </div>
                        </div>
                      </div>
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
                </div>
              </div>
              <a
                // href="https://cs.collegesuggest.com/predictors/jee-mains/comparison.php?studId=565"
                target="_blank"
                className="cmnwbtn2"
              >
                Compare Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
