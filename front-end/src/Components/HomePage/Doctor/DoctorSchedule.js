import React, { Component } from "react";
import "./DoctorSchedule.scss";
import moment from "moment";
import { getDetailsSchedule, getCountSchedule } from "../../../ApiServices/api";
import ModelBooking from "./ModalBooking";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDay: [],
      availableTime: [],
      isOpen: false,
      dataSchedule: {},
    };
  }

  async componentDidMount() {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      obj.label = moment(new Date()).add(i, "days").format("ddd - DD/MM");
      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(obj);
    }
    if (this.props.doctorId) {
      let res = await getDetailsSchedule(
        this.props.doctorId,
        moment(new Date()).add("days").startOf("day").valueOf()
      );
      if (res && res.data.errCode === 0) {
        this.setState({
          availableTime: res.data.dataSchedule,
        });
      }
    }
    this.setState({ allDay: arrDate });
    console.log("aaaaa", arrDate);
  }

  handleOnchangeSelect = async (event) => {
    if (this.props.doctorId) {
      let doctorId = this.props.doctorId;
      let date = event.target.value;
      let res = await getDetailsSchedule(doctorId, date);
      if (res && res.data.errCode === 0) {
        this.setState({
          availableTime: res.data.dataSchedule,
        });
      }
    }
  };

  OpenModal = async (time) => {
    let a = await getCountSchedule(time);
    if (a.data.errCode === 1) {
      alert("The doctor can not examine in the time slot !!!");
    } else {
      this.setState({
        isOpen: true,
        dataSchedule: time,
      });
    }
  };

  CloseModal = () => {
    this.setState({
      isOpen: false,
    });
  };
  render() {
    let { allDay, availableTime } = this.state;
    return (
      <>
        <div className="schedule-container">
          <div className="Allschedule">
            <select onChange={(event) => this.handleOnchangeSelect(event)}>
              {allDay &&
                allDay.length > 0 &&
                allDay.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="allTime">
            <div className="text_calendar">
              <i className="fas fa-calendar-alt">
                <span>Schedule</span>
              </i>
            </div>
            <div className="time-content">
              {availableTime && availableTime.length ? (
                availableTime.map((item, index) => {
                  return (
                    <>
                      <button
                        key={index}
                        className="btn btn-warning"
                        onClick={() => this.OpenModal(item)}
                      >
                        {item.timeType}
                      </button>
                    </>
                  );
                })
              ) : (
                <div>No TimeSLot in this day</div>
              )}
            </div>
          </div>
        </div>
        <ModelBooking
          isOpen={this.state.isOpen}
          CloseModal={this.CloseModal}
          dataSchedule={this.state.dataSchedule}
        />
      </>
    );
  }
}

export default DoctorSchedule;
