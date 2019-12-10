import React, { Component } from "react";
import { Sidebar, Navbar } from "../../components/Menubar";
import { CustomerDetail_modal } from '../../components/Modal'
import { Helmet } from "react-helmet";
import api from "../../api/api";
import $ from "jquery";

export default class Customer extends Component {
  constructor() {
    super()
    this.state = {
      code: '',
      customername: '',
      contactFirstname: '',
      contactLastName: '',
      phone: '',
      addressline1: '',
      addressline2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      credit: ''
    }
    this.handleCode = this.handleCode.bind(this);
    this.handleCusName = this.handleCusName.bind(this);
    this.handleConFName = this.handleConFName.bind(this);
    this.handleConLName = this.handleConLName.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleaddressline1 = this.handleaddressline1.bind(this);
    this.handleaddressline2 = this.handleaddressline2.bind(this);
    this.handlecity = this.handlecity.bind(this);
    this.handlestate = this.handlestate.bind(this);
    this.handlePostalCode = this.handlePostalCode.bind(this);
    this.handleCountry  = this.handleCountry.bind(this);
    this.handlecredit = this.handlecredit.bind(this);

  }

  handleCode(event){
    this.setState({ code: event.target.value});
  }
  handleCusName(event){
    this.setState({ customername: event.target.value});
  }
  handleConFName(event){
    this.setState({ contactFirstname: event.target.value});
  }
  handleConLName(event){
    this.setState({ contactLastname: event.target.value});
  }
  handlePhone(event){
    this.setState({ phone: event.target.value});
  }
  handleaddressline1(event){
    this.setState({ addressline1: event.target.value});
  }
  handleaddressline2(event){
    this.setState({ addressline2: event.target.value});
  }
  handlecity(event){
    this.setState({ city: event.target.value});
  }
  handlestate(event){
    this.setState({ state: event.target.value});
  }
  handlePostalCode(event){
    this.setState({ postalCode: event.target.value});
  }
  handleCountry(event){
    this.setState({ country: event.target.value});
  }
  handlecredit(event){
    this.setState({ credit: event.target.value});
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
      
      for (let i = 0; i < 15; i++) {
        $('#customer-data').append(
          `<tr>
          <td class="align-middle"><a id="${res.data[i].customerNumber}" data-toggle="modal" data-target="#customerDetailModal" title="Product detail"
        class="customer-detail-click quick-view modal-view detail-link" href="#">${res.data[i].customerNumber}<i class="fas fa-search fa-sm responsive-icon-search-status"></i></a></td>
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
    $(document).on('click','#submit',this.addCustomer)
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
            <td><a id="${res.data[i].customerNumber}" data-toggle="modal" data-target="#customerDetailModal" title="Product detail"
            class="customer-detail-click quick-view modal-view detail-link" href="#">${res.data[i].customerNumber}<i class="fas fa-search fa-sm responsive-icon-search-status"></i></a></td>
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

  showAddForm = event => {
    event.preventDefault();
    $("#addNew").toggle("fade");
  };

  addCustomer = event => {
    const CustomerQuery = {
      code: this.state.code,
      customername: this.state.customername,
      contactFirstname: this.state.contactFirstname,
      contactLastname: this.state.contactLastname,
      phone: this.state.phone,
      addressline1: this.state.addressline1,
      addressline2: this.state.addressline2,
      city: this.state.city,
      state: this.state.state,
      postalCode: this.state.postalCode,
      country: this.state.country,
      credit: this.state.credit

    
    }
    api.post('/api/admin/customer/addCustomer', { CustomerQuery })


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
                  {/* <div className="d-flex justify-content-end ">
                    <a class="flat-btn flat-blue align-middle" style={{margin:"2px 0",color:"#fff"}}
                      data-toggle="modal" data-target="" title="Add new Customer">
                      <i className="fas fa-plus"></i>
                    </a>
                  </div> */}    
                  <div className="d-flex justify-content-end mb-2" id="pagebutton"></div>
                </div>

                <form onSubmit={this.addDiscount}>
                <button
                  onClick={this.showAddForm}
                  className="flat-btn flat-add"
                >
                  Add New
                  </button>

                <div className="row collapse" id="addNew">
                  <br />
                <div className="container row">
                    <input
                      type="number"
                      name="code"
                      id="code"
                      placeholder="Enter Number"
                      size="15"
                      className="form-control w-25 col-sm-2 m-1"
                      onChange={this.handleCode}
                      required
                    />
                    <input
                      type="text"
                      name="customername"
                      id="customername"
                      placeholder="Customername"
                      className="form-control w-25 col-sm-2 m-1"
                      size="15"
                      min="1"
                      onChange={this.handleCusName}
                    />
                    <input
                      type="text"
                      name="contactFirstname"
                      id="contactFirstname"
                      placeholder="contactFirstname"
                      className="form-control w-25 col-sm-2 m-1"
                      size="15"
                      min="1"
                      onChange={this.handleConFName}
                    />
                    <input
                      type="text"
                      name="contactLastname"
                      id="contactLastname"
                      placeholder="contactLastname"
                      className="form-control w-25 col-sm-2 m-1"
                      size="15"
                      min="1"
                      onChange={this.handleConLName}
                    />
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      placeholder="Phone"
                      className="form-control w-25 col-sm-2 m-1"
                      size="15"
                      min="1"
                      onChange={this.handlePhone}
                    />
                    <input
                      type="text"
                      name="addressline1"
                      id="addressline1"
                      placeholder="addressline1"
                      className="form-control w-25 col-sm-2 m-1"
                      size="15"
                      min="1"
                      onChange={this.handleaddressline1}
                    />
                    <input
                      type="text"
                      name="addressline2"
                      id="addressline2"
                      placeholder="addressline2"
                      className="form-control w-25 col-sm-2 m-1"
                      size="15"
                      min="1"
                      onChange={this.handleaddressline2}
                    />
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City"
                      className="form-control w-25 col-sm-2 m-1"
                      size="15"
                      min="1"
                      onChange={this.handlecity}
                    />
                      <input
                      type="text"
                      name="state"
                      id="state"
                      placeholder="State"
                      className="form-control w-25 col-sm-2 m-1"
                      size="15"
                      min="1"
                      onChange={this.handlestate}
                    />
                      <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      placeholder="PostalCode"
                      className="form-control w-25 col-sm-2 m-1"
                      size="15"
                      min="1"
                      onChange={this.handlePostalCode}
                    />
                      <input
                      type="text"
                      name="country"
                      id="country"
                      placeholder="Couuntry"
                      className="form-control w-25 col-sm-2 m-1"
                      size="15"
                      min="1"
                      onChange={this.handleCountry}
                    />
                    <input
                      type="number"
                      name="credit"
                      id="credit"
                      placeholder="creditlimit"
                      className="form-control w-25 col-sm-2 m-1"
                      size="15"
                      min="1"
                      onChange={this.handlecredit}
                    />
                    
                    <button
                      id="submit"
                      className="btn btn-success m-1 col-sm-1"
                    >
                      ADD
                      </button>
                  </div>
                </div>
                </form>
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