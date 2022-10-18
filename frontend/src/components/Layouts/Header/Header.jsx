import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

import { Media, Container, Row, Col } from "reactstrap";
import SearchOverlay from "./SearchOverlay";
import logo from "../../../assets/images/logo-black.png";
import PrimaryDropDownMenu from "./PrimaryDropDownMenu";
import SecondaryDropDownMenu from "./SecondaryDropDownMenu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchBar from "../../SearchBar/Search";
import Modal from "@mui/material/Modal";
import NavBar from "./navbar";
import TopBarDark from "./topbar-dark";

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
    <div>
      <header className="sticky fixed">
        <div className="mobile-fix-option"></div>
        <TopBarDark />
        <Container>
          <Row>
            <Col>
              <div className="main-menu">
                <div className="mt-2 mb-2 flex justify-center">
                  <Link className="h-12 mr-1 sm:mr-4" to={"/"}>
                    <img
                      draggable="false"
                      className="h-full w-full object-contain"
                      src={logo}
                      alt="Ankita Chananaia"
                    />
                  </Link>
                </div>
                <div className="menu-right pull-right">
                  <NavBar />
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
                          <i className="fa fa-user" aria-hidden="true"></i> My
                          Account
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
                        className="onhover-dropdown userDropDown flex items-center text-black font-medium gap-1 cursor-pointer"
                        onClick={() =>
                          setTogglePrimaryDropDown(!togglePrimaryDropDown)
                        }
                      >
                        {user.name && user.name.split(" ", 1)}
                        {/* <span>
                          {togglePrimaryDropDown ? (
                            <ExpandLessIcon sx={{ fontSize: "16px" }} />
                          ) : (
                            <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                          )}
                        </span> */}
                        <PrimaryDropDownMenu
                          setTogglePrimaryDropDown={setTogglePrimaryDropDown}
                          user={user}
                        />
                      </span>
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
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>{" "}
      {/* {togglePrimaryDropDown && (
        <PrimaryDropDownMenu
          setTogglePrimaryDropDown={setTogglePrimaryDropDown}
          user={user}
        />
      )} */}
      <SearchOverlay />
    </div>
  );
};

export default Header;
