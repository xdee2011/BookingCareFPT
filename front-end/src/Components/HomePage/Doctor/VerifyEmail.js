import React, { Component } from "react";
import { postBooking } from "../../../ApiServices/api";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      const urlParams = new URLSearchParams(this.props.location.search);
      const token = urlParams.get("token");
      const doctorId = urlParams.get("doctorId");
      console.log(token, doctorId);
      let res = await postBooking({
        token: token,
        doctorId: doctorId,
      });
      console.log(res);
      if (res && res.errCode === 0) {
      }
      this.setState({
        stateVerify: true,
        errCode: res.data.errCode,
      });
    }
  }
  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <>
        {" "}
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <img
                className="logo"
                src="data:image/png;base64,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"
              />
            </div>
            <div className="center-content">
              <div className="children-content">
                <div>
                  <b>Specialty</b>
                </div>
                <div className="sub-title">Find Doctor by Specialty</div>
              </div>
              <div className="children-content">
                <div>
                  <b>Health Facilities</b>
                </div>
                <div className="sub-title">Choose hospital clinic</div>
              </div>
              <div className="children-content">
                <div>
                  <b>Doctor</b>
                </div>
                <div className="sub-title">Choose a good doctor</div>
              </div>
              <div className="children-content">
                <div>
                  <b>Examination package</b>
                </div>
                <div className="sub-title">General health check</div>
              </div>
            </div>
          </div>
        </div>
        {statusVerify === false ? (
          <div>Loading Data...</div>
        ) : (
          <div>{+errCode === 0 ? <div>Success</div> : <div>Failed</div>}</div>
        )}
      </>
    );
  }
}
export default VerifyEmail;
