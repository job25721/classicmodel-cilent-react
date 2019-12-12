import React, { Component } from "react";
import api from '../api/api';



class App extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      pass : "",
      input: "",
      msg: "pending.."
    };
  }
 
  hadleChangeUser = event => {
    this.setState({ input: event.target.value });
  };
  hadleChangePass = event => {
    this.setState({ pass: event.target.value });
  };
  addUser = event => {
    const user = {
      input: this.state.input,
      pass : this.state.pass
    };
  
    api.post("/testAPI/add", { user })
    .then(res=>{
        if(res.data.exist === true && res.data.can === false ) alert('this user data has alredy have in database')
        else if(res.data.exist === false && res.data.can === false ) alert('no such employee in database')
        else if(res.data.exist === false && res.data.can === true ) alert('added !!')
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
            <input type="number" name="input" onChange={this.hadleChangeUser} />
            password :
            <input type="number" name="input" onChange={this.hadleChangePass} />
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
