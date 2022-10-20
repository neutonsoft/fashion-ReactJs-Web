import React from "react";
import { Media } from "reactstrap";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
const ImageZoom = (props) => {
  const { image } = props;

  return (
    <Zoom>
      <Media
        onClick={console.log("iiii")}
        src={`${image?.url}`}
        alt={"alt"}
        className="img-fluid image_zoom_cls-0"
      />
    </Zoom>
  );
};

export default ImageZoom;
