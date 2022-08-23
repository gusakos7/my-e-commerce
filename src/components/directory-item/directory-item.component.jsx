import { useNavigate } from "react-router-dom";
import {
  DirectoryItemContainer,
  BackgroundImage,
  DirectoryItemBody,
} from "./directory-item.styles.jsx";

const DirectoryItem = ({ category }) => {
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(`shop/${category.title}`);
  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage
        className="background-image"
        style={{
          backgroundImage: `url(${category.imageUrl})`,
        }}
      />
      <DirectoryItemBody>
        <h2>{category.title}</h2>
        <p>Buy now</p>
      </DirectoryItemBody>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
