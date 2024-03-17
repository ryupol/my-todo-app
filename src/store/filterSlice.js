import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoFilter: "All",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setTodoFilter(state, action) {
      state.todoFilter = action.payload;
    },
  },
});

export const { setTodoFilter } = filterSlice.actions;
export default filterSlice.reducer;