import { useNavigate } from "react-router-dom";
import "./directory-item.styles.scss";

const DirectoryItem = ({ category }) => {
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(`shop/${category.title}`);
  return (
    <div className="directory-item-container" onClick={onNavigateHandler}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${category.imageUrl})`,
        }}
      />
      <div className="directory-item-body">
        <h2>{category.title}</h2>
        <p>Buy now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
