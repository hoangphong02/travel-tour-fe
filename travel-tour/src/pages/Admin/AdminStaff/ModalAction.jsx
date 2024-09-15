import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
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
import logo from "~/assets/logo/no-avatar.png";
export const PHONE_REGEX = /((0)+([1-9]{1})+([0-9]{8})\b)/g;

export const ModalActions = ({ isOpen, type, handleClose, data }) => {
  const {
    isRegisterRequest,
    isRegisterFailure,
    isUpdateUserRequest,
    isUpdateUserFailure,
  } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [urlImage, setUrlImage] = useState();
  const [dataForm, setDataForm] = useState(null);
  const fileInputRef = useRef(null);
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

  const uploadToCloudinary = async (file, uploadPreset, uploadUrl) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };
  const handleImageUpload = async (file) => {
    const uploadPreset = "vr8eratg";
    const uploadUrl = "https://api.cloudinary.com/v1_1/disrx4gzn/image/upload";
    const imageUrl = await uploadToCloudinary(file, uploadPreset, uploadUrl);

    if (imageUrl) {
      setUrlImage(imageUrl);
    }
  };

  const onSubmit = (values) => {
    setDataForm(values);
    setIsShowModalConfirm(true);
  };

  const handleSubmit = () => {
    const { name, password, phone, email, confirmPassword } = dataForm;

    if (type === "add") {
      const payload = {
        name,
        password,
        phone,
        email,
        confirmPassword,
      };
      if (urlImage) {
        payload.avatar = urlImage;
      }
      dispatch(registerRequest(payload));
    } else {
      const payload = {
        name,
        phone,
        email,
      };
      if (urlImage) {
        payload.avatar = urlImage;
      }
      dispatch(updateUserRequest({ id: data._id, body: payload }));
    }
  };

  return (
    <>
      <Modal centered isOpen={isOpen} size="md" className="modal-actions-staff">
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
                  <FormGroup className="form-avatar">
                    <div className="info-image">
                      <img
                        src={
                          urlImage
                            ? urlImage
                            : data?.avatar
                              ? data?.avatar
                              : logo
                        }
                        alt=""
                      />
                      <input
                        className="input-file"
                        ref={fileInputRef}
                        type="file"
                        id="avatar"
                        name="avatar"
                        onChange={(e) => handleImageUpload(e.target.files[0])}
                      />
                      <span
                        className="icon-change-avatar"
                        onClick={() => fileInputRef.current.click()}
                      >
                        <i className="fas fa-camera"></i>
                      </span>
                    </div>
                  </FormGroup>

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
