import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
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
  resetStateCreateBooking,
  resetUpdateBooking,
  resetUpdatePaymentBooking,
  updateBookingRequest,
  updatePaymentBookingRequest,
} from "~/redux/booking/actions";
import { getDetailTourRequest } from "~/redux/tour/actions";
import { ModalConfirmPaymentCash } from "./ModalConfirmPaymentCash";

const BookingPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const { getDetailTourState } = useSelector((store) => store.tour);
  const {
    isCreateBookingRequest,
    isCreateBookingSuccess,
    createBookingState,
    isUpdatePaymentBookingRequest,
    isUpdatePaymentBookingSuccess,
    isUpdatePaymentBookingFailure,
    isUpdateBookingRequest,
    isUpdateBookingSuccess,
    isUpdateBookingFailure,
  } = useSelector((store) => store.booking);
  const [total, setTotal] = useState(0);
  const [showModalPaymentCash, setShowModalPaymentCash] = useState(false);
  const handleShowConfirmPaymentCash = () => {
    setShowModalPaymentCash(true);
  };
  const handleCloseShow = () => {
    setShowModalPaymentCash(false);
  };

  const handleConfirmPaymentCash = () => {
    const payload = {
      id: createBookingState?.data?._id,
      body: {
        payment_method_name: "cash",
      },
    };
    dispatch(updateBookingRequest(payload));
  };
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
  useEffect(() => {
    if (isUpdatePaymentBookingSuccess) {
      toast.success("Thanh toán thành công");
      dispatch(resetUpdatePaymentBooking());
      dispatch(resetStateCreateBooking());
    }
  }, [isUpdatePaymentBookingSuccess]);

  useEffect(() => {
    if (isUpdateBookingSuccess) {
      toast.success("Cập nhật phương thức thanh toán thành công");
      dispatch(resetUpdateBooking());
      dispatch(resetStateCreateBooking());
      handleCloseShow();
    }
  }, [isUpdateBookingSuccess]);

  useEffect(() => {
    if (isUpdateBookingFailure) {
      toast.success("Cập nhật phương thức thanh toán thất bại");
    }
  }, [isUpdateBookingFailure]);

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
      dispatch(createBookingRequest(payload));
    },
  });

  useEffect(() => {
    let price =
      Number(formik.values.adult_ticket) *
        getDetailTourState?.data?.base_price_adult +
      Number(formik.values.adult_ticket) *
        getDetailTourState?.data?.hotel_level[0]?.price_adult +
      Number(formik.values.child_ticket) *
        getDetailTourState?.data?.base_price_child +
      Number(formik.values.child_ticket) *
        getDetailTourState?.data?.hotel_level[0]?.price_child;
    setTotal(price);
  }, [formik.values.adult_ticket, formik.values.child_ticket]);

  const addPayPalScript = async () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_CLIENT_ID}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  const onPaymentPaypalSuccess = (id) => {
    const payload = {
      id: createBookingState?.data?._id,
      body: {
        transactionId: id,
      },
    };
    dispatch(updatePaymentBookingRequest(payload));
  };

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
                <span className="title">Giá tour (Người lớn)</span>
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
                <span className="title"> Giá tour (Trẻ em)</span>
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

            <div className="list-option-price">
              <div className="option">
                <span className="title">Giá khách sạn (Người lớn)</span>
                <div className="input-price">
                  <input
                    disabled
                    value={
                      Number(
                        getDetailTourState?.data?.hotel_level[0]?.price_adult >
                          0
                          ? getDetailTourState?.data?.hotel_level[0]
                              ?.price_adult
                          : 0
                      )?.toLocaleString("vi-VN") || 0
                    }
                  />
                  <div className="unit">VND</div>
                </div>
              </div>
              <div className="option">
                <span className="title"> Giá khách sạn (Trẻ em)</span>
                <div className="input-price">
                  <input
                    disabled
                    value={
                      Number(
                        getDetailTourState?.data?.hotel_level[0]?.price_child >
                          0
                          ? getDetailTourState?.data?.hotel_level[0]
                              ?.price_child
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
              placeholder="Email*"
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

          <div
            className={`bottom  ${createBookingState?.data ? "d-none" : ""}`}
            onClick={formik.handleSubmit}
          >
            <button>
              {isCreateBookingRequest ? (
                <Spinner size="18" />
              ) : (
                <span>Đặt tour</span>
              )}
            </button>
          </div>
        </div>
        {createBookingState?.data ? (
          <div style={{ width: "100%", padding: "16px" }}>
            <Button
              onClick={handleShowConfirmPaymentCash}
              style={{
                width: "100%",
                padding: "10px ",
              }}
            >
              Thanh toán bằng tiền mặt
            </Button>
          </div>
        ) : null}
        {createBookingState?.data && sdkReady ? (
          <div style={{ padding: "16px" }}>
            <PayPalButton
              amount={Math.round(createBookingState?.data?.total_price / 25000)}
              onSuccess={(details, data) => {
                onPaymentPaypalSuccess(data?.paymentID);
                return fetch("/paypal-transaction-complete", {
                  method: "post",
                  body: JSON.stringify({
                    orderID: data.orderID,
                  }),
                });
              }}
              onError={() => {
                toast.error("Thanh toán thất bại");
              }}
            />
          </div>
        ) : null}
      </div>
      {showModalPaymentCash && (
        <ModalConfirmPaymentCash
          isOpen={true}
          handleClose={handleCloseShow}
          handleConfirmPaymentCash={handleConfirmPaymentCash}
        />
      )}
    </div>
  );
};

export default BookingPage;
