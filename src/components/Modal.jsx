import React, { Component } from 'react'

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
                <div id="blank" className="collapse">
                <h1>ทรงพระเจริญ</h1>
              <img src="/img/pm.jpg" alt="" className=""/>
                </div>
                
              <h1 id="cartLebel">Cart Item : </h1>
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
                          height:"auto",
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
                          height:"auto",
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
                          height:"auto",
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
                        <input type="text" placeholder="Product Code" id="product-code-input" />
                      </div>
                    </div>
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">productName</h2>
                      <div className="input-group input-update">
                        <input type="text" placeholder="Product Name" id="product-name-input" />
                      </div>
                    </div>
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">productDescription</h2>
                    </div>
                    <div class="input-group input-update">
                      <textarea class="form-textarea-control mb-2" placeholder="Product Description"
                        id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">productLine</h2>
                      <div className="input-group input-update">
                        <input type="text" placeholder="Product Line" id="product-line-input" />
                      </div>
                    </div>
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">productScale</h2>
                      <div className="input-group input-update">
                        <input type="text" placeholder="Product Scale" id="product-scale-input" />
                      </div>
                    </div>
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">productVendor</h2>
                      <div className="input-group input-update">
                        <input type="text" placeholder="Product Vendor" id="product-vendor-input" />
                      </div>
                    </div>
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">quantityInStock</h2>
                      <div className="input-group input-update">
                        <input type="text" placeholder="Quantity In Stock" id="product-quan-input" />
                      </div>
                    </div>
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">buyPrice</h2>
                      <div className="input-group input-update">
                        <input type="text" placeholder="Buy Price" id="buy-price-input" />
                      </div>
                    </div>
                    <div className="product-detail">
                      <h2 className="mb-0 mr-1">MSRP</h2>
                      <div className="input-group input-update">
                        <input type="text" placeholder="MSRP" id="msrp-input" />
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
                      <button className="flat-btn flat-save">Save</button>
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


export { Cart_modal, Catalog_modal, ProductDetail_modal, ProductEdit_modal }
