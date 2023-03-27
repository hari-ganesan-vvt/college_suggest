import predictorList from "../../models/predictorListModel";

export const AddToCompare = (compareItem) => async (dispatch, getState) => {
  await predictorList.compareAddCollege(compareItem);
  dispatch({
    type: "ADD_COMPARE",
    payload: compareItem,
  });

  localStorage.setItem(
    "compareItems",
    JSON.stringify(getState().compare.compareItem)
  );
};

export const RemoveToCompare = (compareItem) => async (dispatch, getState) => {
  await predictorList.compareAddCollege(compareItem);
  dispatch({
    type: "REMOVE_COMPARE_ITEM",
    payload: compareItem.collegeId,
  });

  localStorage.setItem(
    "compareItems",
    JSON.stringify(getState().compare.compareItem)
  );
};
