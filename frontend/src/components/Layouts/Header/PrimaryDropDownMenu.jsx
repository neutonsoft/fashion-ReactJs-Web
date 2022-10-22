import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../actions/userAction";

const PrimaryDropDownMenu = ({ setTogglePrimaryDropDown, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { wishlistItems } = useSelector((state) => state.wishlist);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    enqueueSnackbar("Logout Successfully", { variant: "success" });
    setTogglePrimaryDropDown(false);
  };

  const navs = [
    {
      title: "Orders",
      icon: <ShoppingBagIcon sx={{ fontSize: "18px" }} />,
      redirect: "/orders",
    },
    // {
    //     title: "Wishlist",
    //     icon: <FavoriteIcon sx={{ fontSize: "18px" }} />,
    //     redirect: "/wishlist",
    // },
    // {
    //     title: "My Chats",
    //     icon: <ChatIcon sx={{ fontSize: "18px" }} />,
    //     redirect: "/",
    // },
    // {
    //   title: "Coupons",
    //   icon: <ConfirmationNumberIcon sx={{ fontSize: "18px" }} />,
    //   redirect: "/",
    // },
    // {
    //     title: "Gift Cards",
    //     icon: <AccountBalanceWalletIcon sx={{ fontSize: "18px" }} />,
    //     redirect: "/",
    // },
    // {
    //     title: "Notifications",
    //     icon: <NotificationsIcon sx={{ fontSize: "18px" }} />,
    //     redirect: "/",
    // },
  ];

  return (
    <div className="onhover-show-div">
      {user.role === "admin" && (
        <Link
          className="text-base text-gray-800 pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t"
          to="/admin/dashboard"
        >
          <span className="text-gray-800">
            <DashboardIcon sx={{ fontSize: "18px" }} />
          </span>
          Admin Dashboard
        </Link>
      )}

      <Link
        className="text-base text-gray-800 pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t"
        to="/account"
      >
        <span className="text-gray-800">
          <AccountCircleIcon sx={{ fontSize: "18px" }} />
        </span>
        My Profile
      </Link>

      {navs.map((item, i) => {
        const { title, icon, redirect } = item;

        return (
          <>
            {title === "Wishlist" ? (
              <Link
                className="text-base text-gray-800 pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50"
                to={redirect}
                key={i}
              >
                <span className="text-gray-800">{icon}</span>
                {title}
                <span className="ml-auto mr-3 bg-gray-100 p-0.5 px-2 text-gray-800 rounded">
                  {wishlistItems.length}
                </span>
              </Link>
            ) : (
              <Link
                className="text-base text-gray-800 pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50"
                to={redirect}
                key={i}
              >
                <span className="text-gray-800">{icon}</span>
                {title}
              </Link>
            )}
          </>
        );
      })}

      <div
        className=" text-base text-gray-800 pl-3 py-3.5 flex gap-3 items-center hover:bg-gray-50 rounded-b cursor-pointer"
        onClick={handleLogout}
      >
        <span className="text-gray-800">
          <PowerSettingsNewIcon sx={{ fontSize: "18px" }} />
        </span>
        Logout
      </div>

      <div className="absolute right-1/2 -top-2.5">
        <div className="arrow_down"></div>
      </div>
    </div>
  );
};

export default PrimaryDropDownMenu;
