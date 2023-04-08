export const addRemoveCompare = (compareItem) => async (dispatch) => {
  dispatch({
    type: "ADD_REMOVE_COMPARE",
    payload: compareItem,
  });
};
