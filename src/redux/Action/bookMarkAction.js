import predictorList from "../../models/predictorListModel";

export const addRemoveBookMark = (bookMarkItem) => async (dispatch) => {
  const { data } = await predictorList.addRemoveBookMarkCollege(bookMarkItem);
  console.log(data);
  dispatch({ type: "ADD_REMOVE_BOOKMARK", payload: data });
};
