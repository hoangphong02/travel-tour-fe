import React from "react";
import Slider from "react-slick";
import banner1 from '~/assets/logo/image3.jpg';
import banner2 from '~/assets/logo/image3.jpg';
import banner3 from '~/assets/logo/image3.jpg';
import { CSArrowNarrowLeftNavigational, CSArrowRightNavigational, CSChevronLeftNavigational, CSChevronRightNavigational } from "~/components/iconography/Navigational";
const Banner = () => {
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
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <div>
        <Slider {...settings}>
      <img
        src={banner1}
        alt=""
        style={{ width: '100%', height: 'auto', overflow: 'hidden' }}
      />
      <img
        src={banner2}
        alt=""
        style={{ width: '100%', height: 'auto', overflow: 'hidden' }}
      />
      <img
        src={banner3}
        alt=""
        style={{ width: '100%', height: 'auto', overflow: 'hidden' }}
      />
    </Slider>
    </div>
  );
}

export default Banner;