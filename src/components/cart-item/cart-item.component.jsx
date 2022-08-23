import { CartItemContainer, ItemContainer } from "./cart-item.styles.jsx";

const CartItem = ({ product }) => {
  const { name, imageUrl, price, quantity } = product;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemContainer>
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x {price}&euro;
        </span>
      </ItemContainer>
    </CartItemContainer>
  );
};

export default CartItem;
