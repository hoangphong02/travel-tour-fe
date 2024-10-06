import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { LIST_OPTION_RANK_HOTEL, ListTransport } from "~/constants";
import {
  createBookingRequest,
  resetCreateBooking,
} from "~/redux/booking/actions";
import { getDetailTourRequest } from "~/redux/tour/actions";

const BookingPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    isGetDetailTourRequest,
    isGetDetailTourSuccess,
    isGetDetailTourFailure,
    getDetailTourState,
  } = useSelector((store) => store.tour);
  const {
    isCreateBookingRequest,
    isCreateBookingSuccess,
    isCreateBookingFailure,
  } = useSelector((store) => store.booking);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (id === ":id") {
      history.push("/tour");
    } else {
      dispatch(getDetailTourRequest({ id: id }));
    }
  }, [id]);

  useEffect(() => {
    if (isCreateBookingSuccess) {
      toast.success("Đặt tour thành công");
      dispatch(resetCreateBooking());
    }
  }, [isCreateBookingSuccess]);

  const initialValues = {
    fullname: "",
    email: "",
    phone: "",
    address: "",
    note: "",
    adult_ticket: 0,
    child_ticket: 0,
    transactionId: "pending",
    start_date: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const {
        fullname,
        email,
        address,
        phone,
        note,
        adult_ticket,
        child_ticket,
        transactionId,
        start_date,
      } = values;
      const payload = {
        tour_id: id,
        fullname,
        hotel_level: getDetailTourState?.data?.hotel_level[0]?.star,
        email,
        phone,
        address,
        note,
        adult_ticket: Number(adult_ticket),
        child_ticket: Number(child_ticket),
        total_price: total,
        transactionId,
        start_date: moment(start_date).format("MM/DD/YYYY"),
        payment_method_name: "cash",
      };
      if (start_date) {
        payload.end_date = moment(start_date).add(
          getDetailTourState?.data?.schedules?.length,
          "days"
        );
      }
      console.log(payload);
      dispatch(createBookingRequest(payload));
    },
  });

  useEffect(() => {
    let price =
      Number(formik.values.adult_ticket) *
        getDetailTourState?.data?.base_price_adult +
      Number(formik.values.child_ticket) *
        getDetailTourState?.data?.base_price_child;
    setTotal(price);
  }, [formik.values.adult_ticket, formik.values.child_ticket]);

  console.log(getDetailTourState);

  return (
    <div className="booking-page-wrapper">
      <div className="booking-page-wrapper-left">
        <div className="booking-page-wrapper-left-section-1">
          <div className="top">
            <span className="title">DỊCH VỤ TOUR</span>
            {/* <Select options={options} defaultValue={options[0]} /> */}
          </div>
          <div className="bottom">
            <div className="tour-require">
              <span className="title">Tour yêu cầu</span>
              <input
                disabled
                type="text"
                placeholder="Tour yêu cầu"
                value={getDetailTourState?.data?.name}
              />
            </div>

            <div className="list-option">
              <div className="option">
                <span className="title">Khách sạn</span>
                {/* <Select
                  options={LIST_OPTION_RANK_HOTEL}
                  value={
                    LIST_OPTION_RANK_HOTEL.find(
                      (item) =>
                        item.value ===
                        getDetailTourState?.data?.hotel_level[0]?.star
                    )?.label
                  }
                /> */}
                <input
                  type="text"
                  disabled
                  value={
                    LIST_OPTION_RANK_HOTEL.find(
                      (item) =>
                        item.value ===
                        getDetailTourState?.data?.hotel_level[0]?.star
                    )?.label
                  }
                />
              </div>

              <div className="option">
                <span className="title">Số ngày đi tour</span>
                {/* <Select
                  options={optionDayTour}
                  defaultValue={optionDayTour[0]}
                /> */}
                <input
                  disabled
                  type="text"
                  value={`${getDetailTourState?.data?.schedules?.length} ngày`}
                />
              </div>
              <div className="option">
                <span className="title">Phương tiện</span>
                {/* <Select
                  options={optionVehicelTour}
                  defaultValue={optionVehicelTour[0]}
                /> */}
                <input
                  disabled
                  type="text"
                  value={`${ListTransport.find((item) => item.value === getDetailTourState?.data?.transportation)?.label}`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="booking-page-wrapper-left-section-2">
          <div className="top">
            <span className="title">Chi tiết tour</span>
          </div>
          <div className="bottom">
            <span>
              <strong>Mã booking 12342423</strong>{" "}
              <span style={{ color: "red" }}>
                (Quý khách vui lòng nhớ số booking để tiện cho các giao dịch sau
                này)
              </span>
            </span>
            <div className="list-option">
              <div className="option">
                <span>Người lớn</span>
                <input
                  type="number"
                  placeholder="0"
                  value={formik.values.adult_ticket}
                  onChange={(e) =>
                    formik.setFieldValue("adult_ticket", e.target.value)
                  }
                />
              </div>
              <div className="option">
                <span>Trẻ em</span>
                <input
                  type="number"
                  placeholder="0"
                  value={formik.values.child_ticket}
                  onChange={(e) =>
                    formik.setFieldValue("child_ticket", e.target.value)
                  }
                />
              </div>
              <div className="option">
                <span>Chọn ngày đi</span>
                <input
                  type="date"
                  value={formik.values.start_date}
                  onChange={(e) =>
                    formik.setFieldValue("start_date", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="list-option-price">
              <div className="option">
                <span className="title">Giá người lớn</span>
                <div className="input-price">
                  <input
                    disabled
                    value={
                      Number(
                        getDetailTourState?.data?.base_price_adult > 0
                          ? getDetailTourState?.data?.base_price_adult
                          : 0
                      )?.toLocaleString("vi-VN") || 0
                    }
                  />
                  <div className="unit">VND</div>
                </div>
              </div>
              <div className="option">
                <span className="title"> Giá trẻ em</span>
                <div className="input-price">
                  <input
                    disabled
                    value={
                      Number(
                        getDetailTourState?.data?.base_price_child > 0
                          ? getDetailTourState?.data?.base_price_child
                          : 0
                      )?.toLocaleString("vi-VN") || 0
                    }
                  />
                  <div className="unit">VND</div>
                </div>
              </div>
            </div>

            <div className="list-total-price">
              <div className="body">
                <span className="title">Tổng giá</span>
                <div className="input-price">
                  <input
                    placeholder="0"
                    disabled
                    value={
                      Number(total > 0 ? total : 0)?.toLocaleString("vi-VN") ||
                      0
                    }
                  />
                  <div className="unit">VND</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-page-wrapper-left-section-3">
          <div className="top">
            <span className="title">Lưu ý</span>
          </div>
          <div className="bottom">
            <span>
              * Xin vui lòng nhập họ tên khách hàng phải đúng như tên trong
              CMND/CCCD.
            </span>
            <span>* Quý khách vui lòng mang đầy đủ giấy tờ tùy thân.</span>
            <span>
              * Hãy để lại thông tin chính xác để nhân viên của chúng tôi liên
              hệ lại cho bạn trong thời gian sớm nhất.
            </span>
            <span>* Booking có giá trị khi được nhân viên xác nhận.</span>
          </div>
        </div>
      </div>

      <div className="booking-page-wrapper-right">
        <div className="booking-page-wrapper-right-body">
          <div className="top">
            <span>THÔNG TIN LIÊN LẠC</span>
          </div>
          <div className="form">
            <input
              type="text"
              placeholder="Họ tên*"
              value={formik.values.fullname}
              onChange={(e) => formik.setFieldValue("fullname", e.target.value)}
              disabled={isCreateBookingSuccess || isCreateBookingRequest}
            />
            <input
              type="text"
              placeholder="Điện thoại*"
              value={formik.values.phone}
              onChange={(e) => formik.setFieldValue("phone", e.target.value)}
              disabled={isCreateBookingSuccess || isCreateBookingRequest}
            />
            <input
              type="text"
              placeholder="Họ tên Email*"
              value={formik.values.email}
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
              disabled={isCreateBookingSuccess || isCreateBookingRequest}
            />
            <input
              type="text"
              placeholder="Địa chỉ"
              value={formik.values.address}
              onChange={(e) => formik.setFieldValue("address", e.target.value)}
              disabled={isCreateBookingSuccess || isCreateBookingRequest}
            />
            <textarea
              placeholder="Ghi chú"
              value={formik.values.note}
              onChange={(e) => formik.setFieldValue("note", e.target.value)}
              disabled={isCreateBookingSuccess || isCreateBookingRequest}
            />
          </div>

          <div className="bottom" onClick={formik.handleSubmit}>
            <button>ĐẶT TOUR</button>
          </div>
        </div>
        {isCreateBookingSuccess && (
          <div>
            <Button>Thanh toán</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
