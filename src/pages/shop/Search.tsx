import React, { useState } from "react";
import { Link } from "react-router-dom";

function Search({ products }) {
  const [search, setSearch] = useState("");

  const searchItems = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="widget widget-search">
      <form action="" className="search-wrapper mb-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
        />
        <button type="submit">
          <i className="icofont-search-2"></i>
        </button>
      </form>
      <div>
        {search &&
          searchItems.map((searchItem, index) => (
            <Link key={index} to={`/shop/${searchItem.id}`}>
              <div className="d-flex gap-3 p-2 ">
                <div className="pro-thumb col-3">
                  <img src={searchItem.img} alt="#" />
                </div>
                <div className="product-content col-9 ">
                  <p>{searchItem.name}</p>
                  <h6>{`$${searchItem.price}`}</h6>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Search;
