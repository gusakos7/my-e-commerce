import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cartSlice";
import Button from "../button/button.component";

import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles.jsx";

const ProductCard = ({ product }) => {
  const { imageUrl, name, price } = product;
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}&euro;</Price>
      </Footer>
      <Button onClick={addProductToCart} buttonType="inverted">
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
