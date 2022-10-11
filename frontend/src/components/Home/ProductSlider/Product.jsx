import StarIcon from "@mui/icons-material/Star";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Media, Modal, ModalBody, ModalHeader } from "reactstrap";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../actions/wishlistAction";
import img1 from "../../../assets/images/new/2.jpg";
import img2 from "../../../assets/images/new/12.jpg";
import img3 from "../../../assets/images/new/14.jpg";
import img4 from "../../../assets/images/new/16.jpg";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../../actions/cartAction";
import React, { useState } from "react";
import { getDiscount } from "../../../utils/functions";
const Product = (props) => {
  const {
    _id,
    name,
    images,
    ratings,
    numOfReviews,
    price,
    cuttedPrice,
    description,
  } = props;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState("");

  const [modal, setModal] = useState(false);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);

  const itemInWishlist = wishlistItems.some((i) => i.product === _id);
  const itemInCart = cartItems.some((i) => i.product === _id);

  const toggle = () => setModal(!modal);
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

  const onClickHandle = (img) => {
    setImage(img);
  };
  // const variantChangeByColor = (imgId, product_images) => {
  //   product_images.map((data) => {
  //     if (data.image_id == imgId) {
  //       setImage(data.url);
  //     }
  //   });
  // };
  let RatingStars = [];
  let rating = 5;
  for (var i = 0; i < rating; i++) {
    RatingStars.push(<i className="fa fa-star" key={i}></i>);
  }
  return (
    <>
      <div className="product-box product-wrap">
        <div className="img-wrapper">
          <Link
            to={`/product/${_id}`}
            // className="flex flex-col items-center text-center group"
          >
            <div className="front">
              <Media
                style={{
                  minHeight: "437px",
                }}
                src={`${image ? image : images[0].url}`}
                className="img-fluid "
                alt=""
              />
            </div>
            {images[1] ? (
              <div className="back">
                <Media
                  style={{
                    minHeight: "437px",
                  }}
                  src={`${image ? image : images[1].url}`}
                  className="img-fluid m-auto"
                  alt=""
                />
              </div>
            ) : (
              <></>
            )}
          </Link>
          <div className="cart-info cart-wrap">
            <button
              data-toggle="modal"
              data-target="#addtocart"
              title="Add to cart"
              onClick={addToCartHandler}
            >
              <i className="fa fa-shopping-cart"></i>
            </button>
            <a
              href={null}
              title="Add to Wishlist"
              onClick={addToWishlistHandler}
            >
              <i className="fa fa-heart" aria-hidden="true"></i>
            </a>
            <a href={null} title="Quick View" onClick={toggle} className="z-10">
              <i className="fa fa-search" aria-hidden="true"></i>
            </a>
            {/* <a href={null} title="Compare">
                <i className="fa fa-refresh" aria-hidden="true"></i>
              </a> */}
          </div>
          {images.length > 1 ? (
            <ul className="product-thumb-list">
              {images.map((img, i) => (
                <li
                  className={`grid_thumb_img ${
                    img.url === image ? "active" : ""
                  }`}
                  key={i}
                >
                  <a href={null}>
                    <Media
                      style={{
                        zIndex: 10,
                      }}
                      src={`${img.url}`}
                      alt="wishlist"
                      onClick={() => onClickHandle(img.url)}
                    />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="product-detail">
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

      <div className="flex flex-col gap-2 items-start">
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
      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <ModalHeader>Quick View</ModalHeader>
        <ModalBody>
          <Row className="compare-modal">
            <Col lg="6" xs="12">
              <div className="quick-view-img">
                <Media
                  src={`${image ? image : images[0].url}`}
                  alt=""
                  className="img-fluid"
                />
              </div>
            </Col>
            <Col lg="6" className="rtl-text">
              <div className="product-right">
                <h2> {name} </h2>
                <div className="flex items-center gap-1.5 text-md font-medium">
                  <span>₹{price.toLocaleString()}</span>
                  <span className="text-gray-500 line-through text-xs">
                    ₹{cuttedPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-primary-green">
                    {getDiscount(price, cuttedPrice)}%&nbsp;off
                  </span>
                </div>
                {/* {product.variants ? (
                  <ul className="color-variant">
                    {uniqueTags ? (
                      <ul className="color-variant">
                        {product.type === "jewellery" ||
                        product.type === "nursery" ||
                        product.type === "beauty" ||
                        product.type === "electronics" ||
                        product.type === "goggles" ||
                        product.type === "watch" ||
                        product.type === "pets" ? (
                          ""
                        ) : (
                          <>
                            {uniqueTags.map((vari, i) => {
                              return (
                                <li
                                  className={vari.color}
                                  key={i}
                                  title={vari.color}
                                  onClick={() =>
                                    variantChangeByColor(
                                      vari.image_id,
                                      product.Images
                                    )
                                  }
                                ></li>
                              );
                            })}
                          </>
                        )}
                      </ul>
                    ) : (
                      ""
                    )}
                  </ul>
                ) : (
                  ""
                )} */}
                <div className="border-product">
                  <h6 className="product-title">product details</h6>
                  <p>{description}</p>
                </div>
                {/* <div className="product-description border-product">
                  {product.size ? (
                    <div className="size-box">
                      <ul>
                        {product.size.map((size, i) => {
                          return (
                            <li key={i}>
                              <a href={null}>{size}</a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                  <h6 className="product-title">quantity</h6>
                  <div className="qty-box">
                    <div className="input-group">
                      <span className="input-group-prepend">
                        <button
                          type="button"
                          className="btn quantity-left-minus"
                          onClick={minusQty}
                          data-type="minus"
                          data-field=""
                        >
                          <i className="fa fa-angle-left"></i>
                        </button>
                      </span>
                      <input
                        type="text"
                        name="quantity"
                        value={quantity}
                        onChange={changeQty}
                        className="form-control input-number"
                      />
                      <span className="input-group-prepend">
                        <button
                          type="button"
                          className="btn quantity-right-plus"
                          onClick={() => plusQty(product)}
                          data-type="plus"
                          data-field=""
                        >
                          <i className="fa fa-angle-right"></i>
                        </button>
                      </span>
                    </div>
                  </div>
                </div> */}
                <div className="product-buttons">
                  <button className="btn btn-solid" onClick={addToCartHandler}>
                    add to cart
                  </button>
                  <button
                    className="btn btn-solid"
                    // onClick={clickProductDetail}
                  >
                    <Link
                      style={{
                        color: "#ffff",
                      }}
                      to={`/product/${_id}`}
                      // className="flex flex-col items-center text-center group"
                    >
                      View detail
                    </Link>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Product;
