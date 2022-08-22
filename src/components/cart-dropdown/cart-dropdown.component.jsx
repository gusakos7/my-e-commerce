import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems &&
          cartItems.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
      </div>
      <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
    </div>
  );
};

export default CartDropdown;
