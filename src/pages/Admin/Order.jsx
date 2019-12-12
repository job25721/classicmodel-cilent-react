import React, { Component } from "react";
import { Sidebar, InstockNav } from "../../components/Menubar";
import { Helmet } from "react-helmet";

import api from '../../api/api';
import $ from "jquery";
import { Cart_modal, ProductDetail_modal, ProductAdd_modal, ProductEdit_modal, Payment_modal } from "../../components/Modal";


class Instock extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.addCartItem = this.addCartItem.bind(this);
    this.removeCart = this.removeCart.bind(this);
  }

  componentDidMount() {
    api.get('/api/admin/product/getCartItem').then(res => {
      $('#piece-product').html(res.data.total)
    })
    api.get('/api/admin/product/count').then(res => {
      console.log(res.data[0].count);
      if (res.data[0].count > 15) {
        var i, x
        var n = parseInt(res.data[0].count / 15)
        res.data[0].count % 15 == 0 ? x = n - 1 : x = n
        var pagebutton = ""
        for (i = 0; i <= x; i++) {
          if (i == 0) pagebutton += `<button id="currentpage" class="flat-btn-gray mx-1 set-active fbg-active " value="${i}"><span>${i + 1}</span></button>`
          else pagebutton += `<button id="currentpage" class="flat-btn-gray mx-1 set-active" value="${i}"><span>${i + 1}</span></button>`
        }
        $('#pagebutton').html(pagebutton)
        $(document).on('click', '#currentpage', this.changepage)
      }
    })
    api.get('/api/admin/employee/saleTilteCheck').then(res=>{
      if(res.data.permission === true){
        api.get(`/api/admin/product/changepage/0`).then(res => {
          var dom = ""
          var button = ''
          for (let i = 0; i < res.data.length; i++) {
          button = ''
          button += '<td class="align-middle"><input type="text" class="product-quantity input-add-cart align-middle" name="quantity" value="1" size="2" style="margin:2px 0;">'
          button += `<button id="addCart" class="flat-btn flat-blue"><i class="fas fa-shopping-cart fa-sm"></i></button></td>`;
          button += `<td class="align-middle"><button id="${res.data[i].productCode}" class="flat-btn flat-edit align-middle edit-product" data-toggle="modal" data-target="#editProduct" title="Add new Product"><i class="fas fa-edit"></i></button></td>`
          button += `<td class="align-middle"><button id="${res.data[i].productCode}" class="flat-btn flat-trash deleteproduct"><i class="fas fa-trash"/></button></td>`;
          dom += `<tr>`;
          dom += `<td class="align-middle"><a id="${res.data[i].productCode}" data-toggle="modal"
            data-target="#productModal" title="Product detail"
            class="product-click quick-view modal-view detail-link" href="#"><img class="responsive-img" src="/img/${res.data[i].imgSrc}"> 
            <i class="fas fa-search fa-sm responsive-icon-search"></i></a></td>`;
          dom += `<td class="align-middle responsive-table-name">${res.data[i].productName}</td>`;
          dom += `<td class="align-middle">${res.data[i].productScale}</td>`;
          dom += `<td class="align-middle responsive-table-vendor">${res.data[i].productVendor}</td>`;
          dom += `<td class="align-middle">${res.data[i].quantityInStock}</td>`;
          dom += `<td class="align-middle">${res.data[i].buyPrice}</td>`;
          dom += button;
          dom += `</tr>`;
        }
        $("#instockData").html(dom);
        
        
      })
      }else{
        alert("You don't have permission")
        setTimeout('location.href="/admin"',100)
      }
    })
   


    $(document).on("click", ".product-click", this.productDetail);
    $(document).on("click", "#addCart", this.addCartItem);
    $(document).on("click", ".deleteproduct", this.deleteProduct);
    $(document).on("click", "#cartIcon", this.loadCartItem);
    $(document).on("click", ".removeCart", this.removeCart);
    $(document).on('click', '.edit-product', this.editProduct);
    $(document).on('click', '#buyProducts', this.buyProduct);
    $(document).on('click', '#saveAdd', function () {
      $('#closemodal').click()
    })
    $(document).on('click', '#addproduct', this.addproduct)
    $(document).on('click', '#saveEditproduct', this.saveEditproduct)
    $(document).on('change', '#useddiscount', this.usediscount)
    $(document).on('click', '#accept-payment', this.acceptpayment)

  }


  productDetail(event) {
    var productCode = this.id;
    api.get(`/api/admin/product/fetchInstockitem/${productCode}`).then(res => {
      var html = ""
      var query = res.data[0];
      $("#pop-name").html(query.productName);
      $("#pop-code").html(query.productCode);
      $("#pop-desc").html(query.productDescription);
      $("#pop-price").html(query.buyPrice);
      $("#pop-scale").html(query.productScale);
      $("#pop-vendor").html(query.productVendor);
      $("#pop-quantity").html(query.quantityInStock);
      $("#pop-img").attr('src', '/img/' + query.imgSrc)
      $("#pop-productline").html(query.productLine);
      $("#pop-msrp").html(query.MSRP);
    });
  }

  changepage(event) {
    var current = event.currentTarget
    var pr = document.getElementsByClassName('fbg-active')
    pr[0].className = pr[0].className.replace(' fbg-active', '')
    current.className += ' fbg-active'
    var init = current.value * 15
    $("instockData").html("")
    api.get(`/api/admin/product/changepage/${init}`).then(res => {
      var dom = ""
      var button = ''
      for (let i = 0; i < res.data.length; i++) {
        button = ''
        button += '<td class="align-middle"><input type="text" class="product-quantity input-add-cart align-middle" name="quantity" value="1" size="2" style="margin:2px 0;">'
        button += `<button id="addCart" class="flat-btn flat-blue"><i class="fas fa-shopping-cart fa-sm"></i></button></td>`;
        button += `<td class="align-middle"><button id="${res.data[i].productCode}" class="flat-btn flat-edit align-middle" data-toggle="modal" data-target="#editProduct" title="Add new Product"><i class="fas fa-edit"></i></button></td>`
        button += `<td class="align-middle"><button id="${res.data[i].productCode}" class="flat-btn flat-trash deleteproduct"><i class="fas fa-trash"/></button></td>`;
        dom += `<tr>`;
        dom += `<td class="align-middle"><a id="${res.data[i].productCode}" data-toggle="modal"
          data-target="#productModal" title="Product detail"
          class="product-click quick-view modal-view detail-link" href="#"><img class="responsive-img" src="/img/${res.data[i].imgSrc}"> 
          <i class="fas fa-search fa-sm responsive-icon-search"></i></a></td>`;
        dom += `<td class="align-middle responsive-table-name">${res.data[i].productName}</td>`;
        dom += `<td class="align-middle">${res.data[i].productScale}</td>`;
        dom += `<td class="align-middle responsive-table-vendor">${res.data[i].productVendor}</td>`;
        dom += `<td class="align-middle">${res.data[i].quantityInStock}</td>`;
        dom += `<td class="align-middle">${res.data[i].buyPrice}</td>`;
        dom += button;
        dom += `</tr>`;
      }
      $("#instockData").html(dom);;
    })
  }

  deleteProduct(event) {
    var pcode = event.currentTarget.id;
    console.log(pcode)
    api.get(`/api/admin/order/delete/${pcode}`).then(res => {
    })
    window.location.reload(true);
  }

  loadCartItem(event) {
    var dom = ''
    var details = ''
    let TotalPrice = 0;
    var option = ''

    api.get(`/api/admin/discount/getDiscount`).then(res => {
      res.data.forEach(e => {
        option += `<option value="${e.Code}">${e.Code}</option>`
      })
      api.get('/api/admin/product/getCartItem').then(res => {
        var length = res.data.cartItem.length;
        if (length <= 0) {

        } else {
          for (let i = 0; i < length; i++) {
            dom += `<tr>`
            dom += `<td><img style="width:50px;height:50px" src='/img/${res.data.cartItem[i].image}' /></td>'>`
            dom += `<td>${res.data.cartItem[i].Name}</td>`
            dom += `<td>${res.data.cartItem[i].Quantity}</td>`
            dom += `<td>${res.data.cartItem[i].Price}</td>`
            dom += `<td>${res.data.cartItem[i].Total}</td>`
            dom += `<td><button id="${res.data.cartItem[i].code}" class="btn btn-link removeCart" style="color:red">Remove</button></td>`
            dom += '</tr>'
            TotalPrice += res.data.cartItem[i].Total
          }

        }

        details += `<p>Total Price : <span id="total-price">$${TotalPrice.toFixed(2)}</span><span id="discountvalue" style="color:red"></span></p>
        <p>Total point : <span id="total-point-input">${Math.floor(TotalPrice / 100) * 3}</span></p>`

        details += `<p>Total Quantity : ${res.data.total}</p>`
        details += '<span>Available Discount</span>'
        details += `<select class="form-control w-25" id="useddiscount"><option>Select Discount</option>`
        details += option
        details += `</select><hr /><button class="btn btn-outline-success" id="buyProducts">CheckOut</button>`
        details += `</form>`
        $('#cart').html(dom)
        $('#details').html(details)
      })
    })

  }

  removeCart(event) {
    // alert('clicked')

    $(event.currentTarget.parentElement.parentElement).remove()
    var code = event.currentTarget.id;
    api.delete(`/api/admin/product/removeCartItem/${code}`).then(res => {
      $('#piece-product').html(res.data.update)
      this.loadCartItem()
    })



  }

  editProduct(e) {
    var productCode = e.currentTarget.id;

    api.get(`/api/admin/product/fetchInstockitem/${productCode}`).then(res => {
      var html = ""
      var query = res.data[0];
      $("#product-name-edit").val(query.productName);
      $("#product-code-edit").val(query.productCode);
      $("#product-desc-edit").val(query.productDescription);
      $("#product-buyprice-edit").val(query.buyPrice);
      $("#product-scale-edit").val(query.productScale);
      $("#product-vendor-edit").val(query.productVendor);
      $("#product-quan-edit").val(query.quantityInStock);
      $("#product-code-edit").attr('src', '/img/' + query.imgSrc)
      $("#product-line-edit").val(query.productLine);
      $("#product-msrp-edit").val(query.MSRP);
    });
  }

  addCartItem(event) {
    event.preventDefault();
    api.post('/api/admin/product/addCart', {
      quantity: event.currentTarget.parentElement.children[0].value,
      code: event.currentTarget.parentElement.parentElement.children[0].children[0].id
    }).then(res => {
      $('#piece-product').html(res.data)

    })

  }

  buyProduct(event) {
    api.get('/api/admin/product/getCartItem').then(res => {
      var price = $('#total-price')[0].innerHTML.split('$')[1]
      var discount = $('#discountvalue')[0].innerHTML.split('-')[1]
      var point = 0
      var check = true
      var cart = res.data.cartItem
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].Quantity > cart[i].thisquan) {
          check = false
          alert(`
          ${cart[i].Name} out of stock!!! 
          please decrease ${cart[i].Name} quantity`);
          i = cart.length
        } else if (cart[i].Quantity < 1) {
          check = false
          alert(`Quantity can not be negative`);
          i = cart.length
        }
      }
      if (check) {
        if (res.data.total != 0) {
          $('#discount-value').html(discount)
          $('#discount-code').html()
          $("#closemodal").click();
          $("#paymentModal").modal('show');

          if (discount != undefined) {
            price = price - discount
          }
          if (price < 0) price = 0
          point = Math.floor(price / 100) * 3
          $("#total-point").html(point)
          $("#payment-amount").html(price);
          api.get(`/api/admin/order/getorderNo`).then(res => {
            $('#order-no-payment').html(res.data[0].orderNo + 1)
          })

        }
      }
    })
  }

  acceptpayment(event) {
    var amount = $('#payment-amount').text()
    var cno = $('#custumer-no-input').val()
    var ceque = $('#ceque-input').val()
    var reqdate = $('#require-date').val()
    var orderno = $('#order-no-payment').text()
    var point = $('#total-point-input').text()
    var dcode = $('#discount-code').text()
    console.log("dcode " + dcode);
    console.log(reqdate.length);
    if (reqdate.length == 0) reqdate = "null"
    if (cno.length != 0 && ceque.length != 0) {
      if (dcode != "You do not have Discount") {
        api.get(`/api/admin/discount/update/${dcode}`)
      }
      console.log(`/api/admin/order/getpoint/${cno}/${point}`);
      api.get(`/api/admin/order/payment/${amount}/${cno}/${ceque}`)
      api.get(`/api/admin/order/getpoint/${cno}/${point}`)
      api.get(`/api/admin/order/checkout/${reqdate}/${cno}/${orderno}`).then(response => {
        api.get('/api/admin/product/getCartItem').then(res => {
          let i = 1
          res.data.cartItem.forEach(cart => {
            console.log(`/api/admin/order/detail/insert/${orderno}/${cart.code}/${cart.Quantity}/${cart.Price}/${i}`);
            api.get(`/api/admin/order/detail/insert/${orderno}/${cart.code}/${cart.Quantity}/${cart.Price}/${i}`)
            i += 1
          })
          api.delete('/api/destroyInstockCart').then(res => {
            alert(res.data)
            setTimeout('location.href = "/admin/status"', 100)
          })
        })
      })

    }
  }


  usediscount(event) {

    api.get('api/admin/discount/getDiscount').then(res => {
      var x = $('#useddiscount option:selected').text();
      res.data.forEach(e => {
        if (x == e.Code) {
          if (e.TotalAmount < 1) {
            alert("This code is out of stock")
          } else {
            $('#discountvalue').html(`-${e.Discount}`)
            $('#discount-code').html(`${e.Code}`)
          }

        } else if (x == "Select Discount") {
          $('#discountvalue').empty();
        }
      })
    })
  }

  addproduct(event) {
    var pcode = $('#product-code-add').val();
    var pname = $('#product-name-add').val();
    var pdesc = $('#product-desc-add').val()
    var pline = $('#product-line-add').val()
    var pscale = $('#product-scale-add').val()
    var pvendor = $('#product-vendor-add').val()
    var pquan = $('#product-quan-add').val()
    var pbuyprice = $('#product-buyprice-add').val()
    var pmsrp = $('#product-msrp-add').val()

    api.get(`api/admin/order/addproduct/${pcode}/${pname}/${pdesc}/${pline}/${pscale}/${pvendor}/${pquan}/${pbuyprice}/${pmsrp}`)
    window.location.reload(true);
  }

  saveEditproduct(event) {
    var pcode = $('#product-code-edit').val();
    var pname = $('#product-name-edit').val();
    var pdesc = $('#product-desc-edit').val()
    var pline = $('#product-line-edit').val()
    var pscale = $('#product-scale-edit').val()
    var pvendor = $('#product-vendor-edit').val()
    var pquan = $('#product-quan-edit').val()
    var pbuyprice = $('#product-buyprice-edit').val()
    var pmsrp = $('#product-msrp-edit').val()
    api.get(`api/admin/order/update/${pcode}/${pname}/${pdesc}/${pline}/${pscale}/${pvendor}/${pquan}/${pbuyprice}/${pmsrp}`)
    window.location.reload(true);
  }

  render() {
    return (
      <div className="sfmono">
        <div id="wrapper">
          <Helmet>
            <title>Instock</title>
          </Helmet>
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <InstockNav />
              <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800 sfmono">In stock product</h1>
                  <div className="d-flex justify-content-end ">
                    <a class="flat-btn flat-blue align-middle" style={{ margin: "2px 0", color: "#fff" }}
                      data-toggle="modal" data-target="#addProduct" title="Add new Product">
                      <i className="fas fa-plus"></i>
                    </a>


                  </div>
                </div>
                <div style={{ fontSize: "40px" }} id="demo"></div>
                <div className="d-flex justify-content-end mb-2" id="pagebutton"></div>
                <table
                  className="table text-center table-striped responsive-table "
                  id="dataTable"
                  width="100%"
                >
                  <thead>
                    <tr>
                      <th>ProductImage</th>
                      <th className="responsive-table-name">ProductName</th>
                      <th>ProductScale</th>
                      <th className="responsive-table-vendor">ProductVendor</th>
                      <th>QuantityInStock</th>
                      <th>BuyPrice</th>
                      <th></th><th></th><th></th>
                    </tr>
                  </thead>
                  <tbody className="w-100" id="instockData"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div >
        <Cart_modal />
        <ProductDetail_modal />
        <ProductAdd_modal />
        <ProductEdit_modal />
        <Payment_modal />
      </div>
    );
  }
}

