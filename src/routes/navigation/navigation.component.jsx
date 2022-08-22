import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrownSVG } from "../../assets/crown.svg";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const signOutHandler = async () => {
    try {
      const res = await signOutUser();
      console.log(res);
    } catch (error) {
      console.log("error during sign out", error);
    }
  };

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
          {currentUser ? (
            <span onClick={signOutHandler} className="nav-link">
              Sign Out
            </span>
          ) : (
            <Link to="/auth" className="nav-link">
              Sign in
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
