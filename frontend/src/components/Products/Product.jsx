import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { getDiscount } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../actions/wishlistAction";
import { useSnackbar } from "notistack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Row, Col, Media, Modal, ModalBody, ModalHeader } from "reactstrap";

import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
const Product = ({
  _id,
  name,
  images,
  ratings,
  numOfReviews,
  price,
  cuttedPrice,
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);

  const itemInWishlist = wishlistItems.some((i) => i.product === _id);
  const itemInCart = cartItems.some((i) => i.product === _id);

  const addToWishlistHandler = () => {
    if (itemInWishlist) {
      dispatch(removeFromWishlist(_id));
      enqueueSnackbar("Remove From Wishlist", { variant: "success" });
    } else {
      dispatch(addToWishlist(_id));
      enqueueSnackbar("Added To Wishlist", { variant: "success" });
    }
  };

  const addToCartHandler = () => {
    if (itemInCart) {
      dispatch(removeItemsFromCart(_id));
      enqueueSnackbar("Remove From Cart", { variant: "success" });
    } else {
      dispatch(addItemsToCart(_id));
      enqueueSnackbar("Added To Cart", { variant: "success" });
    }
  };
  let RatingStars = [];
  let rating = 5;
  for (var i = 0; i < rating; i++) {
    RatingStars.push(<i className="fa fa-star" key={i}></i>);
  }
  return (
    <div className="flex flex-col relative items-start gap-2 m-2 rounded-lg border-2 br- ">
      <div className="product-box product-wrap">
        <div className="img-wrapper">
          <Link
            to={`/product/${_id}`}
            // className="flex flex-col items-center text-center group"
          >
            <Media
              style={{
                minHeight: "437px",
              }}
              src={`${images[0].url}`}
              className="img-fluid rounded-t-lg"
              alt=""
            />
          </Link>
        </div>
      </div>
      <div className="product-detail ml-2">
        <div
          style={{
            marginTop: "15px",
          }}
          className="rating"
        >
          {RatingStars}
        </div>
        <h6
          style={{
            lineHeight: 1,
            marginBottom: 0,
            paddingTop: "2px",
            paddingBottom: "5px",
            transition: "all .5s ease",
            fontSize: "16px",
          }}
        >
          {" "}
          {name.length > 50 ? `${name.substring(0, 50)}...` : name}
        </h6>
        {/* <h4>
        {price.toFixed(2)}
        <del>
          <span className="money">{price.toFixed(2)}</span>
        </del>
      </h4> */}
      </div>
      {/* <h2 className="text-sm mt-4 group-hover:text-primary-blue">
      {name.length > 50 ? `${name.substring(0, 50)}...` : name}
    </h2> */}

      <div className="flex flex-col gap-2 items-start ml-2 mb-2">
        {/* <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
        <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">
          {ratings.toFixed(1)} <StarIcon sx={{ fontSize: "14px" }} />
        </span>
        <span>({numOfReviews.toLocaleString()})</span>
      </span> */}
        <h4
          style={{
            fontSize: "18px",
            color: "#222",
            fontWeight: "700",
            marginBottom: 0,
          }}
        >
          ₹{price.toLocaleString()}
          <del>
            <span className="money">₹{cuttedPrice.toLocaleString()}</span>
          </del>
        </h4>
        {/* <div className="flex items-center gap-1.5 text-md font-medium">
        <span>₹{price.toLocaleString()}</span>
        <span className="text-gray-500 line-through text-xs">
          ₹{cuttedPrice.toLocaleString()}
        </span>
        <span className="text-xs text-primary-green">
          {getDiscount(price, cuttedPrice)}%&nbsp;off
        </span>
      </div> */}
      </div>
      <span
        onClick={addToWishlistHandler}
        className={`${
          itemInWishlist ? "text-red-500" : "hover:text-red-500 text-gray-300"
        } absolute top-12 right-6 cursor-pointer`}
      >
        <ShoppingCartIcon sx={{ fontSize: "18px" }} />
      </span>

      {/* <!-- wishlist badge --> */}
      <span
        onClick={addToCartHandler}
        className={`${
          itemInCart ? "text-red-500" : "hover:text-red-500 text-gray-300"
        } absolute top-6 right-6 cursor-pointer`}
      >
        <FavoriteIcon sx={{ fontSize: "18px" }} />
      </span>
      {/* <!-- wishlist badge --> */}
    </div>
  );
};

export default Product;
