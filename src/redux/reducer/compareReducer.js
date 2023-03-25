const INIT_STATE = {
  compareItem: [],
};

export const compareReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_COMPARE":
      const item = action.payload;
      return {
        compareItem: item,
      };

    default:
      return state;
  }
};
