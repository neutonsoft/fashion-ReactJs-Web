import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

const MasterBanner = ({ img, title, desc, link, classes, btn, btnClass }) => {
  return (
    <div>
      <div
        className={`home  ${classes ? classes : "text-center"}`}
        style={{
          backgroundImage: `url(${img})`,
          height: "90%",
        }}
      >
        <Container>
          <Row>
            <Col>
              <div className="slider-contain">
                <div>
                  <h4 className="text-gray-100">{title}</h4>
                  <h1 className="text-white">{desc}</h1>
                  <Link to={link}>
                    <a className={`btn ${btnClass ? btnClass : "btn-solid"}`}>
                      {btn ? btn : "Shop Now"}{" "}
                    </a>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default MasterBanner;
