import { useState } from "react";
import { Link} from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { NavDropdown } from "react-bootstrap";

function NavItems() {
  const [socialToggle, setSocialToggle] = useState(false);

  const [menuToggle, setMenuToggle] = useState(false);

  const { currentUser, logOut, photo } = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();

    logOut();
    window.location.reload();
  };

  return (
    <header
      className={`header-section style-4 ${
        false ? "header-fixed fadeInUp" : ""
      }`}
    >
      {/* header top */}

      <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
        <div className="container">
          <div className="header-top-area">
            <Link to="/signup" className="lab-btn me-3">
              <span>Create Acount</span>
            </Link>
            <Link to="/Login">Log In</Link>
          </div>
        </div>
      </div>

      {/* header top ends */}
      <div className="header-bottom">
        ' '
        <div className="container">
          <div className="header-wrapper">
            <div className="logo-search-acte">
              <div className="logo">
                <Link to={"/"}>
                  <img src={logo} alt="" />
                </Link>
              </div>
            </div>
            {/* menu area */}
            <div className="menu-area">
              <div className="menu">
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li>
                    <Link to={"/Shop"}>Shop</Link>
                  </li>
                  <li>
                    <Link to={"/Blog"}>Blog</Link>
                  </li>
                  <li>
                    <Link to={"/About"}>About</Link>
                  </li>
                  <li>
                    <Link to={"/Contact"}>Contact</Link>
                  </li>
                </ul>
              </div>

              {!currentUser ? (
                <>
                  <Link
                    to="/sign-up"
                    className="lab-btn me-3 d-none d-md-block"
                  >
                    <span>Create Account</span>
                  </Link>
                  <Link to="/login" className="d-none d-md-block">
                    Log In
                  </Link>
                </>
              ) : (
                <>
                  <div>
                    <>
                      <img
                        src={
                          photo ||
                          "https://bootdey.com/img/Content/avatar/avatar1.png"
                        }
                        className="nav-profile"
                      />
                    </>
                  </div>

                  <NavDropdown id="basic-nav-dropdown">
                    <NavDropdown.Item href="/cart-page">
                      Shopping Cart
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href={`/user-profile/${currentUser?.uid}`}
                    >
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/cart-page">Order</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.1" onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}

              {/* menu toggler */}
              <div
                onClick={() => setMenuToggle(!menuToggle)}
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div
                className="ellepsis-bar d-md-none"
                onClick={() => setSocialToggle(!socialToggle)}
              >
                <i className="icofont-info"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavItems;
