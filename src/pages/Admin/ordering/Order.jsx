import React, { Component } from "react";
import { Sidebar, InstockNav } from "../../../components/Menubar";
import { Helmet } from "react-helmet";

import api from "../../../api/api";
import $ from "jquery";
import { Cart_modal, ProductDetail_modal } from "../../../components/Modal";
import { log } from "util";

class Instock extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    api.get("/api/admin/product/instockItem").then(res => {
      var amount = 15
      var dom = "";
      var i, x;
      var n = parseInt(res.data.length / amount)
      n % amount == 1 ? x = n - 1 : x = n
      if (res.data.length <= amount) {
        for (i = 0; i < res.data.length; i++) {
          dom += `<tr>`;
          dom += `<td class="align-middle"><a id="${res.data[i].productCode}" data-toggle="modal"
          data-target="#productModal" title="Product detail"
          class="product-click quick-view modal-view detail-link" href="#"><img class="responsive-img" src="/img/${res.data[i].imgSrc}"> 
          <i class="fas fa-search fa-sm responsive-icon-search"></i></a></td>`;
          dom += `<td class="align-middle responsive-table-name">${res.data[i].productName}</td>`;
          dom += `<td class="align-middle">${res.data[i].productScale}</td>`;
          dom += `<td class="align-middle responsive-table-vendor">${res.data[i].productVendor}</td>`;
          dom += `<td class="align-middle">${res.data[i].quantityInStock}</td>`;
          dom += `<td class="align-middle">${res.data[i].buyPrice}</td>`;
          dom += `<td class="align-middle"><button id="delete" class="btn btn-danger"><i class="fas fa-trash"></i></button></td>`;
          dom += `</tr>`;
        }
        $("#instockData").html(dom);
        $(document).on("click", "#delete", this.deleteProduct);
      } else {
        var pagebutton = ""
        for (i = 0; i <= x; i++) {
          if (i == 0) pagebutton += `<button id="currentpage" class="flat-btn-gray mx-1 set-active fbg-active " value="${i}"><span>${i + 1}</span></button>`
          else pagebutton += `<button id="currentpage" class="flat-btn-gray mx-1 set-active" value="${i}"><span>${i + 1}</span></button>`

        }
        $('#pagebutton').html(pagebutton)
        $(document).on('click', '#currentpage', this.changepage)
        for (i = 0; i < amount; i++) {
          dom += `<tr>`;
          dom += `<td class="align-middle"><a id="${res.data[i].productCode}" data-toggle="modal"
          data-target="#productModal" title="Product detail"
          class="product-click quick-view modal-view detail-link" href="#"><img class="responsive-img" src="/img/${res.data[i].imgSrc}"> 
          <i class="fas fa-search fa-sm responsive-icon-search"></i></a></td>`;
          dom += `<td class="align-middle responsive-table-name">${res.data[i].productName}</td>`;
          dom += `<td class="align-middle">${res.data[i].productScale}</td>`;
          dom += `<td class="align-middle responsive-table-vendor">${res.data[i].productVendor}</td>`;
          dom += `<td class="align-middle">${res.data[i].quantityInStock}</td>`;
          dom += `<td class="align-middle">$${res.data[i].buyPrice}</td>`;
          dom += `<td class="align-middle"><button id="delete" class="flat-btn flat-blue"><i class="fas fa-shopping-cart fa-sm"></i></button></td>`;
          dom += `<td class="align-middle"><button id="delete" class="flat-btn flat-trash"><i class="fas fa-trash"></i></button></td>`;
          dom += `</tr>`;
        }
        $("#instockData").html(dom);
        $(document).on("click", "#delete", this.deleteProduct);
      }
    });
    $(document).on("click", ".product-click", this.productDetail);
  }

  productDetail(event) {
    var procuctCode = this.id;
    console.log(this.id);

    api.get(`/api/admin/product/fetchInstockitem/${procuctCode}`).then(res => {
      var html = "";
      console.log(res);

      var query = res.data[0];
      $("#pop-name").html(query.productName);
      $("#pop-code").html(query.productCode);
      $("#pop-desc").html(query.productDescription);
      $("#pop-price").html(query.buyPrice);
      $("#pop-scale").html(query.productScale);
      $("#pop-vendor").html(query.productVendor);
      $("#pop-quantity").html(query.quantityInStock);
      $("#pop-img").attr('src', '/img/' + query.imgSrc)
      $("#pop-productline").html(query.productLine);
      $("#pop-msrp").html(query.MSRP);
    });
  }

  changepage(event) {
    var pr = document.getElementsByClassName('fbg-active')
    pr[0].className = pr[0].className.replace(' fbg-active', '')
    this.className += ' fbg-active'

    var amount = 15
    $("instockData").html("")
    api.get("/api/admin/product/instockItem").then(res => {
      var i
      var init = this.value * amount
      var dest = (parseInt(this.value) + 1) * amount
      if (dest > res.data.length) dest = res.data.length
      var dom = ""

      for (i = init; i < dest; i++) {
        dom += `<tr>`;
        dom += `<td class="align-middle"><a id="${res.data[i].productCode}" data-toggle="modal"
          data-target="#productModal" title="Product detail"
          class="product-click quick-view modal-view detail-link" href="#"><img class="responsive-img" src="/img/${res.data[i].imgSrc}"> 
          <i class="fas fa-search fa-sm responsive-icon-search"></i></a></td>`;
        dom += `<td class="align-middle responsive-table-name">${res.data[i].productName}</td>`;
        dom += `<td class="align-middle">${res.data[i].productScale}</td>`;
        dom += `<td class="align-middle responsive-table-vendor">${res.data[i].productVendor}</td>`;
        dom += `<td class="align-middle">${res.data[i].quantityInStock}</td>`;
        dom += `<td class="align-middle">${res.data[i].buyPrice}</td>`;
        dom += `<td class="align-middle"><button id="delete" class="btn btn-danger"><i class="fas fa-trash"></i></button></td>`;
        dom += `</tr>`;
      }
      $("#instockData").html(dom);
      // $(document).on("click", ".product-click", this.productDetail);
    });
  }

  deleteProduct(event) {
    alert("ลุงตูบรู้สึกไม่พอใคุณมากๆ");
  }

  render() {
    return (
      <div className="sfmono">
        <div id="wrapper">
          <Helmet>
            <title>Instock</title>
          </Helmet>
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <InstockNav />
              <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800 sfmono">In stock product</h1>
                </div>
                <div style={{ fontSize: "40px" }} id="demo"></div>
                {/* <div style={{ fontSize: "25px" }} className="txt-heading">
                Your Cart have{" "}
                <div
                  style={{ display: "inline", fontSize: "30px" }}
                  id="quantity-product"
                >
                  {" "}
                </div>
                products{" "}
                <div
                  style={{ display: "inline", fontSize: "30px" }}
                  id="piece-product"
                >
                  {" "}
                </div>{" "}
                pieces{" "}
              </div> */}
                {/* <div style={{ fontSize: "25px" }}>
                <a id="btnCheckout" href="/admin/instock/cartitem">
                  See Your Cart
                </a>{" "}
                <br />
                <a id="btnEmpty" href="emptycart">
                  Empty Cart
                </a>
              </div> */}
                <div className="d-flex justify-content-end mb-2" id="pagebutton"></div>
                <table
                  className="table text-center table-striped responsive-table "
                  id="dataTable"
                  width="100%"
                >
                  <thead>
                    <tr>
                      <th>ProductImage</th>
                      <th className="responsive-table-name">ProductName</th>
                      <th>ProductScale</th>
                      <th className="responsive-table-vendor">ProductVendor</th>
                      <th>QuantityInStock</th>
                      <th>BuyPrice</th>
                      <th></th><th></th>
                    </tr>
                  </thead>
                  <tbody className="w-100" id="instockData"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div >
        <Cart_modal />
        <ProductDetail_modal />
      </div>
    );
  }
}

class Pre_order extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() { }

  render() {
    return (
      <div className="sfmono">
        <div id="wrapper">
          <Helmet>
            <title>Pre-order</title>
          </Helmet>
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <InstockNav />
              <div className="container-fluid"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { Instock, Pre_order };
