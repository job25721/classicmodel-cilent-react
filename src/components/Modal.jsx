import React, { Component } from 'react'

class Cart_modal extends Component {
  render() {
    return (
      <div id="quickview-wrapper">
        <div className="modal fade" id="cartModal" tabindex="-1" role="dialog">
          <div className="modal-dialog modal__container" role="document">
            <div className="modal-content">
              <div className="modal-header modal__header">
                <h4 className="sfmono">Cart Item</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="closemodal"><span
                  aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                <div className="modal-product">

                  <table className="table text-center table-striped responsive-table" id="cartTable" width="100%" cellspacing="0">

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
                <div id="details"></div>
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
                          width: "100%",
                          height: "auto",
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
                          width: "100%",
                          height: "auto",
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
                      <h2>buyPrice</h2>&nbsp; <h3 id="pop-price" style={{ color: "rgb(255, 83, 83)" }}></h3>
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

class ProductAdd_modal extends Component {
  render() {
    return (
      <div id="quickview-wrapper">
        <div
          className="modal fade"
          id="addProduct"
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
                          width: "100%",
                          height: "auto",
                          transition: "all 0.3s ease-out 0s",
                          marginBottom: "0"
                        }}
                      />
                    </div>
                  </div>

                  <div className="product-info">
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">productCode</h2>
                      <div className="input-group input-update">
                        <input type="text" placeholder="Product Code" id="product-code-add" />
                      </div>
                    </div>
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">productName</h2>
                      <div className="input-group input-update">
                        <input type="text" placeholder="Product Name" id="product-name-add" />
                      </div>
                    </div>
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">productDescription</h2>
                    </div>
                    <div class="input-group input-update">
                      <textarea class="form-textarea-control mb-2" placeholder="Product Description"
                        id="product-desc-add" rows="3"></textarea>
                    </div>
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">productLine</h2>
                      <div className="input-group input-update">
                        <input type="text" placeholder="Product Line" id="product-line-add" />
                      </div>
                    </div>
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">productScale</h2>
                      <div className="input-group input-update">
                        <input type="text" placeholder="Product Scale" id="product-scale-add" />
                      </div>
                    </div>
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">productVendor</h2>
                      <div className="input-group input-update">
                        <input type="text" placeholder="Product Vendor" id="product-vendor-add" />
                      </div>
                    </div>
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">quantityInStock</h2>
                      <div className="input-group input-update">
                        <input type="text" placeholder="Quantity In Stock" id="product-quan-add" />
                      </div>
                    </div>
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">buyPrice</h2>
                      <div className="input-group input-update">
                        <input type="text" placeholder="Buy Price" id="product-buyprice-add" />
                      </div>
                    </div>
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">MSRP</h2>
                      <div className="input-group input-update">
                        <input type="text" placeholder="MSRP" id="product-msrp-add" />
                      </div>
                    </div>
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">Image</h2>
                      <div className="input-group input-update ">
                        <input type="file" class="custom-file-input" id="validatedCustomFile" required />
                        <input type="text" className="position-absolute" placeholder="Choose File..." id="msrp-input" />
                        <button className="mb-0 position-absolute d-flex justify-content-right" for="validatedCustomFile">Browse</button>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="flat-btn flat-save" id="addproduct" >Save</button>
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

class ProductEdit_modal extends Component {
  render() {
    return (
      <div id="quickview-wrapper">
        <div
          className="modal fade"
          id="editProduct"
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
                          width: "100%",
                          height: "auto",
                          transition: "all 0.3s ease-out 0s",
                          marginBottom: "0"
                        }}
                      />
                    </div>
                  </div>

                  <div className="product-info">
                    <div className="row mb-2">
                      <div className="product-detail col-sm-4">
                        <h2 className="mb-0 mr-1">productCode</h2>
                      </div>
                      <div className="input-group input-update col-sm-8">
                        <input type="text" placeholder="Product Code" id="product-code-edit" />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="product-detail col-sm-4">
                        <h2 className="mb-0 mr-1">productName</h2>
                      </div>
                      <div className="input-group input-update col-sm-8">
                        <input type="text" placeholder="Product Name" id="product-name-edit" />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="product-detail col-sm-4">
                        <h2 className="mb-0 mr-1">productDescription</h2>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div class="input-group input-update col-sm-12">
                        <textarea class="form-textarea-control mb-2" placeholder="Product Description"
                          id="product-desc-edit" rows="3"></textarea>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="product-detail col-sm-4">
                        <h2 className="mb-0 mr-1">productLine</h2>
                      </div>
                      <div className="input-group input-update col-sm-8">
                        <input type="text" placeholder="Product Line" id="product-line-edit" />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="product-detail col-sm-4">
                        <h2 className="mb-0 mr-1">productScale</h2>
                      </div>
                      <div className="input-group input-update col-sm-8">
                        <input type="text" placeholder="Product Scale" id="product-scale-edit" />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="product-detail col-sm-4">
                        <h2 className="mb-0 mr-1">productVendor</h2>
                      </div>
                      <div className="input-group input-update col-sm-8">
                        <input type="text" placeholder="Product Vendor" id="product-vendor-edit" />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="product-detail col-sm-4">
                        <h2 className="mb-0 mr-1">quantityInStock</h2>
                      </div>
                      <div className="input-group input-update col-sm-8">
                        <input type="text" placeholder="Quantity In Stock" id="product-quan-edit" />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="product-detail col-sm-4">
                        <h2 className="mb-0 mr-1">buyPrice</h2>
                      </div>
                      <div className="input-group input-update col-sm-8">
                        <input type="text" placeholder="Buy Price" id="product-buyprice-edit" />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="product-detail col-sm-4">
                        <h2 className="mb-0 mr-1">MSRP</h2>
                      </div>
                      <div className="input-group input-update col-sm-8">
                        <input type="text" placeholder="MSRP" id="product-msrp-edit" />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="product-detail col-sm-4">
                        <h2 className="mb-0 mr-1">Image</h2>
                      </div>
                      <div className="input-group input-update col-sm-8">
                        <input type="file" className="custom-file-input" id="validatedCustomFile" required />
                        <input type="text" className="position-absolute" placeholder="Choose File..." id="msrp-input" />
                        <button className="mb-0 position-absolute d-flex justify-content-right" for="validatedCustomFile">Browse</button>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="flat-btn flat-save" id="saveEditproduct">Save</button>
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

class OrderDetail_modal extends Component {
  render() {
    return (
      <div id="quickview-wrapper">
        <div className="modal fade" id="orderDatilModal" tabindex="-1" role="dialog">
          <div className="modal-dialog modal__container" role="document">
            <div className="modal-content">
              <div className="modal-header modal__header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                  aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                {/* <div id="blank" className="collapse">
                  <h1>ทรงพระเจริญ</h1>
                  <img src="/Contribubutor/lift.png" alt="" className="" />
                </div> */}
                <h4 className="sfmono" id="order-number-head">Order Number</h4>
                <h5 className="sfmono" id="customer-number-head">customerNumber :</h5>
                <div className="modal-product">

                  <table className="table text-center table-striped responsive-table" id="cartTable" width="100%" cellspacing="0">

                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>orderNumber</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody id="order-detail">
                    </tbody>

                  </table>
                </div>

                <p id="order-date-detail">orderDate</p>
                <p id="required-date-detail">requiredDate</p>
                <p id="shipped-date-detail">shippedDate</p>
                <p id="status-detail">status</p>
                <p id="comment-detail">comment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CustomerDetail_modal extends Component {
  render() {
    return (
      <div id="quickview-wrapper">
        <div className="modal fade" id="customerDetailModal" tabindex="-1" role="dialog">
          <div className="modal-dialog modal__container" role="document">
            <div className="modal-content">
              <div className="modal-header modal__header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                  aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                <h5 className="sfmono" id="customer-number-head">customerNumber :</h5>
                <h5 className="sfmono" id="customer-name-head">customName</h5><br />
                <p id="contact-name-detail" className="mb-1">contactName</p>
                <p id="phone-detail" className="mb-1">phone</p>
                <p id="address-detail" className="mb-1">address</p>
                <p id="sale-rep-detail" className="mb-1">salesRepEmplyeeNumber</p>
                <p id="credit-limit-detail" className="mb-1">creditLimit</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Payment_modal extends Component {
  render() {
    return (
      <div id="quickview-wrapper">
        <div className="modal fade" id="paymentModal" tabindex="-1" role="dialog">
          <div className="modal-dialog modal__container" role="document" id="responsive-payment">
            <div className="modal-content">
              <div className="modal-header modal__header">
                <h4 className="sfmono">Payment</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                  aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                <div className="row mb-2">
                  <div className="product-detail col-sm-8">
                    <p>Order Number : <span id="order-no-payment" /></p>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="product-detail col-sm-4">
                    Customer Number
                  </div>
                  <div className="input-group input-update-payment mb-2 col-sm-8">
                    <input type="text" placeholder="Customer Number" id="custumer-no-input" />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="product-detail col-sm-4">
                    Ceque Number
                  </div>
                  <div className="input-group input-update-payment mb-2 col-sm-8">
                    <input type="text" placeholder="Ceque Number" id="ceque-input" />
                  </div>
                </div>
                {/* <div className="row mb-2">
                  <div className="product-detail col-sm-4">
                    Payment Date
                  </div>
                  <div className="input-group input-update-payment mb-2 col-sm-8">
                    <input type="date" placeholder="yyyy/mm/dd" id="example-datetime-local-input" />
                  </div>
                </div> */}
                
                <div className="row mb-2">
                  <div className="product-detail col-sm-4">
                    <p className="align-middle mb-0">Amount : $<span id="payment-amount" /></p>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="product-detail col-sm-8">
                    <p className="align-middle mb-0">Discount : <span id="discount-value" /> <span id="discount-code">You do not have Discount</span></p>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="product-detail col-sm-4">
                    <p className="align-middle mb-0">Total point : <span id="total-point" /></p>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="product-detail col-sm-4">
                    Required Date
                  </div>
                  <div className="input-group input-update-payment mb-2 col-sm-8">
                    <input type="date" placeholder="yyyy/mm/dd" data-date-format="YYYY-MM-DD" id="require-date" />
                  </div>

                </div>
                <div className="row mb-2">
                  <div className="col-sm-3">
                    <button class="btn btn-outline-success" id="accept-payment">Accept</button>
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

export {Cart_modal, Catalog_modal, ProductDetail_modal, ProductEdit_modal, ProductAdd_modal, OrderDetail_modal, CustomerDetail_modal, Payment_modal }
