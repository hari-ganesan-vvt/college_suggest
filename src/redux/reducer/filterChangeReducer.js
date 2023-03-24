export const filterChangeReducer = (
  state = { predictorChangeData: "ALL" },
  action
) => {
  switch (action.type) {
    case "FILTER_CHANGE_DATA":
      return { predictorChangeData: action.payload };
    default:
      return state;
  }
};
