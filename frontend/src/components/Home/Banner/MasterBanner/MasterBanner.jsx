import { Col, Container, Row } from "reactstrap";

const MasterBanner = ({ img, title, desc, link, classes, btn, btnClass }) => {
  return (
    <div>
      <div className={`home ${img} ${classes ? classes : "text-center"}`}>
        <Container>
          <Row>
            <Col>
              <div className="slider-contain">
                <div>
                  <h4>{title}</h4>
                  <h1>{desc}</h1>
                  <img src={img} />
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
