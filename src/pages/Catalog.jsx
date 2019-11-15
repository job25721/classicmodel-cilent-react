import React, { Component } from "react";
import "../style/css/style.css";
import "../style/css/responsive.css";
import { Helmet } from "react-helmet";
import api from "../api/api";
import $ from "jquery";

export default class Catalog extends Component {
  componentDidMount() {
    api.get("/catalog/scaleFilter").then(res => {
      $("#scalefilter").append(
        '<li class="filter-list"><input class="pixel-radio" type="radio" name="scale" id="scale" value="All"  checked="checked"   ><label>All</label></li>'
      );

      $.each(res.data, function(index, obj) {
        $("#scalefilter").append(
          '<li class="filter-list"><input class="pixel-radio" type="radio" id="scale" name="scale"  value="' +
            obj.productScale +
            '"  ><label>' +
            obj.productScale +
            "</label></li>"
        );
      });

      api.get("/catalog/vendorFilter").then(res => {
        $("#vendorfilter").append(
          '<li class="filter-list"><input class="pixel-radio" type="radio" id="vendor" name="vendor"  value="All" checked="checked"   ><label>All</label></li>'
        );
        $.each(res.data, function(index, obj) {
          $("#vendorfilter").append(
            '<li class="filter-list"><input class="pixel-radio" type="radio" id="vendor" name="vendor" value="' +
              obj.productVendor +
              '"><label>' +
              obj.productVendor +
              "</label></li>"
          );
        });

        $(document).on('click','.card-img', (e) => {
          var productCode = e.target.id  
          api.get('catalog/fetchPopUp/'+productCode).then(res=>{
            $('#pop-name').html(res.data[0].productName)
            $('#pop-price').html('$'+res.data[0].buyPrice)
            $('#pop-desc').html(res.data[0].productDescription)
            $('#pop-code').html(res.data[0].productCode)
            $('#pop-scale').html(res.data[0].productScale)
            $('#pop-vendor').html(res.data[0].productVendor)
            $('#pop-quantity').html(res.data[0].quantityInStock)
            $('#pop-img').attr('src','/img/'+res.data[0].imgSrc)
          })
        })
        
        var scalev = $("[name=scale]:checked").val();
        var vendorv = $("[name=vendor]:checked").val();
        api.get(`catalog/getData?scale=${scalev}&vendor=${vendorv}`).then(res => {
            $("#product-row").empty();
            for (var i = 0; i < res.data.result.length; i++) {
              $("#product-row").append(
                '<div class="col-md-6 col-lg-4" ><div class="text-center card-product"><div class="card-product__img" ><a data-toggle="modal" data-target="#productModal" title="Product detail" className="quick-view modal-view detail-link" href="#"><img class="card-img" src="/img/' +
                  JSON.parse(JSON.stringify(res.data.result[i].imgSrc)) +
                  '" id=' +
                  res.data.result[i].productCode +
                  ' ></a></div><div class="card-body"><p>Scale' +
                  JSON.parse(JSON.stringify(res.data.result[i].productScale)) +
                  '</p><h4 class="card-product__title sfmono">' +
                  JSON.parse(JSON.stringify(res.data.result[i].productName)) +
                  '</h4><p class="price">$' +
                  JSON.parse(JSON.stringify(res.data.result[i].buyPrice)) +
                  " </p><p>Vendor: " +
                  JSON.parse(JSON.stringify(res.data.result[i].productVendor)) +
                  "</p></div></div></div>"
              );
            }
          });
      });
      
      $(document).on("click", ".pixel-radio", () => {
        var scalev = $("[name=scale]:checked").val();
        var vendorv = $("[name=vendor]:checked").val();

        api.get("catalog/getData?scale=" + scalev + "&vendor=" + vendorv).then(res => {
            $("#product-row").empty();
            for (var i = 0; i < res.data.result.length; i++) {
              $("#product-row").append(
                '<div class="col-md-6 col-lg-4"><div class="text-center card-product"><div class="card-product__img" ><a data-toggle="modal" data-target="#productModal" title="Product detail" class="quick-view modal-view detail-link" href="#"><img class="card-img" src="/img/' +
                  JSON.parse(JSON.stringify(res.data.result[i].imgSrc)) +
                  '"  id=' +
                  res.data.result[i].productCode +
                  '></a></div><div class="card-body"><p>Scale' +
                  JSON.parse(JSON.stringify(res.data.result[i].productScale)) +
                  '</p><h4 class="card-product__title sfmono">' +
                  JSON.parse(JSON.stringify(res.data.result[i].productName)) +
                  '</h4><p class="price">$' +
                  JSON.parse(JSON.stringify(res.data.result[i].buyPrice)) +
                  " </p><p>Vendor: " +
                  JSON.parse(JSON.stringify(res.data.result[i].productVendor)) +
                  "</p></div></div></div>"
              );
            }
            $("#myInput").on("keyup", function () {
              var value = $(this).val().toLowerCase();
              $("#product-row div ").filter(function () {
                   $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
              });
              if ($('.card-product__img').css('display') == 'none') {
                   $('.card-product__img').css('display', "");
                }
                var num = $('.col-md-6:not([style*="display: none"])').length;
                if (num == 0) $('#number-row').html('Product is not found')
                else if (num == 1) $('#number-row').html('Found ' + num + ' product ');
                else $('#number-row').html('Found ' + num + ' products ')
        
             });
        
             var num = $('.col-md-6:not([style*="display: none"])').length;
             if (num == 0) $('#number-row').html('Product is not found')
             else if (num == 1) $('#number-row').html('Found ' + num + ' product ');
             else $('#number-row').html('Found ' + num + ' products ')
          });
          
      });
     
  });
 
        

  }
  render() {
    return (
      <div className="sfmono">
        <Helmet>
          <title>Catalog</title>
        </Helmet>
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <header className="header_area">
              <nav className="navbar navbar-expand navbar-light bg-white topbar static-top shadow fixed-top">
                <div className="container">
                  <a
                    className="sidebar-brand d-flex align-items-center justify-content-center text-decoration-none"
                    href="/catalog?scale=All&vendor=All"
                  >
                    <div className="sidebar-brand-icon rotate-n-15">
                      <i className="fas fa-helicopter fa-lg"></i>
                    </div>
                    <div className="sidebar-brand-text">
                      Classsic Model<sup>Shop</sup>
                    </div>
                  </a>

                  <div>
                    <a
                      className="d-flex justify-content-center align-items-center"
                      href="/login"
                    >
                      <div className="d-flex align-items-start">
                        <i className="fas fa-user"></i>
                      </div>
                    </a>
                  </div>
                </div>
              </nav>
            </header>
            <section className="blog-banner-area h-100" id="category">
              <div className="container-fluid m-0 p-0">
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide"
                  style={{ width: "100%" }}
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="0"
                      className="active"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="1"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="2"
                    ></li>
                  </ol>
                  <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active">
                      <img
                        className="d-block img-fluid"
                        src="/img/test01.jpg"
                        style={{ width: "100%" }}
                        alt="First slide"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block img-fluid"
                        src="/img/test02.jpg"
                        style={{ width: "100%" }}
                        alt="Second slide"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block img-fluid"
                        src="/img/test03.jpg"
                        style={{ width: "100%" }}
                        alt="Third slide"
                      />
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </section>

            <section className="section-margin--small mb-5">
              <div className="container-cat">
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-md-5">
                    <div className="sidebar-filter mt-0">
                      <div className="top-filter-head sfmono">
                        Product Filters
                      </div>
                      <form action="/catalog" method="GET">
                        <div className="common-filter">
                          <ul id="scalefilter"></ul>
                        </div>

                        <div className="common-filter ">
                          <ul id="vendorfilter"></ul>
                        </div>
                      </form>

                      <div className="mx-5 my-2"></div>
                    </div>
                  </div>

                  <div className="col-xl-9 col-lg-8 col-md-7">
                    <div className="filter-bar d-flex flex-wrap align-items-center">
                      <h3 id="number-row"></h3>
                      <div className="sorting mr-auto"></div>
                      <div>
                        <div className="input-group filter-bar-search">
                          <input
                            type="text"
                            placeholder="Search"
                            id="myInput"
                          />
                          <div className="input-group-append">
                            <button type="button">
                              <i
                                className="fas fa-search fa-sm"
                                style={{ color: "#999999" }}
                              ></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row" id="product-row"></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

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
      </div>
    );
  }
}
