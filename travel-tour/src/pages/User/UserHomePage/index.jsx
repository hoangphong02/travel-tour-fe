import React, { useEffect } from "react";
import Banner from "./Banner";
import BannerTourTrending from "./BannerTourTrending";
import image1 from "~/assets/logo/image9.png";
import image4 from "~/assets/logo/image4.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryTourRequest } from "~/redux/categoryTour/actions";
import { getAllCategoryRequest } from "~/redux/categoryBlog/actions";
import { getAllBlogsRequest } from "~/redux/blog/actions";

const UserHomePage = () => {
  const {
    isGetAllCategoryTourRequest,
    isGetAllCategoryTourSuccess,
    isGetAllCategoryTourFailure,
    getAllCategoryTourState,
  } = useSelector((store) => store.categoryTour);
  const {
    isGetAllCategoryRequest,
    isGetAllCategorySuccess,
    isGetAllCategoryFailure,
    getAllCategoryState,
  } = useSelector((store) => store.categoryBlog);
  const {
    isGetAllBlogsRequest,
    isGetAllBlogsSuccess,
    isGetAllBlogsFailure,
    getAllBlogsState,
  } = useSelector((store) => store.blog);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAllCategoryTourRequest({
        limit: 5,
      })
    );
    dispatch(
      getAllCategoryRequest({
        limit: 5,
      })
    );
    dispatch(
      getAllBlogsRequest({
        limit: 6,
      })
    );
  }, []);

  console.log("getAllCategoryTourState", getAllBlogsState);

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
          {getAllCategoryTourState?.data?.length
            ? getAllCategoryTourState?.data?.map((item, index) => {
                return (
                  <div className="option" key={index}>
                    <img src={item?.thumbnail} alt="" />
                    <div className="option-info">
                      <span>{item.name}</span>
                      <span>3 Tour</span>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      <div className="list-blog">
        <span className="title">BLOG</span>
        <div className="category-blog">
          {getAllCategoryState?.data?.map((item) => {
            return (
              <div className="category-blog-item">
                <img
                  src={item.thumbnail}
                  alt=""
                  style={{ width: "100%", height: "auto", overflow: "hidden" }}
                />
                <div className="info-blog">
                  <span className="name">{item.name.toUpperCase()}</span>
                  <div className="btn-more">
                    <span>Xem thêm</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="list-blog-body">
          {getAllBlogsState?.data?.length
            ? getAllBlogsState?.data?.map((item) => {
                return (
                  <div className="blog-items">
                    <img src={item.image[0].url} alt="" />
                    <span className="name">{item.name}</span>
                    <span className="des">{item.title}</span>
                    <div className="btn-more">
                      <span>Xem thêm</span>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
