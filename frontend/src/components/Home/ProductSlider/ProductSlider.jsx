import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getRandomProducts } from "../../../utils/functions";
// import { settings } from "../DealSlider/DealSlider";
import Product from "./Product";
import img1 from "../../../assets/images/new/2.jpg";
import img2 from "../../../assets/images/new/12.jpg";
import img3 from "../../../assets/images/new/14.jpg";
import img4 from "../../../assets/images/new/16.jpg";

const settings = {
  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  autoplay: true,
  arrows: true,
  dots: false,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 991,
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
const ProductSlider = ({ title, tagline }) => {
  const { loading, products } = useSelector((state) => state.products);
  console.log(products, "products");
  return (
    <>
      <section className={"section-b-space p-t-0 ratio_asos px-2"}>
        <div className={"title1 section-t-space mb-10"}>
          <h4>{title}</h4>
          <h2 className="title-inner1">{tagline}</h2>
          <Link to="/products" className="button-details">
            view all
          </Link>
        </div>
        <Container>
          <Row>
            <Col>
              {loading ? null : (
                <Slider {...settings} className="product-m slide-1 home-slider">
                  {products &&
                    products.map((product, i) => (
                      <div key={i}>
                        <Product {...product} />
                      </div>
                    ))}
                </Slider>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProductSlider;
