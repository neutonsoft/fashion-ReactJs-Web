import { useEffect } from "react";
import Categories from "../Layouts/Categories";
import Banner from "./Banner/Banner";
import ProductSlider from "./ProductSlider/ProductSlider";
import CategorySlider from "./CategorySlider/CategorySlider";
import DealSlider from "./DealSlider/DealSlider";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getSliderProducts } from "../../actions/productAction";
import { useSnackbar } from "notistack";
import MetaData from "../Layouts/MetaData";

const Home = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Online Shopping Site for Lifestyle!" />
      {/* <Categories /> */}
      <main className="flex flex-col gap-3  mt-20 sm:mt-2 bg-gray-50">
        <Banner />

        <br />
        {/* <DealSlider title={"Discounts for You"} /> */}
        {!loading && (
          <ProductSlider title={"SPECIAL PRODUCTS"} tagline={"NEW ARRIVALS"} />
        )}
        {!loading && (
          <CategorySlider
            title={"You May Also Like..."}
            tagline={"SHOP BY CATEGORY"}
          />
        )}
        <ProductSlider title={"Top Brands"} tagline={"Best Price"} />

        {/* <DealSlider title={"Top Offers On"} /> */}
        {/* {!loading && <ProductSlider title={"Don't Miss These!"} tagline={"Inspired by your order"} />} */}
      </main>
    </>
  );
};

export default Home;
