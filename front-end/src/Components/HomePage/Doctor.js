import React, { Component } from "react";
import "./Doctor.scss";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { getTopDoctor } from "../../ApiServices/api";
import { Link } from "react-router-dom";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTopDocs: [],
      itemss: [],
      previewURLImg: "",
    };
  }
  async componentDidMount() {
    let top = await getTopDoctor();
    let arrTopDocs = top.data.data.filter((item) => {
      if (item.infoData) return item.infoData.topDoc === "true";
    });
    this.setState({
      arrTopDocs: arrTopDocs,
    });
    let a = this.state.arrTopDocs.map((item) => {
      return (
        <div className="item">
          <Link to={`/details-doctor/${item.id}`}>
            <div className="background">
              <div className="all">
                <div className="gather">
                  <img className="avatar" src={item.image} />
                  <div className="name">
                    {item.role}, {item.position}, {item.fullName}
                  </div>
                  Bệnh viện việt đức
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    });
    this.setState({
      itemss: a,
    });
  }
  render() {
    return (
      <>
        <div className="doc">
          <div className="content">Outstanding doctor</div>
          <div>
            <AliceCarousel
              mouseTracking
              items={this.state.itemss}
              responsive={responsive}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Doctor;
