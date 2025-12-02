import React, { Component } from "react";
import "./Media.scss";

class Social extends Component {
  componentDidMount() {}
  render() {
    return (
      <>
        <div className="doc">
          <div className="content">Media talk about BookingCare</div>
          <div className="gather-together">
            <div className="iframe">
              <iframe
                src="https://www.youtube.com/embed/FyDQljKtWnI"
                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div className="mediaImg">
              <a href="https://vtc.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-ar434101.html">
                <img
                  width="700px"
                  src="https://scontent.fhan1-1.fna.fbcdn.net/v/t1.15752-9/315924903_1347963272698279_519940563041366840_n.png?_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=EgBll6LOkUAAX_k1x_L&_nc_ht=scontent.fhan1-1.fna&oh=03_AdRDxAdgZvH0rwFXjEI9JU9_WHcVtzvnEK7ZXFivpDBGPw&oe=63AF8934"
                />
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Social;
