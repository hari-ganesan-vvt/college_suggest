import instance from "../utils/axios.utils";

const predictorList = {
  formSubmitData: (values) => {
    let promise = new Promise((resolve, reject) => {
      let url;
      if (values.rankType === "General Rank") {
        url = "/predictor/predictorCategoryCollegeList";
      }
      if (values.rankType === "Category Rank") {
        url = "/predictor/predictorResList";
      }
      instance()
        .post(url, values)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });

    return promise;
  },

  filterCourseList: (filtervalues) => {
    let promise = new Promise((resolve, reject) => {
      let url = "/predictor/predictorStateResList";
      instance()
        .post(url, filtervalues)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });

    return promise;
  },

  stateList: () => {
    let promise = new Promise((resolve, reject) => {
      let url = "/predictor/predictorStateList";
      instance()
        .post(url)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });

    return promise;
  },

  casteList: () => {
    let promise = new Promise((resolve, reject) => {
      let url = "/predictor/predictorCasteList";
      instance()
        .post(url)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });

    return promise;
  },

  courseList: () => {
    let promise = new Promise((resolve, reject) => {
      let url = "/predictor/predictorCourseList";
      instance()
        .post(url)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });

    return promise;
  },

  cutOffSelect: (courseItemValues) => {
    let promise = new Promise((resolve, reject) => {
      let url = "/predictor/predictorCutoffList";
      instance()
        .post(url, {
          courseID: courseItemValues.courseID,
          collegeId: courseItemValues.collegeId,
          seatType: courseItemValues.seatId,
          quota: courseItemValues.quotaId,
          gender: courseItemValues.genderId,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });

    return promise;
  },

  compareAddCollege: (compareItem) => {
    let promise = new Promise((resolve, reject) => {
      let url = "/predictor/compare/compareAddCollege";
      instance()
        .post(url, {
          collegeId: compareItem.collegeId,
          studId: compareItem.userId,
          deviceType: 1,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });

    return promise;
  },

  comparisonCollege: (userId) => {
    let promise = new Promise((resolve, reject) => {
      let url = "/predictor/compare/predictorCollegeCompare";
      instance()
        .post(url, {
          stud_id: 452,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });

    return promise;
  },

  addBookMarkCollege: (userId, collegeId) => {
    let promise = new Promise((resolve, reject) => {
      let url = "/user/bookMark/addBookMark";
      instance()
        .post(url, {
          studId: 468,
          collegeId: 10,
          collegeType: 1,
          pageType: "predict",
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });

    return promise;
  },
};

export default predictorList;