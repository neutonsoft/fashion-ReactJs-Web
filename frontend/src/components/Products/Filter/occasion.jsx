import React, { useState } from "react";
import { Collapse } from "reactstrap";

import { useParams } from "react-router-dom";
import { occasions } from "../../../utils/constants";
const Category = ({ occasion, setOccasion }) => {
  const [isOccasionOpen, setIsOccasionOpen] = useState(false);
  const toggleOccasion = () => setIsOccasionOpen(!isOccasionOpen);
  const [url, setUrl] = useState();

  const params = useParams();

  return (
    <>
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={toggleOccasion}>
          Occasion
        </h3>
        <Collapse isOpen={isOccasionOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <ul className="category-list">
                {occasions.map((el, i) => (
                  <li>
                    <a
                      style={{
                        textDecoration: el == occasion ? "underline" : "",
                        textDecorationColor:
                          el == occasion ? "red" : "transparent",
                      }}
                      href={null}
                      onClick={() => setOccasion(el)}
                    >
                      {el}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default Category;
