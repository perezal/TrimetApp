const initialState = {
  dirs: []
};

const format_dirs = data => {

  const dirData = data.route[0].dir;

  return dirData;

}

const dirs = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_DIRS":
      return {
        ...state,
        isFetching: true,
      };
    case "RECEIVE_DIRS":
      return {
        ...state,
        dirs: format_dirs(action.payload),
      };
    case "CLEAR_ALL":
      return initialState;
    default:
      return state;
  }
};

export { dirs };