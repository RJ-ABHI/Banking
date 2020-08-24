import React, { Component } from 'react';
import axios from "axios"
class addpayee extends Component {
    state = {
        inpData:{name:"",payeeName:"",accNumber:"",bankName:"GBI",IFSC:""},
        view:0,
        bankArray : {bankName:""}
      }
handleChange= e=>{
    const {currentTarget : inp } = e
    let localData = this.state.inpData
    let localBank = this.state.bankArray
    if(inp.id==="bankName2"){
        localBank[inp.name] = inp.value
    }
    else{
        localData[inp.name] = inp.value
    }
    // console.log(localData)
    // console.log(localBank)
    this.setState({inpData:localData,bankArray:localBank})
}
handleSubmit= async(e) =>{
    e.preventDefault()

    let localdate =this.state.inpData
    let localBank = this.state.bankArray
    console.log(localBank)
    localdate.bankName = localBank.bankName
    localdate.name=this.props.details.name
    console.log(localdate)
    let response = await axios.post("http://localhost:2450/addPayee",localdate)
    console.log(response)
    if(response.status===200){
        window.alert(this.props.details.name +" details added successfully ")
        this.props.history.push({
            pathname:"/customer"
          })
    }
}
handleClick =()=>{
    this.setState({view:1})
}
    render() { 
        return ( 
            <div className="container">
            <form onSubmit={this.handleSubmit}>
                <h4 className="mt-4">Add Payee</h4>
                <div className="form-group">
                    <label htmlFor="payeeName">payee name <span className="text-danger">*</span></label>
                    <input type="text" name="payeeName" id="payeeName"
                    className="form-control"
                    value={this.state.inpData.payeeName}
                    onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="accNumber">Account Number <span className="text-danger">*</span></label>
                    <input type="text" name="accNumber" id="accNumber"
                    className="form-control"
                    value={this.state.inpData.accNumber}
                    onChange={this.handleChange}
                    />
                </div>
                <div class="form-check">
  <input class="form-check-input" type="radio" name="bankName" id="Radio1" value="GBI" 
   onChange={this.handleChange}
   checked={this.state.inpData.bankName==="GBI"}
  />
  <label class="form-check-label" htmlFor="Radio1" 
  >
   Same Bank
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="bankName" id="Radio2" value={this.state.bankArray.bankName}
  onChange={this.handleChange}
  onClick={this.handleClick}
 
  />
  <label class="form-check-label" htmlFor="Radio2">
    Different Bank
  </label>
            </div>
            {this.state.view===1?
            <div className="mt-4">
            <div className="from-group">
            <select name="bankName" id="bankName2"
            onChange={this.handleChange}
            value={this.state.bankArray.bankName}
            className="form-control"
            >
                <option disabled value="">select Bank</option>
                <option>SBI</option>
                <option>ICICI</option>
                <option>HDFC</option>
                <option>DBS</option>
                <option>AXIS</option>
            </select>
            </div>  
          <div className="form-group mt-3">
              <label htmlFor="IFSC">IFCS Code</label>
              <input type="text" name="IFSC" id="IFSC"
              onChange={this.handleChange}
              value={this.state.inpData.IFSC}
              className="form-control"
              />
          </div>
          </div>   
       :"" }
       <button className="btn btn-primary mt-3">Add payee</button>
                </form>
            </div>
         );
    }
}
 
export default  addpayee;