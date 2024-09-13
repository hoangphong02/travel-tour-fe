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
import { registerRequest } from "~/redux/auth/actions";

export const PHONE_REGEX = /((0)+([1-9]{1})+([0-9]{8})\b)/g;

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Tên không được để trống")
    .max(200, "Tên không quá 200 ký tự".replace("$x", 200)),
});

export const ModalActions = ({
  isOpen,
  type,
  handleClose,
  data,
  handleClickUpdate,
}) => {
  const { profileResponse } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [imagePreview, setImagePreview] = useState();
  const [fileUploadInput, setFileUploadInput] = useState();
  const [dataForm, setDataForm] = useState(null);

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
    // if (type !== "detail") {
    setDataForm(values);
    setIsShowModalConfirm(true);
    // }
  };
  console.log("dataFỏm", dataForm);

  const handleSubmit = () => {
    const { name, password, phone, email } = dataForm;

    if (type === "add") {
      const payload = {
        name,
        password,
        phone,
        email,
        confirmPassword: password,
      };

      dispatch(registerRequest(payload));
    } else {
      //   dispatch(updateProductRequest({ id: data.id, body: payload }));
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
            name: type === "create" ? "" : data?.name || "",
            password: type === "create" ? "" : data?.password || "",
            phone: type === "create" ? "" : data?.phone || "",
            email: type === "create" ? "" : data?.email || "",
            // avatar: type === "create" ? "" : data?.avatar || "",
          }}
          validationSchema={SignupSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => {
            return (
              <Form className="av-tooltip">
                <ModalBody>
                  {/* {(isCreateProductFailure || isUpdateProductFailure) && (
                    <Alert color="danger">
                      {translate(`product.noti.${type}.failure`)}
                    </Alert>
                  )} */}

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
                  <FormGroup className="error-l-100">
                    <Label>
                      Mật khẩu:{" "}
                      <span style={{ color: "red", fontWeight: "600" }}>*</span>
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
                      onClick={handleClickUpdate}
                      type="reset"
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
                      //   className={`btn-shadow btn-multiple-state ${
                      //     isCreateProductRequest ||
                      //     isUpdateProductRequest ||
                      //     isUploadFileRequest
                      //       ? "show-spinner cursor-none"
                      //       : ""
                      //   } `}
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
          <h3>{`Xác nhận ${type === "add" ? "Thêm" : "Chỉnh sửa"} nhân viên`}</h3>
          <p>{`Bạn chắc chắn ${type === "add" ? "Thêm" : "Chỉnh sửa"} nhân viên`}</p>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex align-content-center justify-content-between flex-grow-1">
            <Button
              color="primary"
              //   disabled={isCreateProductRequest || isUpdateProductRequest}
              //   className={`btn-shadow btn-multiple-state ${
              //     isCreateProductRequest || isUpdateProductRequest
              //       ? "show-spinner disabled"
              //       : ""
              //   }`}
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
              //   disabled={isCreateProductRequest || isUpdateProductRequest}
              //   className={`btn-shadow btn-multiple-state ${
              //     isCreateProductRequest || isUpdateProductRequest
              //       ? "disabled"
              //       : ""
              //   }`}
              //   style={
              //     isCreateProductRequest || isUpdateProductRequest
              //       ? { cursor: "no-drop" }
              //       : {}
              //   }
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
