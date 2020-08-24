import React, { Component } from 'react';
import axios from "axios"
class AddCustomer extends Component {
    state = { 
        mainData :{name:"", password:"", password1:""},
        errors : {}
     }
     handleChange=(e)=>{
        const {currentTarget : inp } = e
        let errChange= this.validation(e)
        let err= this.state.errors
        err[inp.name] = errChange
        // console.log(errChange)
        // console.log(err)
        let localdata=this.state.mainData
        localdata[inp.name] = inp.value  
        this.setState({mainData:localdata,errors:err}) 
     }
     validation=(e)=>{
      
        let { currentTarget: inp } = e;
    switch (inp.name) {
        case "password":
            if(inp.value.trim().length<7){
                return "password can not be blank. Minimum length should be 7 charcters."
            }
            break;
      case "password1":
        if (inp.value !==this.state.mainData.password) {
          return "Password didnot matched";
        }
        break;
      default:
        break;
    }
    return "";
     }
     handleSubmit=async(e)=>{
         e.preventDefault()
        //  console.log(this.state.mainData)
         let response = await axios.post("http://localhost:2450/register",this.state.mainData)
         console.log(response)
         if(response.status===200){
             window.alert("Customer has been successfully added")
             this.props.history.push({
                pathname:"/admin"
              })
         }
     }
    render() { 
        return ( 
            <div className="container">
                <h2>New Customer</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="from-group">
                        <label htmlFor="name" className="control-label">Name</label>
                        <input type="text" name="name" id="name"
                        value={this.state.mainData.name}
                        onChange={this.handleChange}
                        className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="control-label">Password</label>
                        <input type="password" name="password" id="password"
                        value={this.state.mainData.password}
                        onChange={this.handleChange}
                        className="form-control"
                        />
                    </div>
        {this.state.errors.password?<div className="text-danger text-center">{this.state.errors.password}</div>:""}
                    <div className="form-group">
                        <label htmlFor="password1" className="control-label">Confirm Password</label>
                        <input type="password" name="password1" id="password1"
                        value={this.state.mainData.password1}
                        onChange={this.handleChange}
                        className="form-control"
                        />
                    </div>
                    {this.state.errors.password1?<div className="text-danger text-center">{this.state.errors.password1}</div>:""}
                    <button className="btn btn-primary mt-2"  disabled={
                !this.state.mainData.name || this.state.mainData.password.trim().length <7 || this.state.errors.password1
              }>Create</button>
                </form>
            </div>
         );
    }
}
 
export default AddCustomer;