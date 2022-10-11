import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const closeSearch = () => {
  document.getElementById("search-overlay").style.display = "none";
};
const SearchOverlay = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    // setIsHovered(true)
    if (keyword.toLowerCase().trim()) {
      console.log("submit");
      navigate(`/products/${keyword}`);
      closeSearch();
    } else {
      console.log("submit2");
      navigate("/products");
      closeSearch();
    }
  };
  return (
    <div id="search-overlay" className="search-overlay">
      <div>
        <span className="closebtn" onClick={closeSearch} title="Close Overlay">
          ×
        </span>
        <div className="overlay-content">
          <Container>
            <Row>
              <Col xl="12">
                <Form>
                  <FormGroup>
                    <Input
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Search a Product"
                    />
                  </FormGroup>
                  <Button
                    className="btn btn-primary"
                    onClick={() => handleSubmit()}
                  >
                    <i className="fa fa-search"></i>
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
