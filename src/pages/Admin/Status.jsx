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
        api.get('/api/admin/product/orderStatus').then(res=>{
          let j = 1
          var dom = "";
          res.data.forEach(each=>{
            console.log(each.orderDate);
            
            var statusArr = ["In Process","Shipped","Disputed","On Hold","Cancelled","Resolved"]
            dom += '<tr>'
            dom += `<td>${j}</td>`
            dom += `<td>${each.orderNumber}</td>`
            dom += `<td>${each.orderDate}</td>`
            dom += `<td>${each.requiredDate}</td>`
            dom += `<td>${each.	shippedDate}</td>`
            let i = 0;
            let targetIndex;
            statusArr.forEach(arr=>{
              if(each.status === arr){
                targetIndex = i
              }
              i++;
            })
            dom += `<td><select class="form-control w-75"><option>${statusArr[targetIndex]}</option>`
            statusArr.splice(targetIndex,1)

            
            statusArr.forEach(arr=>{
              dom += `<option>${arr}</option>`
            })         
            dom += '</select></td>'
            dom += `<td>${each.	customerNumber}</td>`
            dom += '</tr>'
            j++
          })
          $('#statusResult').html(dom);
          
          
          
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
                <h1>Order status</h1>
                <br />
                <table className="table table-striped rsponsive-table">
                  <thead className="thead-dark">
                    <tr>
                      <th>No.</th>
                      <th>orderNumber</th>
                      <th>orderDate</th>
                      <th>requiredDate</th>
                      <th>shippedDate</th>
                      <th>Status</th>
                      <th>CustomerNumber</th>
                    </tr>
                  </thead>
                  <tbody id="statusResult"></tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}