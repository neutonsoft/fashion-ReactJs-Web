import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import logo from "../../../assets/images/logo/logo2.png";
import NavBar from "./navbar";
import NavBarMobile from "./navbarMobile";
import PrimaryDropDownMenu from "./PrimaryDropDownMenu";
import SearchOverlay from "./SearchOverlay";
import { Link } from "react-router-dom";
import TopBarDark from "./topbar-dark";
const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
  const [toggleSecondaryDropDown, setToggleSecondaryDropDown] = useState(false);
  const [navClose, setNavClose] = useState({ right: "0px" });

  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const openSearch = () => {
    document.getElementById("search-overlay").style.display = "block";
  };
  useEffect(() => {
    if (window.innerWidth < 750) {
      setNavClose({ right: "-410px" });
    }
    if (window.innerWidth < 1199) {
      setNavClose({ right: "-300px" });
    }
  }, []);

  const openNav = () => {
    setNavClose({ right: "0px" });
    //   if (router.asPath == "/layouts/Gym")
    //     document.querySelector("#topHeader").classList.add("zindex-class");
  };

  const closeNav = () => {
    setNavClose({ right: "-410px" });
    //   if (router.asPath == "/layouts/Gym")
    //     document.querySelector("#topHeader").classList.remove("zindex-class");
  };
  return (
    <>
      <header className="sticky-header fixed">
        {/* <div className="mobile-fix-option"></div> */}
        {/* <TopBarDark /> */}
        <div className="ml-1 mr-5">
          <Row className="flex justify-between items-center">
            <Col xs="3" className="flex justify-start">
              <Link className="logo-responsive" to={"/"}>
                {/* <img
                    draggable="false"
                    className="max-w-full object-contain"
                    src={logo}
                    alt="Ankita Chananaia"
                  /> */}
                <div className="text-white text-2xl">Ankita Chananaia</div>
              </Link>
            </Col>
            <Col xs="6">
              <div className="main-menu w-full">
                <div className="menu-right pull-right">
                  <NavBar
                    navClose={navClose}
                    setNavClose={setNavClose}
                    closeNav={closeNav}
                    openNav={openNav}
                  />
                </div>
              </div>
            </Col>
            <Col xs="3" className="flex justify-end">
              <div className="flex items-center justify-center h-full  gap-0.5 sm:gap-7 relative">
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
                <NavBarMobile
                  navClose={navClose}
                  setNavClose={setNavClose}
                  closeNav={closeNav}
                  openNav={openNav}
                />
              </div>
            </Col>
          </Row>
        </div>
      </header>{" "}
      <SearchOverlay />
      <div className="sticky-header-dummy"></div>
    </>
  );
};

export default Header;
