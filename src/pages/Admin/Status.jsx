import React, { Component } from "react";
import { Sidebar, Navbar } from "../../components/Menubar";
import { Helmet } from "react-helmet";
import { OrderDetail_modal } from '../../components/Modal'

import api from "../../api/api";
import $ from "jquery";

export default class template extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  componentDidMount() {
    api.get(`/api/admin/order/fetch`).then(res => {
      console.log(res);

      if (res.data.length > 15) {
        var i, x
        var n = parseInt(res.data.length / 15)
        n % 15 == 0 ? x = n - 0 : x = n
        $("#pagebutton").empty()
        for (i = 0; i <= x; i++) {
          if (i == 0) $("#pagebutton").append(`<button id="currentpage" class="flat-btn-gray mx-1 set-active fbg-active " value="${i}"><span>${i + 1}</span></button>`)
          else $("#pagebutton").append(`<button id="currentpage" class="flat-btn-gray mx-1 set-active" value="${i}"><span>${i + 1}</span></button>`)
        }
        $(document).on('click', '#currentpage', this.changepage)
      }
      $('#order-data').empty()
      var i

      for (i = 0; i < 15; i++) {
        var shippedDate, requiredDate, orderDate
        if (res.data[i].shippedDate != null) shippedDate = res.data[i].shippedDate.split("T1")[0]
        else shippedDate = "-"
        if (res.data[i].requiredDate != null) requiredDate = res.data[i].requiredDate.split("T1")[0]
        else requiredDate = "-"
        if (res.data[i].orderDate != null) orderDate = res.data[i].orderDate.split("T1")[0]
        else orderDate = "-"
        $('#order-data').append(
          '<tr>' +
          `<td class="align-middle"><a id="${res.data[i].orderNumber}" data-toggle="modal" data-target="#orderDatilModal" title="Product detail"` +
          'class="order-detail-click quick-view modal-view detail-link" href="#">' + res.data[i].orderNumber + '<i class="fas fa-search fa-sm responsive-icon-search-status"></i></td>' +
          '<td class="align-middle">' + res.data[i].customerNumber + '</td>' +
          '<td class="align-middle">' + orderDate + '</td>' +
          '<td class="align-middle">' + requiredDate + '</td>' +
          '<td class="align-middle">' + shippedDate + '</td>' +
          '<td class="align-middle">' + '<select id="order-' + res.data[i].orderNumber + '" class="status-selected status-detail-selected" id="sel1" name="' + res.data[i].orderNumber + '">' +
          '<option value="Cancelled">Cancelled</option>' +
          '<option value="Disputed">Disputed</option>' +
          '<option value="In Process">In Process</option>' +
          '<option value="On Hold">On hold</option>' +
          '<option value="Resolved">Resolved</option>' +
          '<option value="Shipped">Shipped</option>' +
          '</select>' + '</td>' +
          '</tr>'
        )
        if (res.data[i].status == "Cancelled") $(`#order-${res.data[i].orderNumber}`).val('Cancelled')
        else if (res.data[i].status == "Disputed") $(`#order-${res.data[i].orderNumber}`).val('Disputed')
        else if (res.data[i].status == "In Process") $(`#order-${res.data[i].orderNumber}`).val('In Process')
        else if (res.data[i].status == "On Hold") $(`#order-${res.data[i].orderNumber}`).val('On Hold')
        else if (res.data[i].status == "Resolved") $(`#order-${res.data[i].orderNumber}`).val('Resolved')
        else $(`#order-${res.data[i].orderNumber}`).val('Shipped')
      }
      $(document).on('change', '.status-selected', this.update)
      $(document).on('click', '.order-detail-click', this.orderDetail)
      $(document).on('click', '#save-status', this.editstatus)
    })
  }

  editstatus(event) {
    var comment = $('#status-comment-input').val()
    var orderno = $('#order-number-head').text()
    console.log(orderno);
    if (comment.length != 0) {
      console.log("not empty");
      api.get(`/api/admin/order/editdetail/${comment}/${orderno}`)
    }
    window.location.reload(true);

  }

  changepage(event) {
    var current = event.currentTarget
    var pr = document.getElementsByClassName('fbg-active')
    pr[0].className = pr[0].className.replace(' fbg-active', '')
    current.className += ' fbg-active'
    var init = current.value * 15
    var i
    api.get(`/api/admin/order/changepage/${init}`).then(res => {
      console.log(res)
      $('#order-data').empty()
      for (i = 0; i < res.data.length; i++) {
        var shippedDate, requiredDate, orderDate
        if (res.data[i].shippedDate != null) shippedDate = res.data[i].shippedDate.split("T1")[0]
        else shippedDate = "-"
        if (res.data[i].requiredDate != null) requiredDate = res.data[i].requiredDate.split("T1")[0]
        else requiredDate = "-"
        if (res.data[i].orderDate != null) orderDate = res.data[i].orderDate.split("T1")[0]
        else orderDate = "-"
        $('#order-data').append(
          '<tr>' +
          `<td class="align-middle"><a id="${res.data[i].orderNumber}" data-toggle="modal" data-target="#orderDatilModal" title="Product detail"` +
          'class="order-detail-click quick-view modal-view detail-link" href="#">' + res.data[i].orderNumber + '<i class="fas fa-search fa-sm responsive-icon-search-status"></i></td>' +
          '<td class="align-middle">' + res.data[i].customerNumber + '</td>' +
          '<td class="align-middle">' + orderDate + '</td>' +
          '<td class="align-middle">' + requiredDate + '</td>' +
          '<td class="align-middle">' + shippedDate + '</td>' +
          '<td class="align-middle">' + '<select id="order-' + res.data[i].orderNumber + '" class="status-selected status-detail-selected" id="sel1" name ="' + res.data[i].orderNumber + '">' +
          '<option value="Cancelled">Cancelled</option>' +
          '<option value="Disputed">Disputed</option>' +
          '<option value="In Process">In Process</option>' +
          '<option value="On Hold">On hold</option>' +
          '<option value="Resolved">Resolved</option>' +
          '<option value="Shipped">Shipped</option>' +
          '</select>' + '</td>' +
          '</tr>'
        )
        if (res.data[i].status == "Cancelled") $(`#order-${res.data[i].orderNumber}`).val('Cancelled')
        else if (res.data[i].status == "Disputed") $(`#order-${res.data[i].orderNumber}`).val('Disputed')
        else if (res.data[i].status == "In Process") $(`#order-${res.data[i].orderNumber}`).val('In Process')
        else if (res.data[i].status == "On Hold") $(`#order-${res.data[i].orderNumber}`).val('On Hold')
        else if (res.data[i].status == "Resolved") $(`#order-${res.data[i].orderNumber}`).val('Resolved')
        else $(`#order-${res.data[i].orderNumber}`).val('Shipped')
      }
    })
  }
  update(event) {
    var value = $(this).val()
    var orderNumber = event.currentTarget.name
    console.log(event.currentTarget.name);
    if (value == "Shipped") {
      api.get(`/api/admin/order/setShippedDate/${orderNumber}`).then(res => {

      })
    }

    api.get(`/api/admin/order/update/${value}/${orderNumber}`).then(res => {

    })
    window.location.reload(true);
  }

  orderDetail(event) {
    var orderNumber = event.currentTarget.id
    console.log(orderNumber);
    var total = 0
    var comment
    api.get(`/api/admin/order/detail/${orderNumber}`).then(res => {
      for (let n in res.data) {
        console.log(res.data[n].quantityOrdered);
        comment = res.data[n].comments
        if (comment == null) {
          comment = "-"
        }
        total = parseInt(res.data[n].priceEach) * parseInt(res.data[n].quantityOrdered)
        $('#order-detail').append(
          `<tr>
          <td class="align-middle">img</td>
          <td class="align-middle">${res.data[n].orderNumber}</td>
          <td class="align-middle">${res.data[n].priceEach}</td>
          <td class="align-middle">${res.data[n].quantityOrdered}</td>
          <td class="align-middle">${total}</td>
          </tr>`
        )
        console.log("status detail : " + res.data[n].status);

        $('#order-date-detail').html('orderDate : ' + res.data[n].orderDate.split("T1")[0])
        $('#required-date-detail').html('orderDate : ' + res.data[n].requiredDate.split('T1')[0])
        if (res.data[n].shippedDate != null) $('#shipped-date-detail').html('shippedDate : ' + res.data[n].shippedDate.split("T1")[0])
        else $('#shipped-date-detail').html('shippedDate : -')
        //$('#status-detail').html('status : ' + res.data[n].status)


        // < p id = "order-date-detail" > orderDate</p >
        //   <p id="required-date-detail">requiredDate</p>
        //   <p id="shipped-date-detail">shippedDate</p>
        //   <p id="status-detail">status</p>
        //   <p id="comment-detail">comment</p>

      }
      $('#status-detail').empty()
      $('#status-detail').append('status :' +
        '<select id="order-' + res.data[0].orderNumber + '" class="status-selected status-detail-selected-input" id="sel1" name="' + res.data[0].orderNumber + '">' +
        '<option value="Cancelled">Cancelled</option>' +
        '<option value="Disputed">Disputed</option>' +
        '<option value="In Process">In Process</option>' +
        '<option value="On Hold">On hold</option>' +
        '<option value="Resolved">Resolved</option>' +
        '<option value="Shipped">Shipped</option>' +
        '</select>'
      )
      if (res.data[0].status == "Cancelled") $(`.status-detail-selected-input`).val('Cancelled')
      else if (res.data[0].status == "Disputed") $(`.status-detail-selected-input`).val('Disputed')
      else if (res.data[0].status == "In Process") $(`.status-detail-selected-input`).val('In Process')
      else if (res.data[0].status == "On Hold") $(`.status-detail-selected-input`).val('On Hold')
      else if (res.data[0].status == "Resolved") $(`.status-detail-selected-input`).val('Resolved')
      else $(`#order-${res.data[0].orderNumber}`).val('Shipped')
      $('#status-comment-input').val(comment)
      $('#order-number-head').html(res.data[0].orderNumber)
      $('#customer-number-head').html('Customer nmber : ' + res.data[0].customerNumber)
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
                <h1 className="h3 mb-0 text-gray-800 sfmono">Order status</h1>
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
        <OrderDetail_modal />
      </div>
    );
  }
}