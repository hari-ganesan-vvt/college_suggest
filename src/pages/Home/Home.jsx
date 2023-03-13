import React from "react";

const Home = () => {
  //   foreach ($allBasedCollegeList['predictorResList'] as $allBasedCollegeList) {
  //     $cscollegeName = $allBasedCollegeList["cs_collegename"];
  //     $filterCourse[] = $allBasedCollegeList["j_course"];
  //     if (!array_key_exists($cscollegeName, $CourseList)) {
  //         $CourseList[$cscollegeName] = array("cs_sno" => "", "collegeId" => "", "j_course" => array(), "courseID" => array(), "quotaId" => "", "seatId" => "", "cs_collegelogo" => "", "cs_college_url" => "", "cs_college_page_url" => "", "cs_col_state" => "", "j_closing_rank" => array(), "cs_collegeuniversity" => "", "cs_col_type" => "", "collegeTypeName" => "", "collegeTypeUrl" => "", "jSeats" => array(), "jFees" => array());
  //     }
  //     array_push($CourseList[$cscollegeName]["j_course"], $allBasedCollegeList["j_course"]);
  //     array_push($CourseList[$cscollegeName]["courseID"], $allBasedCollegeList["courseID"]);
  //     array_push($CourseList[$cscollegeName]["j_closing_rank"], $allBasedCollegeList["j_closing_rank"]);
  //     array_push($CourseList[$cscollegeName]["jSeats"], $allBasedCollegeList["jSeats"]);
  //     array_push($CourseList[$cscollegeName]["jFees"], $allBasedCollegeList["jFees"]);
  //     $CourseList[$cscollegeName]["cs_sno"] = $allBasedCollegeList["cs_sno"];
  //     $CourseList[$cscollegeName]["collegeId"] = $allBasedCollegeList["collegeId"];
  //     $CourseList[$cscollegeName]["quotaId"] = $allBasedCollegeList["quotaId"];
  //     $CourseList[$cscollegeName]["seatId"] = $allBasedCollegeList["seatId"];
  //     $CourseList[$cscollegeName]["cs_collegelogo"] = $allBasedCollegeList["cs_collegelogo"];
  //     $CourseList[$cscollegeName]["cs_college_url"] = $allBasedCollegeList["cs_college_url"];
  //     $CourseList[$cscollegeName]["cs_college_page_url"] = $allBasedCollegeList["cs_college_page_url"];
  //     $CourseList[$cscollegeName]["cs_col_state"] = $allBasedCollegeList["cs_col_state"];
  //     $CourseList[$cscollegeName]["stateName"] = $allBasedCollegeList["stateName"];
  //     $CourseList[$cscollegeName]["cityName"] = $allBasedCollegeList["cityName"];
  //     $CourseList[$cscollegeName]["cs_collegeuniversity"] = $allBasedCollegeList["cs_collegeuniversity"];
  //     $CourseList[$cscollegeName]["cs_col_type"] = $allBasedCollegeList["cs_col_type"];
  //     $CourseList[$cscollegeName]["collegeTypeName"] = $allBasedCollegeList["collegeTypeName"];
  //     $CourseList[$cscollegeName]["collegeTypeUrl"] = $allBasedCollegeList["collegeTypeUrl"];
  // }
  // foreach ($CourseList as $key => $val) {
  //   $collegeName = $key;
  //   $clgCount[] = $key;
  //   $csSno = $val['cs_sno'];
  //   $collegeId = $val['collegeId'];
  //   $jCourse = $val['j_course'];
  //   $clgCourseID = $val['courseID'];
  //   $quotaId = $val['quotaId'];
  //   $seatId = $val['seatId'];
  //   $countJCourse = array_unique($val['j_course']);
  //   $collegeLogo = $val['cs_collegelogo'];
  //   $collegeURL = $val['cs_college_url'];
  //   $collegePageUrl = $val['cs_college_page_url'];
  //   $collegeState = $val['cs_col_state'];
  //   $closingRank = $val['j_closing_rank'];
  //   $stateName = $val['stateName'];
  //   $cityName = $val['cityName'];
  //   $seats = $val['jSeats'];
  //   $fees = $val['jFees'];
  //   if ($collegeLogo != '') {
  //       $collegeLogo = $collegeLogo;
  //   } else {
  //       $collegeLogo = 'noimage.png';
  //   }
  //   if ($val['cs_col_type'] == 1) {
  //       // engineering
  //       if ($val['cs_collegeuniversity'] != '0') {
  //           $typeCollege = $val['collegeTypeName'];
  //           $typeCollegeUrl = $val['collegeTypeUrl'];
  //       } else {
  //           $typeCollege = $university;
  //           $typeCollegeUrl = $university;
  //       }
  //   }
  //   if ($stateId == $collegeState) {
  //       $stateValue = $val["stateName"];
  //   }
  //   $merged_array = array();
  //   $finalArray = "";
  //   $highChanceCount = 0;
  //   for ($i = 0; $i < sizeof($jCourse); $i++) {
  //       $merged_array[$closingRank[$i]] = $jCourse[$i] . '-' . $clgCourseID[$i] . '-' . $seats[$i] . '-' . $fees[$i];
  //       $courseFilter[$clgCourseID[$i]] = $jCourse[$i];
  //   }
  //   //filtered duplicate values here
  //   $existArr = [];
  //   foreach ($merged_array as &$course) {
  //       $courseName = explode('-', $course)[0];
  //       if (isset($existArr[$courseName])) {
  //           $course = '';
  //       } else {
  //           $existArr[$courseName] = true;
  //       }
  //   }
  //   $courses = array_filter($merged_array); // remove empty elements
  //   krsort($courses);
  //   $finalArray = array_unique($courses);
  //   $finalArr = array();
  //   foreach ($finalArray as $key => $value) {
  //       $temp = explode("-", $value);
  //       $finalArr[$key] = array("courseName" => $temp[0], "courseId" => $temp[1], "quotaId" => $quotaId, "collegeId" => $csSno, "seats" => $temp[2], "fees" => $temp[3]);
  //   }
  //   // print_r($typeCollegeUrl);

  //       ?>
  // part - 1

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1> Home</h1>
    </div>
  );
};

export default Home;