class Pre_order extends Component {
  constructor() {
    super();
    this.state = {};
    this.addCartItem = this.addCartItem.bind(this);
    this.removeCart = this.removeCart.bind(this)
  }
  componentDidMount() {
    api.get('/api/admin/preorder/getCartItem').then(res => {
      $('#piece-product').html(res.data.total)
    })
    api.get('/api/admin/preorder/count').then(res => {
      console.log(res.data[0].count);

      if (res.data[0].count > 15) {
        var i, x
        var n = parseInt(res.data[0].count / 15)
        res.data[0].count % 15 == 0 ? x = n - 1 : x = n
        var pagebutton = ""
        for (i = 0; i <= x; i++) {
          if (i == 0) pagebutton += `<button id="currentpage" class="flat-btn-gray mx-1 set-active fbg-active " value="${i}"><span>${i + 1}</span></button>`
          else pagebutton += `<button id="currentpage" class="flat-btn-gray mx-1 set-active" value="${i}"><span>${i + 1}</span></button>`
        }
        $('#pagebutton').html(pagebutton)
        $(document).on('click', '#currentpage', this.changepage)
      }
    })
    api.get('/api/admin/employee/saleTilteCheck').then(res=>{
      if(res.data.permission === true){
        api.get(`/api/admin/preorder/changepage/0`).then(res => {
      
      
          var dom = ""
          var button = ''
          for (let i = 0; i < res.data.length; i++) {
          button = ''
          button += '<td class="align-middle"><input type="text" class="product-quantity input-add-cart align-middle" name="quantity" value="1" size="2" style="margin:2px 0;">'
          button += `<button id="addCart" class="flat-btn flat-blue"><i class="fas fa-shopping-cart fa-sm"></i></button></td>`;
          button += `<td class="align-middle"><button id="${res.data[i].productCode}" class="flat-btn flat-edit align-middle edit-product" data-toggle="modal" data-target="#editProduct" title="Add new Product"><i class="fas fa-edit"></i></button></td>`
          button += `<td class="align-middle"><button id="${res.data[i].productCode}" class="flat-btn flat-trash deleteproduct"><i class="fas fa-trash"/></button></td>`;
          dom += `<tr>`;
          dom += `<td class="align-middle"><a id="${res.data[i].productCode}" data-toggle="modal"
            data-target="#productModal" title="Product detail"
            class="product-click quick-view modal-view detail-link" href="#"><img class="responsive-img" src="/img/${res.data[i].imgSrc}"> 
            <i class="fas fa-search fa-sm responsive-icon-search"></i></a></td>`;
          dom += `<td class="align-middle responsive-table-name">${res.data[i].productName}</td>`;
          dom += `<td class="align-middle">${res.data[i].productScale}</td>`;
          dom += `<td class="align-middle responsive-table-vendor">${res.data[i].productVendor}</td>`;
          dom += `<td class="align-middle">${res.data[i].quantityInStock}</td>`;
          dom += `<td class="align-middle">${res.data[i].buyPrice}</td>`;
          dom += button;
          dom += `</tr>`;
        }
        $("#instockData").html(dom);
        
        
      })
      }else{
           
        alert("You don't have permission")
        setTimeout('location.href="/admin"',100)
      }
    })
   


    $(document).on("click", ".product-click", this.productDetail);
    $(document).on("click", "#addCart", this.addCartItem);
    $(document).on("click", ".deleteproduct", this.deleteProduct);
    $(document).on("click", "#cartIcon", this.loadCartItem);
    $(document).on("click", ".removeCart", this.removeCart);
    $(document).on('click', '.edit-product', this.editProduct);
    $(document).on('click', '#buyProducts', this.buyProduct);
    $(document).on('click', '#saveAdd', function () {
      $('#closemodal').click()
    })
    $(document).on('click', '#addproduct', this.addproduct)
    $(document).on('click', '#saveEditproduct', this.saveEditproduct)
    $(document).on('change', '#useddiscount', this.usediscount)
    $(document).on('click', '#accept-payment', this.acceptpayment)

  }

