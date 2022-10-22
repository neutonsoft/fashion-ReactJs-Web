import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import logo from "../../../assets/images/logo/logo2.png";
import NavBar from "./navbar";
import PrimaryDropDownMenu from "./PrimaryDropDownMenu";
import SearchOverlay from "./SearchOverlay";
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
    <>
      <header className="sticky-header fixed">
        <div className="mobile-fix-option"></div>
        <TopBarDark />
        <Container>
          <Row className="flex justify-between">
            <Col xs="6" className="flex justify-start">
              <div className="flex">
                <Link
                  className=""
                  style={{
                    width: "135px",
                    height: "70px",
                  }}
                  to={"/"}
                >
                  <img
                    draggable="false"
                    className="max-w-full object-contain"
                    src={logo}
                    alt="Ankita Chananaia"
                  />
                </Link>
              </div>
            </Col>
            <Col xs="6" className="flex justify-end">
              <div className="flex items-center justify-center h-full  gap-0.5 sm:gap-7 relative">
                <a
                  className="userDropDown flex items-center text-black font-medium gap-1 cursor-pointer"
                  onClick={() => openSearch()}
                >
                  <SearchIcon
                    sx={{
                      color: "#C3AF74",
                      fontSize: "30px",
                    }}
                  />
                </a>
                <Link
                  to="/wishlist"
                  className="flex items-center text-gray font-medium gap-2 relative"
                >
                  <span>
                    <FavoriteIcon
                      sx={{
                        color: "#C3AF74",
                        fontSize: "30px",
                      }}
                    />
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
                  <a>
                    <ShoppingCartIcon
                      sx={{
                        color: "#C3AF74",
                        fontSize: "30px",
                      }}
                    />
                  </a>
                  {cartItems.length > 0 && (
                    <div className="w-5 h-5 p-2 bg-red-500 text-xs text-white  rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                      {cartItems.length}
                    </div>
                  )}
                  {/* Cart */}
                </Link>
                {isAuthenticated === false ? (
                  <ul className="header-dropdown">
                    <li className="onhover-dropdown mobile-account ">
                      <AccountCircleIcon
                        sx={{
                          color: "#C3AF74",
                          fontSize: "30px",
                        }}
                      />{" "}
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
                      </ul>
                    </li>
                  </ul>
                ) : (
                  <a
                    className="onhover-dropdown userDropDown flex items-center text-gray-600 font-bold  gap-1 cursor-pointer"
                    onClick={() =>
                      setTogglePrimaryDropDown(!togglePrimaryDropDown)
                    }
                  >
                    <AccountCircleIcon
                      sx={{
                        color: "#C3AF74",
                        fontSize: "30px",
                      }}
                    />
                    {user.name && user.name.split(" ", 1)}
                    <PrimaryDropDownMenu
                      setTogglePrimaryDropDown={setTogglePrimaryDropDown}
                      user={user}
                    />
                  </a>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <div className="main-menu w-full">
                <div className="menu-right pull-right">
                  <NavBar />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>{" "}
      <SearchOverlay />
      <div className="sticky-header"></div>
    </>
  );
};

export default Header;
