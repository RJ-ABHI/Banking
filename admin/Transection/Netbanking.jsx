import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import LeftPanel from "./Leftpanel";
class Check extends Component {
  state = {
   
    mainArray: [],
    pageInfo: {},
    
    selectAmount: queryString.parse(this.props.location.search).amount,
    selectBank: queryString.parse(this.props.location.search).bank,
  };
  async componentDidMount() {
    let { page, bank, amount } = queryString.parse(this.props.location.search);
    // page=parseInt(page)
   
    // bank = bank ? bank : "";
    // amount = amount ? amount : "";
    let params = "";
    params = this.addToParams(params, "page", page);
    params = this.addToParams(params, "bank", bank);
    params = this.addToParams(params, "amount", amount);
    console.log(params)
    console.log(page)
    console.log(bank)
    let response = await axios.get(
      "http://localhost:2450/getAllNetBankings" + params
    );
   

    // console.log(response1.data);
    let totalPages = Math.ceil(response.data.totalNum / 5);
    // console.log(response.items)
    this.setState({
      mainArray: response.data.items,
      pageInfo: response.data,
     
      totalPages,
    });
  }
  addToParams(params, name, value) {
    if (value !== undefined) {
      params = params ? params + "&" : "?";
      params = params + name + "=" + value;
    }

    return params;
  }
 
  showButton() {
    let { pageInfo } = this.state;
    let next = (
      <button
        className="btn btn-secondary"
        style={{ float: "right" }}
        onClick={() => this.goToPage(1)}
      >
        Next
      </button>
    );
    let previous = (
      <button
        className="btn btn-secondary"
        style={{ float: "left" }}
        onClick={() => this.goToPage(-1)}
      >
        Previous
      </button>
    );
    if (this.state.totalPages === 1) {
      return "";
    } else if (pageInfo.page === 1) {
      return next;
    } else if (this.state.pageInfo.page >= this.state.totalPages) {
      return previous;
    } else {
      return (
        <div>
          {next}
          {previous}
        </div>
      );
    }
  }
  goToPage = async (x) => {
    //   let { page } = queryString.parse(this.props.location.search);
    let page = this.state.pageInfo.page + x;
    page = page? page: 1
    let { bank, amount } = queryString.parse(this.props.location.search);
    // bank = bank ? bank : "";
    // amount = amount ? amount : "";
    let path = this.props.location.pathname;
    let params = "";
    params = this.addToParams(params, "page", page);
    params = this.addToParams(params, "bank", bank);
    params = this.addToParams(params, "amount", amount);
    console.log(params)
    console.log(path)
    this.props.history.push({
      pathname: path,
      search: params,
    });
  };
  handleRadioInp = (radio1, radio2) => {
    let {  bank, amount } = queryString.parse(this.props.location.search);
    console.log(radio1);
    console.log(radio2);
    console.log(bank)

    // page =parseInt(page);
    bank = radio1.selected1;
    amount = radio2.selected2;
    let path = this.props.location.pathname;
    let params = "";
    params = this.addToParams(params, "page", 1);
    params = this.addToParams(params, "bank", bank);
    params = this.addToParams(params, "amount", amount);
    console.log(params);
    this.props.history.push({
      pathname: path,
      search: params,
    });
  };

  render() {
    // console.log(this.state.mainArray);
    const{pageInfo : p} = this.state
    let pageData;
    let start=((p.page-1)* p.totalItems+1)
    let end=(start+p.totalItems-1)
    pageData= start+" to " + end+" of "+p.totalNum
    // console.log(Radiobank);
    let btn = this.showButton();
    return (
      <div className="container">
        <h4>All Cheque Transection</h4>
      
        <div className="row col-12">
          <div className="col col-3">
            <LeftPanel  key={Math.floor(Math.random() * 10)}
              selectAmount={this.state.selectAmount}
              selectBank={this.state.selectBank}
              onSubmit={this.handleRadioInp}
            />
          </div>
          <div className="col col-9">
          {pageData}
            <div
              className="row col-12 border font-weight-bold"
              style={{ height: "40px" }}
            >
              <div className="col col-2">Name</div>
              <div className="col col-3">Payee Name</div>
              <div className="col col-2">Amount</div>
              <div className="col col-2">Bank Name</div>
              <div className="col col-3">Comment</div>
            </div>
            {this.state.mainArray.map((p, ind) => (
              <div
                className="row col-12 border font-weight-bold"
                style={{ height: "40px" }}
                key={ind}
              >
                <div className="col col-2">{p.name}</div>
                <div className="col col-4">{p.payeeName}</div>
                <div className="col col-2">{p.amount}</div>
                <div className="col col-2">{p.bankName}</div>
                <div className="col col-2 text-truncate">{p.comment}</div>
              </div>
            ))}
            {btn}
          </div>
        </div>
      </div>
    );
  }
}

export default Check;
