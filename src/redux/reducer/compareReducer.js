export const addRemovecompareReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_REMOVE_COMPARE":
      const item = action.payload;
      return {
        compareItem: item,
      };
    default:
      return state;
  }
};
