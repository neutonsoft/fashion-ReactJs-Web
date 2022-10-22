import React from "react";
import { Col, Container, Row } from "reactstrap";
// import { firebase_app } from "../../../config/base";
import { useRouter } from "next/router";
const TopBarDark = ({ fluid }) => {
  const router = useRouter();
  // const firebaseLogout = () => {
  //   firebase_app.auth().signOut();
  //   router.push("/page/account/login-auth");
  // };
  return (
    <div className={"top-header bg-black"}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="12">
            <div className="header-contact w-full flex justify-center ">
              <ul>
                <li className="text-white">Welcome to Our online Shopping</li>
                <li className="text-white">
                  <i className="fa fa-phone text-white" aria-hidden="true"></i>
                  Call Us: +91 95093 27406
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBarDark;
