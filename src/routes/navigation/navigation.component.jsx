import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrownSVG } from "../../assets/crown.svg";
import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <>
      <div className="navigation-container">
        <div className="logo-container">
          <Link to="/" className="nav-link">
            <CrownSVG className="logo" />
          </Link>
        </div>
        <div className="nav-links-container">
          <Link to="/shop" className="nav-link">
            Shop
          </Link>
          <Link to="/auth" className="nav-link">
            Sign In
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
