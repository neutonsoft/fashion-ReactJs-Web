import React from "react";
import { Media } from "reactstrap";

// import Zoom from "react-medium-image-zoom";
// import "react-medium-image-zoom/dist/styles.css";

import ReactImageZoom from "react-image-zoom";
// import InnerImageZoom from "react-inner-image-zoom";
const ImageZoom = ({ image }) => {
  const props = {
    offset: { vertical: 0, horizontal: 20 },
    zoomWidth: 500,
    img: image?.url || "",
  };
  return (
    <>{image ? <ReactImageZoom {...props} /> : <></>}</>

    // <Zoom>
    //   <Media
    //     onClick={console.log("iiii")}
    //     src={`${image?.url}`}
    //     alt={"alt"}
    //     className="img-fluid image_zoom_cls-0"
    //   />
    // </Zoom>
  );
};

export default ImageZoom;
