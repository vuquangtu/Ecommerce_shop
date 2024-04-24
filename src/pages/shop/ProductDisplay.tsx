import React, { useState } from "react";
import { Link } from "react-router-dom";

const desc =
  "Energistia an deliver atactica metrcs after avsionary Apropria trnsition enterpris an sources applications emerging 	psd template.";

function ProductDisplay({ item }) {
  const {
    id,
    name,
    price,
    img,

    seller,
  } = item;

  const [size, setSize] = useState("Select Size");
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("Select Color");
  const [coupon, setCopon] = useState("");

  const handleMinusQuantity = (e) => {
    e.preventDefault();

    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = (e) => {
    e.preventDefault();
    setQuantity(quantity + 1);
  };

  const handleChangeSize = (e) => {
    e.preventDefault();
    setSize(e.target.value);
  };

  const handleSelectColor = (e) => {
    e.preventDefault();
    setColor(e.target.value);
  };

  const handleCoupon = (e) => {
    e.preventDefault();
    setCopon(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      id,
      img,
      name,
      price,
      quantity,
      size,
      color,
      coupon,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const exitstingProductIndex = existingCart.findIndex(
      (item) => item.id === id
    );
    if (exitstingProductIndex === -1) {
      existingCart.push(product);
    } else {
      existingCart[exitstingProductIndex] = product;
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    setSize("Select Size");
    setColor("Select Size");
    setQuantity(1);
    setCopon("");
  };

  return (
    <div>
      <div>
        <h4>{name}</h4>
        <p className="rating">
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          (3 review)
        </p>
        <h4>${price}</h4>
        <h6>{seller}</h6>
        <p>{desc}</p>
      </div>
      {/* Single Product Cart Component here */}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="select-product size">
            <select value={size} onChange={handleChangeSize}>
              <option>Select Size</option>
              <option>SM</option>
              <option>MD</option>
              <option>LG</option>
              <option>XL</option>
              <option>XXL</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div>
          <div className="select-product color">
            <select value={color} onChange={handleSelectColor}>
              <option>Select Color</option>
              <option>Pink</option>
              <option>Ash</option>
              <option>Red</option>
              <option>White</option>
              <option>Blue</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div>
          <div className="cart-plus-minus">
            <div className="dec qtybutton" onClick={handleMinusQuantity}>
              -
            </div>
            <input
              className="cart-plus-minus-box"
              type="text"
              value={quantity}
              name="qtybutton"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />

            <div className="inc qtybutton" onClick={handleIncreaseQuantity}>
              +
            </div>
          </div>
          <div className="discount-code mb-2">
            <input
              value={coupon}
              onChange={handleCoupon}
              type="text"
              placeholder="Enter Discount Code"
            />
          </div>
          <button type="submit" className="lab-btn">
            <span>Add To Cart</span>
          </button>

          <Link to="/cart-page" className="lab-btn bg-primary">
            <span>Check Out</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default ProductDisplay;
