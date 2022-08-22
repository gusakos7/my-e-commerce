import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss";

const Directory = ({ categories }) => {
  return (
    <div>
      <div className="directory-container">
        {categories.map((category) => (
          <DirectoryItem category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
};

export default Directory;
