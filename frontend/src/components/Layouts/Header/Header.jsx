import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

import SearchOverlay from "./SearchOverlay";
import logo from "../../../assets/images/logo.png";
import PrimaryDropDownMenu from "./PrimaryDropDownMenu";
import SecondaryDropDownMenu from "./SecondaryDropDownMenu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchBar from "../../SearchBar/Search";
import Modal from "@mui/material/Modal";
import NavBar from "./navbar";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
  const [toggleSecondaryDropDown, setToggleSecondaryDropDown] = useState(false);

  const openSearch = () => {
    document.getElementById("search-overlay").style.display = "block";
  };

  return (
    <header className="bg-primary-white shadow-md bg-white  items-center fixed top-0  w-full z-10">
      <div className="w-full sm:w-9/12 px-1 sm:px-1 m-auto flex justify-between items-center py-2 relative">
        <div className="flex items-center  flex-1">
          <Link className="h-7 mr-1 sm:mr-4" to="/">
            <img
              draggable="false"
              className="h-full w-full object-contain"
              src={logo}
              alt="Flipkart Logo"
            />
          </Link>
          {/* <SearchBar /> */}
        </div>

        <div className="menu-right pull-right">
          <NavBar />
        </div>

        <div className="flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative">
          <span
            className="userDropDown flex items-center text-black font-medium gap-1 cursor-pointer"
            onClick={() => openSearch()}
          >
            <SearchIcon />
          </span>

          {isAuthenticated === false ? (
            <ul className="header-dropdown">
              <li className="onhover-dropdown mobile-account">
                <i className="fa fa-user" aria-hidden="true"></i> My Account
                <ul className="onhover-show-div">
                  <li>
                    <Link
                      to="/login"
                      style={{
                        color: "#222222",
                      }}
                    >
                      Login
                    </Link>
                  </li>
                  {/* <li>
                    <Link href={`/page/account/register`}>
                      <a>Register</a>
                    </Link>
                  </li>
                  <li
                  // onClick={() => firebaseLogout()}
                  >
                    <a>Logout</a>
                  </li> */}
                </ul>
              </li>
            </ul>
          ) : (
            <span
              className="userDropDown flex items-center text-black font-medium gap-1 cursor-pointer"
              onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}
            >
              {user.name && user.name.split(" ", 1)}
              <span>
                {togglePrimaryDropDown ? (
                  <ExpandLessIcon sx={{ fontSize: "16px" }} />
                ) : (
                  <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                )}
              </span>
            </span>
          )}

          {togglePrimaryDropDown && (
            <PrimaryDropDownMenu
              setTogglePrimaryDropDown={setTogglePrimaryDropDown}
              user={user}
            />
          )}

          {/* <span className="moreDropDown hidden sm:flex items-center text-white font-medium gap-1 cursor-pointer" onClick={() => setToggleSecondaryDropDown(!toggleSecondaryDropDown)}>More
            <span>{toggleSecondaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}</span>
          </span> */}

          {/* {toggleSecondaryDropDown && <SecondaryDropDownMenu />} */}

          <Link
            to="/wishlist"
            className="flex items-center text-gray font-medium gap-2 relative"
          >
            <span>
              <FavoriteIcon />
            </span>
            {wishlistItems.length > 0 && (
              <div className="w-5 h-5 p-2 bg-red-500 text-xs text-white rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                {wishlistItems.length}
              </div>
            )}
          </Link>

          <Link
            to="/cart"
            className="flex items-center text-gray font-medium gap-2 relative"
          >
            <span>
              <ShoppingCartIcon />
            </span>
            {cartItems.length > 0 && (
              <div className="w-5 h-5 p-2 bg-red-500 text-xs text-white  rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                {cartItems.length}
              </div>
            )}
            {/* Cart */}
          </Link>
        </div>
        {/* <!-- right navs --> */}
      </div>
      {/* <!-- navbar container --> */}
      <SearchOverlay />
    </header>
  );
};

export default Header;
