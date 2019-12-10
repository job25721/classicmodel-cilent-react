import React, { Component } from "react";
import { Sidebar, Navbar } from "../../components/Menubar";
import { Helmet } from "react-helmet";
import api from "../../api/api";
import $ from "jquery";

export default class template extends Component {
    constructor(){
        super()
        this.state = {
            
        }
    }
    componentDidMount(){
        
    }

  render() {
    return (
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
                <h1 className="h3 mb-0 text-gray-800">Customer Mangement</h1>
              </div>
              <div className="">
                <table className="table">
                  <thead className="thead-light collapse" id="thead">
                    <tr>
                      <th>CustomerNumber</th>
                      <th>Customername</th>
                      <th>FirstName</th>
                      <th>LastName</th>
                      <th>Address</th>
                      <th>City</th>
                    </tr>
                  </thead>
                  <tbody id="" className="collapse"></tbody>
                </table>
                <div id="count"></div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}