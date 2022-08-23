import { createSlice } from "@reduxjs/toolkit";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === existingCartItem.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  // if item's quantity > 1 -> decrease quantity by 1
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingCartItem.quantity > 1) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }

  // if item's quantity = 1 -> clear item from cart
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

const clearCartItem = (cartItems, productToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== productToClear.id);

const initialState = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setIsCartOpen: (state) => {
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    },
    addItemToCart: (state, action) => {
      const newCartItems = addCartItem(state.cartItems, action.payload);
      return { ...state, cartItems: newCartItems };
    },
    removeItemFromCart: (state, action) => {
      const newCartItems = removeCartItem(state.cartItems, action.payload);
      return { ...state, cartItems: newCartItems };
    },
    clearItemFromCart: (state, action) => {
      const newCartItems = clearCartItem(state.cartItems, action.payload);
      return { ...state, cartItems: newCartItems };
    },
  },
});

export const {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
