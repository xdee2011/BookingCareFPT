import React, { Component } from "react";
import { Link } from "react-router-dom";
import SideNav from "../layout/SideNav";
import Error_Page from "../layout/ErrorPage";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { connect } from "react-redux";
import { createClinic } from "../../../ApiServices/api";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinicAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHtml: "",
      descriptionMarkdown: "",
      address: "",
      imageMap: "",
    };
  }

  componentDidMount() {}

  handleMapImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await this.getBase64(file);
      let obj = URL.createObjectURL(file);
      this.setState({
        previewURLImgMap: obj,
        imageMap: base64,
      });
    }
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHtml: html,
    });
  };

  handleImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await this.getBase64(file);
      let obj = URL.createObjectURL(file);
      this.setState({
        previewURLImg: obj,
        imageBase64: base64,
      });
    }
  };

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }; //https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript

  handleSaveNew = async () => {
    let res = await createClinic(this.state);
    console.log(res);
    if (res.data.errCode === 0) {
      alert("Save Specialty Successfully");
    } else {
      alert("Save Specialty Error");
    }
  };

  onChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
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
              <div className="manage-specialty-container">
                <div className="ms-title">Manage Medical Address</div>
                <div className="add-new-specialty row">
                  <div className="row-3">
                    <span>
                      <input
                        class="gate"
                        id="name"
                        type="text"
                        value={this.state.name}
                        onChange={(event) => this.onChangeInput(event, "name")}
                      />
                      <label className="label" for="name">
                        Name Clinic
                      </label>
                    </span>
                    <span>
                      <input
                        className="gate"
                        value={this.state.address}
                        onChange={(event) =>
                          this.onChangeInput(event, "address")
                        }
                      />
                      <label>Clinic Address</label>
                    </span>
                  </div>

                  <div className="col-6 form-group">
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
                  <div className="col-6 form-group">
                    <input
                      className="custom-file-input"
                      type="file"
                      onChange={(event) => this.handleMapImg(event)}
                    />
                    <div
                      className="previewImage"
                      style={{
                        backgroundImage: `url(${this.state.previewURLImgMap})`,
                      }}
                    ></div>
                  </div>
                  <div className="col-12">
                    <MdEditor
                      style={{ height: "500px" }}
                      renderHTML={(text) => mdParser.render(text)}
                      onChange={this.handleEditorChange}
                      value={this.state.descriptionMarkdown}
                    />
                  </div>
                  <div className="col-12">
                    <button
                      className="button-49"
                      onClick={() => this.handleSaveNew()}
                    >
                      Save
                    </button>
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
  return {
    LogOut: () => dispatch({ type: "LOG_OUT" }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageClinicAddress);
