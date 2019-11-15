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
                
            </div>
          </div>
        </div>
      </div>
    );
  }
}