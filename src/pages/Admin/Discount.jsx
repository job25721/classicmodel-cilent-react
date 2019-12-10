import React, { Component } from "react";

import { Sidebar, Navbar } from "../../components/Menubar";

import { Helmet } from "react-helmet";
import api from "../../api/api";
import $ from "jquery";

export default class Discount extends Component {
  constructor() {
    super();
    this.state = {
      Code: '',
      Value: '',
      Used: '',
      Date: ''
    }
    this.handleCode = this.handleCode.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.handleUsed = this.handleUsed.bind(this);
    this.handleDate = this.handleDate.bind(this);

  }

  handleCode(event) {
    this.setState({ Code: event.target.value });
  }

  handleValue(event) {
    this.setState({ Value: event.target.value });
  }

  handleUsed(event) {
    this.setState({ Used: event.target.value });
  }

  handleDate(event) {
    this.setState({ Date: event.target.value });
  }

  componentDidMount() {
    api.get("/api/admin/discount/getDiscount").then(res => {
      var  id;
      id = 1;
      $('#showDiscount').empty()
      $.each(res.data, function (index, obj) {
        $('#showDiscount').append(
          `<tr>
            <td>${id}</td>
            <td>${obj.Code}</td>
            <td>${obj.Discount}</td>
            <td>${obj.TotalAmount}</td>
            <td>${obj.Expire}</td>
            <td>  
              <form id='del' action=''>
              <button name='discountID' class='flat-btn flat-trash' Value='${obj.discountNo}'>
              <i class='fas fa-trash'/></button>  
              </form>
            </td>
            </tr>
          `
        )
        id = id + 1;
      });
      $(document).on('submit', '#del', this.deleteDiscount)
    });



  }

  deleteDiscount(event) {
    var code = $(event.target).children().val()
    api.delete('/api/admin/discount/deleteDiscount/' + code)
  }


  showAddForm = event => {
    event.preventDefault();
    $("#addNew").toggle("fade");
  };

  addDiscount = event => {
    const discountQuery = {
      code: this.state.Code,
      discount: this.state.Value,
      total: this.state.Used,
      exp: this.state.Date
    }
    api.post('/api/admin/discount/addDiscount', { discountQuery })


  }

  render() {
    return (
      <div id="wrapper">
        <Helmet>
          <title>Discount</title>
        </Helmet>
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800 sfmono">Discount</h1>
              </div>
              <form onSubmit={this.addDiscount}>
                <button
                  onClick={this.showAddForm}
                  className="flat-btn flat-add"
                >
                  New
                  </button>

                <div className="row collapse" id="addNew">
                  <br />
                  <div className="container row">
                    <input
                      type="text"
                      name="code"
                      id="code"
                      placeholder="Enter Code"
                      size="15"
                      className="form-control w-25 col-sm-2 m-1"
                      onChange={this.handleCode}
                      required
                    />
                    <input
                      type="number"
                      name="discount"
                      id="discount"
                      placeholder="Discount value"
                      className="form-control w-25 col-sm-2 m-1"
                      size="15"
                      min="1"
                      onChange={this.handleValue}
                    />
                    <input
                      type="number"
                      name="total"
                      id="total"
                      placeholder="Number of times"
                      className="form-control w-25 col-sm-2 m-1"
                      size="15"
                      min="1"
                      onChange={this.handleUsed}
                    />
                    <input
                      type="date"
                      name="exp"
                      id="exp"
                      placeholder="yyyy/mm/dd"
                      className="form-control w-25 col-sm-2 m-1"
                      onChange={this.handleDate}
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
              <br/>
              <table className="table table-border table-striped">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Code</th>
                    <th>Discount</th>
                    <th>Total Amount</th>
                    <th>Expire</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody id="showDiscount">

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
