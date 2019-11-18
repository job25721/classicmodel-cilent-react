import React, { Component } from "react";
import "../style/css/style.css";
import "../style/css/responsive.css";
import { Helmet } from "react-helmet";
import api from "../api/api";
import $ from "jquery";
import {Catalog_modal} from '../components/Modal'
import {CatalogNav,Carousel,ProductFilter} from '../components/Menubar'

export default class Catalog extends Component {
  componentDidMount() {
    api.get("/catalog/scaleFilter").then(res => {
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

      api.get("/catalog/vendorFilter").then(res => {
        $("#vendorfilter").append(
          '<li class="filter-list"><input class="pixel-radio" type="radio" name="vendor"  id="V-All" checked="checked" value="All"><label for="V-All">All</label></li>'
        );
        $.each(res.data, function (index, obj) {
          $("#vendorfilter").append(
            '<li class="filter-list"><input class="pixel-radio" type="radio" name="vendor" id="' +
            obj.productVendor + '" value="' + obj.productVendor + '"><label for="' +
            obj.productVendor + '">' + obj.productVendor + '</label></li>');
        });

        $(document).on('click', '.card-img', (e) => {
          var productCode = e.target.id
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
              <CatalogNav/>
               </header>
            <section className="blog-banner-area h-100" id="category">
            <Carousel/>
            </section>
            <section className="section-margin--small mb-5">
              <div className="container-cat">
              <div class="text-right" >
                  <h4 id="number-row" className="sfmono position-static" style={{color:"#999"}}></h4>
               </div>
                <div className="row">
                  <ProductFilter/>
                  <div className="col-xl-9 col-lg-8 col-md-7">
                    <div className="filter-bar d-flex flex-wrap align-items-center">
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
        <Catalog_modal/>
      </div>
    );
  }
}
