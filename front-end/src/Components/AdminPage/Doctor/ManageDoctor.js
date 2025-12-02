import React, { Component } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import "./ManageDoctor.scss";
import "../layout/SideNav";
import {
  getAllDoctors,
  postDoctorInfo,
  getSpecialty,
  getAllClinic,
} from "../../../ApiServices/api";
import { connect } from "react-redux";
import Error_Page from "../layout/ErrorPage";
import SideNav from "../layout/SideNav";
import { getInfoDoctor } from "../../../ApiServices/api";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docs: [],
      selectedOption: "",
      oldData: false,
      contentMarkdown: "",
      contentHtml: "",
      listPrice: [],
      listPayment: [],
      listProvince: [],
      description: "",
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      topDoc: "",
    };
  }

  handleSaveDetails = async () => {
    let oldData = this.state.oldData;
    let res = await postDoctorInfo({
      contentMarkdown: this.state.contentMarkdown,
      contentHtml: this.state.contentHtml,
      doctorId: this.state.selectedOption.value,
      description: this.state.description,
      action: oldData === false ? "CREATE" : "EDIT",
      selectedPrice: this.state.selectedPrice,
      selectedPayment: this.state.selectedPayment,
      selectedProvince: this.state.selectedProvince,
      nameClinic: this.state.selectedClinic.label,
      clinicId: this.state.selectedClinic.value,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      topDoc: this.state.topDoc,
      specialtyId: this.state.selectedSpecialty.value,
    });
    if(res.data.errCode===0){
      alert('Save Doctor details successfully!!!');
    }
    else{
      alert('Save Doctor details falied!!!');
    }
  };

  async componentDidMount() {
    let docs = await getAllDoctors();
    let a = [];
    docs &&
      docs.data.data.map((item, index) => {
        let obj = {};
        obj.value = item.id;
        obj.label = item.fullName;
        a.push(obj);
      });

    let abc = await getSpecialty();
    let listSpecialty = [];
    let listClinic = [];
    let def = await getAllClinic();
    abc &&
      abc.data.data.map((item, index) => {
        let obj = {};
        obj.value = item.id;
        obj.label = item.name;
        listSpecialty.push(obj);
      });

    def &&
      def.data.data.map((item, index) => {
        let obj = {};
        obj.value = item.id;
        obj.label = item.name;
        listClinic.push(obj);
      });
    this.setState({
      docs: a,
      listSpecialty: listSpecialty,
      listClinic: listClinic,
    });
  }

  handleCheckboxChange = (event) => {
    if (event.target.checked) {
      this.setState({ topDoc: "true" });
    } else {
      this.setState({ topDoc: "false" });
    }
  };

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption: selectedOption });
    let doctor = await getInfoDoctor(selectedOption.value);
    let listSpecialty = this.state.listSpecialty;
    let listClinic = this.state.listClinic;
    if (doctor.data.data) {
      if (
        doctor.data.data.MarkDown === null &&
        doctor.data.data.infoData === null
      ) {
        this.setState({
          contentMarkdown: "",
          contentHtml: "",
          description: "",
          selectedPrice: "",
          selectedPayment: "",
          selectedProvince: "",
          selecetedClinic: "",
          selectedSpecialty: "",
          nameClinic: "",
          addressClinic: "",
          note: "",
          topDoc: "false",
          oldData: false,
          clinicId: "",
          specialtyId: "",
        });
      }
      if (
        doctor.data.data.MarkDown !== null &&
        doctor.data.data.infoData !== null
      ) {
        let b = listSpecialty.find(
          (item) => (item.value = doctor.data.data.infoData.specialtyId)
        );
    
        let c = listClinic.find(
          (item) => (item.value = doctor.data.data.infoData.clinicId)
        );
        this.setState({
          selectedSpecialty: b,
          contentMarkdown: doctor.data.data.MarkDown.contentMarkdown,
          contentHtml: doctor.data.data.MarkDown.contentHtml,
          description: doctor.data.data.MarkDown.description,
          selectedPrice: doctor.data.data.infoData.price,
          selectedPayment: doctor.data.data.infoData.payment,
          selectedProvince: doctor.data.data.infoData.province,
          selectedClinic: c,
          addressClinic: doctor.data.data.infoData.addressClinic,
          note: doctor.data.data.infoData.note,
          topDoc: doctor.data.data.infoData.topDoc,
          oldData: true,
        });
      }
    }
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHtml: html,
    });
  };

  handleOnChange = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleChangeSpecialty = async (selectedOption) => {
    this.setState({ selectedSpecialty: selectedOption });
  };

  handleChangeClinic = async (selectedOption) => {
    this.setState({ selectedClinic: selectedOption });
  };

  render() {
    let dataRedux = this.props.dataRedux;
    let oldData = this.state.oldData;
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
            <div className="bodyy">
              <div class="register">
                <div class="row">
                  <div class="col-md-10 register-right">
                    <div class="tab-content" id="myTabContent">
                      <div
                        class="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <h3 class="register-heading">
                          Add Doctor's Detail Informations
                        </h3>
                        <div class="row register-form">
                          <div class="col-md-6">
                            <div class="form-group">
                              <Select
                                className="select"
                                //   value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.docs}
                                placeholder={"Choose Doctor"}
                              />
                            </div>
                            <div class="form-group">
                              <Select
                                className="select"
                                value={this.state.selectedSpecialty}
                                onChange={this.handleChangeSpecialty}
                                options={this.state.listSpecialty}
                                placeholder={"Choose Specialty"}
                              />
                            </div>
                            <div class="form-group">
                              <input
                                type="text"
                                required={true}
                                className="form-control"
                                placeholder="Address"
                                onChange={(event) =>
                                  this.handleOnChange(event, "addressClinic")
                                }
                                value={this.state.addressClinic}
                              ></input>
                            </div>
                            <div class="form-group">
                              <select
                                value={this.state.selectedPrice}
                                onChange={(event) =>
                                  this.handleOnChange(event, "selectedPrice")
                                }
                                className="form-control"
                              >
                                <option value="" disabled selected hidden>
                                  Price Of Doctor
                                </option>
                                <option>100.000 vnd</option>
                                <option>150.000 vnd</option>
                                <option>200.000 vnd</option>
                                <option>250.000 vnd</option>
                              </select>
                            </div>
                            <div class="form-group">
                              <select
                                value={this.state.selectedPayment}
                                onChange={(event) =>
                                  this.handleOnChange(event, "selectedPayment")
                                }
                                className="form-control"
                              >
                                <option value="" disabled selected hidden>
                                  Payment Option
                                </option>
                                <option>VISA credit card</option>
                                <option>Banking</option>
                                <option>Cash</option>
                                <option>E-Wallet</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <select
                                value={this.state.selectedProvince}
                                onChange={(event) =>
                                  this.handleOnChange(event, "selectedProvince")
                                }
                                className="form-control"
                              >
                                <option>Hà Nội</option>
                                <option>Hồ Chí Minh</option>
                              </select>
                            </div>
                            <div class="form-group">
                              <Select
                                className="select"
                                value={this.state.selectedClinic}
                                onChange={this.handleChangeClinic}
                                options={this.state.listClinic}
                                placeholder={"Choose Medical Address"}
                              />
                            </div>
                            <div class="form-group">
                              <textarea
                                required
                                className="form-control"
                                rows="4"
                                onChange={(event) =>
                                  this.handleOnChange(event, "description")
                                }
                                value={this.state.description}
                              ></textarea>
                            </div>
                            <div class="form-group">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                checked={
                                  this.state.topDoc === "true" ? true : false
                                }
                                onChange={(event) =>
                                  this.handleCheckboxChange(event)
                                }
                              />
                              <label
                                class="form-check-label"
                                for="exampleCheck1"
                              >
                                Outstanding Doctor
                              </label>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <MdEditor
                              style={{ height: "500px" }}
                              renderHTML={(text) => mdParser.render(text)}
                              onChange={this.handleEditorChange}
                              value={this.state.contentMarkdown}
                            />
                            {oldData == true ? (
                              <button
                                type="submit"
                                class="btnRegister"
                                onClick={() => this.handleSaveDetails()}
                              >
                                Save Information
                              </button>
                            ) : (
                              <button
                                type="submit"
                                class="btnRegister"
                                onClick={() => this.handleSaveDetails()}
                              >
                                Add Information
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
