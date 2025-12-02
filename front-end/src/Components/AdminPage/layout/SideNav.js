import React, { Component } from "react";
import { connect } from "react-redux";
import "./SideNav.scss";
import { Link } from "react-router-dom";

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {}

  LogOutUser = () => {
    this.props.LogOut();
    this.props.history.push("/login");
  };

  render() {
    let dataRedux = this.props.dataRedux;
    console.log(dataRedux.user.role);
    return (
      <>
        {dataRedux && dataRedux.user.role === "Doctor" && (
          <>
            <div id="mySidenav" className="sidenav">
              <div id="about">
                <Link to="/doctor-homepage">Manage Schedule</Link>
              </div>
              <div id="blog">
                <Link to="/manage-patient">Manage Booking</Link>
              </div>
              <div onClick={() => this.LogOutUser()} id="contact">
                <Link to="/login">Log Out</Link>
              </div>
            </div>
          </>
        )}

        {dataRedux && dataRedux.user.role === "Admin" && (
          <>
            <div id="mySidenav" className="sidenav">
              <div id="specialty">
                <Link to="/manage-specialty">Manage Specialty</Link>
              </div>
              <div id="blog">
                <Link to="manage-doctor">Manage Doctor</Link>
              </div>
              <div id="projects">
                <Link to="/admin-homepage">Manage Users</Link>
              </div>
              <div id="clinic">
                <Link to="/clinic-manage">Manage Clinic</Link>
              </div>
              <div id="contact">
                <Link to="/login">Log Out</Link>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { dataRedux: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LogOut: () => dispatch({ type: "LOG_OUT" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
