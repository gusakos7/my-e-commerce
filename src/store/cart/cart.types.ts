import { CategoryItem } from "../categories/categories.types";

export type CartItem = CategoryItem & {
  quantity: number;
};

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: [];
  readonly cartCount: number;
  readonly cartTotal: number;
};
