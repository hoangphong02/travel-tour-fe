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
import { getAllTourRequest } from "~/redux/tour/actions";

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
  const {
    isGetAllTourRequest,
    isGetAllTourSuccess,
    isGetAllTourFailure,
    getAllTourState,
  } = useSelector((store) => store.tour);
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
    dispatch(
      getAllTourRequest({
        limit: 5,
      })
    );
  }, []);

  console.log("getAllCategoryTourState", getAllTourState);

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
            {getAllTourState?.data?.length
              ? getAllTourState?.data?.slice(0, 1)?.map((item) => {
                  return (
                    <div className="items">
                      <img
                        src={
                          item?.image?.find((image) => image.type === "banner")
                            ?.url
                        }
                        alt=""
                      />
                      <div className="items-info">
                        <div className="name">
                          <span>{item.category.name.toUpperCase()}</span>
                          <span>{item.name.toUpperCase()}</span>
                        </div>
                        <span>
                          Giá: {item.base_price_adult.toLocaleString("vi-VN")}{" "}
                          VND
                        </span>
                        <div className="btn-book">
                          <span>Đặt ngay</span>
                        </div>
                      </div>
                      <div className="bg"></div>
                    </div>
                  );
                })
              : null}
          </div>
          <div className="list-tour-main-body-right">
            <div className="list-tour-main-body-right-top">
              {getAllTourState?.data?.length
                ? getAllTourState?.data?.slice(1, 3)?.map((item) => {
                    return (
                      <div className="items">
                        <img
                          src={
                            item?.image?.find(
                              (image) => image.type === "banner"
                            )?.url
                          }
                          alt=""
                        />
                        <div className="items-info">
                          <div className="name">
                            <span>{item.category.name.toUpperCase()}</span>
                            <span>{item.name.toUpperCase()}</span>
                          </div>
                          <span>
                            Giá: {item.base_price_adult.toLocaleString("vi-VN")}{" "}
                            VND
                          </span>
                          <div className="btn-book">
                            <span>Đặt ngay</span>
                          </div>
                        </div>
                        <div className="bg"></div>
                      </div>
                    );
                  })
                : null}
            </div>

            <div className="list-tour-main-body-right-bottom">
              {getAllTourState?.data?.length
                ? getAllTourState?.data?.slice(3, 5)?.map((item) => {
                    return (
                      <div className="items">
                        <img
                          src={
                            item?.image?.find(
                              (image) => image.type === "banner"
                            )?.url
                          }
                          alt=""
                        />
                        <div className="items-info">
                          <div className="name">
                            <span>{item.category.name.toUpperCase()}</span>
                            <span>{item.name.toUpperCase()}</span>
                          </div>
                          <span>
                            Giá: {item.base_price_adult.toLocaleString("vi-VN")}{" "}
                            VND
                          </span>
                          <div className="btn-book">
                            <span>Đặt ngay</span>
                          </div>
                        </div>
                        <div className="bg"></div>
                      </div>
                    );
                  })
                : null}
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
