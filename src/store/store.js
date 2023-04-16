// we need reducer for creating the store
import { configureStore } from "@reduxjs/toolkit";

import likeReducer from "./reducers/likeReducer";
import countReducer from "./reducers/countReducer";
import wishReducer from "./reducers/wishList";

const store = configureStore({
  reducer: {
    likeReducer,
    countReducer,
    wishReducer
  },
  devTools: true // should false for PROD deployment
})

store.subscribe(() => console.log('Successfully Subscribed with Initial State', store.getState()))

export default store;
