const INIT_STATE = {
  compareItem: [],
};

export const compareReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_COMPARE":
      const item = action.payload;
      const exitItem = state.compareItem.find(
        (x) => x.collegeId === item.collegeId
      );

      if (exitItem) {
        return {
          compareItem: state.compareItem.map((x) =>
            x.collegeId === exitItem.collegeId ? item : x
          ),
        };
      } else {
        return {
          compareItem: [...state.compareItem, item],
        };
      }

    case "REMOVE_COMPARE_ITEM":
      return {
        compareItem: state.compareItem.filter(
          (x) => x.collegeId !== action.payload
        ),
      };
    default:
      return state;
  }
};
