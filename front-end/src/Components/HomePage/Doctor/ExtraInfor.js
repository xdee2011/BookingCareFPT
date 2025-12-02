import React, { Component } from "react";
import "./ExtraInfor.scss";
import { getInfoDoctor } from "../../../ApiServices/api";
import { Link } from "react-router-dom";
class ExtraDataDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetails: false,
      extraInfo: "",
      price: "",
      payment: "",
      province: "",
    };
  }

  onClickShowHide = () => {
    this.setState({ isShowDetails: !this.state.isShowDetails });
  };

  async componentDidMount() {
    let data = await getInfoDoctor(this.props.doctorId);
    let price = data.data.data.infoData.price;
    let payment = data.data.data.infoData.payment;
    let province = data.data.data.infoData.province;
    if (data && data.data.errCode === 0 && price && payment && province) {
      this.setState({
        extraInfo: data.data.data.infoData,
        price: price,
        payment: payment,
        province: province,
      });
    }
  }
  render() {
    let { isShowDetails, extraInfo, payment, price } = this.state;

    return (
      <>
        <div className="extra-container">
          <div className="content-up">
            <div className="address">ADDRESS OF EXAMINATION</div>
            <div className="name">
              <Link to={`/clinic-address/${extraInfo.clinicId}`}>
                {extraInfo.nameClinic}
              </Link>
            </div>
            <div className="details-address">{extraInfo.addressClinic}</div>
          </div>
          <div className="content-down">
            {isShowDetails === false && (
              <div>
                Price for Examine: {price}.
                <span onClick={() => this.onClickShowHide()}>
                  ---- See Details
                </span>
              </div>
            )}
            {isShowDetails === true && (
              <>
                <div className="title-price">Price for Examine</div>
                <div className="details-info">
                  <div className="price">
                    <span className="left">Price for Examine</span>
                    <span className="right"> {price}</span>
                    <div className="note">
                      The clinic has payment in the form of {payment}
                    </div>
                  </div>
                </div>

                <div className="hide">
                  <span onClick={() => this.onClickShowHide()}>
                    Hide
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default ExtraDataDoctor;
