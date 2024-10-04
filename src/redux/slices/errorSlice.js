import { createSlice } from "@reduxjs/toolkit";

const initialState ="";
const errorSlice = createSlice({name: 'error', initialState, reducers:{
    setError: (state, action)=> action.payload,
    cleareError: ()=>initialState
}})

export const {setError, cleareError} = errorSlice.actions;
export const selectErrorMassege = (state) => state.error;
export default errorSlice.reducer;