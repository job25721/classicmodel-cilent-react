import React , {Component} from 'react'

class Employee_modal extends Component {
    render(){
        return(
            <div id="quickview-wrapper">
            <div
              className="modal fade"
              id="productModal"
              tabindex="-1"
              role="dialog"
            >
              <div className="modal-dialog modal__container" role="document">
                <div className="modal-content">
                  <div className="modal-header modal__header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="container">
                      <div className="row m-y-2">
                        <div className="col-lg-2 btn btn-primary">
                          <h2
                            className="text-left h3 mb-0"
                            style={{ color: "white" }}
                          >
                            Employee edit
                          </h2>
                        </div>
                        <div className="col-lg-8 push-lg-4 personal-info">
                          <form role="form">
                            <fieldset disabled>
                              <div className="form-group row">
                                <label
                                  for="disabledTextInput"
                                  className="col-lg-3 col-form-label form-control-label"
                                >
                                  EmployeeNumber
                                </label>
                                <div className="col-lg-9" id="empNum"></div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label">
                                  First name
                                </label>
                                <div className="col-lg-9" id="fname"></div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label">
                                  Last name
                                </label>
                                <div className="col-lg-9" id="lname"></div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label">
                                  Email
                                </label>
                                <div className="col-lg-9" id="email"></div>
                              </div>
                            </fieldset>
                            <div className="form-group row">
                              <label className="col-lg-3 col-form-label form-control-label">
                                JobTitle
                              </label>
                              <div className="col-lg-9">
                                <select className="form-control" name="" id="">
                                  <option className="option"></option>
                                </select>
                              </div>
                            </div>
                            <fieldset disabled="disabled">
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label">
                                  OfficeCode
                                </label>
                                <div className="col-lg-9" id="officeCode"></div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label">
                                  extention
                                </label>
                                <div className="col-lg-3" id="extension"></div>
                                <label className="col-lg-2 col-form-label form-control-label">
                                  reportsTo
                                </label>
                                <div className="col-lg-3" id="reportsTo"></div>
                              </div>
                            </fieldset>
                            <div className="form-group row">
                              <label className="col-lg-3 col-form-label form-control-label">
                                Password
                              </label>
                              <div className="col-lg-9">
                                <input className="form-control" type="password" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-lg-3 col-form-label form-control-label"></label>
                              <div className="col-lg-9">
                                <input
                                  type="button"
                                  className="btn btn-primary"
                                  value="Save Changes"
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="modal-product">
                      <div className="product-images">
                        <div className="main-image images"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}


class Cart_modal extends Component{
    render(){
        return(
           <div>
               This modal cart
            </div>
        );
    }
}

export {Employee_modal,Cart_modal}