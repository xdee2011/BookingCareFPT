import React, { Component } from "react";
import { connect } from "react-redux";
import SideNav from "../AdminPage/layout/SideNav";
import Error_Page from "../AdminPage/layout/ErrorPage";
import "./ManagePatient.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getPatientForDoctor, sendDataBill } from "../../ApiServices/api";
import moment from "moment";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      startDate: new Date(),
      dataPatient: [],
    };
  }

  setStartDate = (date) => {
    this.setState(
      {
        startDate: date,
      },
      () => {
        this.getDataPatient();
      }
    );
  };

  async componentDidMount() {
    this.getDataPatient();
  }

  confirmBookingAccept = async (data) => {
    console.log(data);
    let res = await sendDataBill({
      email: data.email,
      doctorId: data.doctorId,
      timeType: data.timeType,
      isAccept: true,
      name: data.fullName,
    });
    if (res.data.errCode === 0) {
      alert("Send Billing Successfully");
    } else {
      alert("Failed to Send Billing");
    }
  };

  getDataPatient = async () => {
    let dataRedux = this.props.dataRedux;

    let formattedDate = moment(this.state.startDate).startOf("day").valueOf();
    let res = await getPatientForDoctor({
      doctorId: dataRedux.user.id,
      date: formattedDate,
    });
    console.log(res);
    this.setState({
      dataPatient: res.data.data,
    });
  };

  confirmBookingDenied = async (data) => {
    let res = await sendDataBill({
      email: data.email,
      doctorId: data.doctorId,
      timeType: data.timeType,
      isAccept: false,
      name: data.fullName,
    });
    if (res.data.errCode === 0) {
      alert("Send Billing Successfully");
    } else {
      alert("Failed to Send Billing");
    }
  };

  render() {
    let dataRedux = this.props.dataRedux;
    let { startDate, dataPatient } = this.state;
    return (
      <>
        {dataRedux && dataRedux.user === null && (
          <div>
            <Error_Page />
          </div>
        )}
        {dataRedux && dataRedux.user !== null && (
          <>
            <SideNav />
            <div className="container">
              <div className="manage-patient-container">
                <div className="m-p-title">Quản Lý Bệnh Nhân</div>
              </div>
              <div className="manage-patient-body-row">
                <div className="col-4 form-group">
                  <label>Chọn Ngày Khám</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => this.setStartDate(date)}
                  />
                </div>
                <div className="col-12">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Time Slot</th>
                        <th scope="col">Email</th>
                        <th scope="col">Reason</th>
                        <th scope="col">Patient's Name</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Address</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataPatient && dataPatient.length > 0 ? (
                        dataPatient.map((item, index) => {
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{item.timeType}</td>
                              <td>{item.email}</td>
                              <td>{item.reason}</td>
                              <td>{item.fullName}</td>
                              <td>{item.phoneNumber}</td>
                              <td>{item.address}</td>
                              <td>
                                <button
                                  className="button-90"
                                  onClick={() =>
                                    this.confirmBookingAccept(item)
                                  }
                                >
                                  Confirm
                                </button>
                                <button
                                  className="button-90"
                                  onClick={() =>
                                    this.confirmBookingDenied(item)
                                  }
                                >
                                  Denied
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6">No Data</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);