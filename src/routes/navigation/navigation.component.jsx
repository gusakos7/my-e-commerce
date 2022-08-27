import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrownSVG } from "../../assets/crown.svg";

import "./navigation.styles.scss";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutUserAuth } from "../../store/user/userSlice";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signOutUserAuth());
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
