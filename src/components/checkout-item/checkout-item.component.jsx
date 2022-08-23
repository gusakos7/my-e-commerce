import { useDispatch } from "react-redux";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cartSlice";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ product }) => {
  const { name, price, quantity, imageUrl } = product;
  const dispatch = useDispatch();

  const increaseHandler = () => dispatch(addItemToCart(product));
  const decreaseHandler = () => dispatch(removeItemFromCart(product));
  const clearItemHandler = () => dispatch(clearItemFromCart(product));
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={increaseHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div onClick={decreaseHandler} className="arrow">
          &#10095;
        </div>
      </span>
      <span className="price">{price}&euro;</span>
      <div onClick={clearItemHandler} className="remove-button">
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
