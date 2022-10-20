import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const ProductTab = ({ product }) => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <section className="tab-product m-0 mb-2">
      <Container>
        <Row>
          <Col sm="12" lg="12">
            <Row className="product-page-main m-0">
              <Nav tabs className="nav-material">
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "1" ? "active" : ""}
                    onClick={() => setActiveTab("1")}
                  >
                    Description
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "2" ? "active" : ""}
                    onClick={() => setActiveTab("2")}
                  >
                    Specifications
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "3" ? "active" : ""}
                    onClick={() => setActiveTab("3")}
                  >
                    Highlights
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab} className="nav-material">
                <TabPane tabId="1">
                  <p className="mb-0 pb-0">{product?.description}</p>
                </TabPane>
                <TabPane tabId="2">
                  {product?.specifications &&
                    product?.specifications.length &&
                    product.specifications.map((x, i) => (
                      <fragment key={i}>
                        <p>
                          title:<span>{x.title}</span>
                        </p>
                        <p>
                          description:<span>{x.description}</span>
                        </p>
                      </fragment>
                    ))}
                </TabPane>

                <TabPane tabId="3">
                  <p className="mb-0 pb-0">
                    {product?.highlights &&
                      product?.highlights.length &&
                      product?.highlights.join(",")}
                  </p>
                </TabPane>
              </TabContent>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductTab;
