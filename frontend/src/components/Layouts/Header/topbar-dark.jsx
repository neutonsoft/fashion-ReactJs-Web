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
    <div className={"top-header"}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                <li>Welcome to Our online Shopping</li>
                <li>
                  <i className="fa fa-phone text-white" aria-hidden="true"></i>
                  Call Us: +91 95093 27406
                </li>
              </ul>
            </div>
          </Col>
          <Col lg="6" className="header-contact text-end">
            {/* <ul className="header-dropdown">
              <li className="mobile-wishlist">
                <Link href="/page/account/wishlist">
                  <a>
                    <i className="fa fa-heart" aria-hidden="true"></i> wishlist
                  </a>
                </Link>
              </li>
              <li className="onhover-dropdown mobile-account">
                <i className="fa fa-user" aria-hidden="true"></i> My Account
                <ul className="onhover-show-div">
                  <li>
                    <Link href={`/page/account/login`}>
                      <a>Login</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/page/account/register`}>
                      <a>Register</a>
                    </Link>
                  </li>
                  <li onClick={() => firebaseLogout()}>
                    <a>Logout</a>
                  </li>
                </ul>
              </li>
            </ul> */}
            <a href="https://web.whatsapp.com/" target={"_blank"}>
              <WhatsAppIcon
                sx={{
                  color: "green",
                }}
              />
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBarDark;
