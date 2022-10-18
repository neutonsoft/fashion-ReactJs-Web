import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Media } from "reactstrap";
import Slider from "react-slick";

import { useDispatch, useSelector } from "react-redux";

import { clearErrors, getSliderProducts } from "../../actions/productAction";
const NewProduct = ({ product }) => {
  const dispatch = useDispatch();
  const { error, products, loading } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      // enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
  }, [dispatch, error]);

  return (
    // <!-- side-bar single product slider start -->
    <div className="theme-card">
      <h5 className="title-border">new product</h5>
      <Slider className="offer-slider slide-1">
        <div>
          {products.length === 0 || loading ? (
            "loading"
          ) : (
            <>
              {products &&
                products.slice(0, 3).map((product, index) => (
                  <div className="media" key={index}>
                    <a href="">
                      <Media
                        className="img-fluid blur-up lazyload"
                        src={product.images[0].url}
                        alt={"alt"}
                      />
                    </a>
                    <div className="media-body align-self-center">
                      {/* <div className="rating">
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>
                      </div> */}
                      <a href={null}>
                        <h6>{product.name}</h6>
                      </a>
                      <h4>₹{product.price}</h4>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
        <div>
          {products.length === 0 || loading ? (
            "loading"
          ) : (
            <>
              {products &&
                products.slice(4, 7).map((product, index) => (
                  <div className="media" key={index}>
                    <a href="">
                      <Media
                        className="img-fluid blur-up lazyload"
                        src={product.images[0].url}
                        alt={"alt"}
                      />
                    </a>
                    <div className="media-body align-self-center">
                      <div className="rating">
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>
                      </div>
                      <a href={null}>
                        <h6>{product.title}</h6>
                      </a>
                      <h4>₹{product.price}</h4>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </Slider>
    </div>
    //  <!-- side-bar single product slider end -->
  );
};

export default NewProduct;
