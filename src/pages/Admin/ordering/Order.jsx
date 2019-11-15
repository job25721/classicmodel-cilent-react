import React, { Component } from "react";
import { Sidebar, Navbar } from "../../../components/Menubar";
import { Helmet } from "react-helmet";

import api from "../../../api/api";
import $ from "jquery";

class Instock extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    api.get("/api/admin/product/instockItem").then(res => {
      var dom = "";
      console.log(res.data[0]);
      res.data.forEach(each => {
        dom += `<tr>`;
        dom += `<td><img src="/img/${each.imgSrc}" / width="50px" height="50px"></td>`;
        dom += `<td>${each.productName}</td>`;
        dom += `<td>${each.productScale}</td>`;
        dom += `<td>${each.productVendor}</td>`;
        dom += `<td>${each.quantityInStock}</td>`;
        dom += `<td>${each.buyPrice}</td>`;
        dom += `<td><button id="delete" class="btn btn-danger">Delete</button></td>`;
        dom += `</tr>`;
      });
      $("#instockData").html(dom);
      $(document).on("click", "#delete", this.deleteProduct);
    });
  }

  deleteProduct(event) {
    alert("ลุงตูบรู้สึกไม่พอใคุณมากๆ");
  }

  render() {
    return (
      <div id="wrapper">
        <Helmet>
          <title>Instock</title>
        </Helmet>
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">In stock product</h1>
              </div>
              <div style={{ fontSize: "40px" }} id="demo"></div>
              <div style={{ fontSize: "25px" }} className="txt-heading">
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
              </div>
              <div style={{ fontSize: "25px" }}>
                <a id="btnCheckout" href="/admin/instock/cartitem">
                  See Your Cart
                </a>{" "}
                <br />
                <a id="btnEmpty" href="emptycart">
                  Empty Cart
                </a>
              </div>
              <table
                className="table text-center table-striped responsive-table"
                id="dataTable"
                width="100%"
                cellspacing="0"
                style={{ border: "black",display: "block", overflowX : "auto",whiteSpace:"normal"}}
              >
                <thead className="thead-dark w-100">
                  <tr>
                    <th>ProductImage</th>
                    <th>ProductName</th>
                    <th>ProductScale</th>
                    <th>ProductVendor</th>
                    <th>QuantityInStock</th>
                    <th>BuyPrice</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="w-100" id="instockData"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Pre_order extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div id="wrapper">
        <Helmet>
          <title>Pre-order</title>
        </Helmet>
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid"></div>
          </div>
        </div>
      </div>
    );
  }
}

export { Instock, Pre_order };
