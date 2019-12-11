import React, { Component } from "react";

import { Sidebar, Navbar } from "../../components/Menubar";
import { Helmet } from "react-helmet";
import api from "../../api/api";
import $ from "jquery";

export default class Employee extends Component {
  constructor(){
    super()
    this.state ={ 
      SuperviseRole : 0
    }
    this.loadEmployees = this.loadEmployees.bind(this)
  }

  componentDidMount() {
    api.get('/api/user').then(res=>{
      this.setState({SuperviseRole : res.data[0].Role})
      this.loadEmployees()
    })
    $(document).on('click', '#promote', this.Promote)
    $(document).on('click', '#demote', this.Demote)
   
  }

  loadEmployees(event){
    
    api.get("/api/admin/employee/employeeData").then(res => {
      var append = "";
      let count = 0;
      let superviseRole = this.state.SuperviseRole;
      
      $.each(res.data, function(index, each) {
        // console.log(this);
        
        if(superviseRole > each.Role){
          append += "<tr>";
          append += "<td>" + each.employeeNumber + "</td>";
          append += "<td>" + each.firstName + "</td>";
          append += "<td>" + each.lastName + "</td>";
          append += "<td>" + each.officeCode + "</td>";
          append += "<td>" + each.jobTitle + "</td>";
          append += "<td>";
          // append += '<form action = "#" method ="POST">'
          append +=
            '<button class="btn btn-primary quick-view modal-view detail-link m-1" id="promote" value="' +
            each.employeeNumber +
            '"> Promote </button>';
            append += `<button class="btn btn-danger" id="demote" value="${each.employeeNumber}"> Demote </button>`;
          // append += '</form>'
          append += "</td>";
          append += "</tr>";
          count++;
        }
       
      });
      if (count < 1) {
        $("#count").append('<p class="btn btn-danger">Found : 0 </p>');
      } else {
        $("#employeeData").append(append);
        $("#thead")
          .first()
          .show("fast");
        $("#employeeData").show("fast");
        $("#count").append(
          '<p class="btn btn-success">Found :' + count + "</p>"
        );
      }
    });
  }
  
  Promote(event){
    const employeeNumber = event.currentTarget.value
    api.post(`/api/admin/employee/promote/${employeeNumber}`).then(res=>{
      alert(res.data)
      setTimeout("location.href = '/admin/employee';", 100);
    })
  }

  Demote(event){
    const employeeNumber = event.currentTarget.value
    api.post(`/api/admin/employee/demote/${employeeNumber}`).then(res=>{
      alert(res.data)
      setTimeout("location.href = '/admin/employee';", 100);
    })
  }

  render() {
    return (
      <React-DocumentFragment>
        <div id="wrapper">
          <Helmet>
            <title>Employee</title>
          </Helmet>
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar />
              <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800 sfmono">Employee management</h1>
                </div>
                <div className="">
                <table className="table">
                  <thead className="thead-light collapse" id="thead">
                    <tr>
                      <th>Employeenumber</th>
                      <th>FirstName</th>
                      <th>LastName</th>
                      <th>officeCode</th>
                      <th>jobTitle</th>
                      <th>Manage</th>
                    </tr>
                  </thead>
                  <tbody id="employeeData" className="collapse"></tbody>
                </table>
                <div id="count"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React-DocumentFragment>
    );
  }
}