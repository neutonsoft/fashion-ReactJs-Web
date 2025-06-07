import { useState } from "react";
import { Container, Row } from "reactstrap";
import MetaData from "../Layouts/MetaData";
import Filter from "./Filter/filter";
import ProductsList from "./ProductsList";

const Products = () => {
  const [sidebarView, setSidebarView] = useState(false);

  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };
  return (
    <>
      <MetaData title="All Products | Neutonsoft" />
      <main className="w-full bg-gray-50">
        <section className="section-b-space ratio_asos">
          <div className="collection-wrapper">
            <Container>
              <Row>
                <Filter
                  sidebarView={sidebarView}
                  closeSidebar={() => openCloseSidebar(sidebarView)}
                />
                <ProductsList
                  openSidebar={() => openCloseSidebar(sidebarView)}
                />
              </Row>
            </Container>
          </div>
        </section>
      </main>
      {/* <MinCategory /> */}
    </>
  );
};

export default Products;
