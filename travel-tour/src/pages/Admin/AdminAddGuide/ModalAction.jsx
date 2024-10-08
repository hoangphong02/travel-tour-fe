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
  addGuideBookingRequest,
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

  const {
    getUserGuideBookingState,
    isAddGuideBookingRequest,
    isAddGuideBookingSuccess,
    isAddGuideBookingFailure,
  } = useSelector((store) => store.booking);

  const dispatch = useDispatch();
  const [dataForm, setDataForm] = useState(null);
  const onSubmit = (values) => {
    setDataForm(values);
    setIsShowModalConfirm(true);
  };

  const handleSubmit = () => {
    const { tour_id, tour_guide, group_number, start_date, end_date } =
      dataForm;

    const payload = {
      tour_id: tour_id[0]?.value,
      tour_guide_id: tour_guide?.value,
      start_date: moment(start_date).format("MM/DD/YYYY"),
      end_date: moment(end_date).format("MM/DD/YYYY"),
      group_number,
    };

    dispatch(addGuideBookingRequest(payload));
  };

  console.log("data", data);

  return (
    <>
      <Modal
        centered
        isOpen={isOpen}
        size="xl"
        className="modal-actions-product"
      >
        <ModalHeader>{`${type === "add" ? "Thêm" : "Thêm"} hướng dẫn viên`}</ModalHeader>
        <Formik
          initialValues={{
            tour_id:
              type === "add"
                ? {}
                : getAllTourState?.data
                    ?.filter(
                      (item) => item._id === data?.bookings[0]?.tour_id?._id
                    )
                    ?.map((tour) => {
                      return {
                        value: tour?._id,
                        label: tour?.name,
                      };
                    }) || {},
            group_number: type === "add" ? "" : data?.group_number || "",
            start_date:
              type === "add"
                ? ""
                : moment(data?.start_date).format("YYYY-MM-DD") || "",
            end_date:
              type === "add"
                ? ""
                : moment(data?.end_date).format("YYYY-MM-DD") || "",
            tour_guide:
              type === "add"
                ? {}
                : getUserGuideBookingState?.data?.availableEmployees
                    ?.filter(
                      (item) => item._id === data?.bookings[0]?.tour_guide?._id
                    )
                    ?.map((user) => {
                      return {
                        value: user?._id,
                        label: user?.name,
                      };
                    }) || {},
            user: data?.bookings[0]?.tour_guide?.name || "",
          }}
          // validationSchema={SignupSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => {
            return (
              <Form className="av-tooltip">
                <ModalBody>
                  {isAddGuideBookingFailure && (
                    <Alert color="danger">
                      {type === "add"
                        ? "Thêm hướng dẫn viên thất bại"
                        : "Thêm hướng dẫn viên thất bại"}
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
                      ></Select>
                      {/* {errors.title && touched.title ? (
                        <div className="invalid-feedback d-block">
                          {errors.title}
                        </div>
                      ) : null} */}
                    </FormGroup>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Hướng dẫn viên:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      {data?.bookings[0]?.tour_guide?._id ? (
                        <Field
                          disabled
                          className="form-control"
                          placeholder="Nhập ngày bắt đầu"
                          name="user"
                        />
                      ) : (
                        <Select
                          options={getUserGuideBookingState?.data?.availableEmployees?.map(
                            (item) => {
                              return {
                                value: item?._id,
                                label: item?.name,
                              };
                            }
                          )}
                          onChange={(e) => setFieldValue("tour_guide", e)}
                          value={values.tour_guide}
                          placeholder="Chọn hướng dẫn viên"
                        ></Select>
                      )}
                      {/* {errors.title && touched.title ? (
                        <div className="invalid-feedback d-block">
                          {errors.title}
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
                        disabled
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
                        disabled
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
                        Tên nhóm:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        disabled
                        className="form-control"
                        name="group_number"
                        placeholder="Nhập tên nhóm"
                      />
                      {/* {errors.name && touched.name ? (
                        <div className="invalid-feedback d-block">
                          {errors.name}
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
                        display: data?.bookings[0]?.tour_guide?.name
                          ? "none"
                          : "block",
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
          <h3>{`Xác nhận thêm hướng dẫn viên`}</h3>
          <p>Bạn chắc chắc thêm hướng dẫn viên vào nhóm</p>
        </ModalBody>

        <ModalFooter>
          <div className="d-flex align-content-center justify-content-between flex-grow-1">
            <Button
              color="primary"
              disabled={isAddGuideBookingRequest}
              className={`btn-shadow btn-multiple-state ${
                isAddGuideBookingRequest ? "show-spinner disabled" : ""
              }`}
              style={{
                background: "rgb(8, 66, 140)",
                border: "none",
              }}
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
              disabled={isAddGuideBookingRequest}
              className={`btn-shadow btn-multiple-state ${
                isAddGuideBookingRequest ? "disabled" : ""
              }`}
              style={isAddGuideBookingRequest ? { cursor: "no-drop" } : {}}
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
