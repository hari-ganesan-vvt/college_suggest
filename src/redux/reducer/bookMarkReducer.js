export const addRemoveBookMarkReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_REMOVE_BOOKMARK":
      return { bookMarkItem: action.payload };

    default:
      return state;
  }
};
