import predictorList from "../../models/predictorList.model";

export const AddToCompare = () => async (dispatch, getState) => {
  const { data } = await predictorList.comparisonCollege();
  dispatch({
    type: "ADD_COMPARE",
    payload: data.predictorCompareCollegeDetails,
  });

  localStorage.setItem(
    "compareItems",
    JSON.stringify(getState().compare.compareItem)
  );
};
