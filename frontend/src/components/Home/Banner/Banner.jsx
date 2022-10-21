import Slider from "react-slick";
import React, { Fragment } from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./Banner.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import gadgetSale from "../../../assets/images/Banners/gadget-sale.jpg";
import kitchenSale from "../../../assets/images/Banners/kitchen-sale.jpg";
import poco from "../../../assets/images/Banners/minimalist.jpg";
import realme from "../../../assets/images/Banners/bluePink.jpg";
import fashionSale from "../../../assets/images/Banners/fashionsale.jpg";
import oppo from "../../../assets/images/Banners/black.jpg";
import MasterBanner from "./MasterBanner/MasterBanner";
export const PreviousBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosIcon />
    </div>
  );
};

export const NextBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosIcon />
    </div>
  );
};

const Banner = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // prevArrow: <PreviousBtn />,
    // nextArrow: <NextBtn />,
    // arrows: false,
  };

  const Data = [
    {
      classes: " p-center text-center",
      img: gadgetSale,
      title: "welcome to Shop",
      desc: "",
      link: "/products",
    },
    {
      classes: " p-center text-center",
      img: kitchenSale,
      title: "welcome to Shop",
      desc: "",
      link: "/products",
    },
    {
      classes: " p-center text-center",
      img: poco,
      title: "welcome to Shop",
      desc: "",
      link: "/products",
    },
    {
      classes: " p-center text-center",
      img: fashionSale,
      title: "welcome to Shop",
      desc: "",
      link: "/products",
    },
    {
      classes: " p-center text-center",
      img: realme,
      title: "welcome to Shop",
      desc: "",
      link: "/products",
    },
    {
      classes: " p-center text-center",
      img: oppo,
      title: "welcome to Shop",
      desc: "",
      link: "/products",
    },
  ];
  return (
    <Fragment>
      <section className="first-banner p-0 bg-red-50">
        <Slider {...settings} className="slide-1 home-slider">
          {Data.map((data, i) => {
            return (
              <MasterBanner
                key={i}
                img={data.img}
                desc={data.desc}
                title={data.title}
                link={data.link}
              />
            );
          })}
        </Slider>
      </section>
    </Fragment>
  );
};

export default Banner;
