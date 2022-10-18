import React, { useState, useContext } from "react";
import { useSnackbar } from "notistack";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../actions/cartAction";
import sizeChart from "../../assets/images/size-chart.jpg";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { getDiscount } from "../../utils/functions";
import { Modal, ModalBody, ModalHeader, Media, Input } from "reactstrap";
// import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
// import CartContext from "../../../helpers/cart";
// import CountdownComponent from "../../../components/common/widgets/countdownComponent";
// import MasterSocial from "./master_social";

const DetailsWithPrice = ({ item, stickyClass, changeColorVar }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [modal, setModal] = useState(false);
  // const CurContect = useContext(CurrencyContext);
  // const symbol = CurContect.state.symbol;
  const toggle = () => setModal(!modal);
  const product = item;
  // const context = useContext(CartContext);
  // const stock = context.stock;
  // const plusQty = context.plusQty;
  // const minusQty = context.minusQty;
  // const quantity = context.quantity;
  const navigate = useNavigate();

  const productId = params.id;
  const { cartItems } = useSelector((state) => state.cart);

  const itemInCart = cartItems.some((i) => i.product === productId);

  const changeQty = (e) => {
    // setQuantity(parseInt(e.target.value));
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCart(productId));
    enqueueSnackbar("Product Added To Cart", { variant: "success" });
  };

  const goToCart = () => {
    navigate("/cart");
  };
  const buyNow = () => {
    addToCartHandler();
    navigate("/shipping");
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

        {product?.colors ? (
          <ul className="color-variant">
            {product.colors.map((vari, i) => {
              return (
                <li
                  className={vari.color}
                  key={i}
                  title={vari.color}
                  onClick={() => changeColorVar(i)}
                ></li>
              );
            })}
          </ul>
        ) : (
          ""
        )}
        <div className="product-description border-product">
          {true ? (
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
              <div className="size-box">
                <ul>
                  {["xs", "sm", "md", "lg"].map((data, i) => {
                    return (
                      <li className="rounded bg-gray-200 p-3 m-1" key={i}>
                        <a href={null}>{data}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
          <span className="instock-cls">{product?.stock}</span>
          <h6 className="product-title">quantity</h6>
          <div className="qty-box">
            <div className="input-group">
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-left-minus"
                  // onClick={minusQty}
                  data-type="minus"
                  data-field=""
                >
                  <i className="fa fa-angle-left"></i>
                </button>
              </span>
              <Input
                type="text"
                name="quantity"
                value={"3"}
                onChange={changeQty}
                className="form-control input-number"
              />
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-right-plus"
                  // onClick={() => plusQty(product)}
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
        <div className="border-product">
          <h6 className="product-title">product details</h6>
          <p>{product.description}</p>
        </div>
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
