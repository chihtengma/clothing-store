import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../../assets/crown.svg";
import { UserContext } from "../../../contexts/user.context";
import { CartContext } from "../../../contexts/cart.context";

import { signOutUser } from "../../../utils/firebase/firebase.utils";

import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropDown from "../../cart-dropdown/cart-dropdown.component";

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";

const Navigation = () => {
   const { currentUser } = useContext(UserContext);
   const { isCartOpen } = useContext(CartContext);

   return (
      <Fragment>
         <NavigationContainer>
            <LogoContainer to="/">
               <CrwnLogo className="logo" />
            </LogoContainer>
            <NavLinks>
               <Link className="nav-link" to="/shop">
                  SHOP
               </Link>
               {currentUser ? (
                  <span className="nav-link" onClick={signOutUser}>
                     SIGN OUT
                  </span>
               ) : (
                  <NavLink to="/auth">SIGN IN</NavLink>
               )}
               <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropDown />}
         </NavigationContainer>
         <Outlet />
      </Fragment>
   );
};

export default Navigation;
