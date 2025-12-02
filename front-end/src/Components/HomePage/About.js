import React, { Component } from "react";
import "./Medical.scss";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 2 },
};
const items = [
  <div className="item">
    <div className="background"></div>
    Musculoskeletal
  </div>,
  <div className="item">
    <div className="background"></div>
    Musculoskeletal
  </div>,
  <div className="item">
    <div className="background"></div>
    Musculoskeletal
  </div>,
  <div className="item">
    <div className="background"></div>
    Musculoskeletal
  </div>,
];

class About extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <>
        <div className="medical-container">
          <div className="address">
            <div className="content">About</div>
            <div>
              <AliceCarousel
                mouseTracking
                items={items}
                responsive={responsive}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default About;
