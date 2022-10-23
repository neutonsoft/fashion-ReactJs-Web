import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { MENUITEMS } from "./menu";
import { Container, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";

const NavBarMobile = ({ navClose, setNavClose, closeNav, openNav }) => {
  const { t } = useTranslation();

  // eslint-disable-next-line

  const handleMegaSubmenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (
      event.target.parentNode.nextElementSibling.classList.contains(
        "opensubmegamenu"
      )
    )
      event.target.parentNode.nextElementSibling.classList.remove(
        "opensubmegamenu"
      );
    else {
      document.querySelectorAll(".menu-content").forEach(function (value) {
        value.classList.remove("opensubmegamenu");
      });
      event.target.parentNode.nextElementSibling.classList.add(
        "opensubmegamenu"
      );
    }
  };

  const [mainmenu, setMainMenu] = useState(MENUITEMS);

  // useEffect(() => {
  //   const currentUrl = location.pathname;
  //   MENUITEMS.filter((items) => {
  //     if (items.path === currentUrl) setNavActive(items);
  //     if (!items.children) return false;
  //     items.children.filter((subItems) => {
  //       if (subItems.path === currentUrl) setNavActive(subItems);
  //       if (!subItems.children) return false;
  //       subItems.children.filter((subSubItems) => {
  //         if (subSubItems.path === currentUrl) setNavActive(subSubItems);
  //       });
  //     });
  //   });
  // }, []);

  const setNavActive = (item) => {
    MENUITEMS.filter((menuItem) => {
      if (menuItem != item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true;
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = false;
          }
        });
      }
    });

    setMainMenu({ mainmenu: MENUITEMS });
  };

  // Click Toggle menu
  const toggletNavActive = (item) => {
    if (!item.active) {
      MENUITEMS.forEach((a) => {
        if (MENUITEMS.includes(item)) a.active = false;
        if (!a.children) return false;
        a.children.forEach((b) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
          if (!b.children) return false;
          b.children.forEach((c) => {
            if (b.children.includes(item)) {
              c.active = false;
            }
          });
        });
      });
    }
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS });
  };

  const openMblNav = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (event.target.nextElementSibling.classList.contains("opensubmenu"))
      event.target.nextElementSibling.classList.remove("opensubmenu");
    else {
      document.querySelectorAll(".nav-submenu").forEach(function (value) {
        value.classList.remove("opensubmenu");
      });
      document
        .querySelector(".mega-menu-container")
        .classList.remove("opensubmenu");
      event.target.nextElementSibling.classList.add("opensubmenu");
    }
  };

  return (
    <>
      <a className="main-nav-mobile" onClick={openNav.bind(this)}>
        <MenuIcon
          sx={{
            color: "#C3AF74",
            fontSize: "30px",
          }}
        />
      </a>
    </>
  );
};

export default NavBarMobile;
