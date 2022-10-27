import React, { useEffect, useState } from "react";
import { Col, Media } from "reactstrap";
import { clearErrors, getProducts } from "../../../actions/productAction";

import sideBanner from "../../../assets/images/side-banner.png";
// import NewProduct from "./newProduct";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import Category from "./category";
import Occasion from "./occasion";
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
  const [category, setCategory] = useState("");
  const [occasion, setOccasion] = useState("");
  const [price, setPrice] = useState([0, 200000]);
  const [priceMove, setPriceMove] = useState(false);
  const [ratings, setRating] = useState(0);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(
      getProducts({
        keyword,
        category,
        occasion,
        price,
        selectedColor,
        selectedSize,
      })
    );
  }, [
    dispatch,
    keyword,
    category,
    occasion,
    priceMove,
    selectedSize,
    selectedColor,
    error,
    enqueueSnackbar,
  ]);

  useEffect(() => {
    if (location?.search) {
      if (location.search.includes("category")) {
        setCategory(location.search.split("=")[1]);
        setOccasion("");
      }
      if (location.search.includes("occasion")) {
        setOccasion(location.search.split("=")[1]);
        setCategory("");
      }
    }
  }, [location]);
  const clearFilters = () => {
    setPrice([0, 200000]);
    setCategory("");
    setOccasion("");
    setSelectedColor("");
    setSelectedSize([]);
  };
  useEffect(() => {
    if (location.search.length === 0) {
      clearFilters();
    }
  }, [location]);
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
          <div className="flex items-center justify-between gap-5 px-4 py-2 border-b">
            <h3 className="text-lg font-medium text-black">Filters</h3>
            <h3
              className="bg-gray-300 rounded p-1 text-black text-lg cursor-pointer font-medium"
              onClick={() => clearFilters()}
            >
              Clear All
            </h3>
          </div>
          <Category category={category} setCategory={setCategory} />
          <Occasion occasion={occasion} setOccasion={setOccasion} />
          {/* <Ratings ratings={ratings} setRating={setRating} /> */}
          <Color
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <Size selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
          <Price
            price={price}
            setPrice={setPrice}
            priceMove={priceMove}
            setPriceMove={setPriceMove}
          />
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
