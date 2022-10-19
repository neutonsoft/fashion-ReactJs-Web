import React, { useState, useContext } from "react";
import { Collapse, Input } from "reactstrap";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const Size = ({ selectedSize, setSelectedSize }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const handleSizes = (size, index) => {
    console.log(selectedSize, "selectedSize");

    var index = selectedSize.indexOf(size);
    if (index > -1) {
      setSelectedSize((prev) => prev.filter((e) => e !== size));
    } else {
      setSelectedSize((prev) => [...prev, size]);
    }
  };

  return (
    <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title" onClick={toggle}>
        size
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-size-filter">
            {sizes.map((size, index) => (
              <div
                key={index}
                className="form-check custom-checkbox collection-filter-checkbox"
              >
                <Input
                  checked={selectedSize.includes(size)}
                  onChange={() => {
                    handleSizes(size, index);
                  }}
                  type="checkbox"
                  className="custom-control-input"
                  id={size}
                />

                <label className="custom-control-label" htmlFor={size}>
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Size;
