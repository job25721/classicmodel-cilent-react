import React, { Component } from "react";
import { Helmet } from "react-helmet";

import $ from "jquery";

export default class FailedPage extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    $('#per').html('0%')
    $('#prg').html(
        '<div class="progress-bar bg-danger" id="prg" role="progressbar" style="width: 0%" aria-valuenow="20"aria-valuemin="0" aria-valuemax="100"></div>'
        )

    setTimeout(() => {
        $('#per').html('20%')
        $('#prg').html(
            '<div class="progress-bar bg-danger" id="prg" role="progressbar" style="width: 20%" aria-valuenow="20"aria-valuemin="0" aria-valuemax="100"></div>'
            )
    }, 500)
    setTimeout(() => {
        $('#per').html('60%')
        $('#prg').html(
            '<div class="progress-bar bg-warning" id="prg" role="progressbar" style="width: 60%" aria-valuenow="20"aria-valuemin="0" aria-valuemax="100"></div>'
            )
    }, 1000)
    setTimeout(() => {
        $('#per').html('80%')
        $('#prg').html(
            '<div class="progress-bar bg-warning" id="prg" role="progressbar" style="width: 80%" aria-valuenow="20"aria-valuemin="0" aria-valuemax="100"></div>'
            )
    }, 1500)
    setTimeout(() => {
        $('#per').html('100%')
        $('#prg').html(
            '<div class="progress-bar bg-success" id="prg" role="progressbar" style="width: 100%" aria-valuenow="20"aria-valuemin="0" aria-valuemax="100"></div>'
            )
    }, 2000)

    setTimeout("location.href = '/login';",2100);
  }

  render() {
    return (
      <React-DocumentFragment>
        <Helmet>
          <title>404 not found</title>
        </Helmet>
        <h1 className="text-center display-3">Please login first !!!</h1> <br />
        <hr />
        <div className="text-center display-4">Redirecting...</div>
        <div className="container">
          <div className="crad-body">
            <h4 className="small font-weight-bold">
              redirect to login...{" "}
              <span className="float-right" id="per"></span>
            </h4>
            <div className="progress mb-4" id="prg"></div>
          </div>
        </div>
      </React-DocumentFragment>
    );
  }
}
