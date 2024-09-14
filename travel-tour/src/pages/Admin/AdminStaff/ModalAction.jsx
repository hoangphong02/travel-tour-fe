import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import * as Yup from "yup";
import { registerRequest, updateUserRequest } from "~/redux/auth/actions";

export const PHONE_REGEX = /((0)+([1-9]{1})+([0-9]{8})\b)/g;

// const SignupSchema = Yup.object().shape({
//   name: Yup.string()
//     .trim()
//     .required("Tên nhân viên không được để trống")
//     .min(2, "Phải ít nhất 2 ký tự"),
//   phone: Yup.string()
//     .required("Số điện thoại không được để trống")
//     .min(10, "Phải ít nhất 10 ký tự"),
//   email: Yup.string()
//     .required("Email không thể để trống")
//     .matches(
//       /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//       "Email không hợp lệ"
//     ),
//   password: Yup.string()
//     .required("Mật khẩu không được để trống")
//     .min(5, "Mật khẩu phải ít nhất 5 ký tự"),
//   confirmPassword: Yup.string()
//     .required("Mật khẩu xác nhận không được để trống")
//     .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp"),
// });

export const ModalActions = ({ isOpen, type, handleClose, data }) => {
  const {
    isRegisterRequest,
    isRegisterFailure,
    isUpdateUserRequest,
    isUpdateUserFailure,
  } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [imagePreview, setImagePreview] = useState();
  const [fileUploadInput, setFileUploadInput] = useState();
  const [dataForm, setDataForm] = useState(null);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Tên nhân viên không được để trống")
      .min(2, "Phải ít nhất 2 ký tự"),
    phone: Yup.string()
      .required("Số điện thoại không được để trống")
      .min(10, "Phải ít nhất 10 ký tự"),
    email: Yup.string()
      .required("Email không thể để trống")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email không hợp lệ"
      ),
  });
  const handleUpload = (event) => {
    const file = event.target.files[0];
    setFileUploadInput(file);
    const reader = new FileReader();
    if (file && file.type.match("image.*")) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  console.log("imagePreview", imagePreview);

  //   useEffect(() => {
  //       if (isUploadImageProduct) {
  //         setImageProduct(uploadFileState?.data[0]);
  //         setIsUploadImageProduct(false);
  //       }
  //   }, []);

  const onSubmit = (values) => {
    console.log("values", values);
    setDataForm(values);
    setIsShowModalConfirm(true);
  };

  const handleSubmit = () => {
    const { name, password, phone, email, confirmPassword } = dataForm;

    const payload = {
      name,
      password,
      phone,
      email,
      confirmPassword,
    };
    if (type === "add") {
      dispatch(registerRequest(payload));
    } else {
      dispatch(updateUserRequest({ id: data._id, body: payload }));
    }
  };

  return (
    <>
      <Modal
        centered
        isOpen={isOpen}
        size="md"
        className="modal-actions-product"
      >
        <ModalHeader>{`${type === "add" ? "Thêm" : "Chỉnh sửa"} nhân viên`}</ModalHeader>
        <Formik
          initialValues={{
            name: type === "add" ? "" : data?.name || "",
            password: type === "add" ? "" : data?.password || "",
            phone: type === "add" ? "" : data?.phone || "",
            email: type === "add" ? "" : data?.email || "",
            confirmPassword: type === "add" ? "" : data?.confirmPassword || "",

            // avatar: type === "create" ? "" : data?.avatar || "",
          }}
          validationSchema={SignupSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => {
            return (
              <Form className="av-tooltip">
                <ModalBody>
                  {(isRegisterFailure || isUpdateUserFailure) && (
                    <Alert color="danger">
                      {type === "add"
                        ? "Thêm nhận viên thất bại"
                        : "Cập nhật nhân viên thất bại"}
                    </Alert>
                  )}

                  <FormGroup className="w-100 error-l-100">
                    <Label>
                      Tên nhân viên:{" "}
                      <span style={{ color: "red", fontWeight: "600" }}>*</span>
                    </Label>
                    <Field
                      className="form-control"
                      name="name"
                      placeholder="Tên nhân viên"
                    />
                    {errors.name && touched.name ? (
                      <div className="invalid-feedback d-block">
                        {errors.name}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="w-100 error-l-100">
                    <Label>
                      Email:{" "}
                      <span style={{ color: "red", fontWeight: "600" }}>*</span>
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      placeholder="Nhập email"
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
                      <span style={{ color: "red", fontWeight: "600" }}>*</span>
                    </Label>
                    <Field
                      className="form-control"
                      name="phone"
                      placeholder="Nhập số điện thoại"
                    />
                    {errors.phone && touched.phone ? (
                      <div className="invalid-feedback d-block">
                        {errors.phone}
                      </div>
                    ) : null}
                  </FormGroup>
                  {type === "add" ? (
                    <>
                      <FormGroup className="error-l-100">
                        <Label>
                          Mật khẩu:{" "}
                          <span style={{ color: "red", fontWeight: "600" }}>
                            *
                          </span>
                        </Label>
                        <Field
                          className="form-control"
                          name="password"
                          placeholder="Nhập mật khẩu"
                        />
                        {errors.password && touched.password ? (
                          <div className="invalid-feedback d-block">
                            {errors.password}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="error-l-100">
                        <Label>
                          Mật khẩu xác nhận:{" "}
                          <span style={{ color: "red", fontWeight: "600" }}>
                            *
                          </span>
                        </Label>
                        <Field
                          className="form-control"
                          name="confirmPassword"
                          placeholder="Nhập mật khẩu xác nhận"
                        />
                        {errors.confirmPassword && touched.confirmPassword ? (
                          <div className="invalid-feedback d-block">
                            {errors.confirmPassword}
                          </div>
                        ) : null}
                      </FormGroup>
                    </>
                  ) : null}

                  {/* <FormGroup className="error-l-100">
                    <Label>Ảnh đại diện:</Label>
                    <Input
                      type="file"
                      id="exampleCustomFileBrowser1"
                      name="image"
                      onChange={(e) => handleUpload(e)}
                    />

                    {imagePreview && (
                      <div
                        className="image-preview"
                        style={{
                          marginTop: "40px",
                        }}
                      >
                        <img
                          src={imagePreview}
                          alt=""
                          style={{ height: "100px", width: "auto" }}
                        />
                        <div
                          className="image-preview-remove"
                          onClick={() => {
                            setImagePreview("");
                          }}
                        >
                          x
                        </div>
                      </div>
                    )}
                    {errors.desc && touched.desc ? (
                      <div className="invalid-feedback d-block">
                        {errors.desc}
                      </div>
                    ) : null}
                  </FormGroup> */}
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
                      className={`btn-shadow btn-multiple-state ${
                        isRegisterRequest || isUpdateUserRequest
                          ? "show-spinner cursor-none"
                          : ""
                      } `}
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
          <h4>{`Xác nhận ${type === "add" ? "thêm" : "chỉnh sửa"} nhân viên`}</h4>
          <p>{`Bạn chắc chắn ${type === "add" ? "thêm" : "chỉnh sửa"} nhân viên`}</p>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex align-content-center justify-content-between flex-grow-1">
            <Button
              style={{ background: "rgb(8, 66, 140)", border: "none" }}
              color="primary"
              disabled={isRegisterRequest || isUpdateUserRequest}
              className={`btn-shadow btn-multiple-state ${
                isRegisterRequest || isUpdateUserRequest
                  ? "show-spinner disabled"
                  : ""
              }`}
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
              disabled={isRegisterRequest || isUpdateUserRequest}
              className={`btn-shadow btn-multiple-state ${
                isRegisterRequest || isUpdateUserRequest ? "disabled" : ""
              }`}
              style={
                isRegisterRequest || isUpdateUserRequest
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
