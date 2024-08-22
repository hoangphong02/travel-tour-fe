import React from "react";
import Slider from "react-slick";
import banner1 from '~/assets/logo/image3.jpg';
import banner2 from '~/assets/logo/image3.jpg';
import banner3 from '~/assets/logo/image3.jpg';
import { CSChevronLeftNavigational, CSChevronRightNavigational } from "~/components/iconography/Navigational";
const BannerTourTrending = () => {
    function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    > <CSChevronRightNavigational/> </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    > <CSChevronLeftNavigational /> </div>
  );
}
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <div>
        <Slider {...settings}>
            <div className="item-tour-trending">
            <img
                src={banner1}
                alt=""
                style={{ width: '100%', height: 'auto', overflow: 'hidden' }}
            />
            <div className="info-tour">
                <span>ĐỊA ĐẠO CỦ CHI NỮA NGÀY</span>
                <span>Giá: 450.000 VND</span>
                <div className="btn-book">
                    <span>Đặt ngay</span>
                </div>
            </div>
            </div>
       <div className="item-tour-trending">
            <img
                src={banner1}
                alt=""
                style={{ width: '100%', height: 'auto', overflow: 'hidden' }}
            />
            <div className="info-tour">
                <span>ĐỊA ĐẠO CỦ CHI NỮA NGÀY</span>
                <span>Giá: 450.000 VND</span>
                <div className="btn-book">
                    <span>Đặt ngay</span>
                </div>
            </div>
            </div>
       <div className="item-tour-trending">
            <img
                src={banner1}
                alt=""
                style={{ width: '100%', height: 'auto', overflow: 'hidden' }}
            />
            <div className="info-tour">
                <span>ĐỊA ĐẠO CỦ CHI NỮA NGÀY</span>
                <span>Giá: 450.000 VND</span>
                <div className="btn-book">
                    <span>Đặt ngay</span>
                </div>
            </div>
            </div>
    </Slider>
    </div>
  );
}

export default BannerTourTrending;