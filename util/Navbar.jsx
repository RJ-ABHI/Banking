import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
class Navbar extends Component {
  state = {};
  render() {
    const { details } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-warning bg-warning">
          <div className="navbar-brand">Home</div>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333"
    aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
         
            <div className="navbarSupportedContent" id="navbarSupportedContent-333">
              <div className="collapse navbar-collapse ">
                {details.role === "manager" ? (
                  <span>
          
              <ul className="navbar-nav ">
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle text-dark"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        style={{ cursor: "pointer",marginRight:"auto" }}
                        to="/admin"
                      >
                            Customer
                      </Link>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <Link className="dropdown-item text-dark" to="/addCustomer">
                          Add Customer
                        </Link>
                        <Link className="dropdown-item text-dark" to="/allCustomers?page=1">
                          View All Customer
                        </Link>
                      </div>
                    </li>
                    <li className="nav-item dropdown ">
                      <Link
                        className="nav-link dropdown-toggle text-dark"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        style={{ cursor: "pointer",marginRight:"auto" }}
                        to="/admin"
                      >
                       Transections
                      </Link>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <Link className="dropdown-item text-dark" to="/allCheque?page=1">
                         Cheques
                        </Link>
                        <Link className="dropdown-item text-dark" to="/allNet?page=1">
                          Net Banking   
                        </Link>
                      </div>
                    </li>
                      <li className="nav-item" style={{marginLeft:"850px"}}>
        <a className="nav-link waves-effect waves-light ">
         <Link to="/logout" className=" text-dark">Logout</Link>
        </a>
      </li>
              </ul>
             
</span>
                ) : details.role === "customer"?
                <ul className="navbar-nav ">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle text-dark"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    style={{ cursor: "pointer",marginRight:"auto" }}
                    to="/customer"
                  >
                        View
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link className="dropdown-item text-dark" to="/viewCheque?page=1">
                      Cheque 
                    </Link>
                    <Link className="dropdown-item text-dark" to="/viewNet?page=1">
                     Net Banking
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown ">
                  <Link
                    className="nav-link dropdown-toggle text-dark"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    style={{ cursor: "pointer",marginRight:"auto" }}
                    to="/customer"
                  >
                   Details
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link className="dropdown-item text-dark" to="/customerDetails">
                      Customer
                    </Link>
                    <Link className="dropdown-item text-dark" to="/nomineeDetails">
                     Nominee 
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown ">
                  <Link
                    className="nav-link dropdown-toggle text-dark"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    style={{ cursor: "pointer",marginRight:"auto" }}
                    to="/customer"
                  >
                   Transection
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link className="dropdown-item text-dark" to="/addPayee">
                     Add payee
                    </Link>
                    <Link className="dropdown-item text-dark" to="/cheque">
                    Cheque  
                    </Link>
                    <Link className="dropdown-item text-dark" to="/netBanking">
                    NetBanking  
                    </Link>
                  </div>
                </li>
                
                {/* <li className="nav-item" style={{marginLeft:"600px"}}>welcome</li> */}
                <li className="nav-item" style={{marginLeft:"720px"}}>
        <a className="nav-link waves-effect waves-light ">
         <Link to="/logout" className=" text-dark">Logout</Link>
        </a>
      </li>   
          </ul>
                :<div className="navbar-nav ml-auto">

                <div className="nav-item ">
                  <NavLink className="text-dark nav-link" to="/">
                    Login
                  </NavLink>
                </div>
                  </div>}
           
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
