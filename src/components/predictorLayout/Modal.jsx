import React from "react";
import { MdOutlineClose } from "react-icons/md";

const Modal = () => {
  return (
    <div
      className="modal fade pt-0"
      id="exampleModalToggleutube"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel"
      tabIndex="-1"
    >
      <div
        className="modal-dialog modal-dialog-centered m-auto"
        style={{ maxWidth: "1000px", width: "98%" }}
      >
        <div
          className="modal-content modal-content-youtube rel"
          style={{ maxWidth: "100% !important" }}
        >
          <MdOutlineClose
            className="material-icons_close u_cls fancybox-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
          {/* <i
            className="material-icons u_cls fancybox-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            close
          </i> */}
          <div className="modal-body p-4">
            <div className="embed-container u-blocklg">
              <iframe
                src="https://www.youtube.com/embed/o-n7I6fQ2lE"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
