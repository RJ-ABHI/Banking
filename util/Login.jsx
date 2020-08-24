import React, { Component } from "react";
import axios from "axios"
class login extends Component {
  state = {
    mainData: {name: "",password: "" },
    errors: {},
  };

  handleChange = (e) => {
    let { currentTarget: inp } = e;
    let errChange = this.validateChange(e);
    let err = { ...this.state.errors };
    err[inp.name] = errChange;
    // console.log(err);
    let localdata = this.state.mainData;
    localdata[inp.name] = inp.value;
    this.setState({ mainData: localdata, errors: err });
  };
  validateChange = (e) => {
    let { currentTarget: inp } = e;
    switch (inp.name) {
      case "password":
        if (inp.value.trim().length < 7) {
          return "Password Must be 7 character";
        }
        break;
      default:
        break;
    }
    return "";
  };
  handlesubmit = async(e) => {
    e.preventDefault();
    // console.log(this.state.mainData);
    try{
    let response = await axios.post("http://localhost:2450/login",this.state.mainData)
    console.log(response)
    if(response.data.role==="manager"){
      this.props.history.push({
        pathname:"/admin"
      })
      this.props.onRole(response.data)
    }
    else if(response.data.role==="customer"){
      this.props.history.push({
        pathname:"/customer"
      })
      this.props.onRole(response.data)
    }
    }
    catch(ex){
      if(ex.response && ex.response!==200){
        const err ={...this.state.errors}
        err.mail="Login failed check user name or password"
        this.setState({errors:err})
      }
    }

  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 text-center">Welcome to GBI Bank</h2>
        <form onSubmit={this.handlesubmit}>
          <div className="form-group text-center mt-3">
            <label htmlFor="name" className="control-label">
              User Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control ml-auto mr-auto "
              style={{ width: "500px" }}
              placeholder="Enter your name"
              value={this.state.mainData.name}
              onChange={this.handleChange}
            />
            <small className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          {this.state.errors.mail ? (
              <div className="text text-center text-danger">
                {this.state.errors.mail}
              </div>
            ) : (
              ""
            )}
          <div className="form-group text-center mt-3">
            <label htmlFor="password" className="control-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control ml-auto mr-auto "
              style={{ width: "500px" }}
              placeholder="Password"
              value={this.state.mainData.password}
              onChange={this.handleChange}
            />
            {this.state.errors.password ? (
              <div className="text text-center text-danger">
                {this.state.errors.password}
              </div>
            ) : (
              ""
            )}
            <button
              className="btn btn-primary mt-3"
              disabled={
                !this.state.mainData.name || !this.state.mainData.password
              }
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default login;
