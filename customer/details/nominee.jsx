import React, { Component } from 'react';
import axios from "axios"
class Nominee extends Component {
    state = {
        mainData:[],
        inpData :{nomineeName:"",gender:"",dob:"1-January-1980",relationship:"",jointsignatory:false},
        date:[],
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
        dob:{dates: "",
        month:"" ,
        year:"",},
      }
   async componentDidMount() {
        let response = await axios.get("http://localhost:2450/getNominee/"+this.props.details.name)
        let date;
        if (response.data.dob) {
          date = response.data.dob.split("-");
        }
            this.setState({mainData:response.data,date: date})
    }
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
    handleChange =e=>{
      const {currentTarget : inp } = e
      // let dobArray=[]
      let localData= this.state.inpData
      let dob= this.state.dob
      if(inp.id==="date"){
         dob[inp.name] = inp.value
      } 
      else if(inp.type==="checkbox"){
        localData[inp.name]= inp.checked
      }
  else{
      localData[inp.name]=inp.value
  }
  console.log(localData)
  this.setState({inpData:localData,dob:dob})
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
    let response = await axios.post("http://localhost:2450/nomineeDetails",localArray)
    console.log(response)
    if(response.status===200){
        window.alert(this.props.details.name +" Your Nominee :: " +localArray.nomineeName)
        this.props.history.push({
            pathname:"/customer"
          })
    }
    }
    render() { 
        let {mainData, inpData} = this.state
        let Years = this.years();
        return ( 
            <div className="container">
                <h2 className="mt-4">Nominee Details</h2>
                <form onSubmit={this.handleSubmit}>
                    {mainData.nomineeName===undefined?
                    <div className="form-group">
                        <label htmlFor="nomineeName">Name <span className="text-danger">*</span></label>
                        <input type="text" name="nomineeName" id="nomineeName"
                        value={inpData.nomineeName}
                        onChange={this.handleChange}
                        className="form-control"
                        />
                    </div>: <div className="form-group">
                        <label htmlFor="nomineeName">Name <span className="text-danger">*</span></label>
                        <input type="text" name="nomineeName" id="nomineeName"
                        value={mainData.nomineeName}
                        // onChange={this.handleChange}
                        disabled
                        className="form-control"
                        />
                    </div>}
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                >
                  {this.state.monthNames.map((p,ind) => (
                    <option selected key={ind}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col col-4">
                <select
                  id="date"
                  className="form-control"
                  onChange={this.handleChange}
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
           {mainData.relationship===undefined?
                    <div className="form-group">
                        <label htmlFor="relationship">Relationship <span className="text-danger">*</span></label>
                        <input type="text" name="relationship" id="relationship"
                        value={inpData.relationship}
                        onChange={this.handleChange}
                        className="form-control"
                        />
                    </div>: <div className="form-group">
                        <label htmlFor="relationship">Relationship <span className="text-danger">*</span></label>
                        <input type="text" name="relationship" id="relationship"
                        value={mainData.relationship}
                        // onChange={this.handleChange}
                        disabled
                        className="form-control"
                        />
                    </div>}
                    {mainData.jointsignatory===undefined?
                    <div className="form-check">
                      <input type="checkbox" name="jointsignatory" id="jointsignatory"
                      checked={inpData.jointsignatory}
                      value={inpData.jointsignatory}
                      onChange={this.handleChange}
                      className="form-check-input"
                      />
                       <label htmlFor="jointsignatory" className="form-check-label">Joint Signatory</label>
                    </div>:
                    <div className="form-check">
                      <input type="checkbox" name="jointsignatory" id="jointsignatory"
                      checked={mainData.jointsignatory}
                      value={mainData.jointsignatory}
                      onChange={this.handleChange}
                      className="form-check-input"
                      />
                      <label htmlFor="jointsignatory" className="form-check-label">Joint Signatory</label>
                    </div>}
                    {mainData.nomineeName!==undefined?
        <button style={{display:"none"}}>sjdj</button>  
       :
       <button className="btn btn-primary mt-4" 
       disabled={!this.state.inpData.nomineeName  || !this.state.inpData.gender || ! this.state.inpData.relationship}
       >
           Add Nominee</button>
        }
                </form>

            </div>

         );
    }
}
 
export default Nominee;