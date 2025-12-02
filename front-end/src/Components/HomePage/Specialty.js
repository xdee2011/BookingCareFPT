import React, { Component } from "react";
import "./Specialty.scss";
import AliceCarousel from "react-alice-carousel";
import { getSpecialty } from "../../ApiServices/api";
import { Link } from "react-router-dom";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
      itemss: [],
    };
  }

  async componentDidMount() {
    let res = await getSpecialty();
    console.log(res.data.data);
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
            <Link to={`/specialty-details/${item.id}`}>{item.name}</Link>
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
        <div className="specialty">
          <div className="content">Popular specialties</div>
          <div>
            <AliceCarousel
              mouseTracking
              items={itemss}
              responsive={responsive}
            />
          </div>
        </div>
      </>
    );
  }
}
export default Specialty;
