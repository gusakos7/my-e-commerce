import "./directory-item.styles.scss";

const DirectoryItem = ({ category }) => {
  return (
    <div className="directory-item-container">
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
