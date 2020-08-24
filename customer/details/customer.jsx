import React, { Component } from "react";
import axios from "axios";
class Customer extends Component {
  state = {
    mainData: [],
    inpData: {
        dob:"1-January-1980",
      PAN: "",
      addressLine1: "",
      addressLine2: "",
      city: "", 
      gender: "",
      name: "",
      state: "",
    },
    dob:{dates: "",
    month:"" ,
    year:"",},    
    date: [],
    stateCity:[],
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    days1: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      1,
      3,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
    ],
    days2: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      1,
      3,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
    ],
    days3: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      1,
      3,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
    ],
    stateInd:0
  };
  years = (startYear) => {
    var currentYear = new Date().getFullYear(),
      years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    // console.log(years);
    return years;
  };
  async componentDidMount() {
    let { details } = this.props;
    let response = await axios.get(
      "http://localhost:2450/getCustomer/" + details.name
    );
    let response1= await axios.get("http://localhost:2450/statecity")
//  console.log(response1.data)
    let date;
    if (response.data.dob) {
      date = response.data.dob.split("-");
    }
    // console.log(date);
    this.setState({ mainData: response.data, date: date,stateCity:response1.data });
  }
  handlechange=e=>{
    const {currentTarget : inp } = e
    // let dobArray=[]
    let localData= this.state.inpData
    let dob= this.state.dob
    if(inp.id==="date"){
       dob[inp.name] = inp.value
    } 
else{
    localData[inp.name]=inp.value
}
console.log(localData)

    let fi=0
     fi =this.state.stateCity.findIndex((p)=>p.stateName===this.state.inpData.state)
    //  console.log(fi)
    this.setState({inpData:localData,stateInd:fi,dob:dob})
  }
  handleSubmit=async(e)=>{
    e.preventDefault()
      let {dob} = this.state
      let localArray=this.state.inpData
      let dbArray = []
      dbArray.push(dob.dates,dob.month,dob.year)
      localArray.dob=dbArray.join("-")
      localArray.name =this.props.details.name
    //   console.log(dbArray.join("-"))
    let response = await axios.post("http://localhost:2450/customerDetails",localArray)
    console.log(response)
    if(response.status===200){
        window.alert(this.props.details.name +" details added successfully ")
        this.props.history.push({
            pathname:"/customer"
          })
    }
  }
  render() {
    let { mainData, inpData } = this.state;
    let Years = this.years();
    //     if(this.state.stateCity[this.state.stateInd]!==undefined){
    // console.log(this.state.stateCity[this.state.stateInd].cityArr)
    //     }
    // console.log(this.state.stateCity[this.state.stateInd].cityArr);
    return (
      <div className="container">
        <h4 className="mt-4">Customers Details</h4>
        <form onSubmit={this.handleSubmit}>
          {mainData.gender === undefined ? (
            <div className="form-check form-check-inline">
              <div className="mr-5 mt-3">
                Gender <span className="text-danger">*</span>
                <input
                  className="form-check-input ml-5 "
                  type="radio"
                  name="gender"
                  id="inlineRadio1"
                  value="Male"
                  onChange={this.handlechange}
                />
                <label
                  className="form-check-label mr-5 "
                  htmlFor="inlineRadio1"
                >
                  Male
                </label>
                <input
                  className="form-check-input ml-5 "
                  type="radio"
                  name="gender"
                  id="inlineRadio1"
                  value="Female"
                  onChange={this.handlechange}
                />
                <label className="form-check-label mr-5" htmlFor="inlineRadio1">
                  Female
                </label>
              </div>
            </div>
          ) : (
            <div className="form-check form-check-inline" disabled>
              <div className="mr-5 mt-3">
                Gender <span className="text-danger">*</span>
                <input
                  className="form-check-input ml-5"
                  type="radio"
                  name="gender"
                  id="inlineRadio1"
                  disabled
                  value="Male"
                  checked={this.state.mainData.gender}
                />
                <label
                  className="form-check-label mr-5 "
                  htmlFor="inlineRadio1"
                >
                  Male
                </label>
                <input
                  className="form-check-input ml-5  "
                  type="radio"
                  name="gender"
                  id="inlineRadio1"
                  disabled
                  value="Female"
                  checked={this.state.inpData.gender}
                />
                <label className="form-check-label mr-5" htmlFor="inlineRadio1">
                  Female
                </label>
              </div>
            </div>
          )}
          <hr
            style={{ width: "100%", textAlign: "left", marginLeft: "0" }}
          ></hr>
          <label htmlFor="date">
            Date Of Birth <span className="text-danger">*</span>
          </label>
          {mainData.dob !== undefined ? (
            <div className="form-row col-12">
              <div className="form-group col col-4">
                <select id="date" className="form-control">
                  <option disabled selected>
                    {this.state.date[2]}
                  </option>
                </select>
              </div>
              <div className="form-group col  col-4">
                <select id="date" className="form-control">
                  <option disabled selected>
                    {this.state.date[1]}
                  </option>
                </select>
              </div>
              <div className="form-group col col-4">
                <select id="date" className="form-control">
                  <option disabled selected>
                    {this.state.date[0]}
                  </option>
                </select>
              </div>
            </div>
          ) : (
            <div className="form-row col-12">
              <div className="form-group col col-4">
                <select
                  id="date"
                  className="form-control"
                  value={this.state.dob.year}
                  name="year"
                  onChange={this.handlechange}
                >
                  {Years.map((p, ind) => (
                    <option selected key = {ind}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col  col-4">
                <select
                  id="date"
                  className="form-control"
                  value={this.state.dob.month}
                  name="month"
                  onChange={this.handlechange}
                >
                  {this.state.monthNames.map((p) => (
                    <option selected>{p}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col col-4">
                <select
                  id="date"
                  className="form-control"
                  onChange={this.handlechange}
                  value={this.state.dob.dates}
                  name="dates"
                >
                  {this.state.dob.month === "February"
                    ? this.state.days1.map((p, ind) => <option selected key={ind}>{p}</option>)
                    : this.state.dob.month === "January" ||
                      this.state.dob.month === "March" ||
                      this.state.dob.month === "May" ||
                      this.state.dob.month === "July" ||
                      this.state.dob.month === "August" ||
                      this.state.dob.month === "October" ||
                      this.state.dob.month === "December"
                    ? this.state.days3.map((p, ind) => <option selected key= {ind}>{p}</option>)
                    : this.state.days2.map((p, ind) => (
                        <option selected key = {ind}>{p}</option>
                      ))}
                </select>
              </div>
            </div>
          )}
          {mainData.PAN===undefined?
          <div className="form-group">
              <label htmlFor="PAN">PAN <span className="text-danger">*</span></label>
              <input type="text" name="PAN" id="PAN"
              value={inpData.PAN}
              className="form-control"
              onChange={this.handlechange}
              />
          </div>: <div className="form-group">
              <label htmlFor="PAN">PAN <span className="text-danger">*</span></label>
              <input type="text" name="PAN" id="PAN" disabled
              value={mainData.PAN}
              className="form-control"
              />
          </div>}
          {mainData.addressLine1===undefined?
          <div className="form-group">
              <label htmlFor="addressLine1">Address</label>
              <div className="row col-12">
                  <input type="text" name="addressLine1" id="addressline1"
                  placeholder="Line1"
                  value={inpData.addressLine1}
                  className="form-control col-4"
                  onChange={this.handlechange}
                  />
                  <input type="text" name="addressLine2" id="addressline1"
                  placeholder="Line2"
                  value={inpData.addressLine2}
                  className="form-control col-4 ml-5"
                  onChange={this.handlechange}
                  />
              </div>
          </div>:<div className="form-group">
              <label htmlFor="addressLine1">Address</label>
              <div className="row col-12">
                  <input type="text" name="addressLine1" id="addressline1"
                  placeholder="Line1" disabled
                  value={mainData.addressLine1}
                  className="form-control col-4"
                  />
                  <input type="text" name="addressLine2" id="addressline1"
                  placeholder="Line2" disabled
                  value={mainData.addressLine2}
                  className="form-control col-4 ml-5"
                  />
              </div>
          </div>}
          <div className="form-group">
              <div className=" row col-12">
          {mainData.state===undefined?
              <div className="col col-6">
              <label htmlFor="state">State <span className="text-danger">*</span></label>
              <select name="state" id="state" 
              className="form-control"
              value={inpData.state}
              onChange={this.handlechange}
              >
                  <option disabled  selected>select state</option>
                  {this.state.stateCity.map((p, ind)=>(
                  <option key= {ind}>{p.stateName}</option>
                  ))}
              </select>
              </div>: <div className="col col-6">
              <label htmlFor="state">State <span className="text-danger">*</span></label>
              <select name="state" id="state" 
              className="form-control"
              value={mainData.state}
              disabled
            //   onChange={this.handlechange}
              >      
                  <option >{mainData.state}</option>
              </select>
              </div>}
              {mainData.city===undefined?
              <div className="col col-6">
              <label htmlFor="state">City <span className="text-danger">*</span></label>
              <select name="city" id="state" 
              className="form-control"
              value={inpData.city}
              onChange={this.handlechange}
              >
                  <option disabled >select city</option>
                  {this.state.stateCity[this.state.stateInd]!==undefined? 
                  this.state.stateCity[this.state.stateInd].cityArr.map((p, ind)=>(
                  <option key ={ind}>{p}</option>
                  )):""}
              </select>
              </div>: <div className="col col-6">
              <label htmlFor="state">City <span className="text-danger">*</span></label>
              <select name="city" id="state" 
              className="form-control"
              disabled
              value={inpData.city}
              >  
                  <option>{mainData.city}</option>    
              </select>
              </div>}
              </div>
          </div>
          {mainData.PAN!==undefined?
        <button style={{display:"none"}}>sjdj</button>  
       :
       <button className="btn btn-primary" 
       disabled={!this.state.inpData.PAN  || !this.state.inpData.gender || ! this.state.inpData.city || !this.state.inpData.state}
       >
           Add Details</button>
        }
        </form>
      </div>
    );
  }
}

export default Customer;
