import predictorList from "../../models/predictorListModel";

export const AddToCompare = (compareItem) => async (dispatch) => {
  await predictorList.compareAddCollege(compareItem);
  dispatch({
    type: "ADD_COMPARE",
    payload: compareItem,
  });
};

export const RemoveToCompare = (compareItem) => async (dispatch) => {
  await predictorList.compareAddCollege(compareItem);
  dispatch({
    type: "REMOVE_COMPARE_ITEM",
    payload: compareItem.collegeId,
  });
};
