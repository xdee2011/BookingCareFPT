import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { getAllClinic } from "../../ApiServices/api";
import { Link } from "react-router-dom";
import './Specialty.scss'

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

class MedicalAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
      itemss: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.data.errCode === 0) {
      this.setState({
        dataSpecialty: res.data.data,
      });
      let a = this.state.dataSpecialty.map((item) => {
        return (
          <div className="item">
            <div className="background">
              <img className="background" src={item.image} />
            </div>
            <Link to={`/clinic-address/${item.id}`}>{item.name}</Link>
          </div>
        );
      });
      this.setState({
        itemss: a,
      });
    }
  }
  render() {
    let { itemss } = this.state;
    return (
      <>
        <div className="medical-container">
          <div className="specialty">
            <div className="content">Outstanding medical facility</div>
            <div>
              <AliceCarousel
                mouseTracking
                items={itemss}
                responsive={responsive}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MedicalAddress;
