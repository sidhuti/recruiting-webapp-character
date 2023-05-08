
const reducer = (state, action) => {
  switch (action.type) {
    // strength....
    case "INCREASE":
      return {
        ...state,
        attributes: state.attributes.map((item) =>
          item.name === action.payload.name
            ? { name: action.payload.name, value: action.payload.value + 1 }
            : item
        ),
      };
    case "DECREASE":
      return {
        ...state,
        attributes: state.attributes.map((item) =>
          item.name === action.payload.name
            ? { name: action.payload.name, value: action.payload.value - 1 }
            : item
        ),
      };

    default:
      return state;
  }
};

export default reducer;
