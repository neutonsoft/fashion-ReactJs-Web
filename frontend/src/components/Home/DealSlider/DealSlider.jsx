import Product from "./Product";
import Slider from "react-slick";
import { NextBtn, PreviousBtn } from "../Banner/Banner";
import { Link } from "react-router-dom";
import { offerProducts } from "../../../utils/constants";
import { getRandomProducts } from "../../../utils/functions";

export const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 1,
  swipe: false,
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const DealSlider = ({ title, tagline }) => {
  return (
    <section className="bg-white w-full shadow overflow-hidden">
      {/* <!-- header --> */}
      <div className={"title1 section-t-space mb-10"}>
        <h4>{title}</h4>
        <h2 className="title-inner1">{tagline}</h2>
        <Link to="/products" className={"button-details"}>
          view all
        </Link>
      </div>

      <hr />
      {/* <!-- header --> */}

      <Slider {...settings}>
        {getRandomProducts(offerProducts, 12).map((item, i) => (
          <Product {...item} key={i} />
        ))}
      </Slider>
    </section>
  );
};

export default DealSlider;
