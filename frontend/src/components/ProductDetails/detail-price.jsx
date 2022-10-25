import React, { useState, useContext } from "react";
import { useSnackbar } from "notistack";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../actions/cartAction";
import sizeChart from "../../assets/images/size-chart.jpg";
import ProductTab from "./product-tab";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { getDiscount } from "../../utils/functions";
import { Modal, ModalBody, ModalHeader, Media, Input } from "reactstrap";
// import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
// import CartContext from "../../../helpers/cart";
// import CountdownComponent from "../../../components/common/widgets/countdownComponent";
// import MasterSocial from "./master_social";

const DetailsWithPrice = ({ item, stickyClass }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const toggle = () => setModal(!modal);
  const product = item;
  const navigate = useNavigate();

  const productId = params.id;
  const { cartItems } = useSelector((state) => state.cart);

  const itemInCart = cartItems.some((i) => i.product === productId);

  const addToCartHandler = () => {
    // if (selectedColor === "") {
    //   enqueueSnackbar("Add Color", { variant: "warning" });
    //   return;
    // }
    if (selectedSize === "") {
      enqueueSnackbar("Add size", { variant: "warning" });
      return;
    }
    if (quantity === 0) {
      enqueueSnackbar("Add quantity", { variant: "warning" });
      return;
    }
    dispatch(addItemsToCart(productId, quantity));
    enqueueSnackbar("Product Added To Cart", { variant: "success" });
  };

  const goToCart = () => {
    // if (selectedColor === "") {
    //   enqueueSnackbar("Add Color", { variant: "warning" });
    //   return;
    // }
    if (selectedSize === "") {
      enqueueSnackbar("Add size", { variant: "warning" });
      return;
    }
    if (quantity === 0) {
      enqueueSnackbar("Add quantity", { variant: "warning" });
      return;
    }
    navigate("/cart");
  };
  const buyNow = () => {
    // if (selectedColor === "") {
    //   enqueueSnackbar("Add Color", { variant: "warning" });
    //   return;
    // }
    if (selectedSize === "") {
      enqueueSnackbar("Add size", { variant: "warning" });
      return;
    }
    if (quantity === 0) {
      enqueueSnackbar("Add quantity", { variant: "warning" });
      return;
    }
    addToCartHandler();
    navigate("/shipping");
  };

  const handleSizes = (size, index) => {
    console.log(selectedSize, "selectedSize");

    var index = selectedSize.indexOf(size);
    if (index > -1) {
      setSelectedSize((prev) => prev.filter((e) => e !== size));
    } else {
      setSelectedSize((prev) => [...prev, size]);
    }
  };

  const handleChange = (event) => {
    setSelectedSize(event.target.value);
  };
  return (
    <>
      <div className={`product-right ${stickyClass}`}>
        <h2> {product.title} </h2>
        <h4>
          <del>₹{product.price}</del>
          <span>{product.cuttedPrice}%&nbsp;off</span>
        </h4>
        <h3>₹{product.price - (product.price * product.cuttedPrice) / 100}</h3>
        {/* <div className="collection-collapse-block-content">
          <div className="color-selector">
            <h6 className="product-title size-text">select size</h6>
            {product?.color && product?.color.length ? (
              <ul>
                {product.color.map((x, i) => {
                  return (
                    <li
                      className={`${x} ${selectedColor === x ? "active" : ""}`}
                      key={i}
                      title={x}
                      onClick={() => setColor(x)}
                    ></li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </div>
        </div> */}
        <div className="product-description border-product">
          {product?.size && product?.size.length ? (
            <div>
              <h6 className="product-title size-text">
                select size
                <span>
                  <a
                    href={null}
                    data-toggle="modal"
                    data-target="#sizemodal"
                    onClick={toggle}
                    className="cursor-pointer"
                  >
                    size chart
                  </a>
                </span>
              </h6>
              <Modal isOpen={modal} toggle={toggle} centered>
                {/* <ModalHeader toggle={toggle}>Sheer Straight Kurta</ModalHeader> */}
                <ModalHeader toggle={toggle}></ModalHeader>
                <ModalBody>
                  <Media src={sizeChart} alt="size" className="img-fluid" />
                </ModalBody>
              </Modal>
              {/* <div className="size-box">
                <ul>
                  {product.size.map((size, index) => (
                    <div
                      key={index}
                      className="form-check custom-checkbox collection-filter-checkbox"
                    >
                      <Input
                        checked={selectedSize === size}
                        onChange={(e) => {
                          setSelectedSize(e.target.value);
                        }}
                        type="radio"
                        className="custom-control-input"
                        id={size}
                      />

                      <label className="custom-control-label" htmlFor={size}>
                        {size}
                      </label>
                    </div>
                  ))}
                </ul>
              </div> */}

              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={selectedSize}
                  onChange={handleChange}
                >
                  {product.size.map((size, index) => (
                    <FormControlLabel
                      value={size}
                      control={<Radio />}
                      label={size}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          ) : (
            ""
          )}
          {/* <span className="instock-cls">{product?.stock}</span> */}
          <h6 className="product-title">quantity</h6>
          <div className="qty-box">
            <div className="input-group">
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-left-minus"
                  onClick={() => {
                    quantity > 0 && setQuantity((prev) => prev - 1);
                  }}
                  data-type="minus"
                  data-field=""
                >
                  <i className="fa fa-angle-left"></i>
                </button>
              </span>
              <Input
                type="text"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control input-number"
              />
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-right-plus"
                  onClick={() => {
                    quantity < product.quantity &&
                      setQuantity((prev) => prev + 1);
                  }}
                  data-type="plus"
                  data-field=""
                >
                  <i className="fa fa-angle-right"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-3">
          {product.stock > 0 && (
            <button
              onClick={itemInCart ? goToCart : addToCartHandler}
              className="p-2 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-yellow rounded-sm shadow hover:shadow-lg"
            >
              <ShoppingCartIcon />
              {itemInCart ? "GO TO CART" : "ADD TO CART"}
            </button>
          )}
          <button
            onClick={buyNow}
            disabled={product.stock < 1 ? true : false}
            className={
              product.stock < 1
                ? "p-2 w-full flex items-center justify-center gap-2 text-white bg-red-600 cursor-not-allowed rounded-sm shadow hover:shadow-lg"
                : "p-2 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-orange rounded-sm shadow hover:shadow-lg"
            }
          >
            <FlashOnIcon />
            {product.stock < 1 ? "OUT OF STOCK" : "BUY NOW"}
          </button>
        </div>
        <ProductTab product={product} />
        {/* <div className="border-product">
          <h6 className="product-title">product details</h6>
          <p>{product.description}</p>
        </div> */}
        {/* <div className="border-product">
          <h6 className="product-title">share it</h6>
          <div className="product-icon">
            <MasterSocial />
          </div>
        </div> */}
        {/* <div className="border-product">
          <h6 className="product-title">Time Reminder</h6>
          <CountdownComponent />
        </div> */}
      </div>
    </>
  );
};

export default DetailsWithPrice;
