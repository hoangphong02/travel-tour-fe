import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
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
import Editor from "~/components/common/Editor";
import { LIST_PROVINCE } from "~/constants";
import { createBlogsRequest, updateBlogsRequest } from "~/redux/blog/actions";

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
  options,
}) => {
  const { getAllCategoryState } = useSelector((store) => store.categoryBlog);
  const {
    isCreateBlogsRequest,
    isCreateBlogsSuccess,
    isCreateBlogsFailure,
    isUpdateBlogsRequest,
    isUpdateBlogsSuccess,
    isUpdateBlogsFailure,
  } = useSelector((store) => store.blog);

  const dispatch = useDispatch();
  const [urlImage, setUrlImage] = useState();
  const [valueTextEditor, setValueTextEditor] = useState(null);
  const [dataForm, setDataForm] = useState(null);
  // const [options, setOptions] = useState([]);

  const ListTypeBlog = [
    {
      value: "Place",
      label: "Địa điểm",
    },
    {
      value: "Food",
      label: "Món ăn",
    },
  ];

  useEffect(() => {
    if (data?.image) {
      setUrlImage(data?.image[0]?.url);
    }
  }, [data]);

  useEffect(() => {
    if (data?.description?.length) {
      setValueTextEditor({ ops: data.description });
    }
  }, [data?.description]);

  useEffect(() => {
    if (data?.description?.[0]?.text?.length) {
      setValueTextEditor({ ops: [{ insert: data.description[0].text }] });
    }
  }, [data?.description]);

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
        // Trả về URL của ảnh đã upload
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
    const uploadPreset = "vr8eratg"; // Thay bằng upload preset của bạn
    const uploadUrl = "https://api.cloudinary.com/v1_1/disrx4gzn/image/upload"; // Thay bằng URL Cloudinary của bạn

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
    const { name, title, typeBlog, category, addressString, provinceId } =
      dataForm;

    const payload = {
      title,
      name,
      type: typeBlog?.value,
      category: category?.value,
      image: [
        {
          type: "photos",
          url: urlImage,
        },
      ],
    };
    if (valueTextEditor) {
      payload.description = valueTextEditor?.ops;
    }
    if (typeBlog?.value === "Place") {
      payload.addressString = addressString;
      payload.provinceId = provinceId.value;
    }
    if (type === "add") {
      dispatch(createBlogsRequest(payload));
    } else {
      dispatch(updateBlogsRequest({ id: data._id, body: payload }));
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
        <ModalHeader>{`${type === "add" ? "Thêm" : "Chỉnh sửa"} bài blog`}</ModalHeader>
        <Formik
          initialValues={{
            title: type === "add" ? "" : data?.title || "",
            name: type === "add" ? "" : data?.name || "",
            category:
              type === "add"
                ? {}
                : options.find((item) => item.value === data.category._id) ||
                  {},
            typeBlog:
              type === "add"
                ? ""
                : ListTypeBlog.find((item) => item.value === data.type) || {},
            provinceId:
              type === "add"
                ? {}
                : LIST_PROVINCE.find(
                    (item) => Number(item.value) === data.provinceId
                  ) || {},
            addressString: type === "add" ? "" : data?.addressString || "",
          }}
          // validationSchema={SignupSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => {
            return (
              <Form className="av-tooltip">
                <ModalBody>
                  {/* {(isCreateFoodFailure || isUpdateFoodFailure) && (
                    <Alert color="danger">
                      {type === "add"
                        ? "Thêm món ăn thất bại"
                        : "Cập nhật món ăn thất bại"}
                    </Alert>
                  )} */}
                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Tiêu đề:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="title"
                        placeholder="Nhập tiêu đề"
                      />
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
                        Tên món ăn:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="name"
                        placeholder="Nhập tên"
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
                        Loại bài blog:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Select
                        options={ListTypeBlog}
                        onChange={(e) => setFieldValue("typeBlog", e)}
                        value={values.typeBlog}
                      ></Select>
                      {/* {errors.typeBlog && touched.typeBlog ? (
                        <div className="invalid-feedback d-block">
                          {errors.typeBlog}
                        </div>
                      ) : null} */}
                    </FormGroup>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Danh mục blog:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Select
                        options={options}
                        value={values.category}
                        onChange={(e) => setFieldValue("category", e)}
                      ></Select>
                      {/* {errors.title && touched.title ? (
                        <div className="invalid-feedback d-block">
                          {errors.title}
                        </div>
                      ) : null} */}
                    </FormGroup>
                  </div>
                  {values.typeBlog.value === "Place" ? (
                    <div className="d-flex" style={{ gap: "12px" }}>
                      <FormGroup className="w-100 error-l-100">
                        <Label>
                          Tỉnh thành:{" "}
                          <span style={{ color: "red", fontWeight: "600" }}>
                            *
                          </span>
                        </Label>
                        <Select
                          options={LIST_PROVINCE}
                          value={values.provinceId}
                          onChange={(e) => setFieldValue("provinceId", e)}
                        ></Select>
                        {/* {errors.email && touched.email ? (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      ) : null} */}
                      </FormGroup>
                    </div>
                  ) : null}
                  <FormGroup className="error-l-100">
                    <Label>
                      Mô tả:{" "}
                      <span style={{ color: "red", fontWeight: "600" }}>*</span>
                    </Label>
                    <Editor
                      value={valueTextEditor}
                      setValue={setValueTextEditor}
                    />
                  </FormGroup>

                  <FormGroup className="error-l-100">
                    <Label>Ảnh minh họa:</Label>
                    <Input
                      type="file"
                      id="exampleCustomFileBrowser1"
                      name="image"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                    />

                    {urlImage && (
                      <div
                        className="image-preview"
                        style={{
                          marginTop: "40px",
                        }}
                      >
                        <img
                          src={urlImage}
                          alt=""
                          style={{ height: "100px", width: "auto" }}
                        />
                        <div
                          className="image-preview-remove"
                          onClick={() => {
                            setUrlImage("");
                          }}
                        >
                          x
                        </div>
                      </div>
                    )}
                    {/* {errors.desc && touched.desc ? (
                      <div className="invalid-feedback d-block">
                        {errors.desc}
                      </div>
                    ) : null} */}
                  </FormGroup>
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
          <h3>{`Xác nhận ${type === "add" ? "thêm" : "chỉnh sửa"} nhân viên`}</h3>
          <p>{`Bạn chắc chắn ${type === "add" ? "thêm" : "chỉnh sửa"} nhân viên`}</p>
        </ModalBody>
        {/* <ModalFooter>
          <div className="d-flex align-content-center justify-content-between flex-grow-1">
            <Button
              color="primary"
              // disabled={isCreateFoodRequest || isUpdateFoodRequest}
              // className={`btn-shadow btn-multiple-state ${
              //   isCreateFoodRequest || isUpdateFoodRequest
              //     ? "show-spinner disabled"
              //     : ""
              // }`}
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
              // disabled={isCreateFoodRequest || isUpdateFoodRequest}
              // className={`btn-shadow btn-multiple-state ${
              //   isCreateFoodRequest || isUpdateFoodRequest ? "disabled" : ""
              // }`}
              // style={
              //   isCreateFoodRequest || isUpdateFoodRequest
              //     ? { cursor: "no-drop" }
              //     : {}
              // }
              onClick={() => setIsShowModalConfirm(false)}
            >
              Trở về
            </Button>
          </div>
        </ModalFooter> */}

        <ModalFooter>
          <div className="d-flex align-content-center justify-content-between flex-grow-1">
            <Button
              color="primary"
              disabled={isCreateBlogsRequest || isUpdateBlogsRequest}
              className={`btn-shadow btn-multiple-state ${
                isCreateBlogsRequest || isUpdateBlogsRequest
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
              disabled={isCreateBlogsRequest || isUpdateBlogsRequest}
              className={`btn-shadow btn-multiple-state ${
                isCreateBlogsRequest || isUpdateBlogsRequest ? "disabled" : ""
              }`}
              style={
                isCreateBlogsRequest || isUpdateBlogsRequest
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
