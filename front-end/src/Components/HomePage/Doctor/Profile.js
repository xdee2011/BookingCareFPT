import React, { Component } from "react";
import { getInfoDoctor } from "../../../ApiServices/api";
import './Profile.scss'
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: "",
      previewURLImg: "",
    };
  }

  async componentDidMount() {
    console.log(this.props.id);
    let doctor = await getInfoDoctor(this.props.id);
    this.setState({
      doctor: doctor.data.data,
    });
    console.log(this.state.doctor);
    if (this.state.doctor.image) {
      let a = await fetch(this.state.doctor.image);
      let res = await a.blob();
      let obj = URL.createObjectURL(res);
      this.setState({
        previewURLImg: obj,
      });
    }
  }
  render() {
    return (
      <>
        <div
          className="content-left section-doctor"
          style={{ backgroundImage: `url(${this.state.previewURLImg})` }}
        ></div>
        <div className="content-right">
          <div className="up">
            <span>{this.state.doctor.fullName}</span>
          </div>
          <div className="down">
            {this.state.doctor.MarkDown &&
              this.state.doctor.MarkDown.description && (
                <span>{this.state.doctor.MarkDown.description}</span>
              )}
          </div>
        </div>
      </>
    );
  }
}
export default Profile;
