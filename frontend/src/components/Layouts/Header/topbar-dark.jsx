import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
// import { firebase_app } from "../../../config/base";
import { useRouter } from "next/router";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
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
          <Col xs="12">
            <div className="header-contact w-full flex justify-center">
              <ul className="flex justify-center items-center">
                <li>Welcome to Our online Shopping</li>
                <li>
                  <i className="fa fa-phone text-white" aria-hidden="true"></i>
                  Call Us: +91 95093 27406
                </li>
                <a
                  href="https://api.whatsapp.com/send?phone=+919509327406&text=Hi!%20Could%20you%20help%20me%20with%20a%20few%20queries!"
                  target={"_blank"}
                >
                  <WhatsAppIcon
                    sx={{
                      color: "green",
                    }}
                  />
                </a>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBarDark;
