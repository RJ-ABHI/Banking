import React, { Component } from 'react';
import axios from "axios"
class netBanking extends Component {
    state = { 
        payeeData:[],
        inpData:{name:"",payeeName:"", amount:"", comment:""}
     }
  async  componentDidMount() {
       let response = await axios.get("http://localhost:2450/getPayees/"+this.props.details.name)
       this.setState({payeeData:response.data})
    }
    handleChange =e=>{
        let {currentTarget : inp} =e
        let localData = this.state.inpData
        localData[inp.name]=inp.value
        this.setState({inpData:localData})
    }
    handleSubmit=async(e)=>{
        e.preventDefault()
        let localData= this.state.inpData
        localData.name= this.props.details.name
        let response = await axios.post("http://localhost:2450/postNet",localData)
        console.log(response);
        if (response.status === 200) {
          window.alert("details Added successfully");
          this.props.history.push({
            pathname: "/customer",
          });
        }
    }
    render() { 
        return (
            <div className="container">
                <h4 className="mt-4">Net Banking Details</h4>
                <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="payeeName">Payee Name <span className="text-danger">*</span></label>
                   <select name="payeeName" id="payeeName" 
                   className="form-control"
                   value={this.state.inpData.payeeName}
                   onChange={this.handleChange}
                   >
                       <option value=""disabled selected>Select Payee</option>
                        {this.state.payeeData.map((p)=>(
                            <option>{p.payeeName}</option>
                        ))}
                   </select>
                </div>
            <div className="form-group">
                <label htmlFor="amount">Amount <span className="text-danger">*</span></label>
                <input type="number" name="amount" id="amount"
                value={this.state.inpData.amount}
                className="form-control"
                onChange={this.handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="comment">Comment</label>
                <input type="text" name="comment" id="comment"
                value={this.state.inpData.comment}
                className="form-control"
                onChange={this.handleChange}
                />
            </div>
            <button className="btn btn-primary" disabled={!this.state.inpData.payeeName || !this.state.inpData.amount}>Add Netbanking Transection</button>
            </form>
            </div>
          );
    }
}
 
export default netBanking;