import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  author: "",
  favorite: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      state.title = action.payload;
    },
    setAuthorFilter: (state, action) => {
      state.author = action.payload;
    },
    setFavoriteFilter: (state, action) => {
      state.favorite = !state.favorite;
    },
    resetFilters: ()=>{
      return initialState;
    }
  },
});

export const { setAuthorFilter, setTitleFilter, setFavoriteFilter, resetFilters } =
  filterSlice.actions;
export const selectAuthorFilter = (state) => state.filter.author;
export const selectTitleFilter = (state) => state.filter.title;
export const selectFavoriteFilter = (state) => state.filter.favorite;

export default filterSlice.reducer;
