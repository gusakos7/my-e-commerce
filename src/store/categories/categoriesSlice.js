import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const categoriesArray = await getCategoriesAndDocuments();
      return categoriesArray;
    } catch (error) {
      console.log(`an error occurred while fetching categories: ${error}`);
    }
  }
);

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => ({
      ...state,
      categories: action.payload,
    }),
  },
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      return { ...state, isLoading: true };
    },
    [fetchCategories.fulfilled]: (state, action) => ({
      ...state,
      categories: action.payload,
      isLoading: false,
    }),
    [fetchCategories.rejected]: (state, action) => {
      console.log(
        "🚀 ~ file: categoriesSlice.js ~ line 50 ~ action.payload",
        action.payload
      );

      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
