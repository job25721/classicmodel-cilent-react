import React, { Component } from "react";
import "../style/css/style.css";
import "../style/css/responsive.css";
import { Helmet } from "react-helmet";
import api from "../api/api";
import $ from "jquery";
import { Catalog_modal } from '../components/Modal'
import { CatalogNav, Carousel, ProductFilter } from '../components/Menubar'

export default class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }
  componentDidMount() {
    api.get("/catalog/scaleFilter").then(res => { // create product filter type scale
      $("#scalefilter").append(
        '<li class="filter-list"><input class="pixel-radio" type="radio" name="scale"  value="All"  checked="checked" id="S-All"  ><label for="S-All">All</label></li>'
      );

      $.each(res.data, function (index, obj) {
        $("#scalefilter").append(
          '<li class="filter-list"><input class="pixel-radio" type="radio" id="' + obj
            .productScale + '" name="scale"  value="' +
          obj.productScale + '"  ><label for="' + obj.productScale + '">' + obj
            .productScale + '</label></li>');
      })
      $(document).on("click", ".pixel-radio", this.productfilter)
    })
    api.get("/catalog/vendorFilter").then(res => { //creat product filter type vendor
      $("#vendorfilter").append(
        '<li class="filter-list"><input class="pixel-radio" type="radio" name="vendor"  id="V-All" checked="checked" value="All"><label for="V-All">All</label></li>'
      );
      $.each(res.data, function (index, obj) {
        $("#vendorfilter").append(
          '<li class="filter-list"><input class="pixel-radio" type="radio" name="vendor" id="' +
          obj.productVendor + '" value="' + obj.productVendor + '"><label for="' +
          obj.productVendor + '">' + obj.productVendor + '</label></li>');
      });
      $(document).on("click", ".pixel-radio", this.productfilter)
    });


    api.get(`catalog/allproduct`).then(res => { //fetch product
      console.log(res);
      $('#number-row').html('Found ' + res.data.row + ' product ');
      if (res.data.row > 18) {
        var i, x
        var n = parseInt(res.data.row / 18)
        n % 18 == 1 ? x = n - 1 : x = n
        $('#pagebutton').empty()
        for (i = 0; i <= x; i++) {
          if (i == 0) $('#pagebutton').append(`<button id="currentpage" class="flat-btn-gray mx-1 set-active fbg-active " value="${i}"><span>${i + 1}</span></button>`)
          else $('#pagebutton').append(`<button id="currentpage" class="flat-btn-gray mx-1 set-active" value="${i}"><span>${i + 1}</span></button>`)
        }
        $(document).on('click', '#currentpage', this.changepage)
      }
      $("#product-row").empty();
      for (var i = 0; i < 18; i++) {
        $('#product-row').append(
          '<div class="col-md-6 col-lg-4"><div class="text-center card-product"><div class="card-product__img" ><a data-toggle="modal" data-target="#productModal" title="Product detail" class="quick-view modal-view detail-link" href="#"><img class="card-img" src="/img/' +
          res.data.result[i].imgSrc +
          '"  id=' + res.data.result[i].productCode + '></a></div>' +
          '<div class="card-body"><p>Scale' + res.data.result[i].productScale +
          '</p><h4 class="card-product__title sfmono">' + res.data.result[i].productName + '</h4>' +
          '<p class="price">$' + res.data.result[i].buyPrice + " </p>" +
          "<p>Vendor: " + res.data.result[i].productVendor + "</p></div></div></div>"
        )
      }
      $(document).on("click", ".card-img", this.productDetail)
    })
    // var num = $('.col-md-6:not([style*="display: none"])').length;
    // if (num == 0) $('#number-row').html('Product is not found')
    // else if (num == 1) $('#number-row').html('Found ' + num + ' product ');
    // else $('#number-row').html('Found ' + num + ' products ')

  }

  productDetail(event) {
    var productCode = event.target.id
    api.get('catalog/fetchPopUp/' + productCode).then(res => {
      $('#pop-name').html(res.data[0].productName)
      $('#pop-price').html('$' + res.data[0].buyPrice)
      $('#pop-desc').html(res.data[0].productDescription)
      $('#pop-code').html(res.data[0].productCode)
      $('#pop-scale').html(res.data[0].productScale)
      $('#pop-vendor').html(res.data[0].productVendor)
      $('#pop-quantity').html(res.data[0].quantityInStock)
      $('#pop-img').attr('src', '/img/' + res.data[0].imgSrc)
    })
  }

  productfilter(event) {
    var scale = $("[name=scale]:checked").val();
    var vendor = $("[name=vendor]:checked").val();
    api.get(`catalog/product/${scale}/${vendor}/undefined`).then(res => {
      $('#number-row').html('Found ' + res.data.row + ' product ');
      $('#pagebutton').empty()
      var row = 18
      if (res.data.row > 18) {
        var i, x
        var n = parseInt(res.data.row / 18)
        n % 18 == 0 ? x = n - 1 : x = n
        for (i = 0; i <= x; i++) {
          if (i == 0) $('#pagebutton').append(`<button id="currentpage" class="flat-btn-gray mx-1 set-active fbg-active " value="${i}"><span>${i + 1}</span></button>`)
          else $('#pagebutton').append(`<button id="currentpage" class="flat-btn-gray mx-1 set-active" value="${i}"><span>${i + 1}</span></button>`)
        }
      } else row = res.data.row

      $("#product-row").empty();
      for (var i = 0; i < row; i++) {

        $('#product-row').append(
          '<div class="col-md-6 col-lg-4"><div class="text-center card-product"><div class="card-product__img" ><a data-toggle="modal" data-target="#productModal" title="Product detail" class="quick-view modal-view detail-link" href="#"><img class="card-img" src="/img/' +
          res.data.result[i].imgSrc +
          '"  id=' + res.data.result[i].productCode + '></a></div>' +
          '<div class="card-body"><p>Scale' + res.data.result[i].productScale +
          '</p><h4 class="card-product__title sfmono">' + res.data.result[i].productName + '</h4>' +
          '<p class="price">$' + res.data.result[i].buyPrice + " </p>" +
          "<p>Vendor: " + res.data.result[i].productVendor + "</p></div></div></div>"
        )
      }
    })
  }

  changepage(event) {
    console.log($("#scalefilter")[0]);
    var scale = $("[name=scale]:checked").val();
    var vendor = $("[name=vendor]:checked").val();

    var current = event.currentTarget
    var pr = document.getElementsByClassName('fbg-active')
    pr[0].className = pr[0].className.replace(' fbg-active', '')
    current.className += ' fbg-active'
    var init = current.value * 15
    var i
    $("instockData").html("")
    api.get(`catalog/test/${scale}/${vendor}/undefined/${init}`).then(res => {
      $('#product-row').empty()
      for (var i = 0; i < res.data.row; i++) {
        $('#product-row').append(
          '<div class="col-md-6 col-lg-4"><div class="text-center card-product"><div class="card-product__img" ><a data-toggle="modal" data-target="#productModal" title="Product detail" class="quick-view modal-view detail-link" href="#"><img class="card-img" src="/img/' +
          res.data.result[i].imgSrc +
          '"  id=' + res.data.result[i].productCode + '></a></div>' +
          '<div class="card-body"><p>Scale' + res.data.result[i].productScale +
          '</p><h4 class="card-product__title sfmono">' + res.data.result[i].productName + '</h4>' +
          '<p class="price">$' + res.data.result[i].buyPrice + " </p>" +
          "<p>Vendor: " + res.data.result[i].productVendor + "</p></div></div></div>"
        )
      }
    })
  }

  

  productsearch(event) {
    console.log(event.target);
    var name = $("#myInput").val().toLowerCase
    console.log(name.length);
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
              <CatalogNav />
            </header>
            <section className="blog-banner-area h-100" id="category">
              <Carousel />
            </section>
            <section className="section-margin--small mb-5">
              <div className="container-cat">
                <div class="text-right " >
                  <h4 id="number-row" className="sfmono" style={{ color: "#999" }}></h4>
                  <div className="d-flex justify-content-end mb-2" id="pagebutton"></div>
                </div>
                <div className="row">
                  <ProductFilter />
                  <div className="col-xl-9 col-lg-8 col-md-7">
                    <div className="filter-bar d-flex flex-wrap align-items-center">
                      <div className="sorting">
                      </div>
                      <div className="sorting mr-auto">                     </div>
                      <div>
                        <div className="input-group filter-bar-search">
                          <input
                            type="text"
                            placeholder="Search"
                            id="myInput"
                          />
                          <div className="input-group-append">
                            <button type="button" id="search-btn" onClick={this.productsearch}>
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
        <Catalog_modal />
      </div>
    );
  }
}
