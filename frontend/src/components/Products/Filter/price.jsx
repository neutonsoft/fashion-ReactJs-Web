import React, { useState, useContext, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
import { useRouter } from "next/router";
import Slider from "@mui/material/Slider";

const Price = ({ price, setPrice, priceMove, setPriceMove }) => {
  const router = useRouter();
  const [url, setUrl] = useState();
  useEffect(() => {
    const pathname = window.location.pathname;
    setUrl(pathname);
  }, []);

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  return (
    <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title">price</h3>
      <div className="collection-collapse-block-content">
        <div className="wrapper mt-3">
          <div className="range-slider">
            <Slider
              value={price}
              onChange={priceHandler}
              onChangeCommitted={() => setPriceMove(!priceMove)}
              valueLabelDisplay="auto"
              getAriaLabel={() => "Price range slider"}
              min={0}
              max={200000}
            />

            <div className="flex gap-3 items-center justify-between mb-2 min-w-full">
              <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">
                ₹{price[0].toLocaleString()}
              </span>
              <span className="font-medium text-gray-400">to</span>
              <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">
                ₹{price[1].toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
