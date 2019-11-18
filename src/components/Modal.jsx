import React, { Component } from 'react'
import { cpus } from 'os';

class Employee_modal extends Component {
  render() {
    return (
      <div id="quickview-wrapper">
        <div
          className="modal fade"
          id="productModal"
          tabindex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal__container" role="document">
            <div className="modal-content">
              <div className="modal-header modal__header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row m-y-2">
                    <div className="col-lg-2 btn btn-primary">
                      <h2
                        className="text-left h3 mb-0"
                        style={{ color: "white" }}
                      >
                        Employee edit
                          </h2>
                    </div>
                    <div className="col-lg-8 push-lg-4 personal-info">
                      <form role="form">
                        <fieldset disabled>
                          <div className="form-group row">
                            <label
                              for="disabledTextInput"
                              className="col-lg-3 col-form-label form-control-label"
                            >
                              EmployeeNumber
                                </label>
                            <div className="col-lg-9" id="empNum"></div>
                          </div>
                          <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">
                              First name
                                </label>
                            <div className="col-lg-9" id="fname"></div>
                          </div>
                          <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">
                              Last name
                                </label>
                            <div className="col-lg-9" id="lname"></div>
                          </div>
                          <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">
                              Email
                                </label>
                            <div className="col-lg-9" id="email"></div>
                          </div>
                        </fieldset>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">
                            JobTitle
                              </label>
                          <div className="col-lg-9">
                            <select className="form-control" name="" id="">
                              <option className="option"></option>
                            </select>
                          </div>
                        </div>
                        <fieldset disabled="disabled">
                          <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">
                              OfficeCode
                                </label>
                            <div className="col-lg-9" id="officeCode"></div>
                          </div>
                          <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">
                              extention
                                </label>
                            <div className="col-lg-3" id="extension"></div>
                            <label className="col-lg-2 col-form-label form-control-label">
                              reportsTo
                                </label>
                            <div className="col-lg-3" id="reportsTo"></div>
                          </div>
                        </fieldset>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">
                            Password
                              </label>
                          <div className="col-lg-9">
                            <input className="form-control" type="password" />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label"></label>
                          <div className="col-lg-9">
                            <input
                              type="button"
                              className="btn btn-primary"
                              value="Save Changes"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="modal-product">
                  <div className="product-images">
                    <div className="main-image images"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Cart_modal extends Component {
  render() {
    return (
      <div id="quickview-wrapper">
        <div className="modal fade" id="cartModal" tabindex="-1" role="dialog">
          <div className="modal-dialog modal__container" role="document">
            <div className="modal-content">
              <div className="modal-header modal__header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                  aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                <div className="modal-product">
                  <table className="table text-center table-striped responsive-table" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody id="cart">

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Catalog_modal extends Component {
  render() {
    return (
      <div id="quickview-wrapper">
        <div
          className="modal fade"
          id="productModal"
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal__container" role="document">
            <div className="modal-content">
              <div className="modal-header modal__header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-product">
                  <div className="product-images">
                    <div className="main-image images">
                      <img
                        alt="big images"
                        id="pop-img"
                        src="/img/test10.jpg"
                        style={{
                          maxWidth: "100%",
                          transition: "all 0.3s ease-out 0s",
                          marginBottom: "0"
                        }}
                      />
                    </div>
                  </div>

                  <div className="product-info">
                    <h1 className="sfmono" id="pop-name">
                      productName
                      </h1>
                    <div className="price-box-3">
                      <div className="s-price-box">
                        <span className="new-price" id="pop-price">
                          $99.99
                          </span>
                      </div>
                    </div>
                    <div className="quick-desc" id="pop-desc">
                      Description Lorem ipsum, dolor sit amet consectetur
                      adipisicing elit. Saepe dignissimos atque ducimus magni
                      ratione quas esse voluptatibus reprehenderit veniam
                      corporis maiores natus officiis pariatur alias doloribus
                      porro, voluptates distinctio autem.
                      </div>
                    <div className="product-detail">
                      <h2>productCode</h2>&nbsp;{" "}
                      <h3 id="pop-code">S99_9999</h3>
                    </div>
                    <div className="product-detail">
                      <h2>productScale</h2>&nbsp;{" "}
                      <h3 id="pop-scale">1:9999999</h3>
                    </div>
                    <div className="product-detail">
                      <h2>Vendor</h2>&nbsp;{" "}
                      <h3 id="pop-vendor">Mr.Parinya Seetawan</h3>
                    </div>
                    <div className="product-detail">
                      <h2>Quantity</h2>&nbsp; <h3 id="pop-quantity">9999</h3>
                    </div>
                    <div className="social-sharing">
                      <div className="widget widget_socialsharing_widget">
                        <h3 className="widget-title-modal sfmono">
                          Share this product
                          </h3>
                        <ul className="social-icons">
                          <li>
                            <a
                              target="_blank"
                              title="facebook"
                              href="https://www.facebook.com/parinya.seetawan"
                              className="social-icon"
                            >
                              <i className="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              target="_blank"
                              title="twitter"
                              href="#"
                              className="social-icon"
                            >
                              <i className="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              target="_blank"
                              title="pinterest"
                              href="#"
                              className="social-icon"
                            >
                              <i className="fab fa-pinterest-p"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              target="_blank"
                              title="tumblr"
                              href="#"
                              className="social-icon"
                            >
                              <i className="fab fa-tumblr"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              target="_blank"
                              title="instagram"
                              href="https://www.instagram.com/parin_lift/?hl=th"
                              className="social-icon"
                            >
                              <i className="fab fa-instagram"></i>
                            </a>
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

    )
  }
}

class ProductDetail_modal extends Component {
  render() {
    return (
      <div id="quickview-wrapper">
        <div
          className="modal fade"
          id="productModal"
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal__container" role="document">
            <div className="modal-content">
              <div className="modal-header modal__header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-product">
                  <div className="product-images">
                    <div className="main-image images">
                      <img
                        alt="big images"
                        id="pop-img"
                        src="/img/test10.jpg"
                        style={{
                          maxWidth: "100%",
                          transition: "all 0.3s ease-out 0s",
                          marginBottom: "0"
                        }}
                      />
                    </div>
                  </div>

                  <div className="product-info">
                    <h1 className="sfmono" id="pop-name">productName</h1>
                    <div className="quick-desc" id="pop-desc"></div>

                    <div className="product-detail">
                      <h2>productCode</h2>&nbsp; <h3 id="pop-code"></h3>
                    </div>
                    <div className="product-detail">
                      <h2>productLine</h2>&nbsp; <h3 id="pop-productline"></h3>
                    </div>
                    <div className="product-detail">
                      <h2>productScale</h2>&nbsp; <h3 id="pop-scale"></h3>
                    </div>
                    <div className="product-detail">
                      <h2>Vendor</h2>&nbsp; <h3 id="pop-vendor"></h3>
                    </div>
                    <div className="product-detail">
                      <h2>Quantity</h2>&nbsp; <h3 id="pop-quantity"></h3>
                    </div>
                    <div className="product-detail">
                      <h2>buyPrice</h2>&nbsp; <h3 id="pop-price" style={{color:"rgb(255, 83, 83)"}}></h3>
                    </div>
                    <div className="product-detail">
                      <h2>MSRP</h2>&nbsp; <h3 id="pop-msrp"></h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export { Employee_modal, Cart_modal, Catalog_modal, ProductDetail_modal }
