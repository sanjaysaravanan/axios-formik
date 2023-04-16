// create a reducer and export it

const initialState = {
  likes: 100,
  dislikes: 20
};


function likeReducer(state = initialState, action) {
  // reducer is function which the same state with initial value return different state on different actions
  switch (action.type) {
    case 'LIKE':
      return {
        ...state,
        likes: state.likes + 1,
      }
    case 'DIS_LIKE':
      return {
        ...state,
        dislikes: state.dislikes + 1,
      }
    case 'LIKES_RESET':
      return initialState;
    default:
      return state;
  }
}

export default likeReducer;
