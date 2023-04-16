// create a reducer and export it

const initialState = {
  count: 0,
};


function countReducer(state = initialState, action) {
  // reducer is function which the same state with initial value return different state on different actions
  switch (action.type) {
    case 'INC':
      return {
        ...state,
        count: state.count + 1
      }
    case 'DEC':
      return {
        ...state,
        count: state.count - 1
      }
    case 'COUNT_RESET':
      return initialState;
    default:
      return state;
  }
}

export default countReducer;
