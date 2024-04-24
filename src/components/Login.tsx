import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import { FacebookAuthProvider } from "firebase/auth/cordova";
import { useAdduserMutation, useFetchusersQuery } from "../service/usersApi";

const title = "Login";
const socialTitle = "Login With Social Media";
const btnText = "Submit Now";

function Login() {
  const { data: listUsers } = useFetchusersQuery();

  const existUser = listUsers?.filter(
    (item) => item.email === "quangtu.vu@gmail.com"
  );

  const [addUser] = useAdduserMutation();
  const [resetShow, setResetShow] = useState(false);

  const {
    login,
    signUpWithGmail,
    checkBoxStatus,
    loading,
    resetPassword,
    signUpWithFacebook,
  } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState(
    localStorage.getItem("loginInfor") === null
      ? ""
      : JSON.parse(localStorage.getItem("loginInfor")).email
  );
  const [password, setPassword] = useState(
    localStorage.getItem("loginInfor") === null
      ? ""
      : JSON.parse(localStorage.getItem("loginInfor")).password
  );

  const [resetEmail, setResetEmail] = useState("");

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const checkbox = useRef();

  const handleLogin = (e) => {
    e.preventDefault();

    localStorage.setItem("checkBox", JSON.stringify(checkbox.current.checked));

    login(email, password);
    navigate(from, { replace: true });
  };

  const handleWithGmail = async (e) => {
    e.preventDefault();

    try {
      await signUpWithGmail();
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error occurred during sign up with Gmail:", error);
    }
  };

  const handleForgetPassWord = (e) => {
    e.preventDefault();

    setResetShow(true);
  };

  const hanleReset = (e) => {
    e.preventDefault();
    resetPassword(resetEmail).then(() => setResetShow(false));
  };

  const handleSignUpWithFacebook = (e) => {
    e.preventDefault();
    signUpWithFacebook()
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        alert("đăng ký thành công băng facebook");

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(errorMessage);

        // ...
      });
  };

  return (
    <div>
      {resetShow && (
        <div
          className="card text-center "
          style={{
            width: 300,
            top: "15%",

            position: "fixed",

            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="card-header h5 text-white bg-primary">
            Password Reset
          </div>
          <div className="card-body px-5">
            <p className="card-text">Enter your email address</p>
            <div className="form-outline">
              <input
                type="email"
                id="typeEmail"
                className="form-control my-3"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                style={{ background: "#3333" }}
              />
            </div>
            <a href="#" className="btn btn-primary w-100" onClick={hanleReset}>
              Reset password
            </a>
          </div>
        </div>
      )}

      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{title}</h3>

            <form className="account-form" onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* showing error message */}
              <div>
                {errorMessage && (
                  <div className="error-message text-danger">
                    {errorMessage ===
                    "Firebase: Error (auth/invalid-credential)."
                      ? "Email does not exist or Password invalid"
                      : errorMessage}
                  </div>
                )}
              </div>
              <div className="form-group">
                <div className="d-flex justify-content-between flex-wrap pt-sm-2">
                  <div className="checkgroup">
                    <input
                      type="checkbox"
                      name="remember"
                      id="remember"
                      ref={checkbox}
                      checked={checkBoxStatus}
                      onChange={(e) => setCheckbox(e.target.checked)}
                    />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={handleForgetPassWord}
                  >
                    Forget Password?
                  </a>
                </div>
              </div>
              <div className="form-group text-center">
                <button className="d-block lab-btn">
                  <span>{btnText}</span>
                </button>
              </div>
            </form>
            <div className="account-bottom">
              <span className="d-block cate pt-10">
                Don’t Have any Account? <Link to="/sign-up">Sign Up</Link>
              </span>
              <span className="or">
                <span>or</span>
              </span>

              {/* social icons */}
              <h5 className="subtitle">{socialTitle}</h5>
              <ul className="lab-ul social-icons justify-content-center">
                <li>
                  <button className="github" onClick={handleWithGmail}>
                    <i className="icofont-github"></i>
                  </button>
                </li>
                <li>
                  <a className="facebook" onClick={handleSignUpWithFacebook}>
                    <i className="icofont-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="/" className="twitter">
                    <i className="icofont-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="/" className="linkedin">
                    <i className="icofont-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="/" className="instagram">
                    <i className="icofont-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
