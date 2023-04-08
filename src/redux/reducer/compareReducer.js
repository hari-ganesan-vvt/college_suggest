export const addRemovecompareReducer = (
  state = { comparedItem: [] },
  action
) => {
  switch (action.type) {
    case "ADD_REMOVE_COMPARE":
      const item = action.payload;
      return {
        comparedItem: item,
      };
    default:
      return state;
  }
};