  productDetail(event) {
    var productCode = this.id;
    api.get(`/api/admin/product/fetchInstockitem/${productCode}`).then(res => {
      var html = ""
      var query = res.data[0];
      $("#pop-name").html(query.productName);
      $("#pop-code").html(query.productCode);
      $("#pop-desc").html(query.productDescription);
      $("#pop-price").html(query.buyPrice);
      $("#pop-scale").html(query.productScale);
      $("#pop-vendor").html(query.productVendor);
      $("#pop-quantity").html(query.quantityInStock);
      $("#pop-img").attr('src', '/img/' + query.imgSrc)
      $("#pop-productline").html(query.productLine);
      $("#pop-msrp").html(query.MSRP);
    });
  }

  changepage(event) {
    var current = event.currentTarget
    var pr = document.getElementsByClassName('fbg-active')
    pr[0].className = pr[0].className.replace(' fbg-active', '')
    current.className += ' fbg-active'
    var init = current.value * 15
    $("instockData").html("")
    api.get(`/api/admin/preorder/changepage/${init}`).then(res => {
      var dom = ""
      var button = ''
      for (let i = 0; i < res.data.length; i++) {
        button = ''
        button += '<td class="align-middle"><input type="text" class="product-quantity input-add-cart align-middle" name="quantity" value="1" size="2" style="margin:2px 0;">'
        button += `<button id="addCart" class="flat-btn flat-blue"><i class="fas fa-shopping-cart fa-sm"></i></button></td>`;
        button += `<td class="align-middle"><button id="${res.data[i].productCode}" class="flat-btn flat-edit align-middle" data-toggle="modal" data-target="#editProduct" title="Add new Product"><i class="fas fa-edit"></i></button></td>`
        button += `<td class="align-middle"><button id="${res.data[i].productCode}" class="flat-btn flat-trash deleteproduct"><i class="fas fa-trash"/></button></td>`;
        dom += `<tr>`;
        dom += `<td class="align-middle"><a id="${res.data[i].productCode}" data-toggle="modal"
          data-target="#productModal" title="Product detail"
          class="product-click quick-view modal-view detail-link" href="#"><img class="responsive-img" src="/img/${res.data[i].imgSrc}"> 
          <i class="fas fa-search fa-sm responsive-icon-search"></i></a></td>`;
        dom += `<td class="align-middle responsive-table-name">${res.data[i].productName}</td>`;
        dom += `<td class="align-middle">${res.data[i].productScale}</td>`;
        dom += `<td class="align-middle responsive-table-vendor">${res.data[i].productVendor}</td>`;
        dom += `<td class="align-middle">${res.data[i].quantityInStock}</td>`;
        dom += `<td class="align-middle">${res.data[i].buyPrice}</td>`;
        dom += button;
        dom += `</tr>`;
      }
      $("#instockData").html(dom);;
    })
  }

