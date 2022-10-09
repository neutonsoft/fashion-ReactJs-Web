import StarIcon from "@mui/icons-material/Star";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Media, Modal, ModalBody, ModalHeader } from "reactstrap";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../actions/wishlistAction";
import { getDiscount } from "../../../utils/functions";
const Product = (props) => {
  const { _id, name, images, ratings, numOfReviews, price, cuttedPrice } =
    props;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { wishlistItems } = useSelector((state) => state.wishlist);

  const itemInWishlist = wishlistItems.some((i) => i.product === _id);

  const addToWishlistHandler = () => {
    if (itemInWishlist) {
      dispatch(removeFromWishlist(_id));
      enqueueSnackbar("Remove From Wishlist", { variant: "success" });
    } else {
      dispatch(addToWishlist(_id));
      enqueueSnackbar("Added To Wishlist", { variant: "success" });
    }
  };

  return (
    <div
      className="flex flex-col items-center shadow-md bg-primary-white, 
         rounded-sm overflow-hidden my-10 mr-10 px-2 py-6 relative h-96 "
    >
      <Link
        to={`/product/${_id}`}
        className="flex flex-col items-center text-center group"
      >
        <div className="product-box">
          <div className="img-wrapper">
            <div className="front" o>
              <a href="#!">
                <Media
                  src={images[0].url}
                  className="img-fluid blur-up lazyload"
                  alt=""
                />
              </a>
            </div>
            <div className="cart-info cart-wrap">
              <button
                data-toggle="modal"
                data-target="#addtocart"
                title="Add to cart"
                onClick={addToWishlistHandler}
              >
                <i className="fa fa-shopping-cart"></i>
              </button>
              <a href={null} title="Add to Wishlist">
                <i className="fa fa-heart" aria-hidden="true"></i>
              </a>
              <a
                href={null}
                data-toggle="modal"
                data-target="#quick-view"
                title="Quick View"
              >
                <i className="fa fa-search" aria-hidden="true"></i>
              </a>
              <a href={null} title="Compare">
                <i className="fa fa-refresh" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="product-detail">
          <a href="#!">
            <h6> {name.length > 50 ? `${name.substring(0, 50)}...` : name}</h6>
          </a>
          <h4>
            {price.toFixed(2)}
            <del>
              <span className="money">{price.toFixed(2)}</span>
            </del>
          </h4>
        </div>
        <h2 className="text-sm mt-4 group-hover:text-primary-blue">
          {name.length > 50 ? `${name.substring(0, 50)}...` : name}
        </h2>
      </Link>

      <div className="flex flex-col gap-2 items-center">
        <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
          <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">
            {ratings.toFixed(1)} <StarIcon sx={{ fontSize: "14px" }} />
          </span>
          <span>({numOfReviews.toLocaleString()})</span>
        </span>

        <div className="flex items-center gap-1.5 text-md font-medium">
          <span>₹{price.toLocaleString()}</span>
          <span className="text-gray-500 line-through text-xs">
            ₹{cuttedPrice.toLocaleString()}
          </span>
          <span className="text-xs text-primary-green">
            {getDiscount(price, cuttedPrice)}%&nbsp;off
          </span>
        </div>
      </div>
      <Modal size="lg" centered>
        <ModalHeader>Quick View</ModalHeader>
        <ModalBody>
          <Row className="compare-modal">
            <Col lg="12">
              <div className="media">
                <Media src={images[0].url} alt="" className="img-fluid" />
                <div className="media-body align-self-center text-center">
                  <h5>
                    <i className="fa fa-check"></i>Item{" "}
                    <span>
                      {name.length > 50 ? `${name.substring(0, 50)}...` : name}{" "}
                    </span>
                    <span> successfully added to your Compare list</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Product;
