import { Outlet } from "react-router-dom";
import { ReactComponent as CrownSVG } from "../../assets/crown.svg";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutUserAuth } from "../../store/user/userSlice";

import {
  NavLink,
  NavLinksContainer,
  NavigationContainer,
  LogoContainer,
} from "./navigation.styles.jsx";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signOutUserAuth());
  };

  return (
    <>
      <NavigationContainer>
        <LogoContainer>
          <NavLink to="/" className="nav-link">
            <CrownSVG className="logo" />
          </NavLink>
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop" className="nav-link">
            Shop
          </NavLink>
          {currentUser ? (
            <NavLink onClick={signOutHandler} className="nav-link">
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="/auth" className="nav-link">
              Sign in
            </NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