  deleteProduct(event) {
    var pcode = event.currentTarget.id;
    console.log(pcode)
    api.get(`/api/admin/order/delete/${pcode}`).then(res => {
    })
    window.location.reload(true);
  }

  loadCartItem(event) {
    var dom = ''
    var details = ''
    let TotalPrice = 0;
    var option = ''

    api.get(`/api/admin/discount/getDiscount`).then(res => {
      res.data.forEach(e => {
        option += `<option value="${e.Code}">${e.Code}</option>`
      })
      api.get('/api/admin/preorder/getCartItem').then(res => {
        var length = res.data.cartItem.length;
        if (length <= 0) {

        } else {
          for (let i = 0; i < length; i++) {
            dom += `<tr>`
            dom += `<td><img style="width:50px;height:50px" src='/img/${res.data.cartItem[i].image}' /></td>'>`
            dom += `<td>${res.data.cartItem[i].Name}</td>`
            dom += `<td>${res.data.cartItem[i].Quantity}</td>`
            dom += `<td>${res.data.cartItem[i].Price}</td>`
            dom += `<td>${res.data.cartItem[i].Total}</td>`
            dom += `<td><button id="${res.data.cartItem[i].code}" class="btn btn-link removeCart" style="color:red">Remove</button></td>`
            dom += '</tr>'
            TotalPrice += (res.data.cartItem[i].Total) / 2
          }

        }
        details += `<p>Total Price : <span id="total-price">$${TotalPrice.toFixed(2)}</span><span id="discountvalue" style="color:red"></span></p>
        <p>Total point : <span id="total-point-input">${Math.floor(TotalPrice / 100) * 3}</span></p>`

        details += `<p>Total Quantity : ${res.data.total}</p>`
        details += '<span>Available Discount</span>'
        details += `<select class="form-control w-25" id="useddiscount"><option>Select Discount</option>`
        details += option
        details += `</select><hr /><button class="btn btn-outline-success" id="buyProducts">CheckOut</button>`
        details += `</form>`
        $('#cart').html(dom)
        $('#details').html(details)
      })
    })

  }

