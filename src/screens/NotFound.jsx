import React from "react";
import { Link } from "react-router-dom";
import Assets from "../imports/assets.imports";

const NotFound = () => {
  return (
    <section class="e_sec">
      <div class="container">
        <div class="e_sec_block">
          <div class="e_img_bx">
            <img src={Assets.error404} alt="errorimg" />
          </div>
          <div class="opps_txt">Whoops! :(</div>
          <div class="oops-para">
            We cant seem to find the page that you're looking for.
          </div>
          <Link to="/" class="btn_oops_">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
