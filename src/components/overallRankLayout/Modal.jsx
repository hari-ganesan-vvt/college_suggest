import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Assets from "../../imports/assets.imports";

const Modal = ({ data }) => {
  const [cutOffMarkList, setCutOffMarkList] = useState(data);

  useEffect(() => {
    setCutOffMarkList(data);
  }, [data]);

  return (
    <div
      className="modal fade"
      id="exampleModalToggle"
      aria-labelledby="exampleModalToggleLabel"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-content-custom">
          <div className="modal-header modal-header-custom">
            <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
              Round wise Cutoffs
            </h1>
            <MdClose
              className="material-icons close"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body p-0">
            <div className="newmodal">
              <div className="modal-dropdown">
                <div className="form-row">
                  <select
                    className="form-select"
                    id="cutOffOptions"
                    aria-label="Default select example"
                    fdprocessedid="ysxx7d"
                    // onchange="cutoffSelect(this)"
                  >
                    {/* {listdata.map((courseItem, index) => {
                      return (
                        <option key={index}>
                          {courseItem[Object.keys(courseItem)[0]].j_course_name}
                        </option>
                      );
                    })} */}
                  </select>
                </div>
                <div
                  // data-bs-target="#exampleModalToggle2"
                  // data-bs-toggle="modal"
                  className="modalicon"
                >
                  <img src={Assets.addChartIcon} />
                </div>
              </div>
              <p className="hintpara">
                Our AI tool predicts the following results
              </p>
              <div className="newtable">
                <div className=" row tablehead">
                  <div className=" col-md-4 col-4 tableheadtxt">
                    <span>Rounds</span>
                  </div>
                  <div className=" col-md-4 col-4 tableheadtxt">
                    <span>Opening Rank</span>
                  </div>
                  <div className=" col-md-4 col-4 tableheadtxt">
                    <span>Closing Rank</span>
                  </div>
                </div>
                <div className="dynamicCuttOff" id="dynamicCuttOff">
                  {cutOffMarkList.map((cutOffItem, i) => {
                    return (
                      <div className="row tabledata" key={i}>
                        <div
                          className=" col-md-4 col-4  tabledatatxt"
                          id="RoundValue"
                        >
                          <span>{cutOffItem?.round}</span>
                        </div>
                        <div className="col-md-4 col-4  tabledatatxt">
                          {cutOffItem?.openingRank}
                        </div>
                        <div className=" col-md-4 col-4  tabledatatxt">
                          <span>{cutOffItem?.closingRank}</span>
                        </div>
                      </div>
                    );
                  })}
                  {/* {cutOffMarkList &&
                    cutOffMarkList.map((cutOffItem) => {
                     
                      return (
                        <div className="row tabledata">
                          <div
                            className=" col-md-4 col-4  tabledatatxt"
                            id="RoundValue"
                          >
                            <span>{cutOffItem.round}</span>
                          </div>
                          <div className=" col-md-4 col-4  tabledatatxt">
                            {cutOffItem.openingRank}
                          </div>
                          <div className=" col-md-4 col-4  tabledatatxt">
                            <span>{cutOffItem.closingRank}</span>
                          </div>
                        </div>
                      );
                    })} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
