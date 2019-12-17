import React, { Component } from "react";
import '../style/css/home.css';
import '../style/css/contributor.css'
import { Helmet } from 'react-helmet'
import $ from 'jquery'

class Home extends Component {
  componentDidMount(){
    $(document).ready(function () {
      $('#link').click(function () {
          $('#quiz').show('slow')
          $('#required').show('slow')
      })
      $('#check').keyup(function () {
          setTimeout(() => {
              $('#c').show('fade')

              setTimeout(() => {
                  $('#per').html('0%')
                  $('#prg').html(
                      '<div className="progress-bar bg-danger" id="prg" role="progressbar" style="width: 0%" aria-valuenow="20"aria-valuemin="0" aria-valuemax="100"></div>'
                  )
              }, 1000)

              setTimeout(() => {
                  $('#per').html('20%')
                  $('#prg').html(
                      '<div className="progress-bar bg-danger" id="prg" role="progressbar" style="width: 20%" aria-valuenow="20"aria-valuemin="0" aria-valuemax="100"></div>'
                  )
              }, 1200)
              setTimeout(() => {
                  $('#per').html('50%')
                  $('#prg').html(
                      '<div className="progress-bar bg-danger" id="prg" role="progressbar" style="width: 50%" aria-valuenow="20"aria-valuemin="0" aria-valuemax="100"></div>'
                  )
              }, 1400)
              setTimeout(() => {
                  $('#per').html('100%')
                  $('#prg').html(
                      '<div className="progress-bar bg-success" id="prg" role="progressbar" style="width: 100%" aria-valuenow="20"aria-valuemin="0" aria-valuemax="100"></div>'
                  )
              }, 1600)
              setTimeout(() => {
                  $('#c').hide('fade')
              }, 2000)
              setTimeout(()=>{
                  if (document.getElementById('check').value == "HS10A" || document.getElementById('check').value == "hs10a") {
                  setTimeout("location.href = '/contributor';", 100);
              } else {
                  $('#alert').show()
                  setTimeout(() => {
                      $('#alert').hide("fade")
                  }, 2000);
              }
              },2500)
              
          }, 1000)
      })
  })
  }
  render() {
    return (
      <React-fragment>
        <Helmet>
          <title>ทรงพระเจริญ</title>
        </Helmet>
        <div className="index">
          <img src="/img/index.jpg" alt="Safty First" className="img-index" />
          <div className="center">
            <a href="/catalog">
                <button className="btn btn-dark button-index"> Enter Site </button>
            </a>
          </div>
          <div className="center ">
            <img className="logo mr-3 ml-3" src="/img/Gear.png" alt="" />
            &nbsp;&nbsp;&nbsp;
            <img className="logo mr-3 ml-3" src="/img/cpe.png" alt="" />
          </div>
          <p className="center index-text">
            - Department of Computer Engineering, Chiang Mai University -
          </p>
          {/* <div className="text-center"><a href="#" id="link">ผู้จัดทำเว็บไซต์</a></div>

        <div className="container">
            <div id="quiz" className="text-center collapse">
                <hr /><span>จงกรอกรหัสเรียกขานทางวิทยุสื่อสาร ประจำพระองค์(ใหม่) รัชกาลที่ 10</span><br /></div>
            <div id="required" className="text-center collapse"><input className="form-control w-25" type="text" id="check" style={{marginLeft: "auto", marginRight: "auto"}} /></div>
            <br />
            <div className="crad-body collapse" id="c" style={{width: "15%",  marginLeft: "auto", marginRight: "auto"}}>
                <h4 className="small font-weight-bold">Checking... <span className="float-right" id="per"></span></h4>
                <div className="progress mb-4" id="prg">
                </div>
            </div>
            <div className="alert alert-danger collapse" id="alert"
                style={{width: "125px",marginLeft:"auto" , marginRight:"auto"}}>
                Incorrect !
            </div>
        </div> */}
        </div>
        
        
      </React-fragment>
    );
  }
}

class Contributor extends Component{
  render(){
    return(
      
         <div className="container">
        <br />
        <a href="/"><button className="btn-lg btn btn-danger">BACK</button></a>
        <h1 className="display-4 text-center">Website  
           <span className="btn-dark"> Contributor</span></h1>
        <h2 className="display-4 text-center" style={{fontSize: "45px"}}>(บอร์ดบริหาร)</h2>
        <div className="row">
            <div className="col-md-4 col-lg-4" style={{marginLeft: "auto", marginRight: "auto"}}>
                <img className="img btn btn-warning" src="/Contribubutor/lift.png" alt=""
                    style={{padding:"3px",  border:"1px solid #ccc" }}/>
                <hr className="new2" />
                <div className="text-center">
                    <p className="name">พลตำรวจเอก ปริญญา สีตะวัน</p>
                    <p className="name">ผู้บัญชาการโปรเจค</p>
                </div>
            </div>
        </div>

        <div className="row my-3">
            <div className="col-md-3 col-lg-3">
                <img className="img btn btn-danger" src="/Contribubutor/boss.png" alt="" style={{padding:"3px",  border:"1px solid #ccc" }} />
                <div className="text-center">
                    <hr className="new2" />
                    <p className="name">พันตำรวจโท ปริญญากร เตจ๊ะเสาร์</p>
                    <p className="name">ผู้บัญชาการ CSS</p>
                </div>
            </div>
            <div className="col-md-3 col-lg-3">
                <img className="img btn btn-primary" src="/Contribubutor/job.png" alt="" style={{padding:"3px",  border:"1px solid #ccc" }} />
                <div className="text-center">
                    <hr className="new2" />
                    <p className="name">พันตำรวจโท ปฐมพร ปั๋นแก้ว</p>
                    <p className="name">ผู้บัญชาการ Git Repository and Fullstack code</p>
                </div>
            </div>
            <div className="col-md-3 col-lg-3">
                <img className="img btn btn-success" src="/Contribubutor/stamp.png" alt="" style={{padding:"3px",  border:"1px solid #ccc" }} />
                <div className="text-center">
                    <hr className="new2" />
                    <p className="name">ร้อยตำรวจเอก วัชรินทร์ ราชาเดช</p>
                    <p className="name">ผู้ช่วย FullStack code</p>
                </div>
            </div>
            <div className="col-md-3 col-lg-3">
                <img className="img" src="/Contribubutor/dummy.jpg" alt=""
                    style={{padding:"3px",  border:"1px solid #ccc" ,height:"288px"}} />
                <div className="text-center">
                    <hr className="new2" />
                    <p className="name">พลทหาร ประยุทร์ จันทร์อังคาร</p>
                    <p className="name">ยาม</p>
                </div>
            </div>
        </div>
    </div>
    );
  }
}


export {Home,Contributor};
