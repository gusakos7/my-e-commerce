import React, { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ product }) => {
  const { name, price, quantity, imageUrl } = product;

  const clearItemHandler = () => clearItemFromCart(product);
  const { addItemToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);

  const increaseHandler = () => addItemToCart(product);
  const decreaseHandler = () => removeItemFromCart(product);
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
      {/*<br />
        <span onClick={decreaseHandler} className="decrease">
          decrement
        </span>
        <br /> */}
      <div onClick={clearItemHandler} className="remove-button">
        &#10005;
      </div>
      {/* <span onClick={clearHandler}>clear</span> */}
    </div>
    // </div>
  );
};

export default CheckoutItem;
