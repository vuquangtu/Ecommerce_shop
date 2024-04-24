import PageHeader from "../../components/PageHeader";
import ProductCards from "../../components/ProductCards";

import Pagination from "./Pagination";
import Search from "./Search";
import ShopCategory from "./ShopCategory";

import { useContext, useState } from "react";
import { useEffect } from "react";
import PopularPost from "./PopularPost";
import Tags from "./Tags";
import { AuthContext } from "../../context/AuthProvider";

function Shop() {
  const inforPage = { title: "Our Shop Pages", curPage: "Shop" };
  const showResult = "Showing 01 - 12 of 139 Results";
  const { products } = useContext(AuthContext);

  const [GridList, setGridList] = useState(true);

  const [activePage, setActivepage] = useState(1);
  const [activeCategory, setActive] = useState("All");
  console.log(products);

  useEffect(() => {
    setActivepage(1);
  }, [activeCategory]);

  if (products) {
    const productsPerPage = 12;

    const lastProductIndex = activePage * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;

    const currentProducts =
      activeCategory === "All"
        ? products
        : products.filter((product) => product.category === activeCategory);

    const displayProducts = currentProducts.slice(
      firstProductIndex,
      lastProductIndex
    );

    const Categories = products.reduce((value, product) => {
      value.push(product.category);
      return value;
    }, []);

    const filterCategories = ["All", ...new Set(Categories)];

    return (
      <div>
        <PageHeader inforPage={inforPage} />
        {/* shop page */}
        <div className="shop-page padding-tb">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-12">
                <article>
                  <div className="shop-title d-flex flex-wrap justify-content-between">
                    {/* <p>{showResult}</p> */}
                    <div
                      className={`product-view-mode ${
                        GridList ? "gridActive" : "listActive"
                      }`}
                    >
                      <a
                        className="grid"
                        onClick={() => setGridList(!GridList)}
                      >
                        <i className="icofont-ghost"></i>
                      </a>
                      <a
                        className="list"
                        onClick={() => setGridList(!GridList)}
                      >
                        <i className="icofont-listine-dots"></i>
                      </a>
                    </div>
                  </div>
                  <div>
                    <ProductCards
                      products={displayProducts}
                      GridList={GridList}
                    />
                  </div>

                  <Pagination
                    productsPerPage={productsPerPage}
                    currentProducts={currentProducts}
                    activePage={activePage}
                    setActivepage={setActivepage}
                  />
                </article>
              </div>
              <div className="col-lg-4 col-12">
                {" "}
                <Search products={products} />
                <ShopCategory
                  productsPerPage={productsPerPage}
                  filterCategories={filterCategories}
                  activeCategory={activeCategory}
                  setActive={setActive}
                />
                <PopularPost />
                <Tags />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Shop;
