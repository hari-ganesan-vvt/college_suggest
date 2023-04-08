export const addRemoveBookMark = (bookMarkItem) => async (dispatch) => {
  dispatch({ type: "ADD_REMOVE_BOOKMARK", payload: bookMarkItem });
};
