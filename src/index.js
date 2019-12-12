import React from "react";
import ReactDOM from "react-dom";
import "./style/css/simple-sidebar.css";
import "./style/css/custom.css";
import "./style/fontawesome/css/all.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./style/fontawesome/js/all";

import App from "./components/reactApp.jsx";
import { Home, Contributor } from "./pages/Index.jsx";
import Catalog from "./pages/Catalog.jsx";
import { Login } from "./pages/Login.jsx";
import Admin from "./pages/Admin/Home.jsx";
import { Instock, Pre_order } from "./pages/Admin/ordering/Order";
import Status from "./pages/Admin/Status";
import Customer from "./pages/Admin/Customer.jsx";
import Employee from "./pages/Admin/Employee.jsx";
import Discount from "./pages/Admin/Discount.jsx";

import FailedPage from "./pages/404.jsx";

import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import api from './api/api'


var isAuthenticate = false;

class LoginControl extends React.Component {

}

// api.get('/api/authenCheck').then(res=>{
//     if(!res.data.login) {
//       ReactDOM.render(
//         <Router>
//           <Switch>
//             {/* public pages */}
//             <Route exact path="/" component={Home} />
//             <Route exact path="/contributor" component={Contributor} />
//             <Route exact path="/catalog" component={Catalog} />
//             <Route exact path="/login" component={Login} />

//             {/* another pages */}
//             <Route exact path="/app" component={App} />
//           </Switch>
//         </Router>,
      
//         document.getElementById("root")
//       );
     
//     }else{
//       ReactDOM.render(
//         <Router>
//           <Switch>
//             {/* public pages */}
//             <Route exact path="/" component={Home} />
//             <Route exact path="/contributor" component={Contributor} />
//             <Route exact path="/catalog" component={Catalog} />
//             <Route exact path="/login" component={Login} />
      
//             {/* adminapge */}
//             <Route exact path="/admin" component={Admin} />
//             <Route exact path="/admin/instock" component={Instock} />
//             <Route exact path="/admin/preorder" component={Pre_order} />
//             <Route exact path="/admin/status" component={Status} />
//             <Route exact path="/admin/customer" component={Customer} />
//             <Route exact path="/admin/employee" component={Employee} />
//             <Route exact path="/admin/discount" component={Discount} />
      
//             {/* another pages */}
//             <Route exact path="/app" component={App} />
//           </Switch>
//         </Router>,
      
//         document.getElementById("root")
//       );
//     }
    ReactDOM.render(
      <Router>
        <Switch>
          {/* public pages */}
          <Route exact path="/" component={Home} />
          <Route exact path="/contributor" component={Contributor} />
          <Route exact path="/catalog" component={Catalog} />
          <Route exact path="/login" component={Login} />
    
          {/* adminapge */}
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/instock" component={Instock} />
          <Route exact path="/admin/preorder" component={Pre_order} />
          <Route exact path="/admin/status" component={Status} />
          <Route exact path="/admin/customer" component={Customer} />
          <Route exact path="/admin/employee" component={Employee} />
          <Route exact path="/admin/discount" component={Discount} />
          <Route exact path="/404" component={FailedPage} />
          {/* another pages */}
          <Route exact path="/app" component={App} />
        </Switch>
      </Router>,
    
      document.getElementById("root")
    );

  
    
// })




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
