import React, { Component } from "react";
import { Sidebar, Navbar } from "../../components/Menubar";
import { CustomerDetail_modal } from '../../components/Modal'
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
    api.get('/api/admin/customer/fetch').then(res => {
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
      console.log(res);
      var i
      for (i = 0; i < 15; i++) {
        $('#customer-data').append(
          `<tr>
          <td class="align-middle"><a id="${res.data[i].customerNumber}" data-toggle="modal" data-target="#customerDetailModal" title="Product detail"
        class="customer-detail-click quick-view modal-view detail-link" href="#">${res.data[i].customerNumber}<i class="fas fa-search fa-sm responsive-icon-search-status"></i></td>
            <td>${res.data[i].customerName}</td>
            <td>${res.data[i].contactLastName}  ${res.data[n].contactFirstName}</td>
            <td>${res.data[i].phone}</td>
            <td>${res.data[i].salesRepEmployeeNumber}</td>
            <td>${res.data[i].creditLimit}</td>
          </tr>`
        )
      }

    })

    $(document).on('click','.customer-detail-click',this.customerDetail)
  }
  changepage(event) {
    var current = event.currentTarget
    var pr = document.getElementsByClassName('fbg-active')
    pr[0].className = pr[0].className.replace(' fbg-active', '')
    current.className += ' fbg-active'
    var init = current.value * 15
    api.get(`/api/admin/customer/changepage/${init}`).then(res => {
      console.log(res)
      $('#customer-data').empty()

      for (let i in res.data) {
        $('#customer-data').append(
          `<tr>
            <td>${res.data[i].customerNumber}</td>
            <td>${res.data[i].customerName}</td>
            <td>${res.data[i].contactLastName}  ${res.data[i].contactFirstName}</td>
            <td>${res.data[i].phone}</td>
            <td>${res.data[i].salesRepEmployeeNumber}</td>
            <td>${res.data[i].creditLimit}</td>
          </tr>`
        )
      }
    })
  }

  customerDetail(event){
    var customerNumber = event.currentTarget.id
    var address,state,addressLine2
    console.log(event.currentTarget.id);
    api.get(`/api/admin/customer/detail/${customerNumber}`).then(res=>{
      var customer = res.data[0]
      if(customer.addressLine2 == null) addressLine2 = ""
      else addressLine2 = customer.addressLine2
      if(customer.state == null) state = ""
      else state = customer.state
      if(customer.addressLine2 == null) 
      address = customer.addressLine1 + " " + addressLine2 + " " + customer.city + " " + state + " " +  customer.country + " " +  customer.postalCode 
      console.log(address);
      
      $('#customer-number-head').html('Customer number : ' + customer.customerNumber)
      $('#customer-name-head').html('Customer name : ' + customer.customerName)
      $('#contact-name-detail').html('Contact name : ' + customer.contactLastName + " " + customer.contactFirstName)
      $('#phone-detail').html('Phone : ' + customer.phone)
      $('#address-detail').html('Address : ' + address)
      $('#credit-limit-detail').html('Credit limit : ' + customer.creditLimit)
    })

    // <h5 className="sfmono" id="customer-number-head">customerNumber :</h5>
    //             <h5 className="sfmono" id="customer-name-head">customName</h5><br/>
    //             <p id="contact-name-detail">contactName</p>
    //             <p id="phone-detail">phone</p>
    //             <p id="address-detail">address</p>
    //             <p id="sale-rep-detail">salesRepEmplyeeNumber</p>
    //             <p id="credit-limit-detail">creditLimit</p>
  }

  render() {
    return (
      <div className="sfmono">
        <div id="wrapper">
          <Helmet>
            <title>Customer</title>
          </Helmet>
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar />
              <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800 sfmono">Customer management</h1>
                </div>
                <div className="d-flex justify-content-end mb-2" id="pagebutton"></div>
                <table
                  className="table text-center table-striped responsive-table "
                  id="dataTable"
                  width="100%"
                >
                  <thead>
                    <th>customerNumber</th>
                    <th>customerName</th>
                    <th>contactName</th>
                    <th>phone</th>
                    <th>EmployeeNumber</th>
                    <th>creditLimit</th>
                  </thead>
                  <tbody id="customer-data">

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <CustomerDetail_modal />
      </div>
    );
  }
}