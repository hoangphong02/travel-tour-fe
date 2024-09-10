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

export const PHONE_REGEX = /((0)+([1-9]{1})+([0-9]{8})\b)/g;

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Tên không được để trống")
    .max(200, "Tên không quá 200 ký tự".replace("$x", 200)),

  image: Yup.string().required("Hình ảnh không được trống"),
});

export const ModalActions = ({
  isOpen,
  type,
  handleClose,
  data,
  handleClickUpdate,
}) => {
  const { profine } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [imageProduct, setImageProduct] = useState();
  const [isUploadImageProduct, setIsUploadImageProduct] = useState(false);
  const [dataForm, setDataForm] = useState(null);

  const handleFileChange = (e, type) => {
    if (e.target.files[0]) {
      const form = new FormData();
      form.append("files[]", e.target.files[0]);
      if (type === "image-product") {
        setIsUploadImageProduct(true);
      }
      //   dispatch(uploadFileRequest(form));
    }
  };

  //   useEffect(() => {
  //       if (isUploadImageProduct) {
  //         setImageProduct(uploadFileState?.data[0]);
  //         setIsUploadImageProduct(false);
  //       }
  //   }, []);

  const onSubmit = (values) => {
    if (type !== "detail") {
      setDataForm(values);
      setIsShowModalConfirm(true);
    }
  };

  const handleSubmit = () => {
    const { name, password, phone, email, avatar } = dataForm;

    if (type === "create") {
      const payload = {
        name,
        password,
        phone,
        email,
        avatar,
      };

      //   dispatch(createProductRequest(payload));
    } else {
      //   dispatch(updateProductRequest({ id: data.id, body: payload }));
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
        <ModalHeader>{`${type === "add" ? "Thêm" : "Chỉnh sửa"} nhân viên`}</ModalHeader>
        <Formik
          initialValues={{
            name: type === "create" ? "" : data?.name || "",
            password: type === "create" ? "" : data?.password || "",
            phone: type === "create" ? "" : data?.phone || "",
            email: type === "create" ? "" : data?.email || "",
            avatar: type === "create" ? "" : data?.avatar || "",
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
                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>Tên nhân viên</Label>
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
                      <Label>Email:</Label>
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
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
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
                  </div>
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

                  <FormGroup className="error-l-100">
                    <Label>Ảnh đại diện:</Label>
                    <Field
                      className="form-control"
                      name="desc"
                      component="textarea"
                    />
                    {errors.desc && touched.desc ? (
                      <div className="invalid-feedback d-block">
                        {errors.desc}
                      </div>
                    ) : null}
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  {type === "edit" && (
                    <Button
                      color="primary"
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
