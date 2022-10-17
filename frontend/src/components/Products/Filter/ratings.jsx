import React, { useState, useContext } from "react";
import { Collapse } from "reactstrap";

import { useParams, useLocation } from "react-router-dom";
const Ratings = ({ setRating }) => {
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const toggleCategory = () => setIsRatingOpen(!isRatingOpen);
  const [url, setUrl] = useState();

  const params = useParams();
  const location = useLocation();

  return (
    <>
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={toggleCategory}>
          Ratings
        </h3>
        <Collapse isOpen={isRatingOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <ul className="category-list">
                {[4, 3, 2, 1].map((el, i) => (
                  <li>
                    <a href={null} onClick={() => setRating(el)}>
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

export default Ratings;
