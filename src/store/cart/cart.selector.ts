import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartItem, CartState } from "./cart.types";

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems: CartItem[]) =>
    cartItems.reduce(
      (total, cartItem): number => total + cartItem.price * cartItem.quantity,
      0
    )
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems: CartItem[]): number =>
    cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);
