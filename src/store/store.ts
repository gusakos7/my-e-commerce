import { Action, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user/userSlice";
import categoriesReducer from "./categories/categoriesSlice";
import cartReducer from "./cart/cartSlice";

import thunk, { ThunkAction } from "redux-thunk";

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  },
  middleware: [logger, thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export type AppDispatch = typeof store.dispatch;
