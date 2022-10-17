import React, { useEffect, useState } from "react";
import { Col, Media } from "reactstrap";
import { clearErrors, getProducts } from "../../../actions/productAction";

import sideBanner from "../../../assets/images/side-banner.png";
// import NewProduct from "./newProduct";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import Category from "./category";
import Color from "./color";
import Price from "./price";
import Ratings from "./ratings";
import Size from "./size";
import { useParams, useLocation } from "react-router-dom";

const FilterPage = ({ sidebarView, closeSidebar }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = params.keyword;

  const location = useLocation();
  const [category, setCategory] = useState(
    location.search ? location.search.split("=")[1] : ""
  );
  const [price, setPrice] = useState([0, 200000]);
  const [ratings, setRating] = useState(0);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, category, price, ratings));
  }, [dispatch, keyword, category, price, ratings, error, enqueueSnackbar]);

  return (
    <>
      <Col
        sm={3}
        className="collection-filter"
        style={sidebarView ? { left: "0px" } : {}}
      >
        {/* <!-- side-bar colleps block stat --> */}
        <div className="collection-filter-block">
          {/* <!-- brand filter start --> */}
          <div
            className="collection-mobile-back"
            onClick={() => closeSidebar()}
          >
            <span className="filter-back">
              <i className="fa fa-angle-left" aria-hidden="true"></i> back
            </span>
          </div>
          <Category setCategory={setCategory} />
          <Ratings setRating={setRating} setSelectedSize={setSelectedSize} />
          <Color selectedColor={selectedColor} />
          <Size selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
          <Price price={price} setPrice={setPrice} />
        </div>
        {/* <!-- silde-bar colleps block end here -->*/}
        {/* <NewProduct /> */}
        {/* <!-- side-bar banner start here -->  */}
        <div className="collection-sidebar-banner">
          <a href={null}>
            <Media
              src={sideBanner.src}
              className="img-fluid blur-up lazyload"
              alt=""
            />
          </a>
        </div>
        {/* <!-- side-bar banner end here --> */}
      </Col>
    </>
  );
};

export default FilterPage;
