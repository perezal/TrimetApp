const initialState = {
  isFetching: false,
  lines: []
};

const format_lines = (data) => {

  let rawLinesData = data.route;

  // non-relevant and incompatible lines
  const linesBlackList = [
    208, // Aerial Tram
    291, // Orange Night Bus
    98, // MAX Shuttle
    293, // Portland Streetcar Shuttle
    294, // CL Line Shuttle
    150, // MAX Transit Mall Shuttle
    103, // WES Shuttle
    13, // MAX Red Line Shuttle
    198, // Shuttle
  ];

  const linesData = rawLinesData
    .filter( (line) => !linesBlackList.includes(line.route) )
    .map((line) => ({
        name: line.desc,
        route: line.route,
      })
    );

  return linesData;
}

const lines = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_LINES":
      return {
        ...state,
        isFetching: true,
      };
    case "RECEIVE_LINES":
      return {
        ...state,
        lines: format_lines(action.payload),
        isFetching: false,
      };
    case "CLEAR_ALL":
      return initialState;
    default:
      return state;
  }
};

export { lines };