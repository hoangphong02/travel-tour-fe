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
  tour_id: Yup.mixed()
    .test("is-object-or-array", "Tour không được để trống", (value) => {
      if (Array.isArray(value)) {
        return (
          value.length > 0 &&
          typeof value[0] === "object" &&
          Object.keys(value[0]).length > 0
        );
      }
      return (
        typeof value === "object" &&
        value !== null &&
        Object.keys(value).length > 0
      );
    })
    .required("Tour không được để trống"),
  fullname: Yup.string().required("Tên người đặt không được để trống"),
  address: Yup.string().required("Địa chỉ người đặt không được để trống"),
  email: Yup.string().required("Email người đặt không được để trống"),
  phone: Yup.string().required("Số điện thoại người đặt không được để trống"),
  adult_ticket: Yup.number().min(1, "Số vé người lớn phải lớn hơn 0"),
  start_date: Yup.string().required("Ngày bắt đầu không được để trống"),
  end_date: Yup.string().required("Ngày kết thúc không được để trống"),
  hotel_level: Yup.object()
    .test(
      "is-not-empty",
      "Loại khách sạn không được để trống",
      (value) => value && Object.keys(value).length > 0
    )
    .required("Loại khách sạn không được để trống"),
  total_price: Yup.number().min(1, "Giá tour phải lớn hơn 0"),
  payment_status: Yup.object()
    .test(
      "is-not-empty",
      "Trạng thái thanh toán không được trống",
      (value) => value && Object.keys(value).length > 0
    )
    .required("Trạng thái thanh toán không được trống"),
  payment_method_name: Yup.object()
    .test(
      "is-not-empty",
      "Tên phương thức thanh toán không được trống",
      (value) => value && Object.keys(value).length > 0
    )
    .required("Tên phương thức thanh toán không được trống"),
  note: Yup.string().required("Mô tả không được để trống"),
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
      start_date: moment(start_date).format("MM/DD/YYYY"),
      end_date: moment(end_date).format("MM/DD/YYYY"),
      note,
      address,
    };

    const payloadUpdate = {
      start_date: moment(start_date).format("MM/DD/YYYY"),
      end_date: moment(end_date).format("MM/DD/YYYY"),
      address,
      payment_status: payment_status?.value,
      payment_method_name: payment_method_name?.value,
    };

    if (type === "add") {
      dispatch(createBookingRequest(payload));
    } else {
      dispatch(updateBookingRequest({ id: data._id, body: payloadUpdate }));
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
                    ?.filter((item) => item._id === data?.tour_guide?._id)
                    ?.map((user) => {
                      return {
                        value: user?._id,
                        label: user?.name,
                      };
                    }) || {},
            note: type === "add" ? "" : data?.note || "",
          }}
          validationSchema={SignupSchema}
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
                        isDisabled={type !== "add"}
                        options={getAllTourState?.data?.map((item) => {
                          return {
                            value: item?._id,
                            label: item?.name,
                          };
                        })}
                        onChange={(e) => setFieldValue("tour_id", e)}
                        value={values.tour_id}
                        placeholder="Chọn tour du lịch"
                        onBlur={() => setFieldTouched("tour_id", true)}
                      ></Select>
                      {errors.tour_id && touched.tour_id ? (
                        <div className="invalid-feedback d-block">
                          {errors.tour_id}
                        </div>
                      ) : null}
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
                          isDisabled={type !== "add"}
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
                        disabled={type !== "add"}
                        className="form-control"
                        name="fullname"
                        placeholder="Nhập tên người đặt"
                      />
                      {errors.fullname && touched.fullname ? (
                        <div className="invalid-feedback d-block">
                          {errors.fullname}
                        </div>
                      ) : null}
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
                      {errors.address && touched.address ? (
                        <div className="invalid-feedback d-block">
                          {errors.address}
                        </div>
                      ) : null}
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
                        disabled={type !== "add"}
                        className="form-control"
                        name="email"
                        placeholder="Nhập email người đặt"
                      />
                      {errors.email && touched.email ? (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Số điện thoại:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        disabled={type !== "add"}
                        className="form-control"
                        name="phone"
                        placeholder="Nhập số điện thoại người đặt"
                      />
                      {errors.phone && touched.phone ? (
                        <div className="invalid-feedback d-block">
                          {errors.phone}
                        </div>
                      ) : null}
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
                        disabled={type !== "add"}
                        className="form-control"
                        name="adult_ticket"
                        placeholder="Nhập số lượng vé người lớn"
                      />
                      {errors.adult_ticket && touched.adult_ticket ? (
                        <div className="invalid-feedback d-block">
                          {errors.adult_ticket}
                        </div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="w-100 error-l-100">
                      <Label>Vé trẻ em: </Label>
                      <Field
                        disabled={type !== "add"}
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
                      {errors.start_date && touched.start_date ? (
                        <div className="invalid-feedback d-block">
                          {errors.start_date}
                        </div>
                      ) : null}
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
                      {errors.end_date && touched.end_date ? (
                        <div className="invalid-feedback d-block">
                          {errors.end_date}
                        </div>
                      ) : null}
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
                        isDisabled={type !== "add"}
                        options={LIST_OPTION_RANK_HOTEL}
                        onChange={(e) => setFieldValue("hotel_level", e)}
                        value={values.hotel_level}
                        onBlur={() => setFieldTouched("hotel_level", true)}
                      ></Select>
                      {errors.hotel_level && touched.hotel_level ? (
                        <div className="invalid-feedback d-block">
                          {errors.hotel_level}
                        </div>
                      ) : null}
                    </FormGroup>
                    {type !== "add" ? (
                      <FormGroup className="w-100 error-l-100">
                        <Label>
                          Nhóm:{" "}
                          <span style={{ color: "red", fontWeight: "600" }}>
                            *
                          </span>
                        </Label>
                        <Field
                          disabled
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
                    ) : null}
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
                        disabled={type !== "add"}
                        className="form-control"
                        name="total_price"
                        placeholder="Nhập tổng giá tour"
                      />
                      {errors.total_price && touched.total_price ? (
                        <div className="invalid-feedback d-block">
                          {errors.total_price}
                        </div>
                      ) : null}
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
                          disabled={type !== "add"}
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
                        onBlur={() => setFieldTouched("payment_status", true)}
                      ></Select>
                      {errors.payment_status && touched.payment_status ? (
                        <div className="invalid-feedback d-block">
                          {errors.payment_status}
                        </div>
                      ) : null}
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
                        onBlur={() =>
                          setFieldTouched("payment_method_name", true)
                        }
                      ></Select>
                      {errors.payment_method_name &&
                      touched.payment_method_name ? (
                        <div className="invalid-feedback d-block">
                          {errors.payment_method_name}
                        </div>
                      ) : null}
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
                        disabled={type !== "add"}
                        className="form-control"
                        name="note"
                        value={values.note}
                        onChange={(e) => setFieldValue("note", e.target.value)}
                        placeholder="Nhập mô tả"
                        onBlur={() => setFieldTouched("note", true)}
                      />
                      {errors.note && touched.note ? (
                        <div className="invalid-feedback d-block">
                          {errors.note}
                        </div>
                      ) : null}
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
