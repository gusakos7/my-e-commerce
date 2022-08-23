import { useDispatch } from "react-redux";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cartSlice";

import {
  BaseSpan,
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles.jsx";

const CheckoutItem = ({ product }) => {
  const { name, price, quantity, imageUrl } = product;
  const dispatch = useDispatch();

  const increaseHandler = () => dispatch(addItemToCart(product));
  const decreaseHandler = () => dispatch(removeItemFromCart(product));
  const clearItemHandler = () => dispatch(clearItemFromCart(product));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={increaseHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={decreaseHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}&euro;</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
