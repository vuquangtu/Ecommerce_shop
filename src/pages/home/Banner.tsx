import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import SelectCategory from "../../components/SelectCategory";
import { AuthContext } from "../../context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";

const title = (
  <h2>
    Search <span>Your</span> One From <span>Thousand</span> Of Products
  </h2>
);
const desc = "We Have The Largest Collection of products";

const bannerList = [
  {
    iconName: "icofont-users-alt-4",
    text: "1.5 Million Customers",
  },
  {
    iconName: "icofont-notification",
    text: "More then 2000 Marchent",
  },
  {
    iconName: "icofont-globe",
    text: "Buy Anything Online",
  },
];

function Baner() {
  const { products } = useContext(AuthContext);

  const [searchInput, setSearchInput] = useState("");

  if (products) {
    const searchIterms = products.filter((product) =>
      product?.name?.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
      <div className="banner-section style-4">
        <div className="container">
          <div className="banner-content">
            {title}
            <form>
              <SelectCategory />
              <input
                value={searchInput}
                type="text"
                name="search"
                id="search"
                placeholder="Search your product..."
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit">
                <i className="icofont-search-1"></i>
              </button>
            </form>
            <p>{desc}</p>
            <ul className="lab-ul">
              {searchInput &&
                searchIterms.map((product, index) => (
                  <li key={index}>
                    <Link to={`/shop/${product.id}`}>{product.name}</Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Baner;
