import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
class ViewCustomer extends Component {
  state = {
    mainArray: [],
    pageInfo: {},
  };
  async componentDidMount() {
    let { page } = queryString.parse(this.props.location.search);
    console.log(page);
    let params = "";
    params = this.addToParams(params, "page", page);
    // console.log("http://localhost:2450/getCustomers" + params);

    let response = await axios.get(
      "http://localhost:2450/getCustomers" + params
    );
    console.log(response.data);
    let totalPages=Math.ceil(response.data.totalNum/5)
    console.log(totalPages)
    this.setState({ mainArray: response.data.items, pageInfo: response.data,totalPages });
  }
  addToParams(params, name, value) {
    params = "?" + name + "=" + value;
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
    if(this.state.totalPages===1){
        return ""
    }
     else if (pageInfo.page === 1) {
      return next;
    } else if (this.state.pageInfo.page>=this.state.totalPages){
      return previous;
    } 
    else {
      return (
        <div>
          {next}
          {previous}
        </div>
      );
    }
  }
  goToPage=async(x)=>{
    //   let { page } = queryString.parse(this.props.location.search);
      let newPage=this.state.pageInfo.page +x
     
      let path=this.props.location.pathname
      let params = "";
    params = this.addToParams(params, "page",newPage);
    this.props.history.push({
        pathname: path,
        search : params
    })
  }
  render() {
    console.log(this.state.pageInfo);
    let {pageInfo : p} = this.state
    let btn = this.showButton();
    let pageData ;
    let start=((p.page-1)* p.totalItems+1)
    let end=(start+p.totalItems-1)
    pageData= start+" to " + end+" of "+p.totalNum
    return (
      <div className="container">
        {pageData}
        <h4 className="display-5 font-weight-bold">All Customers</h4>
        <div className="row border font-weight-bold" style={{ height: "40px" }}>
          <div className="col col-2">Name</div>
          <div className="col col-2">State</div>
          <div className="col col-1">City</div>
          <div className="col col-3">PAN</div>
          <div className="col col-4">DOB</div>
        </div>
        {this.state.mainArray.map((p, ind) => (
          <div
            className="row border font-weight-bold"
            style={{ height: "40px" }}
            key={ind}
          >
            <div className="col col-2">{p.name}</div>
            <div className="col col-2">{p.state}</div>
            <div className="col col-1">{p.city}</div>
            <div className="col col-3">{p.PAN}</div>
            <div className="col col-4">{p.dob}</div>
          </div>
        ))}
        {btn}
      </div>
    );
  }
}

export default ViewCustomer;
