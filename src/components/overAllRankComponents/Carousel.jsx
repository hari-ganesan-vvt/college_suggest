import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import {
  AddToCompare,
  RemoveToCompare,
} from "../../redux/Action/compareAction";
import { BiCloudDownload } from "react-icons/bi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Assets from "../../imports/assets.imports";
import predictorList from "../../models/predictorListModel";
import ModalComponent from "./ModalComponent";

const Carousel = ({ listdata }) => {
  const swiperRef = useRef();
  const modalRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin.userInfo);

  const getValueData = sessionStorage.getItem("_values")
    ? JSON.parse(sessionStorage.getItem("_values"))
    : null;

  const [cutOffList, setCutOffList] = useState([]);
  const [isActiveCompare, setIsActiveCompare] = useState(false);
  const [isActiveBookMark, setIsActiveBookMark] = useState(false);
  const [getCompareStorage, setGetCompareStorage] = useState(
    JSON.parse(localStorage.getItem("compareItems")) || []
  );

  const checkFunction = () => {
    return getCompareStorage.some(
      (ele) => ele.collegeId === Object.values(listdata[0])[0].cSno
    );
  };
  //rankBasedChange Filter
  const rankBasedChange = (college) => {
    const rank_Id = Number(getValueData?.rankId);
    const closing_rankId = Number(college);
    let percentCalc = (rank_Id / 100) * 10;

    const minRank = rank_Id - percentCalc;
    const maxRank = rank_Id + percentCalc;

    if (closing_rankId >= minRank && closing_rankId <= maxRank) {
      return Assets.mediumEmoji;
    } else if (closing_rankId > maxRank) {
      return Assets.highEmoji;
    } else if (closing_rankId < minRank) {
      return Assets.lowEmoji;
    }
  };

  const handleCutOffSelect = async (courseItemValues) => {
    try {
      const response = await predictorList.cutOffSelect(courseItemValues);
      setCutOffList(response.data.predictorCutoffList);
      modalRef.current.openModal();
    } catch (error) {
      console.log(error);
    }
  };

  // compareAddCollege
  const compareAddCollege = async () => {
    setIsActiveCompare(!isActiveCompare);
    const compareItem = {
      collegeId: Object.values(listdata[0])[0].cSno,
      userId: user.userId,
    };
    if (checkFunction()) {
      toast.success("Compared College Removed");
      dispatch(RemoveToCompare(compareItem));
    } else if (getCompareStorage.length < 3) {
      toast.success("Compared College Added");
      dispatch(AddToCompare(compareItem));
    }
  };

  //addBookMark
  const addBookMark = async () => {
    setIsActiveBookMark(!isActiveBookMark);

    if (!isActiveBookMark === true) {
      const response = await predictorList.addBookMarkCollege();
      console.log(response.data);
      toast.success("Bookmark Added successfully");
    }

    if (!isActiveBookMark === false) {
      const response = await predictorList.addBookMarkCollege();
      console.log(response.data);
      toast.success("Bookmark Removed successfully");
    }
  };

  useEffect(() => {
    setGetCompareStorage(JSON.parse(localStorage.getItem("compareItems")));
  }, [isActiveCompare]);
  return (
    <div>
      <Swiper
        spaceBetween={10}
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 1.4,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1.8,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1.8,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 1.8,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 2.2,
            spaceBetween: 20,
          },
        }}
      >
        {listdata.map((courseList, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="slidebx">
                <a className="linktitle">
                  {courseList[Object.keys(courseList)[0]].j_course_name}
                </a>
                <div className="preseat">
                  <div className="pretxt">
                    <p>
                      Seats :
                      <span>
                        {courseList[Object.keys(courseList)[0]].jSeats}
                      </span>
                    </p>
                    <p>
                      Fee :
                      <span>
                        {courseList[Object.keys(courseList)[0]].jFees}
                      </span>
                    </p>
                  </div>

                  <div>
                    <img
                      src={rankBasedChange(Object.keys(courseList)[0])}
                      alt="emoji"
                    />
                  </div>
                </div>

                <div
                  data-bs-toggle="modal"
                  // data-bs-target="#exampleModalToggle"
                  className="prebtn"
                  onClick={() =>
                    handleCutOffSelect(courseList[Object.keys(courseList)[0]])
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M9.99992 7.5C10.663 7.5 11.2988 7.76339 11.7677 8.23223C12.2365 8.70107 12.4999 9.33696 12.4999 10C12.4999 10.663 12.2365 11.2989 11.7677 11.7678C11.2988 12.2366 10.663 12.5 9.99992 12.5C9.33688 12.5 8.70099 12.2366 8.23215 11.7678C7.76331 11.2989 7.49992 10.663 7.49992 10C7.49992 9.33696 7.76331 8.70107 8.23215 8.23223C8.70099 7.76339 9.33688 7.5 9.99992 7.5ZM9.99992 3.75C14.1666 3.75 17.7249 6.34167 19.1666 10C17.7249 13.6583 14.1666 16.25 9.99992 16.25C5.83325 16.25 2.27492 13.6583 0.833252 10C2.27492 6.34167 5.83325 3.75 9.99992 3.75ZM2.64992 10C3.32346 11.3753 4.36934 12.534 5.66865 13.3444C6.96796 14.1548 8.46858 14.5844 9.99992 14.5844C11.5313 14.5844 13.0319 14.1548 14.3312 13.3444C15.6305 12.534 16.6764 11.3753 17.3499 10C16.6764 8.62474 15.6305 7.46604 14.3312 6.65562C13.0319 5.8452 11.5313 5.41557 9.99992 5.41557C8.46858 5.41557 6.96796 5.8452 5.66865 6.65562C4.36934 7.46604 3.32346 8.62474 2.64992 10Z"
                      fill="#585858"
                    />
                  </svg>
                  Cutoff
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="row align-items-center card_bottom">
        <div className="col-md-4 col-8">
          <button className="prebtn1">
            <BiCloudDownload className="material-icons me-2 m-svg" />
            Brochure
          </button>
        </div>
        <div className="col-4 col-md-8">
          <div className="d-flex align-items-center justify-content-end">
            <div className="d-block">
              <div className="d-flex">
                <button
                  className={`prebtn1 bg-gray me-2 compare_Btn ${
                    checkFunction() ? "active" : " "
                  }`}
                  onClick={compareAddCollege}
                >
                  <svg
                    className="me-2 m-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                  >
                    <path
                      d="M5.66675 13.6667L4.50008 12.4792L6.64591 10.3333H0.666748V8.66667H6.64591L4.50008 6.52083L5.66675 5.33333L9.83341 9.5L5.66675 13.6667ZM12.3334 8.66667L8.16675 4.5L12.3334 0.333333L13.5001 1.52083L11.3542 3.66667H17.3334V5.33333H11.3542L13.5001 7.47917L12.3334 8.66667Z"
                      fill="#212121"
                    />
                  </svg>
                  <span className="m-text">Compare</span>
                </button>

                <button
                  className={`prebtn1 bg-gray btn-icon bookmark_Btn ${
                    isActiveBookMark ? "active" : ""
                  }`}
                  onClick={addBookMark}
                >
                  <MdOutlineBookmarkAdd className="material-icons me-2 m-svg " />

                  <span className="m-text">Bookmark</span>
                </button>
              </div>
            </div>

            <div className="d-blok">
              <div className="d-block rel m-swipe-hide">
                <div className="swiperbtnwarpbx">
                  <div
                    className="swiper-button-prev swiper-button-prev11 custom-swipebtn me-3"
                    onClick={() => swiperRef.current?.slidePrev()}
                  ></div>
                  <div
                    className="swiper-button-next swiper-button-next11 custom-swipebtn"
                    onClick={() => swiperRef.current?.slideNext()}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalComponent
        data={cutOffList}
        ref={modalRef}
        courseDataList={listdata}
      />
    </div>
  );
};

export default Carousel;
