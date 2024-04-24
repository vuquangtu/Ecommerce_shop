import React from "react";
import "../../components/Slidebar/createProduct.css";

function AddProduct() {
  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">
                      Create New Product
                    </h3>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="form-row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="small mb-1" htmlFor="fullName">
                              Name Product
                            </label>
                            <input
                              className="form-control py-4"
                              id="fullName"
                              type="text"
                              placeholder="Nhập họ tên"
                            />
                          </div>
                        </div>
                      </div>
                     
                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="small mb-1" htmlFor="email">
                              Email
                            </label>
                            <input
                              className="form-control py-4"
                              id="email"
                              type="text"
                              placeholder="Nhập email của bạn"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="small mb-1" htmlFor="position">
                              Major
                            </label>
                            <input
                              className="form-control py-4"
                              id="position"
                              type="text"
                              placeholder="Nhập vị trí công việc"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="small mb-1" htmlFor="department">
                              Gender
                            </label>
                            <label htmlFor="sel1" className="form-label" />
                            <select
                              className="form-select"
                              id="sel1"
                              name="sellist1"
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="form-group mt-4 mb-0">
                      <span
                        id="createNewAccountBtn"
                        className="btn btn-primary btn-block"
                      >
                        Create New Employee
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddProduct;
