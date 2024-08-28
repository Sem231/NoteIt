import { configureStore } from '@reduxjs/toolkit';
import videoSlice from "../feature/videoSlice";
import AudioReducer from "../feature/AudioSlice";

export default configureStore({
  reducer: {
    video:videoSlice,
    Audio:AudioReducer,

  },
  
});