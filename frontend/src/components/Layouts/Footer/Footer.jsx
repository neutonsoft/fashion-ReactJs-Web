import { useEffect, useState } from "react";
import WorkIcon from "@mui/icons-material/Work";
import StarsIcon from "@mui/icons-material/Stars";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import HelpIcon from "@mui/icons-material/Help";
import paymentMethods from "../../../assets/images/payment-methods.svg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "about",
    links: [
      {
        name: "Contact Us",
        link: "/contact",
      },
      {
        name: "About Us",
        link: "/about-us",
      },
      {
        name: "Careers",
        redirect: "https://www.Titosoftwarescareers.com",
      },
      {
        name: "Stories",
        redirect: "https://stories.Titosoftwares.com",
      },
    ],
  },
  {
    title: "help",
    links: [
      {
        name: "Payments",
        redirect: "https://www.Titosoftwares.com/pages/payments",
      },
      {
        name: "Shipping",
        redirect: "https://www.Titosoftwares.com/pages/shipping",
      },
      {
        name: "Cancellation & Returns",
        redirect:
          "https://www.Titosoftwares.com/helpcentre?catalog=55c9c6edb000002e002c1701&view=CATALOG",
      },
      {
        name: "FAQ",
        redirect:
          "https://www.Titosoftwares.com/helpcentre?catalog=55c9c8e2b0000023002c1702&view=CATALOG",
      },
    ],
  },
  {
    title: "policy",
    links: [
      {
        name: "Return Policy",
        redirect: "https://www.Titosoftwares.com/pages/returnpolicy",
      },
      {
        name: "Terms Of Use",
        redirect: "https://www.Titosoftwares.com/pages/terms",
      },
      {
        name: "Security",
        redirect: "https://www.Titosoftwares.com/pages/paymentsecurity",
      },
      {
        name: "Privacy",
        redirect: "https://www.Titosoftwares.com/pages/privacypolicy",
      },
      {
        name: "Sitemap",
        redirect: "https://www.Titosoftwares.com/sitemap",
      },
      {
        name: "EPR Compliance",
        redirect: "https://www.Titosoftwares.com/pages/ewaste-compliance-tnc",
      },
    ],
  },
  {
    title: "social",
    links: [
      {
        name: "Facebook",
        redirect: "https://www.facebook.com/Titosoftwares",
      },
      {
        name: "Twitter",
        redirect: "https://twitter.com/Titosoftwares",
      },
      {
        name: "YouTube",
        redirect: "https://www.youtube.com/Titosoftwares",
      },
    ],
  },
];

const Footer = () => {
  const location = useLocation();
  const [adminRoute, setAdminRoute] = useState(false);

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin"));
  }, [location]);

  return (
    <>
      {!adminRoute && (
        <>
          <footer
            className=" w-full py-1 sm:py-4 px-4 sm:px-12  text-white text-xs border-b border-gray-600 flex flex-col sm:flex-row overflow-hidden"
            style={{
              backgroundColor: "#f1f1e5",
            }}
          >
            <div className="w-full sm:w-full flex flex-col sm:flex-row sm:justify-between sm:my-4">
              {footerLinks.map((el, i) => (
                <div
                  className="w-full  flex flex-col gap-2 my-3 sm:my-6 ml-5"
                  key={i}
                >
                  <h2 className="text-black text-sm mb-2 uppercase">
                    {el.title}
                  </h2>
                  {el.links.map((item, i) => {
                    return item?.link ? (
                      <Link
                        className="hover:underline text-primary-grey text-xs"
                        key={i}
                        to={`${item.link}`}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        href={item.redirect}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline text-primary-grey text-xs"
                        key={i}
                      >
                        {item.name}
                      </a>
                    );
                  })}
                </div>
              ))}
              <div className="w-full ">
                <h2 className="text-black text-sm">Connect With Us:</h2>
                <p className="mt-2 leading-5 text-primary-grey text-xs">
                  Karigari,
                  <br />
                  Chanania Tower Infront of Dalmia vidhya mandir &<br />
                  Chirawa,
                  <br />
                  Rajasthan, 333026, India
                  <br />
                  <br />
                  For Collaboration: ankitachaudhary@gmail.com
                  <br />
                  Sales & PR: ankitachaudhary.ac@gmail.com
                  <br />
                  For Enquiry: enquiry@ankitachaudhary.com
                  <br />
                  <br />
                  Telephone:{" "}
                  <a className="text-primary-blue" href="tel:+91 95093 27406">
                    +91 95093 27406
                  </a>
                </p>
              </div>
            </div>

            {/* <div className="border-gray-600 h-36 w-1 border-l mr-5 mt-6 hidden sm:block"></div>
            <div className="w-full sm:w-6/12 my-6  mx-6 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
              <div className="w-full sm:w-1/2">
                <h2 className="text-black text-sm">Mail Us:</h2>
                <p className="mt-2 leading-5 text-primary-grey text-xs">
                  Titosoftwares Internet Private Limited,
                  <br />
                  Buildings Alyssa, Begonia &<br />
                  Clove Embassy Tech Village,
                  <br />
                  Outer Ring Road, Devarabeesanahalli Village,
                  <br />
                  Bengaluru, 560103,
                  <br />
                  Karnataka, India
                </p>
              </div>

              <div className="w-full sm:w-1/2">
                <h2 className="text-black text-sm">
                  Connect With Us:
                </h2>
                <p className="mt-2 leading-5 text-primary-grey text-xs">
                  Karigari,
                  <br />
                  Chanania Tower Infront of Dalmia vidhya mandir &<br />
                  Chirawa,

                  <br />
                  Rajasthan, 333026, India
                  <br />
                  <br />
                  For Collaboration: suruchiparakh@gmail.com
                  <br />
                  Sales & PR: ankitachaudhary.ac@gmail.com
                  <br />
                  For Enquiry: enquiry@ankitachaudhary.com
                  <br />
                  <br />
                  Telephone:{" "}
                  <a className="text-primary-blue" href="tel:+91 95093 27406">
                    +91 95093 27406
                  </a>
                </p>
              </div>
            </div> */}
          </footer>
          {/* <!-- footer ends --> */}

          <div className="px-16 py-6 w-full bg-gray-500  flex justify-between items-center flex-wrap text-sm text-white">
            <div className="xs:w-full sm:w-full md:w-full lg:w-3/4  sm:flex justify-end items-center  text-sm text-white">
              {/* <a
                href="https://www.Titosoftwares.com/helpcentre"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white"
              >
                <span className="text-yellow-400">
                  <HelpIcon sx={{ fontSize: "20px" }} />
                </span>{" "}
                Help Center
              </a> */}

              <span>
                All Rights Reserved @ Neutonsoft
              </span>
            </div>
            <div className="xs:w-full sm:w-full md:w-full lg:w-1/4  sm:flex justify-center items-center  text-sm text-white">
              <img draggable="false" src={paymentMethods} alt="Card Payment" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Footer;
