import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Pagination from "@mui/material/Pagination";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Col, Row, Media, Button, Spinner } from "reactstrap";
import Slider from "@mui/material/Slider";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProducts } from "../../actions/productAction";
import Loader from "../Layouts/Loader";
import MinCategory from "../Layouts/MinCategory";
import Product from "./Product";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StarIcon from "@mui/icons-material/Star";
import { categories } from "../../utils/constants";
import MetaData from "../Layouts/MetaData";
import { getRandomProducts } from "../../utils/functions";
import { useLocation } from "react-router-dom";
import Filter from "./Filter/filter";

const ProductsList = ({ openSidebar, noSidebar }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const location = useLocation();

  const [price, setPrice] = useState([0, 200000]);
  const [category, setCategory] = useState("");
  const [occasion, setOccasion] = useState("");
  const [ratings, setRatings] = useState(0);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  // filter toggles
  const [categoryToggle, setCategoryToggle] = useState(true);
  const [ratingsToggle, setRatingsToggle] = useState(true);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const keyword = params.keyword;
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const clearFilters = () => {
    setPrice([0, 200000]);
    setCategory("");
    setOccasion("");
  };
  useEffect(() => {
    if (location.search.length === 0) {
      clearFilters();
    }
  }, [location]);
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getProducts({ keyword, category, occasion, price, currentPage }));
  }, [
    dispatch,
    keyword,
    category,
    occasion,
    price,
    currentPage,
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
  return (
    <div className="flex-1">
      {!loading && products?.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 bg-white shadow-sm rounded-sm p-6 sm:p-16">
          <img
            draggable="false"
            className="w-1/2 h-44 object-contain"
            src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png"
            alt="Search Not Found"
          />
          <h1 className="text-2xl font-medium text-gray-900">
            Sorry, no results found!
          </h1>
          <p className="text-xl text-center text-primary-grey">
            Please check the spelling or try searching for something else
          </p>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-white">
          {!noSidebar ? (
            <Row>
              <Col xl="12">
                <div className="filter-main-btn" onClick={() => openSidebar()}>
                  <span className="filter-btn btn btn-theme">
                    <i className="fa fa-filter" aria-hidden="true"></i> Filter
                  </span>
                </div>
              </Col>
            </Row>
          ) : (
            ""
          )}
          <div className="flex flex-wrap  grid-cols-1 sm:grid-cols-4 w-full place-content-start overflow-hidden pb-4 border-b">
            {products?.map((product) => (
              <Product {...product} key={product._id} />
            ))}
          </div>
          {filteredProductsCount > resultPerPage && (
            <Pagination
              count={Number(
                ((filteredProductsCount + 6) / resultPerPage).toFixed()
              )}
              page={currentPage}
              onChange={(e, val) => setCurrentPage(val)}
              color="primary"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
