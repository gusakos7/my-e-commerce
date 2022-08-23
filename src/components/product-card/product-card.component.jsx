import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cartSlice";
import Button from "../button/button.component";

import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { imageUrl, name, price } = product;
  // const { addItemToCart } = useContext(CartContext);
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button onClick={addProductToCart} buttonType="inverted">
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
