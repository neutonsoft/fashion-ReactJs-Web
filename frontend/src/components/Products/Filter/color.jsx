import React, { useState, useContext } from "react";

import { Collapse } from "reactstrap";

const colors = [
  "yellow",
  "white",
  "pink",
  "olive",
  "navy",
  "red",
  "black",
  "skyblue",
  "green",
  "gray",
  "maroon",
  "blue",
  "orange",
];

const Color = ({ selectedColor, setSelectedColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggle}>
        colors
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="color-selector">
            <ul>
              {colors.map((color, i) => (
                <li
                  className={`${color} ${
                    selectedColor === color ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedColor(color);
                  }}
                  key={i}
                ></li>
              ))}
            </ul>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Color;
