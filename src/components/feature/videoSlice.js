import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  SpaceId:null,
  demoValue:[],
    DIndex:0,
    DemoLabel:"click here to add label",
    ExtractText:null,
    Summary:[],
    Notes:[],
    Keyword:[],
    OpenQuestion:[],
    TrueFalseQuestion:[],
    MultipleQuestion:[],
    ToastMessage:null
}
const videoSlice = createSlice({
  name: 'videoSlice',
  initialState,
  reducers: {
  
    setSpaceId: (state, action) => {
      state.SpaceId = action.payload.SpaceId;
    },
    setDemoList: (state, action) => {
      return {
        ...state,
        demoValue: [...state.demoValue, action.payload]
      };
    },
    setDIndex:(state, action) => {
      state.DIndex = action.payload.DIndex;
    },
    setDemoLabel:(state, action) => {
      state.DemoLabel = action.payload.DemoLabel;
    },
    setExtractText:(state, action) => {
      state.ExtractText = action.payload.ExtractText;
    },
    setSummary:(state, action) => {
      state.Summary.push(action.payload)
    },
    setNotes:(state, action) => {
      state.Notes.push(action.payload)
    },
    setKeyword:(state, action) => {
      state.Keyword.push(action.payload)

    },
    setOpenQuestion:(state, action) => {
      state.OpenQuestion.push(action.payload)

    },
    setTrueFalseQuestion:(state, action) => {
      state.TrueFalseQuestion.push(action.payload)
    },
    setMultipleQuestion:(state, action) => {
      state.MultipleQuestion.push(action.payload)
    },
    setToastMessage:(state, action) => {
      state.ToastMessage== action.payload.ToastMessage;
    },
  },
});

export const {
  
  setSpaceId,
  setDemoList,
  setDIndex,
  setDemoLabel,
  setExtractText,
  setSummary,
  setNotes,
  setKeyword,
  setOpenQuestion,
  setTrueFalseQuestion,
  setMultipleQuestion,
  setToastMessage
} = videoSlice.actions;

export default videoSlice.reducer
export const selectSpaceId = (state) => state.video.SpaceId;
export const selectsetDemoList = (state) => state.video.demoValue;
export const selectsetDIndex = (state) => state.video.DIndex;
export const selectsetDemoLabel = (state) => state.video.DemoLabel;
export const selectExtractText = (state) => state.video.ExtractText;
export const selectSummary = (state) => state.video.Summary;
export const selectNotes = (state) => state.video.Notes;
export const selectKeyword = (state) => state.video.Keyword;
export const selectOpenQuestion = (state) => state.video.OpenQuestion;
export const selectTrueFalseQuestion = (state) => state.video.TrueFalseQuestion;
export const selectMultipleQuestion = (state) => state.video.MultipleQuestion;
export const selectToastMessage = (state) => state.video.ToastMessage;













