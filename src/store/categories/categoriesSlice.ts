import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import {
  AnyAsyncThunk,
  RejectedWithValueActionFromAsyncThunk,
} from "@reduxjs/toolkit/dist/matchers";
import { DocumentData } from "firebase/firestore";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { Category } from "./categories.types";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (
    _,
    { rejectWithValue }
  ): Promise<
    DocumentData[] | RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>
  > => {
    try {
      const categoriesArray = await getCategoriesAndDocuments();
      return categoriesArray;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: SerializedError | Error | null;
};

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, { payload }: PayloadAction<DocumentData[]>) => {
          return {
            ...state,
            categories: payload as Category[],
            isLoading: false,
          };
        }
      )
      .addCase(
        fetchCategories.rejected,
        (state, { payload }: PayloadAction<any>) => {
          return { ...state, isLoading: false, error: payload as Error };
        }
      );
  },
});

// export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
