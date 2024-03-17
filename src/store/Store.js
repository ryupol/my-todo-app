import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import filterSlice from "./filterSlice";

export default configureStore({
  reducer: {
    search: searchSlice,
    todoFilter: filterSlice,
  },
});
