import predictorList from "../../models/predictorListModel";

export const addRemoveCompare = (compareItem) => async (dispatch) => {
  const { data } = await predictorList.compareAddCollege(compareItem);
  dispatch({
    type: "ADD_REMOVE_COMPARE",
    payload: data,
  });
};
