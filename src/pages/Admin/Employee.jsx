import React, { Component } from "react";

import { Sidebar, Navbar } from "../../components/Menubar";
import { Employee_modal } from "../../components/Modal";
import { Helmet } from "react-helmet";
import api from "../../api/api";
import $ from "jquery";

export default class Employee extends Component {
  componentDidMount() {
    api.get("/api/admin/employee/employeeData").then(res => {
      var append = "";
      let count = 0;
      
      
      $.each(res.data, function(index, each) {
        append += "<tr>";
        append += "<td>" + each.employeeNumber + "</td>";
        append += "<td>" + each.firstName + "</td>";
        append += "<td>" + each.lastName + "</td>";
        append += "<td>" + each.officeCode + "</td>";
        append += "<td>" + each.jobTitle + "</td>";
        append += "<td>";
        // append += '<form action = "#" method ="POST">'
        append +=
          '<button type="submit" class="btn btn-primary quick-view modal-view detail-link" data-toggle="modal" data-target="#productModal" id="edit" name="emp" value="' +
          each.employeeNumber +
          '"> Edit </button>';
        // append += '</form>'
        append += "</td>";
        append += "</tr>";
        count++;
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
    $(document).on("click", "#edit", function() {
      var employeeNumber = this.value;
      console.log(this.value);
      api.get(`/api/admin/employee/edit/${employeeNumber}`).then(res => {
        var html = "";
        var query = res.data[0];
        html = `<input class="form-control" id="disabledTextInput" type="text"value="${query.employeeNumber}"/>`;
        $("#empNum").html(html);
        html = `<input class="form-control" type="text" value="${query.firstName}"/>`;
        $("#fname").html(html);
        html = `<input class="form-control" type="text" value="${query.lastName}"/>`;
        $("#lname").html(html);
        html = `<input class="form-control" type="text" value="${query.email}"/>`;
        $("#email").html(html);
        html = `<input class="form-control" type="text" value="${query.officeCode}"/>`;
        $("#officeCode").html(html);
        html = `<input class="form-control" type="text" value="${query.extension}"/>`;
        $("#extension").html(html);
        html = `<input class="form-control" type="text" value="${query.reportsToด}"/>`;
        $("#reportsTo").html(html);
      });
    });
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
        <Employee_modal />
      </React-DocumentFragment>
    );
  }
}