import React, { useState } from "react";
import { Collapse } from "reactstrap";

import { useParams } from "react-router-dom";
import { categories } from "../../../utils/constants";
const Category = ({ setCategory }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const [url, setUrl] = useState();

  const params = useParams();

  return (
    <>
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={toggleCategory}>
          Category
        </h3>
        <Collapse isOpen={isCategoryOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <ul className="category-list">
                {categories.map((el, i) => (
                  <li>
                    <a href={null} onClick={() => setCategory(el)}>
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
