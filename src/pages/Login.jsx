import React, { Component } from "react";
import api from "../api/api";
import "../style/css/login.css";
import $ from 'jquery'
import { Helmet } from 'react-helmet'

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      employeeNumber: 0,
      pswd: "",
      msg: ""
    };
  }

  usernameBind = event => {
    this.setState({ employeeNumber: event.target.value });
  };

  passwordBind = event => {
    this.setState({ pswd: event.target.value });
  };

  login = event => {
    event.preventDefault();
    const user = {
      username : this.state.employeeNumber,
      password : this.state.pswd
    };
    
    api.post("/api/auth",{user}).then(res=>{
      if (res.data.failed && res.data.worked) {
        $('#line').hide('fade')
        $('#myAlert').hide('fade')
        setTimeout(function () {
            $('#msg').html(
                '<strong>Error : </strong> Wrong Password')
        }, 500)
        $('#line').show('fade')
        $('#myAlert').show('fade')
        $('#btnClose').click(function () {
            $('#line').hide('fade')
            $('#myAlert').hide('fade')
        })
    } else if (res.data.failed && !res.data.worked) {
        $('#line').hide('fade')
        $('#myAlert').hide('fade')
        setTimeout(function () {
            $('#msg').html(
                '<strong>Error : </strong> no such employee data'
                )
        }, 500)
        $('#line').show('fade')
        $('#myAlert').show('fade')
        $('#btnClose').click(function () {
            $('#line').hide('fade')
            $('#myAlert').hide('fade')
        })
    } else {

        alert("you've logged in by employeenumber : " + this.state.employeeNumber)
        setTimeout("location.href = '/admin';", 100);
    }
    })
  };

  componentWillMount(){
    api.get('/api/authenCheck').then(res=>{
      if(res.data.login) setTimeout("location.href = '/admin';");
    })
}
  
  componentDidMount(){
    $(document).ready(()=>{
      $('#btnClose').click(()=>{
        $('#msg').html('')
        $('#line').hide('fade')
        $('#myAlert').hide('fade')
      })
    })
  }


  render() {
    return (
      <React-DocumentFragment>
         <Helmet>
          <title>Login</title>
        </Helmet>
        <a href="/addUser">
          <button class="btn btn-success">Add User</button>
        </a>
        <div class="main">
          <p class="h4 text-center mb-4 mt-5">Sign in</p>
          <form onSubmit={this.login}>
            <label for="defaultFormLoginEmailEx" class="grey-text">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="employeeNumber"
              class="form-control"
              placeholder="Enter Username"
              onChange={this.usernameBind}
              required
            />
            <br />
            <label for="defaultFormLoginPasswordEx" class="grey-text">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="pass"
              class="form-control"
              placeholder="Enter Password"
              onChange={this.passwordBind}
              required
            />
            <div class="text-center mt-4">
              <button type="submit" id="submit" class="btn btn-dark">Login</button>
            </div>
          </form>

          <div id="line" class="collapse">
            <hr />
          </div>

          <div
            class="w-100 alert alert-danger alert-dismissible collapse"
            id="myAlert"
            role="alert"
          >
            <div id="msg"></div>

            <button type="button" class="close" id="btnClose">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </React-DocumentFragment>
    );
  }
}
