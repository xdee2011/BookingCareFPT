import React, { Component } from "react";
import { connect } from "react-redux";
import "./AdminHome.scss";
import SideNav from "./layout/SideNav";
import { createNewUser, EditAnUser } from "../../ApiServices/api";
import Error_Page from "./layout/ErrorPage";
import TableUser from "./TableUser";

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      phone: "",
      image: "",
      gender: "",
      role: "",
      position: "",
      fullname: "",
      action: "CREATE",
      id: "",
      previewURLImg: "",
    };
  }

  async componentDidMount() {}

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }; //https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript

  handleImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await this.getBase64(file);
      let obj = URL.createObjectURL(file);
      this.setState({
        previewURLImg: obj,
        image: base64,
      });
    }
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };

  ClickBtn = async () => {
    if (this.state.action === "EDIT") {
      let b = await EditAnUser({
        id: this.state.id,
        email: this.state.email,
        fullName: this.state.fullname,
        password: this.state.password,
        role: this.state.role,
        position: this.state.position,
        gender: this.state.gender,
        phone: this.state.phone,
        image: this.state.image,
      });
      if (b.data.errCode === 0) {
        alert("Save User Successfully");
      } else {
        alert("Failed to save");
      }
    }

    if (this.state.action === "CREATE") {
      let a = await createNewUser({
        email: this.state.email,
        fullName: this.state.fullname,
        password: this.state.password,
        role: this.state.role,
        position: this.state.position,
        gender: this.state.gender,
        phone: this.state.phone,
        image: this.state.image,
      });
      if (a.data.errCode === 0) {
        this.setState({
          email: "",
          password: "",
          phone: "",
          image: "",
          gender: "",
          role: "",
          position: "",
          fullname: "",
          action: "CREATE",
          previewURLImg: "",
        });
        alert("Save User Successfully");
        window.location.reload();
      } else {
        alert("Failed to save");
      }
    }
  };

  handleEditUserFromDad = async (user, action) => {
    this.setState({
      action: action,
    });
    if (user.image) {
      let a = await fetch(user.image);
      let res = await a.blob();
      let obj = URL.createObjectURL(res);
      this.setState({
        previewURLImg: obj,
      });
    }
    if (user.image == null || user.image == "") {
      this.setState({
        previewURLImg: "",
      });
    }
    this.setState({
      id: user.id,
      email: user.email,
      fullname: user.fullName,
      role: user.role,
      phone: user.phone,
      position: user.position,
      gender: user.gender,
      image: user.image,
      action: action,
    });
  };

  render() {
    let { email, password, phone, fullname, gender, role, position, action } =
      this.state;
    let dataRedux = this.props.dataRedux;
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
              <div class="row-3">
                <p>Click every input.</p>
              </div>
              <div class="row-3">
                <span>
                  <input
                    class="basic-slide"
                    id="name"
                    type="text"
                    value={email}
                    onChange={(event) => this.onChangeInput(event, "email")}
                    disabled={action === "EDIT" ? true : false}
                    placeholder="Input Email"
                  />
                  <label className="label" for="name">
                    Email
                  </label>
                </span>
                <span>
                  <input
                    class="basic-slide"
                    id="email"
                    type="password"
                    onChange={(event) => this.onChangeInput(event, "password")}
                    disabled={action === "EDIT" ? true : false}
                    placeholder="Input Password"
                  />
                  <label for="email">Password</label>
                </span>
                <span>
                  <input
                    class="basic-slide"
                    id="phone"
                    type="text"
                    value={fullname}
                    onChange={(event) => this.onChangeInput(event, "fullname")}
                  />
                  <label for="phone">Full Name</label>
                </span>
              </div>
              <div class="row-3">
                <span>
                  <input
                    class="gate"
                    id="class"
                    type="text"
                    value={phone}
                    onChange={(event) => this.onChangeInput(event, "phone")}
                  />
                  <label for="class">Phone</label>
                </span>
                <span>
                  <select
                    value={gender}
                    onChange={(event) => this.onChangeInput(event, "gender")}
                    className="form-control"
                  >
                    <option value="" disabled selected hidden>
                      Gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </span>
                <span>
                  <select
                    value={role}
                    onChange={(event) => this.onChangeInput(event, "role")}
                    className="form-control"
                  >
                    <option value="" disabled selected hidden>
                      Role
                    </option>
                    <option>Doctor</option>
                    <option>Admin</option>
                  </select>
                </span>
                <span>
                  <select
                    value={position}
                    onChange={(event) => this.onChangeInput(event, "position")}
                    className="form-control"
                  >
                    <option value="" disabled selected hidden>
                      Position
                    </option>
                    <option>Doctor</option>
                    <option>Proffesor</option>
                    <option>Master</option>
                    <option>Associate Proffesor</option>
                  </select>
                </span>
              </div>
              <div class="row-3">
                <input
                  class="custom-file-input"
                  type="file"
                  onChange={(event) => this.handleImg(event)}
                />
                <div
                  className="previewImage"
                  style={{
                    backgroundImage: `url(${this.state.previewURLImg})`,
                  }}
                ></div>

              </div>
              <button
                  onClick={() => this.ClickBtn()}
                  className={
                    action && action === "EDIT"
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                >
                  Save
                </button>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className="container">
              <TableUser handleEditUserFromDad={this.handleEditUserFromDad} />
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
export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
