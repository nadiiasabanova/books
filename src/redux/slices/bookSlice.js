import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { createBookWidthId } from "../../utils/createBookWithId";
import { setError } from "./errorSlice";

const initialState = {
  books: [],
  isLoadingApi: false
};
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (url, thunkAPI)=> {
try {
  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
}
catch(error){
thunkAPI.dispatch(setError(error.message));
  return thunkAPI.rejectWithValue(error)
}
  }
)
//создадим редюсер bookSlice
const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook(state, action) {
      state.books.push(action.payload);
      console.log(action);
    },
    deleteBook(state, action) {
      state.books = state.books.filter((item) => item.id !== action.payload);
      console.log(action);
      console.log(action.payload);
    },
    toggleFavorite(state, action){
        state.books.forEach((item)=>{
            if(item.id === action.payload){
                 item.isFavorite = !item.isFavorite;
            }
        })
    }
  },
  extraReducers: (bulder)=> {
    bulder.addCase(fetchBooks.fulfilled, (state, action)=>{
      state.isLoadingApi = false;
      state.books.push(createBookWidthId(action.payload))
    })

    bulder.addCase(fetchBooks.pending, (state)=>{
      state.isLoadingApi = true;
    })
    bulder.addCase(fetchBooks.rejected, (state)=>{
      state.isLoadingApi = false;
    })

  }
});

export const { addBook, deleteBook, toggleFavorite } = bookSlice.actions;
export const selectAllBooks = (state) => state.books.books;
export const selectIsLoadingApi= (state) => state.books.isLoadingApi;
export default bookSlice.reducer;
