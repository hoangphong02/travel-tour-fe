import React, { useEffect, useState } from "react";
import OptionTour from "./OptionTour";
import CommentTour from "./CommentTour";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { getDetailTourRequest } from "~/redux/tour/actions";

const TourDetailPage = () => {
  const [option, setOption] = useState("program");
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChangeOption = (value) => {
    setOption(value);
  };
  const { id } = useParams();
  const {
    isGetDetailTourRequest,
    isGetDetailTourSuccess,
    isGetDetailTourFailure,
    getDetailTourState,
  } = useSelector((store) => store.tour);
  useEffect(() => {
    if (id) {
      dispatch(getDetailTourRequest({ id: id }));
    }
  }, [id]);
  const handleBooking = (id) => {
    history.push(`/booking/${id}`);
  };

  return (
    <div className="tour-detail-page-wrapper">
      <div className="tour-detail-page-wrapper-top">
        <span className="name-tour">{getDetailTourState?.data?.name}</span>
        <span className="price-tour">
          Giá tour gốc:{" "}
          <span className="price">
            {getDetailTourState?.data?.base_price_adult.toLocaleString("vi-VN")}{" "}
            VNĐ
          </span>
        </span>
        <div
          className="btn-book-tour"
          onClick={() => handleBooking(getDetailTourState?.data?._id)}
        >
          <span>Đặt ngay</span>
        </div>
      </div>

      <div className="tour-detail-page-wrapper-body">
        <div className="tour-detail-page-wrapper-body-list-option">
          <div
            className={`option ${option === "program" ? "active" : ""}`}
            onClick={() => handleChangeOption("program")}
          >
            <span>Chương trình tour</span>
          </div>
          <div
            className={`option ${option === "priceTable" ? "active" : ""}`}
            onClick={() => handleChangeOption("priceTable")}
          >
            <span>Bảng giá</span>
          </div>
          <div
            className={`option ${option === "information" ? "active" : ""}`}
            onClick={() => handleChangeOption("information")}
          >
            <span>Thông tin tour</span>
          </div>
          <div
            className={`option ${option === "overview" ? "active" : ""}`}
            onClick={() => handleChangeOption("overview")}
          >
            <span>Tổng quan tour</span>
          </div>
          {/* <div
            className={`option ${option === "require" ? "active" : ""}`}
            onClick={() => handleChangeOption("require")}
          >
            <span>Điều kiện tour</span>
          </div> */}
          <div
            className={`option ${option === "picture" ? "active" : ""}`}
            onClick={() => handleChangeOption("picture")}
          >
            <span>Hình ảnh tour</span>
          </div>
        </div>
      </div>
      <div className="list-option-tour">
        <OptionTour option={option} setOption={setOption} />
      </div>
      <div>
        <CommentTour />
      </div>
    </div>
  );
};

export default TourDetailPage;
