import instance from "../utils/axios.utils";

const user = {
  userSignup: (name, email, mobile) => {
    let promise = new Promise((resolve, reject) => {
      let url = "/user/userSignUp";
      instance()
        .post(url, { name: name, email: email, mobile: mobile })
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject(error);
          }
        });
    });

    return promise;
  },

  userLogin: (phoneNumber) => {
    let promise = new Promise((resolve, reject) => {
      let url = "/user/validatePhoneNumber";
      instance()
        .post(url, { phoneNumber: phoneNumber })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject(error);
          }
        });
    });

    return promise;
  },

  userVerifyOtp: (otp) => {
    let promise = new Promise((resolve, reject) => {
      let url = "/user/otpCheck";
      instance()
        .post(url, { otp: otp })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject(error);
          }
        });
    });

    return promise;
  },
  userLogout: (userId) => {
    let promise = new Promise((resolve, reject) => {
      let url = "/user/userLogout";
      instance()
        .post(url, { userId: userId })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject(error);
          }
        });
    });

    return promise;
  },

  userDetails: (userId) => {
    let promise = new Promise((resolve, reject) => {
      let url = "/user/userDetails";

      instance()
        .post(url, { studId: userId })
        .then((res) => resolve(res))
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject(error);
          }
        });
    });

    return promise;
  },
};

export default user;
