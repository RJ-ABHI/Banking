import React, { Component } from "react";
import axios from "axios";
class Cheque extends Component {
  state = {
    inpData: {
      chequeNumber: "",
      bankName: "",
      branch: "",
      amount: "",
      name: "",
    },
    radiobank: [],
    errors: {},
  };
  async componentDidMount() {
    let response = await axios.get("http://localhost:2450/getBanks");
    this.setState({ radiobank: response.data });
  }
  handleChange = (e) => {
    const { currentTarget: inp } = e;
    let localData = this.state.inpData;
    let err = { ...this.state.errors };
    let errChange = this.validateChange(e);
    err[inp.name] = errChange;
    localData[inp.name] = inp.value;
    console.log(localData);
    this.setState({ inpData: localData, errors: err });
  };
  validateChange = (e) => {
    let { currentTarget: inp } = e;
    switch (inp.name) {
      case "chequeNumber":
        if (inp.value.trim().length < 11) {
          return "Enter your 11 digit Cheque Number";
        }
        break;
      case "branch":
        if (inp.value.trim().length < 4) {
          return "Enter 4 digit code of branch";
        }
        break;
      default:
        break;
    }
    return "";
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    let localData = this.state.inpData;
    localData.name = this.props.details.name;
    let response = await axios.post(
      "http://localhost:2450/postCheque",
      localData
    );
    console.log(response);
    if (response.status === 200) {
      window.alert("details Added successfully");
      this.props.history.push({
        pathname: "/customer",
      });
    }
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h4 className="mt-4">Deposit Cheque</h4>
          <div className="form-group">
            <label htmlFor="chequeNumber">
              Cheque Number <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="chequeNumber"
              id="chequeNumber"
              value={this.state.inpData.chequeNumber}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          {this.state.errors.chequeNumber ? (
            <div className="alert alert-danger">
              {this.state.errors.chequeNumber}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="bankName">
            Bank Name <span className="text-danger">*</span>
          </label>
          <div className="form-group">
            <select
              name="bankName"
              id="bankName"
              value={this.state.inpData.bankName}
              onChange={this.handleChange}
              className="form-control"
            >
              <option value="" disabled>
                Select bank
              </option>
              {this.state.radiobank.map((p) => (
                <option>{p}</option>
              ))}
            </select>
            <div className="form-group">
              <label htmlFor="branch">
                Branch <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="branch"
                id="branch"
                value={this.state.inpData.branch}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Enter Branch Code"
              />
            </div>
            {this.state.errors.branch ? (
              <div className="alert alert-danger">
                {this.state.errors.branch}
              </div>
            ) : (
              ""
            )}
            <div className="form-group">
              <label htmlFor="amount">
                Amount <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={this.state.inpData.amount}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Enter Amount"
              />
            </div>
          </div>
          <button
            className="btn btn-primary"
            disabled={
              !this.state.inpData.chequeNumber ||
              !this.state.inpData.bankName ||
              !this.state.inpData.branch ||
              !this.state.inpData.amount
            }
          >
            Add Cheque
          </button>
        </form>
      </div>
    );
  }
}

export default Cheque;
