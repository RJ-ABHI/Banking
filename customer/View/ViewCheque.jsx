import React, { Component } from 'react';
import axios from "axios"
import  queryString  from 'query-string';
class Cheque extends Component {
    state = { 
        mainData: [],
        pageInfo:[],
     }
   async componentDidMount() {
       let {page} = queryString.parse(this.props.location.search)
       console.log(page)
       let {details} = this.props
       let params = "";
       params = this.addToParams(params, "page", page);
        let  response = await axios.get("http://localhost:2450/getChequeByName/"+details.name+params)
        console.log(response)
        let totalPages = Math.ceil(response.data.totalNum / 5);
        this.setState({mainData:response.data.items, pageInfo: response.data,
            totalPages,})
    }
    addToParams(params, name, value){
        if(value!==undefined){
            params = params ? params + "&" : "?";
      params = params + name + "=" + value;
        }
        return params
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
        bank = bank ? bank : "";
        amount = amount ? amount : "";
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
    render() { 
        let btn = this.showButton();
        const{pageInfo : p} = this.state
        let pageData;
        let start=((p.page-1)* p.totalItems+1)
        let end=(start+p.totalItems-1)
        pageData= start+" to " + end+" of "+p.totalNum
        return (  
            <div className="container">
                <h4 className="mt-2">All Cheque Details</h4>
                {p.totalNum===0? <h6 className="text-danger">No Transection to show</h6>:
                <div>
                {pageData}
                 <div
              className="row col-12 border font-weight-bold"
              style={{ height: "40px" }}
            >
             
              <div className="col col-4">Cheque Number</div>
              <div className="col col-3">Bank Name</div>
              <div className="col col-2">Branch</div>
              <div className="col col-3">Amount</div>
            </div>
            {this.state.mainData.map((p, ind) => (
              <div
                className="row col-12 border font-weight-bold"
                style={{ height: "40px" }}
                key={ind}
              >
               
                <div className="col col-4">{p.chequeNumber}</div>
                <div className="col col-3" >{p.bankName}</div>
                <div className="col col-2" >{p.branch}</div>
                <div className="col col-3">{p.amount}</div>
            </div> 
            ))}
            {btn}
            </div>}
        </div>
         );
    }
}
 
export default Cheque;