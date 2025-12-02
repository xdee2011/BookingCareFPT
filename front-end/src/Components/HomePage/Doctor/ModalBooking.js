import React, { Component } from "react";
import { Modal } from "reactstrap";
import "./ModalBooking.scss";
import { getInfoDoctor } from "../../../ApiServices/api";
import { confirmBooking } from "../../../ApiServices/api";
import DatePicker from "react-datepicker";
import moment from "moment";

class ModelBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: "",
      dataTime: "",
      price: "",
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      genders: "",
      genderSelect: "",
      doctorId: "",
      date: new Date(),
      startDate: new Date(),
      timeType: "",
    };
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.dataSchedule !== this.props.dataSchedule) {
      let dataSchedule = this.props.dataSchedule;
      let data = await getInfoDoctor(dataSchedule.doctorId);

      this.setState({
        price: data.data.data.infoData.price,
        dataProfile: data.data.data,
        doctorId: dataSchedule.doctorId,
        timeType: dataSchedule.timeType,
        date: dataSchedule.date,
      });
    }
  }

  buildDataGender = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((item) => {
        let obj = {};
        obj.label = item.valueVi;
        obj.value = item.keyMap;
        result.push(obj);
      });
    }
    return result;
  };

  renderTimeBooking = (dataTime) => {
    let date = moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY");
    let time = dataTime.timeType;
    return `${time}----${date} `;
  };

  OnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleBooking = async () => {
    let timeString = this.renderTimeBooking(this.props.dataSchedule);
    let doctorName = this.props.dataSchedule.doctorData.fullName;

    let res = await confirmBooking({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataSchedule.date,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      timeString: timeString,
      doctorName: doctorName,
    });
    if (res && res.data.errCode === 0) {
      alert("Booking Successfully");
      this.props.CloseModal();
    } else {
      alert("Failed");
    }
  };

  setStartDate = (date) => {
    this.setState({
      startDate: date,
    });
  };

  render() {
    let { isOpen, dataSchedule } = this.props;
    let { startDate, price } = this.state;
    return (
      <>
        <div>
          <Modal
            isOpen={isOpen}
            className={"modal-container"}
            size="lg"
            centered
          >
            <div className="modal-content">
              <div className="modal-header">
                <span className="left">Booking Schedule Information</span>
                <span className="right" onClick={this.props.CloseModal}>
                  <i className="fas fa-times"></i>
                </span>
              </div>
              <div className="modal-body">
                <div className="doctor-info">
                </div>
                <div className="price">Price: {price}</div>
                <div className="row">
                  <div className="col-6 form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.fullName}
                      onChange={(event) =>
                        this.OnChangeInput(event, "fullName")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>PhoneNumber</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.phoneNumber}
                      onChange={(event) =>
                        this.OnChangeInput(event, "phoneNumber")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.email}
                      onChange={(event) => this.OnChangeInput(event, "email")}
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>Contact Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.address}
                      onChange={(event) => this.OnChangeInput(event, "address")}
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>Time Slot</label>
                    <br></br>
                    <label>{dataSchedule.timeType}</label>
                  </div>
                  <div className="col-12 form-group">
                    <label>Reason</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.reason}
                      onChange={(event) => this.OnChangeInput(event, "reason")}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn-booking"
                  onClick={() => this.handleBooking()}
                >
                  Confirm
                </button>
                <button className="btn-cancel" onClick={this.props.CloseModal}>
                  Close
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </>
    );
  }
}

export default ModelBooking;
