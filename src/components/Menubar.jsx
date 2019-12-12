import React, { Component } from "react";
import $ from "jquery";
import api from "../api/api";

class Sidebar extends Component {
  componentDidMount() {
    $("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $(".sidebar .collapse").collapse("hide");
      }
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(function () {
      if ($(window).width() < 768) {
        $(".sidebar .collapse").collapse("hide");
      }
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel", function (
      e
    ) {
      if ($(window).width() > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });

    // Scroll to top button appear
    $(document).on("scroll", function () {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $(".scroll-to-top").fadeIn();
      } else {
        $(".scroll-to-top").fadeOut();
      }
    });

    // Smooth scrolling using jQuery easing
    $(document).on("click", "a.scroll-to-top", function (e) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top
          },
          1000,
          "easeInOutExpo"
        );
      e.preventDefault();
    });
    // $('#home-sidebar').removeAttr('href')
  }
  render() {
    return (
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/admin"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-helicopter"></i>
          </div>
          <div className="sidebar-brand-text">
            classic Model<sup>Shop</sup>
          </div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
          <a className="nav-link" href="/admin" id="home-sidebar">
            <i className="fas fa-fw fa-home "></i>
            <span>Home</span>
          </a>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Product</div>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
            id="order-sidebar"
          >
            <i className="fas fa-fw fa-shopping-cart"></i>
            <span>Ordering</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header sfmono">Ordering:</h6>
              <a className="collapse-item" href="/admin/instock">
                In stock
              </a>
              <a className="collapse-item" href="/admin/preorder">
                Pre-order
              </a>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseone"
            aria-expanded="true"
            aria-controls="collapseTwo"
            id="status-sidebar"
          >
            <i class="fas fa-tasks"></i>
            <span>Order Status</span>
          </a>
          <div
            id="collapseone"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header sfmono">Order status:</h6>
              <a className="collapse-item" href="/admin/status/instock">
                In stock
              </a>
              <a className="collapse-item" href="/admin/status/preorder">
                Pre-order
              </a>
            </div>
          </div>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" href="/admin/status" id="status-sidebar">
          <i class="fas fa-tasks"></i>
            <span>Order Status</span>
          </a>
        </li> */}
        <li className="nav-item">
          <a className="nav-link" href="/admin/discount" id="discount-sidebar">
            <i className="fas fa-fw fa-tag"></i>
            <span>Discount</span>
          </a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" href="/admin/preordermanage">
            <i className="fas fa-fw fa-calendar-alt"></i>
            <span>Pre-order management</span>
          </a>
        </li> */}

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Customer</div>
        <li className="nav-item">
          <a className="nav-link" href="/admin/customer" id="customer-sidebar">
            <i className="fas fa-fw fa-user"></i>
            <span>Customers management</span>
          </a>
        </li>
        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Employee</div>

        <li className="nav-item">
          <a className="nav-link" href="/admin/employee" id="emply-sidebar">
            <i className="fas fa-fw fa-id-card"></i>
            <span>Employees management</span>
          </a>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />
        <li className="nav-item">
          <a href="/catalog" className="nav-link">
            <i className="fas fa-cat"></i>
          </a>
        </li>
      </ul>
    );
  }
}

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      name: "",
      lastName: "",
      job: ""
    };
  }

  logout(event) {
    api.get('/api/logout').then(
      setTimeout("location.href = '/login';", 100)
    )
  }

  componentDidMount() {
    //fetchDetals
    api.get("/api/user").then(res => {
      if(res.data.length > 0){
        this.setState({ name: res.data[0].firstName });
        this.setState({ lastName: res.data[0].lastName });
        this.setState({ job: res.data[0].jobTitle })
      }else{
        setTimeout('location.href="/404"',0)
      }
    });
  }
  render() {
    return (
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button
          id="sidebarToggleTop"
          className="btn btn-link rounded-circle mr-3"
        >
          <i className="fa fa-bars"></i>
        </button>


        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block"></div>
          <div className="mr-2 d-flex justify-content align-items-center">
            <ul>
              <li>
                <span className=" text-gray-600 small" id="empName">
                  {this.state.name} {this.state.lastName}
                </span>
              </li>
              <li>
                <span className=" text-gray-600 small" id="empRole">
                  {this.state.job}
                </span>
              </li>
            </ul>
          </div>

          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img className="img-profile rounded-circle" src="/img/pm.jpg" />
            </a>

            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item" href="#">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" style={{ cursor: "pointer" }} onClick={this.logout}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

class InstockNav extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      name: "",
      lastName: "",
      job: ""
    };
  }

  logout(event) {
    api.get('/api/logout').then(
      setTimeout("location.href = '/login';", 100)
    )
  }

  componentDidMount() {
    //fetchDetals
    api.get("/api/user").then(res => {
      if(res.data.length > 0){
        this.setState({ name: res.data[0].firstName });
        this.setState({ lastName: res.data[0].lastName });
        this.setState({ job: res.data[0].jobTitle })
      }else{
        setTimeout('location.href="/404"',0)
      }
    });
  }
  render() {

    return (
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button
          id="sidebarToggleTop"
          className="btn btn-link rounded-circle mr-3"
        >
          <i className="fa fa-bars"></i>
        </button>
        <div className="d-flex align-items-center justify-content-end align-right h-100" style={{color: "#4e73df"}}>
          <a id="cartIcon" data-toggle="modal" data-target="#cartModal" title="Product detail"
            className="quick-view modal-view detail-link" href="#">
            <i className="fas fa-shopping-cart"></i>
            <span className="dot align-middle"><span id="piece-product"></span></span>
          </a>

        </div>

        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block"></div>
          <div className="mr-2 d-flex justify-content align-items-center">
            <ul>
              <li>
                <span className=" text-gray-600 small" id="empName">
                  {this.state.name} {this.state.lastName}
                </span>
              </li>
              <li>
                <span className=" text-gray-600 small" id="empRole">
                  {this.state.job}
                </span>
              </li>
            </ul>
          </div>

          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img className="img-profile rounded-circle" src="/img/pm.jpg" />
            </a>

            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item" href="#">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" style={{ cursor: "pointer" }} onClick={this.logout}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

class Carousel extends Component {
  render() {
    return (
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

    )
  }
}

class ProductFilter extends Component {
  render() {
    return (
      <div className="col-xl-3 col-lg-4 col-md-5">
        <div className="sidebar-filter mt-0">
          <div className="top-filter-head sfmono">
            Product Filters
                      </div>
          <form action="/catalog" method="GET">
            <div className="common-filter">
              <div className="head">Scale</div>
              <ul id="scalefilter"></ul>
            </div>

            <div className="common-filter ">
              <div className="head">Vendor</div>
              <ul id="vendorfilter"></ul>
            </div>
          </form>

          <div className="mx-5 my-2"></div>
        </div>
      </div>

    )
  }
}

class CatalogNav extends Component {
  render() {
    return (
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

    )
  }
}

class Footer extends Component {
  render() {
    return (
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; Your Website 2019</span>
          </div>
        </div>
      </footer>
    );
  }
}

export { Sidebar, Navbar, InstockNav, CatalogNav, Carousel, ProductFilter, Footer };
