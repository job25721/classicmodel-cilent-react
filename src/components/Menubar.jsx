import React, { Component } from "react";
import $ from "jquery";
import api from "../api/api";

class Sidebar extends Component {
  componentDidMount() {
    $("#sidebarToggle, #sidebarToggleTop").on("click", function(e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $(".sidebar .collapse").collapse("hide");
      }
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(function() {
      if ($(window).width() < 768) {
        $(".sidebar .collapse").collapse("hide");
      }
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel", function(
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
    $(document).on("scroll", function() {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $(".scroll-to-top").fadeIn();
      } else {
        $(".scroll-to-top").fadeOut();
      }
    });

    // Smooth scrolling using jQuery easing
    $(document).on("click", "a.scroll-to-top", function(e) {
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
          <a className="nav-link" href="/admin">
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
              <h6 className="collapse-header">Custom Ordering:</h6>
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
          <a className="nav-link" href="/admin/status">
            <i className="fas fa-fw fa-receipt"></i>
            <span>Order Status</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/discount">
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
          <a className="nav-link" href="/admin/customer">
            <i className="fas fa-fw fa-user"></i>
            <span>Customers management</span>
          </a>
        </li>
        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Employee</div>

        <li className="nav-item">
          <a className="nav-link" href="/admin/employee">
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

  logout(event){
      api.get('/api/logout').then(
        setTimeout("location.href = '/login';", 100)
      )
    
  }

  componentDidMount() {
    //fetchDetals
    api.get("/api/user").then(res => {
      console.log(res.data);
      
      if(res.data != ''){
        this.setState({ name: res.data[0].firstName });
        this.setState({lastName: res.data[0].lastName});
        this.setState({job : res.data[0].jobTitle})
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

        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search fa-sm"></i>
              </button>
            </div>
          </div>
        </form>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-search fa-fw"></i>
            </a>

            <div
              className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown"
            >
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
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
              <a className="dropdown-item" href="#">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                Settings
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                Activity Log
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" onClick={this.logout}>
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

export { Sidebar, Navbar, Footer };
