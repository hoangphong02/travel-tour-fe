import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import banner1 from "~/assets/logo/image3.jpg";
import RenderQuillItem from "~/components/common/RenderQuill";
import { getDetailBlogsRequest } from "~/redux/blog/actions";
import { getAllTourMainRequest } from "~/redux/tour/actions";

const BlogDetailPage = () => {
  const {
    isGetDetailBlogRequest,
    isGetDetailBlogSuccess,
    isGetDetailBlogFailure,
    getDetailBlogState,
  } = useSelector((store) => store.blog);
  const [isScrollSectionRight, setIsScrollSectionRight] = useState(false);
  const [isScrollRight, setIsScrollRight] = useState(true);
  const ref = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (id) {
      dispatch(getDetailBlogsRequest({ id }));
    }
  }, [id]);

  const { getAllTourMainState } = useSelector((store) => store.tour);

  useEffect(() => {
    dispatch(
      getAllTourMainRequest({
        limit: 5,
      })
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // vị trí cuộn hiện tại từ đầu trang
      const windowHeight = window.innerHeight; // chiều cao của cửa sổ trình duyệt
      const fullHeight = document.documentElement.scrollHeight; // tổng chiều cao của nội dung trang

      if (ref.current) {
        const rightSectionRect = ref.current.getBoundingClientRect();

        // Kiểm tra nếu phần tử đã được cuộn vào tầm nhìn
        if (scrollTop > rightSectionRect.top + window.scrollY) {
          setIsScrollSectionRight(true);
        } else {
          setIsScrollSectionRight(false);
        }

        // Kiểm tra nếu khoảng cách từ cuối trang tới vị trí cuộn nhỏ hơn hoặc bằng 400px
        if (fullHeight - (scrollTop + windowHeight) <= 400) {
          setIsScrollRight(false); // tắt position fixed khi cách cuối trang 400px
        } else {
          if (
            fullHeight - (scrollTop + windowHeight) > 400 &&
            window.scrollY < 130
          ) {
            setIsScrollRight(true); // bật position fixed khi chưa tới cuối trang
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="introduce-page-wrapper">
      <div className="introduce-page-wrapper-body">
        <div className="introduce-page-wrapper-body-left">
          <div className="bottom">
            <div className="name-company">
              <span>{getDetailBlogState?.data?.name}</span>
            </div>

            <RenderQuillItem detail={getDetailBlogState?.data?.description} />

            <div className="image-about-us">
              <img src={getDetailBlogState?.data?.image[0]?.url} />
            </div>

            <div className="form-comment">
              <div className="form-comment-body">
                <div>
                  <span style={{ fontSize: "20px", fontWeight: "600" }}>
                    BÌNH LUẬN BÀI VIẾT
                  </span>
                </div>

                <div className="section-1">
                  <div>
                    <span style={{ fontSize: "18px", fontWeight: "600" }}>
                      1. Nhập họ tên
                    </span>
                    <input type="text" />
                  </div>
                  <div>
                    <span style={{ fontSize: "18px", fontWeight: "600" }}>
                      2. Nhập email
                    </span>
                    <input type="text" />
                  </div>
                  <div>
                    <span style={{ fontSize: "18px", fontWeight: "600" }}>
                      3. Nhập số điện thoại
                    </span>
                    <input type="text" />
                  </div>
                </div>
                <div className="section-2">
                  <div>
                    <span style={{ fontSize: "18px", fontWeight: "600" }}>
                      4. Viết nhận xét của bạn vào bên dưới
                    </span>
                    <textarea type="text" className="message" />
                  </div>
                </div>
                <div className="section-3">
                  <div className="btn-send">
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "rgb(156 204 219)",
                      }}
                    >
                      GỬI NGAY
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="introduce-page-wrapper-body-right">
          <div
            className={`introduce-page-wrapper-body-right-body ${isScrollRight ? "scroll-section-right" : ""}`}
            ref={ref}
          >
            <div className="title">
              <span>TOUR DU LỊCH XEM NHIỀU</span>
            </div>
            <div className="list-tour">
              {getAllTourMainState?.data?.map((item, index) => {
                return (
                  <div
                    className="tour"
                    key={index}
                    onClick={() => history.push(`/tour-detail/${item?._id}`)}
                  >
                    <img
                      src={
                        item?.image?.find((image) => image.type === "banner")
                          ?.url
                      }
                      alt=""
                    />
                    <div>
                      <span>{item?.name}</span>
                      <span>
                        Giá:{" "}
                        <span className="price">
                          {item?.base_price_adult?.toLocaleString("vi-VN")} VNĐ
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
