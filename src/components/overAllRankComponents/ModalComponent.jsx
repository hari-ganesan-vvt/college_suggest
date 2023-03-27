import React, { useEffect, useImperativeHandle, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import Assets from "../../imports/assets.imports";

function ModalComponent(data, ref) {
  const [show, setShow] = useState(false);
  const [cutOffList, setCutOffList] = useState(data);

  useEffect(() => {
    setCutOffList(data);
  }, [data]);

  useImperativeHandle(ref, () => ({
    openModal() {
      setShow(true);
    },
    closeModal() {
      setShow(false);
    },
  }));

  return (
    <Modal
      dialogClassName="modal-dialog-centered"
      show={show}
      onHide={() => setShow(false)}
    >
      <Modal.Header className="modal-header-custom">
        <Modal.Title>Round wise Cutoffs</Modal.Title>
        <MdClose className="md_close" onClick={() => setShow(false)} />
      </Modal.Header>
      <Modal.Body>
        <div className="newModal">
          <div className="modal-dropdown">
            <div className="form-row">
              <select
                className="form-select"
                id="cutOffOptions"
                aria-label="Default select example"
                fdprocessedid="ysxx7d"
                // onchange="cutoffSelect(this)"
              >
                <option value="118">
                  Electrical and Electronics Engineering (4 Years, Bachelor of
                  Technology)
                </option>
                <option value="10">
                  Mechanical Engineering (4 Years, Bachelor of Technology)
                </option>
                <option value="9">
                  Electronics and Communication Engineering (4 Years, Bachelor
                  of Technology)
                </option>
                <option value="5">
                  Computer Science and Engineering (4 Years, Bachelor of
                  Technology)
                </option>
                <option value="1">
                  Civil Engineering (4 Years, Bachelor of Technology)
                </option>
              </select>
            </div>
            <div
              data-bs-target="#exampleModalToggle2"
              data-bs-toggle="modal"
              className="modalicon"
            >
              <img src={Assets.addChartIcon} />
            </div>
          </div>
          <p className="hintpara">Our AI tool predicts the following results</p>
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
            {cutOffList.data &&
              cutOffList.data.map((cutOffItem, indexValue) => {
                return (
                  <div className="row tabledata" key={indexValue}>
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
              })}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default React.forwardRef(ModalComponent);
