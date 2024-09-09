import React, { useEffect } from "react";
import Banner from "./Banner";
import BannerTourTrending from "./BannerTourTrending";
import image1 from "~/assets/logo/image9.png";
import image4 from "~/assets/logo/image4.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserHomePage = () => {
  return (
    <div className="home-page">
      <div className="banner-introduce">
        <Banner />
      </div>

      <div className="list-tour-trending-month">
        <span className="title">TOUR NỔI BẬT TRONG THÁNG</span>
        <div className="banner-tour-trending-in-month">
          <BannerTourTrending />
        </div>
      </div>

      <div className="list-tour-main">
        <span className="title">TOUR CHÍNH</span>
        <div className="list-tour-main-body">
          <div className="list-tour-main-body-left">
            <div className="items">
              <img src={image1} />
              <div className="items-info">
                <span>ĐỊA ĐẠO CỦ CHI NỮA NGÀY</span>
                <span>Giá: 450.000 VND</span>
                <div className="btn-book">
                  <span>Đặt ngay</span>
                </div>
              </div>
            </div>
          </div>
          <div className="list-tour-main-body-right">
            <div className="list-tour-main-body-right-top">
              <div className="items">
                <img src={image1} />
                <div className="items-info">
                  <span>ĐỊA ĐẠO CỦ CHI NỮA NGÀY</span>
                  <span>Giá: 450.000 VND</span>
                  <div className="btn-book">
                    <span>Đặt ngay</span>
                  </div>
                </div>
              </div>
              <div className="items">
                <img src={image1} />
                <div className="items-info">
                  <span>ĐỊA ĐẠO CỦ CHI NỮA NGÀY</span>
                  <span>Giá: 450.000 VND</span>
                  <div className="btn-book">
                    <span>Đặt ngay</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="list-tour-main-body-right-bottom">
              <div className="items">
                <img src={image1} />
                <div className="items-info">
                  <span>ĐỊA ĐẠO CỦ CHI NỮA NGÀY</span>
                  <span>Giá: 450.000 VND</span>
                  <div className="btn-book">
                    <span>Đặt ngay</span>
                  </div>
                </div>
              </div>
              <div className="items">
                <img src={image1} />
                <div className="items-info">
                  <span>ĐỊA ĐẠO CỦ CHI NỮA NGÀY</span>
                  <span>Giá: 450.000 VND</span>
                  <div className="btn-book">
                    <span>Đặt ngay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="list-tour-options">
        <span className="title">DANH SÁCH TOUR</span>
        <div className="list-tour-options--content">
          <div className="option">
            <img src={image4} alt="" />
            <div className="option-info">
              <span>MIỀN TÂY TRONG NGÀY</span>
              <span>3 Tour</span>
            </div>
          </div>
          <div className="option">
            <img src={image4} alt="" />
            <div className="option-info">
              <span>MIỀN TÂY TRONG NGÀY</span>
              <span>3 Tour</span>
            </div>
          </div>
          <div className="option">
            <img src={image4} alt="" />
            <div className="option-info">
              <span>MIỀN TÂY TRONG NGÀY</span>
              <span>3 Tour</span>
            </div>
          </div>
          <div className="option">
            <img src={image4} alt="" />
            <div className="option-info">
              <span>MIỀN TÂY TRONG NGÀY</span>
              <span>3 Tour</span>
            </div>
          </div>
          <div className="option">
            <img src={image4} alt="" />
            <div className="option-info">
              <span>MIỀN TÂY TRONG NGÀY</span>
              <span>3 Tour</span>
            </div>
          </div>
        </div>
      </div>

      <div className="list-blog">
        <span className="title">BLOG</span>
        <div className="list-blog-body">
          <div className="blog-items">
            <img src={image1} alt="" />
            <span className="name">
              LÒ HỦ TIẾU TRUYỀN THỐNG CẦN THƠ - NÉT ĐẸP VĂN HÓA TRUYỀN THỐNG
            </span>
            <span className="des">
              Cần Thơ không chỉ nổi tiếng với những khu chợ nổi nhộn nhịp, những
              vườn trái cây trĩu quả mà còn níu chân du khách bởi hương vị đặc
              trưng của các món ăn miệt vườn. Trong đó, hủ tiếu đã trở thành
              biểu tượng ẩm thực của vùng đất này, thu hút du khách bởi hương vị
              thơm ngon và quy trình chế biến độc đáo.
            </span>
            <div className="btn-more">
              <span>Xem thêm</span>
            </div>
          </div>
          <div className="blog-items">
            <img src={image1} alt="" />
            <span>
              LÒ HỦ TIẾU TRUYỀN THỐNG CẦN THƠ - NÉT ĐẸP VĂN HÓA TRUYỀN THỐNG
            </span>
            <span>
              Cần Thơ không chỉ nổi tiếng với những khu chợ nổi nhộn nhịp, những
              vườn trái cây trĩu quả mà còn níu chân du khách bởi hương vị đặc
              trưng của các món ăn miệt vườn. Trong đó, hủ tiếu đã trở thành
              biểu tượng ẩm thực của vùng đất này, thu hút du khách bởi hương vị
              thơm ngon và quy trình chế biến độc đáo.
            </span>
            <div className="btn-more">
              <span>Xem thêm</span>
            </div>
          </div>
          <div className="blog-items">
            <img src={image1} alt="" />
            <span>
              LÒ HỦ TIẾU TRUYỀN THỐNG CẦN THƠ - NÉT ĐẸP VĂN HÓA TRUYỀN THỐNG
            </span>
            <span>
              Cần Thơ không chỉ nổi tiếng với những khu chợ nổi nhộn nhịp, những
              vườn trái cây trĩu quả mà còn níu chân du khách bởi hương vị đặc
              trưng của các món ăn miệt vườn. Trong đó, hủ tiếu đã trở thành
              biểu tượng ẩm thực của vùng đất này, thu hút du khách bởi hương vị
              thơm ngon và quy trình chế biến độc đáo.
            </span>
            <div className="btn-more">
              <span>Xem thêm</span>
            </div>
          </div>
          <div className="blog-items">
            <img src={image1} alt="" />
            <span>
              LÒ HỦ TIẾU TRUYỀN THỐNG CẦN THƠ - NÉT ĐẸP VĂN HÓA TRUYỀN THỐNG
            </span>
            <span>
              Cần Thơ không chỉ nổi tiếng với những khu chợ nổi nhộn nhịp, những
              vườn trái cây trĩu quả mà còn níu chân du khách bởi hương vị đặc
              trưng của các món ăn miệt vườn. Trong đó, hủ tiếu đã trở thành
              biểu tượng ẩm thực của vùng đất này, thu hút du khách bởi hương vị
              thơm ngon và quy trình chế biến độc đáo.
            </span>
            <div className="btn-more">
              <span>Xem thêm</span>
            </div>
          </div>
          <div className="blog-items">
            <img src={image1} alt="" />
            <span>
              LÒ HỦ TIẾU TRUYỀN THỐNG CẦN THƠ - NÉT ĐẸP VĂN HÓA TRUYỀN THỐNG
            </span>
            <span>
              Cần Thơ không chỉ nổi tiếng với những khu chợ nổi nhộn nhịp, những
              vườn trái cây trĩu quả mà còn níu chân du khách bởi hương vị đặc
              trưng của các món ăn miệt vườn. Trong đó, hủ tiếu đã trở thành
              biểu tượng ẩm thực của vùng đất này, thu hút du khách bởi hương vị
              thơm ngon và quy trình chế biến độc đáo.
            </span>
            <div className="btn-more">
              <span>Xem thêm</span>
            </div>
          </div>
          <div className="blog-items">
            <img src={image1} alt="" />
            <span>
              LÒ HỦ TIẾU TRUYỀN THỐNG CẦN THƠ - NÉT ĐẸP VĂN HÓA TRUYỀN THỐNG
            </span>
            <span>
              Cần Thơ không chỉ nổi tiếng với những khu chợ nổi nhộn nhịp, những
              vườn trái cây trĩu quả mà còn níu chân du khách bởi hương vị đặc
              trưng của các món ăn miệt vườn. Trong đó, hủ tiếu đã trở thành
              biểu tượng ẩm thực của vùng đất này, thu hút du khách bởi hương vị
              thơm ngon và quy trình chế biến độc đáo.
            </span>
            <div className="btn-more">
              <span>Xem thêm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