  removeCart(event) {
    // alert('clicked')
    $(event.currentTarget.parentElement.parentElement).remove()
    var code = event.currentTarget.id;
    api.delete(`/api/admin/preorder/removeCartItem/${code}`).then(res => {
      $('#piece-product').html(res.data.update)
    })
    this.loadCartItem()
  }

  editProduct(e) {
    var productCode = e.currentTarget.id;

    api.get(`/api/admin/product/fetchInstockitem/${productCode}`).then(res => {
      var html = ""
      var query = res.data[0];
      $("#product-name-edit").val(query.productName);
      $("#product-code-edit").val(query.productCode);
      $("#product-desc-edit").val(query.productDescription);
      $("#product-buyprice-edit").val(query.buyPrice);
      $("#product-scale-edit").val(query.productScale);
      $("#product-vendor-edit").val(query.productVendor);
      $("#product-quan-edit").val(query.quantityInStock);
      $("#product-code-edit").attr('src', '/img/' + query.imgSrc)
      $("#product-line-edit").val(query.productLine);
      $("#product-msrp-edit").val(query.MSRP);
    });
  }

  addCartItem(event) {
    event.preventDefault();
    api.post('/api/admin/preorder/addCart', {
      quantity: event.currentTarget.parentElement.children[0].value,
      code: event.currentTarget.parentElement.parentElement.children[0].children[0].id
    }).then(res => {
      $('#piece-product').html(res.data)
    })
  }

