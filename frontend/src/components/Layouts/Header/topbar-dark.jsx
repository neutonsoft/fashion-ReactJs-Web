import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import { Col, Container, Row } from "reactstrap";
// import { firebase_app } from "../../../config/base";
const TopBarDark = ({ fluid }) => {
  // const firebaseLogout = () => {
  //   firebase_app.auth().signOut();
  //   router.push("/page/account/login-auth");
  // };
  return (
    <div className={" bg-black"}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="12">
            <marquee
              behavior="scroll"
              direction="left"
              onmouseover="this.stop();"
              onmouseout="this.start();"
              className="header-marquee header-contact w-full flex justify-center "
            >
              <ul>
                <li className="text-white">Welcome to Our online Shopping</li>
                <li className="text-white">
                  <i className="fa fa-phone text-white" aria-hidden="true"></i>
                  Call Us: +91 95093 27406
                </li>
                <a href="https://web.whatsapp.com/" target={"_blank"}>
                  <WhatsAppIcon
                    sx={{
                      color: "green",
                      fontSize: "30px",
                    }}
                  />
                </a>
              </ul>
            </marquee>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBarDark;
