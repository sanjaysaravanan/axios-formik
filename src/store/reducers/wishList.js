// create a reducer and export it

const initialState = {
  wishList: [],
};


function wishReducer(state = initialState, action) {
  // reducer is function which the same state with initial value return different state on different actions
  switch (action.type) {
    case 'ADD_WISH':
      return {
        ...state,
        wishList: [...state.wishList, action.movieItem]
      }
    case 'REMOVE_WISH':
      return {
        ...state,
        wishList: state.wishList.filter(({ id }) => id !== action.movieId)
      }
    case 'RESET_WISH':
      return initialState;
    default:
      return state;
  }
}

export default wishReducer;