  buyProduct(event) {
    api.get('/api/admin/preorder/getCartItem').then(res => {
      var price = $('#total-price')[0].innerHTML.split('$')[1]
      var discount = $('#discountvalue')[0].innerHTML.split('-')[1]
      if (res.data.total != 0) {
        $("#closemodal").click();
        $("#paymentModal").modal('show');
        $("#total-point").html($('#total-point-input').text())
        if (discount == undefined) discount = 0
        $("#payment-amount").html(price - discount);
        api.get(`/api/admin/preorderOrder/getorderNo`).then(res => {
          $('#order-no-payment').html(res.data[0].orderNo + 1)
        })
      }
    })
  }

  acceptpayment(event) {
    var amount = $('#payment-amount').text()
    var cno = $('#custumer-no-input').val()
    var ceque = $('#ceque-input').val()
    var reqdate = $('#require-date').val()
    var orderno = $('#order-no-payment').text()
    var point = $('#total-point-input').text()
    if (reqdate.length == 0) reqdate = "null"
    if (cno.length != 0 && ceque.length != 0) {
      console.log(`/api/admin/order/getpoint/${cno}/${point}`);
      api.get(`/api/admin/order/payment/${amount}/${cno}/${ceque}`)
      api.get(`/api/admin/order/getpoint/${cno}/${point}`)
      api.get(`/api/admin/preorderOrder/checkout/${reqdate}/${cno}/${orderno}`).then(response => {
        api.get('/api/admin/preorder/getCartItem').then(res => {
          let i = 1
          res.data.cartItem.forEach(cart => {
            console.log(`/api/admin/preorderOrder/detail/insert/${orderno}/${cart.code}/${cart.Quantity}/${cart.Price}/${i}`);
            api.get(`/api/admin/preorderOrder/detail/insert/${orderno}/${cart.code}/${cart.Quantity}/${cart.Price}/${i}`)
            i += 1
          })
          api.delete('/api/destroyPreorderCart').then(res => {
            alert(res.data)
            setTimeout('location.href = "/admin/status/preorder"', 100)
          })
        })
      })

    }
  }

