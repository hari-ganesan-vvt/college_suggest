import React, { useEffect, useState } from "react";
import { MdCompareArrows, MdOutlineAddCircle, MdClose } from "react-icons/md";
import predictorList from "../../models/predictorList.model";

const Comparison = () => {
  const [comparison, setComparison] = useState([]);

  const comparisonModal = async () => {
    try {
      const response = await predictorList.comparisonCollege();
      console.log(response.data.predictorCompareCollegeDetails);
      setComparison(response.data.predictorCompareCollegeDetails);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("comparison", comparison.length);
  useEffect(() => {
    comparisonModal();
  }, []);

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
              {comparison?.length}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
