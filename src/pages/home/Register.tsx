import React from "react";

const subTitle = "Save The Day";
const title = (
  <h2 className="title">
    Join on Day Long Free Workshop for <b>Advance</b>{" "}
    <span className="yellow-color">Mastering</span> <b>On Sales</b>
  </h2>
);
const desc = "Limited Time Offer! Hurry Up";
const regTitle = "Register Now";
const btnText = "Register Now";

function Register() {
  return (
    <section className="register-section padding-tb pb-0">
      <div className="container">
        <div className="row g-4 row-cols-lg-2 row-cols-1 align-items-center ">
          <div className="col">
            <div className="section-header">
              <span className="subtitle">{subTitle}</span>
              {title}
              <p>{desc}</p>
            </div>
          </div>
          <div className="col">
            <div className="section-wrapper">
              <h4>{regTitle}</h4>
              <form className="register-form">
                <input
                  type="text"
                  name="name"
                  className="reg-input"
                  placeholder="Username..."
                />
                <input
                  type="text"
                  name="email"
                  className="reg-input"
                  placeholder="Email..."
                />
                <input
                  type="text"
                  name="number"
                  className="reg-input"
                  placeholder="Phone..."
                />
              </form>
              <button type="submit" className="lab-btn">
                <span>{btnText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