  usediscount(event) {

    api.get('api/admin/discount/getDiscount').then(res => {
      var x = $('#useddiscount option:selected').text();
      res.data.forEach(e => {
        if (x == e.Code) {
          $('#discountvalue').html(`-${e.Discount}`)
        } else if (x == "Select Discount") {
          $('#discountvalue').empty();
        }
      })
    })
  }

  addproduct(event) {
    var pcode = $('#product-code-add').val();
    var pname = $('#product-name-add').val();
    var pdesc = $('#product-desc-add').val()
    var pline = $('#product-line-add').val()
    var pscale = $('#product-scale-add').val()
    var pvendor = $('#product-vendor-add').val()
    var pquan = $('#product-quan-add').val()
    var pbuyprice = $('#product-buyprice-add').val()
    var pmsrp = $('#product-msrp-add').val()

    api.get(`api/admin/order/addproduct/${pcode}/${pname}/${pdesc}/${pline}/${pscale}/${pvendor}/${pquan}/${pbuyprice}/${pmsrp}`).then(res => {

    })
    window.location.reload(true);
    
  }

  saveEditproduct(event) {
    var pcode = $('#product-code-edit').val();
    var pname = $('#product-name-edit').val();
    var pdesc = $('#product-desc-edit').val()
    var pline = $('#product-line-edit').val()
    var pscale = $('#product-scale-edit').val()
    var pvendor = $('#product-vendor-edit').val()
    var pquan = $('#product-quan-edit').val()
    var pbuyprice = $('#product-buyprice-edit').val()
    var pmsrp = $('#product-msrp-edit').val()
    api.get(`api/admin/order/update/${pcode}/${pname}/${pdesc}/${pline}/${pscale}/${pvendor}/${pquan}/${pbuyprice}/${pmsrp}`).then(res => {

    })
    window.location.reload(true);
  }

