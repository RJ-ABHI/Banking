import React, { Component } from 'react';
import {Route, Redirect } from "react-router-dom"
import Navbar from './util/Navbar';
import Login from './util/Login';
import AdminMain from "./admin/adminHome"
import ViewCustomer from './admin/Coutomer/viewCostumer';
import AddCustomer from './admin/Coutomer/addCustomer';
import Check from './admin/Transection/check';
import NetBanking from './admin/Transection/Netbanking';
import ViewCheque from "./customer/View/ViewCheque"
import ViewNetBanking from "./customer/View/NetBanking"
import Customer from './customer/details/customer';
import Logout from './util/logout';
import CustomerHome from "./customer/customerHome"
import Nominee from './customer/details/nominee';
import Cheque from './customer/Transection/CheckTrans';
import Addpayee from './customer/Transection/addPayee';
import NetBanking11 from './customer/Transection/netBankingTrans';

class Main extends Component {
    state = {
      Maindata:{}
      }
      handleRole=(data)=>{
        // console.log(data)
        this.setState({Maindata:data})
      }
    render() { 

        return ( 
            <div>
            <Navbar
            details={this.state.Maindata}
             />
            <Route path="/" 
            exact 
            render={(props) => (
                <Login {...props} key={Math.floor(Math.random() * 10)}
               onRole={this.handleRole}

                />
              )}
            />
            <Route path="/admin" 
            exact 
            render={(props) => (
                <AdminMain {...props} key={Math.floor(Math.random() * 10)}
                details={this.state.Maindata}  
                />
              )}
            />
            <Route path="/customer" 
            exact 
            render={(props) => (
                <CustomerHome {...props} key={Math.floor(Math.random() * 10)}
                details={this.state.Maindata}  
                />
              )}
            />
            <Route path="/logout" 
            exact 
            render={(props) => (
                <Logout {...props} key={Math.floor(Math.random() * 10)}
                details={this.state.Maindata}  
                />
              )}
            />
            <Route path="/allCustomers" 
            exact 
            render={(props) => (
                <ViewCustomer {...props} key={Math.floor(Math.random() * 10)}
                details={this.state.Maindata}  
                />
              )}
            />
            <Route path="/addCustomer" 
            exact 
            render={(props) => (
                <AddCustomer {...props} key={Math.floor(Math.random() * 10)}
                details={this.state.Maindata}  
                />
              )}
            />
            <Route path="/allCheque" 
            exact 
            render={(props) => (
                <Check {...props} key={Math.floor(Math.random() * 10)}
                details={this.state.Maindata}  
                />
              )}
            />
            <Route path="/allNet" 
            exact 
            render={(props) => (
                <NetBanking {...props} key={Math.floor(Math.random() * 10)}
                details={this.state.Maindata}  
                />
              )}
            />
            <Route path="/viewCheque" 
            exact 
            render={(props) => (
                <ViewCheque {...props} key={Math.floor(Math.random() * 10)}
                details={this.state.Maindata}  
                />
              )}
            />
            <Route path="/viewNet" 
            exact 
            render={(props) => (
                <ViewNetBanking {...props} key={Math.floor(Math.random() * 10)}
                details={this.state.Maindata}  
                />
              )}
            />
            <Route path="/customerDetails" 
            exact 
            render={(props) => (
                <Customer {...props} key={Math.floor(Math.random() * 10)}
                details={this.state.Maindata}  
                />
              )}
            />
            <Route path="/nomineeDetails" 
            exact 
            render={(props) => (
                <Nominee {...props} key={Math.floor(Math.random() * 10)}
                details={this.state.Maindata}  
                />
              )}
            />
            <Route path="/cheque" 
            exact 
            render={(props) => (
                <Cheque {...props} key={Math.floor(Math.random() * 10)}
                details={this.state.Maindata}  
                />
              )}
            />
            <Route path="/addPayee" 
            exact 
            render={(props) => (
                <Addpayee {...props} key={Math.floor(Math.random() * 10)}
                details={this.state.Maindata}  
                />
              )}
            />
            <Route path="/netBanking" 
            exact 
            render={(props) => (
                <NetBanking11 {...props} key={Math.floor(Math.random() * 10)}
                details={this.state.Maindata}  
                />
              )}
            />
            <Redirect to="/" />
            </div>
         );
    }
}
 
export default Main;