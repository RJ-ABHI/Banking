import React, { Component } from "react";
import axios from "axios";

class LeftPanel extends Component {
  state = {
    RadioBank: {bank:[],selected1:this.props.selectBank!==undefined?this.props.selectBank:""},
    RadioAmount: {amount:[],selected2:this.props.selectAmount!==undefined?this.props.selectAmount:""},
  };
 async componentDidMount() {
    const response1 = await axios.get("http://localhost:2450/getBanks");
    const response2 = await axios.get("http://localhost:2450/getAmount");
    if(response1 !==undefined && response2!==undefined){

      let radioBank=this.state.RadioBank
      let radioAmount=this.state.RadioAmount
      radioBank.bank=response1.data
      radioAmount.amount=response2.data
      this.setState({ RadioBank: radioBank,
        RadioAmount:radioAmount})
      }
    }
  handleChange=(e)=>{

    
    const {currentTarget : inp } = e
    let localBank = this.state.RadioBank
    let LocalAmt = this.state.RadioAmount
    if(inp.name==="selected1"){
        localBank.selected1=inp.value
    }
   else if(inp.name==="selected2"){
        LocalAmt.selected2= inp.value
    }
    console.log(localBank)
    console.log(LocalAmt)
    this.props.onSubmit(localBank,LocalAmt)
  }
  render() {
    console.log(this.state.RadioBank)
    console.log(this.state.RadioAmount)
    return (
      <div className="container">
        <form>
            <div className="container">
            <h6 className="bg-light text-center" style={{height:"40px"}}>Bank</h6>
            <div>
         { this.state.RadioBank.bank.map((p, ind) => (
            <div className="form-check border text-center" key ={ind}>
                <label htmlFor={p}>
              <input
                type="radio"
                name="selected1"
                id={p}
                value={p}
                checked={p===this.state.RadioBank.selected1}
                onChange={this.handleChange}
                className="form-check-input "
              />
              {p}</label>
            </div>
          ))}
           </div>
                <br/>
            <h6 className="bg-light text-center" style={{height:"40px"}}>Amount</h6>
            <div>
         { this.state.RadioAmount.amount.map((p, ind) => (
            <div className="form-check border text-center" key={ind}>
                <label htmlFor={p}>
              <input
                type="radio"
                name="selected2"
                id={p}
                value={p}
                checked={p===this.state.RadioAmount.selected2}
                onChange={this.handleChange}
                className="form-check-input "
              />
              {p}</label>
            </div>
          ))}
           </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LeftPanel;
