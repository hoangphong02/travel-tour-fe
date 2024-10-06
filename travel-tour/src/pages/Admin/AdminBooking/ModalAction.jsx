import { Field, Form, Formik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  Button,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import * as Yup from "yup";
import {
  LIST_OPTION_RANK_HOTEL,
  ListNameBooking,
  ListStatusBooking,
  ListTransport,
} from "~/constants";
import {
  createBookingRequest,
  updateBookingRequest,
} from "~/redux/booking/actions";

export const PHONE_REGEX = /((0)+([1-9]{1})+([0-9]{8})\b)/g;

const SignupSchema = Yup.object().shape({
  // name: Yup.string()
  //   .required("Tên không được để trống")
  //   .max(200, "Tên không quá 200 ký tự".replace("$x", 200)),
});

export const ModalActions = ({
  isOpen,
  type,
  handleClose,
  data,
  isShowModalConfirm,
  setIsShowModalConfirm,
}) => {
  const { getAllTourState } = useSelector((store) => store.tour);
  const { isGetAllUsersSuccess, getAllUsersState } = useSelector(
    (store) => store.user
  );
  const {
    isCreateBookingRequest,
    isCreateBookingSuccess,
    isCreateBookingFailure,
    isUpdateBookingRequest,
    isUpdateBookingSuccess,
    isUpdateBookingFailure,
  } = useSelector((store) => store.booking);

  const dispatch = useDispatch();
  const [dataForm, setDataForm] = useState(null);
  const onSubmit = (values) => {
    setDataForm(values);
    setIsShowModalConfirm(true);
  };

  console.log("dataForm", dataForm);
  console.log("data", data);

  const handleSubmit = () => {
    const {
      tour_id,
      hotel_level,
      email,
      phone,
      fullname,
      adult_ticket,
      child_ticket,
      total_price,
      transactionId,
      payment_status,
      payment_method_name,
      tour_guide,
      group_number,
      start_date,
      end_date,
      note,
      address,
    } = dataForm;

    const payload = {
      tour_id: tour_id?.value,
      hotel_level: hotel_level?.value,
      email,
      phone,
      fullname,
      adult_ticket,
      child_ticket,
      total_price,
      transactionId,
      payment_status: payment_status?.value,
      payment_method_name: payment_method_name?.value,
      tour_guide: tour_guide?.value,
      group_number,
      start_date,
      end_date,
      note,
      address,
    };

    if (type === "add") {
      dispatch(createBookingRequest(payload));
    } else {
      dispatch(updateBookingRequest({ id: data._id, body: payload }));
    }
  };

  return (
    <>
      <Modal
        centered
        isOpen={isOpen}
        size="xl"
        className="modal-actions-product"
      >
        <ModalHeader>{`${type === "add" ? "Thêm" : "Chỉnh sửa"} đặt tour`}</ModalHeader>
        <Formik
          initialValues={{
            tour_id:
              type === "add"
                ? {}
                : getAllTourState?.data
                    ?.filter((item) => item._id === data?.tour_id?._id)
                    ?.map((tour) => {
                      return {
                        value: tour?._id,
                        label: tour?.name,
                      };
                    }) || {},
            fullname: type === "add" ? "" : data?.fullname || "",
            email: type === "add" ? "" : data?.email || "",
            phone: type === "add" ? "" : data?.phone || "",
            adult_ticket: type === "add" ? 0 : data?.adult_ticket || 0,
            child_ticket: type === "add" ? 0 : data?.child_ticket || 0,
            start_date:
              type === "add"
                ? ""
                : moment(data?.start_date).format("YYYY-MM-DD") || "",
            end_date:
              type === "add"
                ? ""
                : moment(data?.end_date).format("YYYY-MM-DD") || "",
            hotel_level:
              type === "add"
                ? ""
                : LIST_OPTION_RANK_HOTEL.find(
                    (item) => item.value === data?.hotel_level
                  ) || "",
            group_number: type === "add" ? 0 : data?.group_number || 0,
            address: type === "add" ? "" : data?.address || "",
            total_price: type === "add" ? 0 : data?.total_price || 0,
            transactionId:
              type === "add" ? "pending" : data?.transactionId || "",
            payment_status:
              type === "add"
                ? ""
                : ListStatusBooking.find(
                    (item) => item.value === data?.payment_status
                  ) || "",
            payment_method_name:
              type === "add"
                ? ""
                : ListNameBooking.find(
                    (item) => item.value === data?.payment_method_name
                  ) || "",
            tour_guide:
              type === "add"
                ? {}
                : getAllUsersState?.data
                    .filter((item) => item._id === data?.tour_guide?._id)
                    ?.map((user) => {
                      return {
                        value: user?._id,
                        label: user?.name,
                      };
                    }) || {},
            note: type === "add" ? "" : data?.note || "",
          }}
          // validationSchema={SignupSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => {
            return (
              <Form className="av-tooltip">
                <ModalBody>
                  {(isCreateBookingFailure || isUpdateBookingFailure) && (
                    <Alert color="danger">
                      {type === "add"
                        ? "Đặt tour thất bại"
                        : "Cập nhật đặt tour thất bại"}
                    </Alert>
                  )}
                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Tour:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Select
                        options={getAllTourState?.data?.map((item) => {
                          return {
                            value: item?._id,
                            label: item?.name,
                          };
                        })}
                        onChange={(e) => setFieldValue("tour_id", e)}
                        value={values.tour_id}
                        placeholder="Chọn tour du lịch"
                      ></Select>
                      {/* {errors.title && touched.title ? (
                        <div className="invalid-feedback d-block">
                          {errors.title}
                        </div>
                      ) : null} */}
                    </FormGroup>
                    {type !== "add" ? (
                      <FormGroup className="w-100 error-l-100">
                        <Label>
                          Hướng dẫn viên:{" "}
                          <span style={{ color: "red", fontWeight: "600" }}>
                            *
                          </span>
                        </Label>
                        <Select
                          options={getAllUsersState?.data?.map((item) => {
                            return {
                              value: item?._id,
                              label: item?.name,
                            };
                          })}
                          onChange={(e) => setFieldValue("tour_guide", e)}
                          value={values.tour_guide}
                          placeholder="Chọn hướng dẫn viên"
                        ></Select>
                        {/* {errors.title && touched.title ? (
                        <div className="invalid-feedback d-block">
                          {errors.title}
                        </div>
                      ) : null} */}
                      </FormGroup>
                    ) : null}
                  </div>
                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Tên người đặt:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="fullname"
                        placeholder="Nhập tên người đặt"
                      />
                      {/* {errors.name && touched.name ? (
                        <div className="invalid-feedback d-block">
                          {errors.name}
                        </div>
                      ) : null} */}
                    </FormGroup>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Địa chỉ người đặt:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="address"
                        placeholder="Nhập địa chỉ người đặt"
                      />
                      {/* {errors.name && touched.name ? (
                        <div className="invalid-feedback d-block">
                          {errors.name}
                        </div>
                      ) : null} */}
                    </FormGroup>
                  </div>

                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Email:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="email"
                        placeholder="Nhập email người đặt"
                      />
                      {/* {errors.typeBlog && touched.typeBlog ? (
                        <div className="invalid-feedback d-block">
                          {errors.typeBlog}
                        </div>
                      ) : null} */}
                    </FormGroup>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Số điện thoại:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="phone"
                        placeholder="Nhập số điện thoại người đặt"
                      />
                      {/* {errors.name && touched.name ? (
                        <div className="invalid-feedback d-block">
                          {errors.name}
                        </div>
                      ) : null} */}
                    </FormGroup>
                  </div>
                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Vé người lớn:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="adult_ticket"
                        placeholder="Nhập số lượng vé người lớn"
                      />
                      {/* {errors.typeBlog && touched.typeBlog ? (
                        <div className="invalid-feedback d-block">
                          {errors.typeBlog}
                        </div>
                      ) : null} */}
                    </FormGroup>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Vé trẻ em:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="child_ticket"
                        placeholder="Nhập số lượng vé trẻ em"
                      />
                      {/* {errors.name && touched.name ? (
                        <div className="invalid-feedback d-block">
                          {errors.name}
                        </div>
                      ) : null} */}
                    </FormGroup>
                  </div>

                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Ngày bắt đầu:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        type="date"
                        className="form-control"
                        name="start_date"
                        placeholder="Nhập ngày bắt đầu"
                      />
                      {/* {errors.name && touched.name ? (
                        <div className="invalid-feedback d-block">
                          {errors.name}
                        </div>
                      ) : null} */}
                    </FormGroup>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Ngày kết thúc:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        type="date"
                        className="form-control"
                        name="end_date"
                        placeholder="Nhập ngày kết thúc"
                      />
                      {/* {errors.name && touched.name ? (
                        <div className="invalid-feedback d-block">
                          {errors.name}
                        </div>
                      ) : null} */}
                    </FormGroup>
                  </div>

                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Khách sạn:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Select
                        options={LIST_OPTION_RANK_HOTEL}
                        onChange={(e) => setFieldValue("hotel_level", e)}
                        value={values.hotel_level}
                      ></Select>
                      {/* {errors.typeBlog && touched.typeBlog ? (
                        <div className="invalid-feedback d-block">
                          {errors.typeBlog}
                        </div>
                      ) : null} */}
                    </FormGroup>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Số người/nhóm:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="group_number"
                        placeholder="Nhập số người/nhóm"
                      />
                      {/* {errors.typeBlog && touched.typeBlog ? (
                        <div className="invalid-feedback d-block">
                          {errors.typeBlog}
                        </div>
                      ) : null} */}
                    </FormGroup>
                  </div>

                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Tổng giá tour:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="total_price"
                        placeholder="Nhập tổng giá tour"
                      />
                      {/* {errors.typeBlog && touched.typeBlog ? (
                        <div className="invalid-feedback d-block">
                          {errors.typeBlog}
                        </div>
                      ) : null} */}
                    </FormGroup>
                    {type !== "add" ? (
                      <FormGroup className="w-100 error-l-100">
                        <Label>
                          Mã thanh toán:{" "}
                          <span style={{ color: "red", fontWeight: "600" }}>
                            *
                          </span>
                        </Label>
                        <Field
                          className="form-control"
                          name="transactionId"
                          placeholder="Nhập mã thanh toán"
                        />
                        {/* {errors.typeBlog && touched.typeBlog ? (
                        <div className="invalid-feedback d-block">
                          {errors.typeBlog}
                        </div>
                      ) : null} */}
                      </FormGroup>
                    ) : null}
                  </div>
                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Trạng thái thanh toán:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Select
                        options={ListStatusBooking}
                        onChange={(e) => setFieldValue("payment_status", e)}
                        value={values.payment_status}
                      ></Select>
                      {/* {errors.typeBlog && touched.typeBlog ? (
                        <div className="invalid-feedback d-block">
                          {errors.typeBlog}
                        </div>
                      ) : null} */}
                    </FormGroup>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Tên phương thức thanh toán:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>

                      <Select
                        options={ListNameBooking}
                        onChange={(e) =>
                          setFieldValue("payment_method_name", e)
                        }
                        value={values.payment_method_name}
                      ></Select>
                      {/* {errors.typeBlog && touched.typeBlog ? (
                        <div className="invalid-feedback d-block">
                          {errors.typeBlog}
                        </div>
                      ) : null} */}
                    </FormGroup>
                  </div>

                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Mô tả:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <textarea
                        className="form-control"
                        name="note"
                        value={values.note}
                        onChange={(e) => setFieldValue("note", e.target.value)}
                        placeholder="Nhập mô tả"
                      />
                      {/* {errors.title && touched.title ? (
                        <div className="invalid-feedback d-block">
                          {errors.title}
                        </div>
                      ) : null} */}
                    </FormGroup>
                  </div>
                </ModalBody>
                <ModalFooter>
                  {type === "edit" && (
                    <Button
                      color="primary"
                      style={{
                        color: "#fff",
                        background: "#08428c",
                        border: "none",
                        padding: "8px 24px",
                      }}
                      className="btn-shadow btn-multiple-state "
                      type="submit"
                    >
                      <span className="label">Cập nhật</span>
                    </Button>
                  )}
                  {type !== "edit" && (
                    <Button
                      color="primary"
                      style={{
                        color: "#fff",
                        background: "#08428c",
                        border: "none",
                        padding: "8px 24px",
                      }}
                      // className={`btn-shadow btn-multiple-state ${
                      //   isCreateFoodRequest || isUpdateFoodRequest
                      //     ? "show-spinner cursor-none"
                      //     : ""
                      // } `}
                      type="submit"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">Thêm</span>
                    </Button>
                  )}
                  <Button
                    color="primary"
                    outline
                    className="btn-shadow btn-multiple-state"
                    onClick={handleClose}
                  >
                    Trở về
                  </Button>
                </ModalFooter>
              </Form>
            );
          }}
        </Formik>
      </Modal>

      <Modal
        isOpen={isShowModalConfirm}
        size="sm"
        centered
        backdrop="static"
        toggle={() => setIsShowModalConfirm(false)}
      >
        <ModalBody>
          <h3>{`Xác nhận ${type === "add" ? "thêm" : "chỉnh sửa"} đặt tour`}</h3>
          <p>{`Bạn chắc chắn ${type === "add" ? "thêm" : "chỉnh sửa"} đặt tour`}</p>
        </ModalBody>

        <ModalFooter>
          <div className="d-flex align-content-center justify-content-between flex-grow-1">
            <Button
              color="primary"
              disabled={isCreateBookingRequest || isUpdateBookingRequest}
              className={`btn-shadow btn-multiple-state ${
                isCreateBookingRequest || isUpdateBookingRequest
                  ? "show-spinner disabled"
                  : ""
              }`}
              style={{ background: "rgb(8, 66, 140)", border: "none" }}
              onClick={handleSubmit}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Xác nhận</span>
            </Button>
            <Button
              color="primary"
              outline
              disabled={isCreateBookingRequest || isUpdateBookingRequest}
              className={`btn-shadow btn-multiple-state ${
                isCreateBookingRequest || isUpdateBookingRequest
                  ? "disabled"
                  : ""
              }`}
              style={
                isCreateBookingRequest || isUpdateBookingRequest
                  ? { cursor: "no-drop" }
                  : {}
              }
              onClick={() => setIsShowModalConfirm(false)}
            >
              Trở về
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};
