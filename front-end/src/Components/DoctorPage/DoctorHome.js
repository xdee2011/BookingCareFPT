import React, { Component } from "react";
import { connect } from "react-redux";
// import "./AdminHome.scss";
import SideNav from "../AdminPage/layout/SideNav";
import Error_Page from "../AdminPage/layout/ErrorPage";
import "./DoctorHome.scss";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SaveSchedule } from "../../ApiServices/api";

class DoctorHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewURLImg: "",
      date: new Date(),
      startDate: new Date(),
      checked: false,
      allDay: "",
      user: "",
      ScheduleArr: [
        { checked: true, value: "11:00 AM - 12:00 AM" },
        { checked: true, value: "10:00 AM - 11:00 AM" },
        { checked: true, value: "9:00 AM - 10:00 AM" },
        { checked: true, value: "8:00 AM - 9:00 AM" },
        { checked: true, value: "14:00 PM - 15:00 PM" },
        { checked: true, value: "15:00 PM - 16:00 PM" },
        { checked: true, value: "16:00 PM - 17:00 PM" },
        { checked: true, value: "17:00 PM - 18:00 PM" },
      ],
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
    this.setState({ allDay: arrDate });
    let dataRedux = this.props.dataRedux.user;
    this.setState({
      user: dataRedux,
    });
    if (dataRedux.image) {
      let a = await fetch(dataRedux.image);
      let res = await a.blob();
      let obj = URL.createObjectURL(res);
      this.setState({
        previewURLImg: obj,
      });
    }
    if (dataRedux.image == null || dataRedux.image == "") {
      this.setState({
        previewURLImg: "",
      });
    }
  }

  handleCheckboxChange = (event, data) => {
    if (event.target.checked) {
      data.checked = this.state.checked;
    } else if (!event.target.checked) {
      data.checked = !this.state.checked;
    }
  };

  setStartDate = async (date) => {
    await this.componentDidMount();
    this.setState({
      startDate: date,
    });
  };

  handleSave = async () => {
    let oo = this.state.allDay.map((item) => {
      return item.value;
    });
    console.log(oo);
    let { user, startDate, ScheduleArr } = this.state;
    let a = new Date(startDate).toISOString().slice(0, 10);
    let o = new Date(a);
    let timestamp = o.getTime();
    let b = moment(startDate).startOf("day").valueOf();
    let selectedTime = ScheduleArr.filter((item) => item.checked === false);
    let timeType = selectedTime.map((item) => {
      return item.value;
    });
    console.log(timeType);
    let scheduleArray = [];
    timeType.map((schedule) => {
      oo.map((item) => {
        let obj = {};
        obj.date = "" + item;
        obj.timeType = schedule;
        obj.doctorId = user.id;
        scheduleArray.push(obj);
      });
    });
    console.log(scheduleArray);
    let res = await SaveSchedule({
      scheduleArray,
    });
    if (res.data.errCode === 0) {
      alert("Save TimeSLot Successfully");
    }
  };

  render() {
    let dataRedux = this.props.dataRedux;
    let { date, startDate, ScheduleArr,allDay } = this.state;
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
              <section className="section">
                <div className="container">
                  <div className="row">
                    <h1 className="text-center">
                      <span>Manage Schedule</span>
                    </h1>

                    <div className="col-md-4">
                      <div className="card profile-card-2">
                        <div className="card-img-block">
                          <img
                            className="img-fluid"
                            src="https://images.pexels.com/photos/946351/pexels-photo-946351.jpeg?w=500&h=650&auto=compress&cs=tinysrgb"
                            alt="Card image cap"
                          />
                        </div>
                        <div className="card-body pt-5">
                          <img
                            src={dataRedux.user.image}
                            alt="profile-image"
                            className="profile"
                          />
                          <h5 className="card-title">
                            {dataRedux.user.fullName}
                          </h5>
                          <p className="card-text">
                            Email: {dataRedux.user.email}
                          </p>
                          <div className="icon-block">
                            <span>Phone Number: {dataRedux.user.phone}</span>
                            <br></br>
                            <span>Gender: {dataRedux.user.gender}</span>
                            <br></br>
                            <span>Position: {dataRedux.user.position}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div>Note: Choose TimeSLot for 7 below day</div>
                      <br></br>
                      <div className="Allschedule">
                        <select
                          onChange={(event) => this.handleOnchangeSelect(event)}
                        >
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
                    </div>
                    <div className="col-md-4">
                      <section className="app">
                        {ScheduleArr &&
                          ScheduleArr.map((item) => {
                            return (
                              <>
                                <article class="feature1">
                                  <input
                                    type="checkbox"
                                    id="feature1"
                                    value={item.value}
                                    onChange={(event) =>
                                      this.handleCheckboxChange(event, item)
                                    }
                                  />
                                  <div>
                                    <span>{item.value}</span>
                                  </div>
                                </article>
                              </>
                            );
                          })}
                      </section>
                    </div>
                  </div>
                </div>
                <center>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.handleSave()}
                  >
                    Save
                  </button>
                </center>
              </section>
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
export default connect(mapStateToProps, mapDispatchToProps)(DoctorHome);
