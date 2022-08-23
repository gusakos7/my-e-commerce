import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { selectCartCount } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cartSlice";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const cartCount = useSelector(selectCartCount);

  const dispatch = useDispatch();

  const toggleIsCartOpen = () => {
    dispatch(setIsCartOpen());
  };
  return (
    <div onClick={toggleIsCartOpen} className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