  render() {
    return (
      <div className="sfmono">
        <div id="wrapper">
          <Helmet>
            <title>Pre order product</title>
          </Helmet>
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <InstockNav />
              <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800 sfmono">Pre order product</h1>
                  <div className="d-flex justify-content-end ">
                    <a class="flat-btn flat-blue align-middle" style={{ margin: "2px 0", color: "#fff" }}
                      data-toggle="modal" data-target="#addProduct" title="Add new Product">
                      <i className="fas fa-plus"></i>
                    </a>


                  </div>
                </div>
                <div style={{ fontSize: "40px" }} id="demo"></div>
                <div className="d-flex justify-content-end mb-2" id="pagebutton"></div>
                <table
                  className="table text-center table-striped responsive-table "
                  id="dataTable"
                  width="100%"
                >
                  <thead>
                    <tr>
                      <th>ProductImage</th>
                      <th className="responsive-table-name">ProductName</th>
                      <th>ProductScale</th>
                      <th className="responsive-table-vendor">ProductVendor</th>
                      <th>QuantityInStock</th>
                      <th>BuyPrice</th>
                      <th></th><th></th><th></th>
                    </tr>
                  </thead>
                  <tbody className="w-100" id="instockData"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div >
        <Cart_modal />
        <ProductDetail_modal />
        <ProductAdd_modal />
        <ProductEdit_modal />
        <Payment_modal />
      </div>
    );
  }
}

export { Instock, Pre_order };
