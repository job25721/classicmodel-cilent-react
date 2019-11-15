import React, { Component } from "react";
import api from '../api/api';



class App extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      input: "",
      msg: "pending.."
    };
  }
 
  hadleChange = event => {
    this.setState({ input: event.target.value });
  };
  addUser = event => {
    event.preventDefault()
    const user = {
      input: this.state.input
    };
  
    api.post("/testAPI/add", { user })
    .then(res=>{
        if(res.data.status == true ) alert('added')
        else if(res.data.status == false) alert('fk constaint error')
      
    }).catch(err =>{
      console.log(err);
      
    });
  };

  deleteUser = event => {
      api.delete("/testAPI/delete/" + this.state.input).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };

  showAlert(){
    alert("test")
  }
  componentDidMount() {
    api.get("/testAPI").then(res => {
      const users = res.data;
      this.setState({ users });
    });
    //console.log(this.state.msg);
  }

  render() {
    return (
     
      <React-fragment>  
        <form onSubmit={this.addUser}>
          <label>
            username :
            <input type="number" name="input" onChange={this.hadleChange} />
          </label>
          <button type="submit" >Add</button>
        </form>
        <form onSubmit={this.deleteUser}>
          <button type="delete">Delete</button>
        </form>
        <h1 className="display-4" style={{ color: "skyblue" }}>
          Hello I'm React
        </h1>
        <h2 className="display-4">This is respone from Express :</h2>
        <ul>
          {this.state.users.map(user => (
            <react-fragment>
              <li>employeeNumber = {user.employeeNumber}</li>
              <li>password(encrypt) = {user.pswd}</li>
              <hr />
            </react-fragment>
          ))}
        </ul>
        <div>
          output : {this.state.msg}
        </div>
      </React-fragment>
    );
  }
}

export default App;
