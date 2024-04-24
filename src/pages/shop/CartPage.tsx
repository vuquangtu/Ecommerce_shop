import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import AlertDismissibleExample from "../../components/Alert";

const inforPage = { title: "Shop Cart", curPage: "Cart Page" };
import { Link } from "react-router-dom";
import CheckoutPage from "./CheckoutPage";

function CartPage() {
  const listCouponDiscount = ["aBc", "xyz"];
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [couponDiscount, setCouponDiscount] = useState("");
  const [discountTotal, setDiscountTotal] = useState();
  const [showAlert, SetShowAlert] = useState(false);

  const handleIncrease = (product, e) => {
    e.preventDefault();
    product.quantity = product.quantity + 1;

    setCartItems([...cartItems]);
  };

  const hanleMinus = (e, product) => {
    if (product.quantity > 1) {
      product.quantity -= 1;

      setCartItems([...cartItems]);
    }
  };

  const updateStorage = (cartStorages) => {
    localStorage.setItem("cart", JSON.stringify(cartStorages));
  };

  const handleDelete = (e, index) => {
    e.preventDefault();

    if (confirm("Are you sure to Delete this Product???")) {
      cartItems.splice(index, 1);
      setCartItems([...cartItems]);
      // localStorage.removeItem("cart");
      updateStorage(cartItems);
    }
  };

  const totalPrice = cartItems.reduce((value, product) => {
    value += product.price * product.quantity;
    return value;
  }, 0);

  const handleSubmitCoupon = (e) => {
    e.preventDefault();

    if (listCouponDiscount.includes(couponDiscount)) {
      setDiscountTotal((totalPrice * 0.02).toFixed(2));
    } else {
      setDiscountTotal(undefined);

      alert("this Coupon out of date");
      return (
        <div>
          <AlertDismissibleExample />
        </div>
      );
    }
  };

  return (
    <div>
      <PageHeader inforPage={inforPage} />
      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            {/* cart top */}
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cat-product">Product</th>
                    <th className="cat-price">Price</th>
                    <th className="cat-quantity">Quantity</th>
                    <th className="cat-toprice">Total</th>
                    <th className="cat-edit">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((product, index) => (
                    <tr key={index}>
                      <td className="product-item cat-product">
                        <div className="p-thumb">
                          <Link to="/shop-single">
                            <img src={product.img} alt="#" />
                          </Link>
                        </div>
                        <div className="p-content">
                          <Link to="/shop-single">{product.name}</Link>
                        </div>
                      </td>
                      <td className="cat-price">{product.price}</td>
                      <td className="cat-quantity">
                        <div className="cart-plus-minus">
                          <div
                            className="dec qtybutton"
                            onClick={(e) => hanleMinus(e, product)}
                          >
                            -
                          </div>
                          <input
                            className="cart-plus-minus-box"
                            type="text"
                            name="qtybutton"
                            value={product.quantity}
                            onChange={(e) => {
                              e.target.value = product.quantity;
                            }}
                          />
                          <div
                            className="inc qtybutton"
                            onClick={(e) => {
                              handleIncrease(product, e);
                            }}
                          >
                            +
                          </div>
                        </div>
                      </td>
                      <td className="cat-toprice">
                        {product.quantity * product.price}
                      </td>
                      <td className="cat-edit">
                        <a href="#" onClick={(e) => handleDelete(e, index)}>
                          <i className="icofont-ui-delete"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* cart bottom */}
            <div className="cart-bottom">
              {/* checkout box */}
              <div className="cart-checkout-box">
                <form
                  className="coupon"
                  action="/"
                  onSubmit={(e) => handleSubmitCoupon(e)}
                >
                  <input
                    type="text"
                    name="coupon"
                    value={couponDiscount}
                    placeholder="Coupon Code..."
                    className="cart-page-input-text"
                    onChange={(e) => setCouponDiscount(e.target.value)}
                  />
                  <input type="submit" value="Apply Coupon" />
                </form>
                <form className="cart-checkout" action="/">
                  <input type="submit" value="Update Cart" />
                  {/* <Link to="/check-out"><input type="submit" value="Proceed to Checkout" /></Link> */}
                  <div>
                    <CheckoutPage />
                  </div>
                </form>
              </div>

              {/* shopping box */}
              <div className="shiping-box">
                <div className="row">
                  {/* shipping  */}
                  <div className="col-md-6 col-12">
                    <div className="calculate-shiping">
                      <h3>Calculate Shipping</h3>
                      <div className="outline-select">
                        <select>
                          <option value="volvo">United Kingdom (UK)</option>
                          <option value="saab">Bangladesh</option>
                          <option value="saab">Pakisthan</option>
                          <option value="saab">India</option>
                          <option value="saab">Nepal</option>
                        </select>
                        <span className="select-icon">
                          <i className="icofont-rounded-down"></i>
                        </span>
                      </div>
                      <div className="outline-select shipping-select">
                        <select>
                          <option value="volvo">State/Country</option>
                          <option value="saab">Dhaka</option>
                          <option value="saab">Benkok</option>
                          <option value="saab">Kolkata</option>
                          <option value="saab">Kapasia</option>
                        </select>
                        <span className="select-icon">
                          <i className="icofont-rounded-down"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        name="coupon"
                        placeholder="Postcode/ZIP"
                        className="cart-page-input-text"
                      />
                      <button type="submit">Update Total</button>
                    </div>
                  </div>

                  {/* cart total */}
                  <div className="col-md-6 col-12">
                    <div className="cart-overview">
                      <h3>Cart Totals</h3>
                      <ul className="lab-ul">
                        <li>
                          <span className="pull-left">Cart Subtotal</span>
                          <p className="pull-right">${totalPrice}</p>
                        </li>
                        <li>
                          <span className="pull-left">
                            Shipping and Handling
                          </span>
                          <p className="pull-right">Free Shipping</p>
                        </li>
                        <li>
                          <span className="pull-left">Coupon Discount</span>
                          <p className="pull-right">
                            {discountTotal
                              ? `$${discountTotal}`
                              : "No Discount"}
                          </p>
                        </li>
                        <li>
                          <span className="pull-left">Order Total</span>
                          <p className="pull-right">
                            {discountTotal
                              ? `$${totalPrice - discountTotal}`
                              : `$${totalPrice}`}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
