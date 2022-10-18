import { useSnackbar } from "notistack";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import {
  clearErrors,
  getProductDetails,
  getSimilarProducts,
  newReview,
} from "../../actions/productAction";
import { NextBtn, PreviousBtn } from "../Home/Banner/Banner";
import ProductSlider from "../Home/ProductSlider/ProductSlider";
import Loader from "../Layouts/Loader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CachedIcon from "@mui/icons-material/Cached";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { addItemsToCart } from "../../actions/cartAction";
import { getDeliveryDate, getDiscount } from "../../utils/functions";
import Service from "./Service/index";
import NewProduct from "./newProduct";
import ImageZoom from "./image-zoom";
import ProductTab from "./product-tab";
import DetailsWithPrice from "./detail-price";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../actions/wishlistAction";
import MinCategory from "../Layouts/MinCategory";
import MetaData from "../Layouts/MetaData";

import { Container, Row, Col, Media } from "reactstrap";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const navigate = useNavigate();

  // reviews toggle
  const [open, setOpen] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();

  var products = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
  };
  var productsnav = {
    infinite: false,
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
  };
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  console.log(product, "product");
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  const productId = params.id;
  const itemInWishlist = wishlistItems.some((i) => i.product === productId);

  const addToWishlistHandler = () => {
    if (itemInWishlist) {
      dispatch(removeFromWishlist(productId));
      enqueueSnackbar("Remove From Wishlist", { variant: "success" });
    } else {
      dispatch(addToWishlist(productId));
      enqueueSnackbar("Added To Wishlist", { variant: "success" });
    }
  };

  const reviewSubmitHandler = () => {
    if (rating === 0 || !comment.trim()) {
      enqueueSnackbar("Empty Review", { variant: "error" });
      return;
    }
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", productId);
    dispatch(newReview(formData));
    setOpen(false);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(productId));
    enqueueSnackbar("Product Added To Cart", { variant: "success" });
  };

  const handleDialogClose = () => {
    setOpen(!open);
  };

  const itemInCart = cartItems.some((i) => i.product === productId);

  const goToCart = () => {
    navigate("/cart");
  };

  const buyNow = () => {
    addToCartHandler();
    navigate("/shipping");
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (reviewError) {
      enqueueSnackbar(reviewError, { variant: "error" });
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar("Review Submitted Successfully", { variant: "success" });
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(productId));
    // eslint-disable-next-line
  }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

  useEffect(() => {
    dispatch(getSimilarProducts(product?.category));
  }, [dispatch, product, product.category]);

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, [product]);

  const { nav1, nav2 } = state;

  const filterClick = () => {
    document.getElementById("filter").style.left = "-15px";
  };

  const changeColorVar = (img_id) => {
    slider2.current.slickGoTo(img_id);
  };
  console.log(slider1.current, "slider1.current");
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product.name} />
          {/* <MinCategory /> */}
          <section className="bg-gray-50 mt-20">
            <div className="collection-wrapper">
              <Container>
                <Row>
                  <Col sm="3" className="collection-filter" id="filter">
                    {/* <Filter /> */}
                    <Service />
                    {/* <!-- side-bar single product slider start --> */}
                    <NewProduct />
                    {/* <!-- side-bar single product slider end --> */}
                  </Col>
                  <Col lg="9" sm="12" xs="12">
                    <Container fluid={true}>
                      <Row>
                        <Col lg="6" className="product-thumbnail">
                          <Slider
                            {...products}
                            asNavFor={nav2}
                            ref={(slider) => (slider1.current = slider)}
                            className="product-slick"
                          >
                            {Object.keys(product).length &&
                              product.images.map((vari, index) => (
                                <div key={index}>
                                  <ImageZoom image={vari} />
                                </div>
                              ))}
                          </Slider>
                          <Slider
                            className="slider-nav"
                            {...productsnav}
                            asNavFor={nav1}
                            ref={(slider) => (slider2.current = slider)}
                          >
                            {Object.keys(product).length && product.images
                              ? product.images.map((vari, index) => (
                                  <div key={index}>
                                    <Media
                                      src={`${vari?.url}`}
                                      key={index}
                                      alt={"alt"}
                                      className="img-fluid"
                                    />
                                  </div>
                                ))
                              : ""}
                          </Slider>
                        </Col>
                        <Col lg="6" className="rtl-text">
                          <DetailsWithPrice
                            item={product}
                            changeColorVar={changeColorVar}
                          />
                        </Col>
                      </Row>
                    </Container>
                    <ProductTab product={product} />
                  </Col>
                </Row>
              </Container>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProductDetails;
