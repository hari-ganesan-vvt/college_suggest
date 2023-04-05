import React, { useEffect, useState } from "react";

const DropStickNav = ({ data }) => {
  const [isNavStickVisible, setIsNavStickVisible] = useState(false);

  const scrollSetStick = () => {
    let stickScroll = 443;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > stickScroll) {
      setIsNavStickVisible(true);
    } else {
      setIsNavStickVisible(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", scrollSetStick);

    return () => window.addEventListener("scroll", scrollSetStick);
  }, []);

  return (
    <section
      className={`dropstickblock ${isNavStickVisible ? "sticky" : ""}`}
      id="stickybox"
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-sm-12">
            <div className="d-block heroleftcon">
              {/* <!-- comparison-boxes-here --> */}
              <div className="comparesec">
                <div className="d-block py-3">
                  <div className="row">
                    {data.map((collegeItem) => {
                      return (
                        <div className="col">
                          <div className="comprecon">
                            <form action="#" className="d-block w-100">
                              <select
                                className="form-select compareselectcustom"
                                aria-label="Default select example"
                              >
                                <option value="1">
                                  {collegeItem.collegeName}
                                </option>
                              </select>
                            </form>
                          </div>
                        </div>
                      );
                    })}

                    {/* <div className="col">
                      <div className="comprecon">
                        <form action="#" className="d-block w-100">
                          <select
                            className="form-select compareselectcustom"
                            aria-label="Default select example"
                          >
                         
                            <option value="1">
                              Indian Institute Of Technology Bhubaneswar
                            </option>
                            <option value="2">
                              Indian Institute Of Technology Bombay
                            </option>
                            <option value="3">
                              Indian Institute Of Technology Mandi
                            </option>
                            <option value="4">
                              Indian Institute Of Technology Kharagpur
                            </option>
                            <option value="5">
                              Indian Institute Of Technology (Indian School Of
                              Mines) Dhanbad
                            </option>
                          </select>
                        </form>
                      </div>
                    </div>

                    <div className="col mobilehide pe-0">
                      <div className="comprecon">
                        <form action="#" className="d-block w-100">
                          <select
                            className="form-select compareselectcustom"
                            aria-label="Default select example"
                          >
                        
                            <option value="1">
                              Indian Institute Of Technology Bhubaneswar
                            </option>
                            <option value="2">
                              Indian Institute Of Technology Bombay
                            </option>
                            <option value="3">
                              Indian Institute Of Technology Mandi
                            </option>
                            <option value="4">
                              Indian Institute Of Technology Kharagpur
                            </option>
                            <option value="5">
                              Indian Institute Of Technology (Indian School Of
                              Mines) Dhanbad
                            </option>
                          </select>
                        </form>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <!-- comparison-ends-here --> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DropStickNav;
