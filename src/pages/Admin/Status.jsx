import React, { Component } from "react";
import { Sidebar, Navbar } from "../../components/Menubar";
import { Helmet } from "react-helmet";

import api from "../../api/api";
import $ from "jquery";

export default class template extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  componentDidMount() {
    api.get(`/api/admin/order/orderdetail`).then(res => {
      if (res.data.length > 15) {
        var i, x
        var n = parseInt(res.data.length / 15)
        n % 15 == 0 ? x = n - 0 : x = n
        $("#pagebutton").empty()
        for (i = 0; i <= x; i++) {
          if (i == 0) $("#pagebutton").append(`<button id="currentpage" class="flat-btn-gray mx-1 set-active fbg-active " value="${i}"><span>${i + 1}</span></button>`)
          else $("#pagebutton").append( `<button id="currentpage" class="flat-btn-gray mx-1 set-active" value="${i}"><span>${i + 1}</span></button>`)
        }
        $(document).on('click', '#currentpage', this.changepage)
      }
      $('#order-data').empty()
      var i
      
      for (i = 0; i < 15; i++) {
        // if(res.data[i].status == "cancelled") 
        $('#order-data').append(
          '<tr>' +
          '<td>' + res.data[i].orderNumber + '</td>' +
          '<td>' + res.data[i].customerNumber + '</td>' +
          '<td>' + res.data[i].orderDate + '</td>' +
          '<td>' + res.data[i].requiredDate + '</td>' +
          '<td>' + res.data[i].shippedDate + '</td>' +
          '<td id="text-status" class="text-warning">' + res.data[i].status + '</td>' +
          '</tr>'
        )
      }
    })
  }
  changepage(event){
    var current = event.currentTarget
    var pr = document.getElementsByClassName('fbg-active')
    pr[0].className = pr[0].className.replace(' fbg-active', '')
    current.className += ' fbg-active'
    var init = current.value * 15
    var i
    api.get(`/api/admin/order/changepage/${init}`).then(res =>{
      console.log(res)
      $('#order-data').empty()
      for (i = 0; i < res.data.length; i++) {
        $('#order-data').append(
          '<tr>' +
          '<td>' + res.data[i].orderNumber + '</td>' +
          '<td>' + res.data[i].customerNumber + '</td>' +
          '<td>' + res.data[i].orderDate + '</td>' +
          '<td>' + res.data[i].requiredDate + '</td>' +
          '<td>' + res.data[i].shippedDate + '</td>' +
          '<td>' + res.data[i].status + '</td>' +
          '</tr>'
        )
      }
    })
  }
  render() {
    return (
      <div id="wrapper">
        <Helmet>
          <title>Status</title>
        </Helmet>
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800 sfmono">Product status</h1>
              </div>
              <div className="d-flex justify-content-end mb-2" id="pagebutton"></div>
              <table
                className="table text-center table-striped responsive-table "
                id="dataTable"
                width="100%"
              >
                <thead>
                  <th>orderNumber</th>
                  <th>customerNumber</th>
                  <th>orderDate</th>
                  <th>requiredDate</th>
                  <th>shippedDate</th>
                  <th>status</th>
                </thead>
                <tbody id="order-data">

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}