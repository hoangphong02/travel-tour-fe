import { Field, Form, Formik } from "formik";
import moment from "moment";
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
import {
  LIST_OPTION_RANK_HOTEL,
  LIST_PROVINCE,
  ListTransport,
} from "~/constants";
import { createTourRequest, updateTourRequest } from "~/redux/tour/actions";

export const PHONE_REGEX = /((0)+([1-9]{1})+([0-9]{8})\b)/g;

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Tên không được để trống")
    .max(200, "Tên không quá 200 ký tự".replace("$x", 200)),
  tour_code: Yup.string()
    .required("Mã tour không được để trống")
    .max(20, "Tên không quá 20 ký tự".replace("$x", 20)),
  shedule_on_week: Yup.string().required(
    "Thời gian trong tuần không được để trống"
  ),
  day: Yup.mixed()
    .test("is-valid-day", "Số ngày không được để trống", (value) => {
      if (typeof value === "object" && value !== null) {
        return Object.keys(value).length > 0;
      }
      if (typeof value === "number") {
        return value > 0;
      }
      return false;
    })
    .required("Số ngày không được để trống"),
  category: Yup.object()
    .test(
      "is-not-empty",
      "Danh mục tour không được để trống",
      (value) => value && Object.keys(value).length > 0
    )
    .required("Danh mục tour không được để trống"),

  transportation: Yup.object()
    .test(
      "is-not-empty",
      "Phương tiện không được để trống",
      (value) => value && Object.keys(value).length > 0
    )
    .required("Phương tiện không được để trống"),
  start_location: Yup.string().required("Vị trí bắt đầu không được để trống"),
  end_location: Yup.string().required("Vị trí kết thúc không được để trống"),
  base_price_adult: Yup.string().required(
    "Giá vé người lớn không được để trống"
  ),
  base_price_child: Yup.string().required("Giá vé trẻ em không được để trống"),
  star: Yup.object()
    .test(
      "is-not-empty",
      "Loại khách sạn không được để trống",
      (value) => value && Object.keys(value).length > 0
    )
    .required("Loại khách sạn không được để trống"),
  price_adult: Yup.string().required("Giá người lớn không được để trống"),
  price_child: Yup.string().required("Giá trẻ em không được để trống"),
  provinceId: Yup.array()
    .test(
      "is-not-empty",
      "Tỉnh thành không được để trống",
      (value) => value && Object.keys(value).length > 0
    )
    .required("Tỉnh thành không được để trống"),
  // editor: Yup.string().required("Mô tả không được để trống"),
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
  const {
    isCreateTourRequest,
    isCreateFoodFailure,
    isUpdateTourRequest,
    isUpdateTourFailure,
  } = useSelector((store) => store.tour);

  const dispatch = useDispatch();
  const [urlImage, setUrlImage] = useState();
  const [urlBanner, setUrlBanner] = useState();
  const [urlSlide, setUrlSlide] = useState();
  const [valueTextEditor, setValueTextEditor] = useState(null);
  const [dataForm, setDataForm] = useState(null);
  const [arrSchedules, setArrSchedules] = useState([]);

  const ListDayTour = [
    {
      value: 1,
      label: "1 ngày",
    },
    {
      value: 2,
      label: "2 ngày",
    },
    {
      value: 3,
      label: "3 ngày",
    },
    {
      value: 4,
      label: "4 ngày",
    },
    {
      value: 5,
      label: "5 ngày",
    },
    {
      value: 6,
      label: "6 ngày",
    },
    {
      value: 7,
      label: "7 ngày",
    },
  ];

  useEffect(() => {
    if (data?.image) {
      setUrlImage(
        data?.image.find((item) => item.type === "photos")?.url || ""
      );
      setUrlBanner(
        data?.image.find((item) => item.type === "banner")?.url || ""
      );
      setUrlSlide(data?.image.find((item) => item.type === "slide")?.url || "");
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

  useEffect(() => {
    if (data?.schedules?.length) {
      const arr = data.schedules.map((item) => ({
        day: item.day,
        detail: item.detail,
      }));
      setArrSchedules(arr);
    }
  }, [data?.schedules?.length]);

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
  const handleBannerUpload = async (file) => {
    const uploadPreset = "vr8eratg"; // Thay bằng upload preset của bạn
    const uploadUrl = "https://api.cloudinary.com/v1_1/disrx4gzn/image/upload"; // Thay bằng URL Cloudinary của bạn

    const imageUrl = await uploadToCloudinary(file, uploadPreset, uploadUrl);

    if (imageUrl) {
      setUrlBanner(imageUrl);
    }
  };
  const handleSlideUpload = async (file) => {
    const uploadPreset = "vr8eratg"; // Thay bằng upload preset của bạn
    const uploadUrl = "https://api.cloudinary.com/v1_1/disrx4gzn/image/upload"; // Thay bằng URL Cloudinary của bạn

    const imageUrl = await uploadToCloudinary(file, uploadPreset, uploadUrl);

    if (imageUrl) {
      setUrlSlide(imageUrl);
    }
  };

  const onSubmit = (values) => {
    setDataForm(values);
    setIsShowModalConfirm(true);
  };

  const handleSubmit = () => {
    const {
      tour_code,
      name,
      category,
      shedule_on_week,
      start_location,
      end_location,
      base_price_adult,
      base_price_child,
      star,
      price_adult,
      price_child,
      transportation,
      provinceId,
    } = dataForm;

    const payload = {
      tour_code,
      name,
      category: category?.value,
      shedule_on_week,
      start_location,
      end_location,
      base_price_adult,
      base_price_child,
      provinceId: provinceId.map((item) => item.value),
      transportation: transportation?.value,
      hotel_level: [
        {
          star: star.value,
          price_adult: price_adult,
          price_child: price_child,
        },
      ],
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

    if (arrSchedules) {
      payload.schedules = arrSchedules.map((item) => {
        return {
          day: item.day + 1,
          detail: item.detail.ops,
        };
      });
    }
    if (urlBanner) {
      payload.image = [
        ...payload.image,
        {
          type: "banner",
          url: urlBanner,
        },
      ];
    }
    if (urlSlide) {
      payload.image = [
        ...payload.image,
        {
          type: "slide",
          url: urlSlide,
        },
      ];
    }
    if (type === "add") {
      dispatch(createTourRequest(payload));
    } else {
      dispatch(updateTourRequest({ id: data._id, body: payload }));
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
        <ModalHeader>{`${type === "add" ? "Thêm" : "Chỉnh sửa"} tour`}</ModalHeader>
        <Formik
          initialValues={{
            tour_code: type === "add" ? "" : data?.tour_code || "",
            name: type === "add" ? "" : data?.name || "",
            category:
              type === "add"
                ? {}
                : options.find((item) => item.value === data.category._id) ||
                  {},

            shedule_on_week: type === "add" ? "" : data?.shedule_on_week || "",
            provinceId:
              type === "add"
                ? []
                : LIST_PROVINCE.filter((item) =>
                    data.provinceId.includes(Number(item.value))
                  ),
            start_location: type === "add" ? "" : data?.start_location || "",
            end_location: type === "add" ? "" : data?.end_location || "",
            base_price_adult:
              type === "add" ? "" : data?.base_price_adult || "",
            base_price_child:
              type === "add" ? "" : data?.base_price_child || "",
            star:
              type === "add"
                ? ""
                : LIST_OPTION_RANK_HOTEL.find(
                    (item) => item.value === data?.hotel_level[0].star
                  ) || "",
            price_adult:
              type === "add" ? "" : data?.hotel_level[0]?.price_adult || "",
            price_child:
              type === "add" ? "" : data?.hotel_level[0]?.price_child || "",
            day:
              type === "add"
                ? 0
                : ListDayTour.find(
                    (item) => item.value === data?.schedules?.length
                  ) || 0,
            transportation:
              type === "add"
                ? {}
                : ListTransport.find(
                    (item) => item.value === data?.transportation
                  ) || 0,
          }}
          validationSchema={SignupSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => {
            return (
              <Form className="av-tooltip">
                <ModalBody>
                  {(isCreateFoodFailure || isUpdateTourFailure) && (
                    <Alert color="danger">
                      {type === "add"
                        ? "Thêm tour thất bại"
                        : "Cập nhật tour thất bại"}
                    </Alert>
                  )}
                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Mã tour:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="tour_code"
                        placeholder="Nhập mã tour"
                      />
                      {errors.tour_code && touched.tour_code ? (
                        <div className="invalid-feedback d-block">
                          {errors.tour_code}
                        </div>
                      ) : null}
                    </FormGroup>
                  </div>
                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Tên tour:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="name"
                        placeholder="Nhập tên tour"
                      />
                      {errors.name && touched.name ? (
                        <div className="invalid-feedback d-block">
                          {errors.name}
                        </div>
                      ) : null}
                    </FormGroup>
                  </div>

                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Danh mục tour:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Select
                        options={options}
                        onChange={(e) => setFieldValue("category", e)}
                        value={values.category}
                        placeholder="Chọn danh mục tour"
                        onBlur={() => setFieldTouched("category", true)}
                      ></Select>
                      {errors.category && touched.category ? (
                        <div className="invalid-feedback d-block">
                          {errors.category}
                        </div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Thời gian trong tuần:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="shedule_on_week"
                        placeholder="Nhập thời gian trong tuần"
                      />
                      {errors.shedule_on_week && touched.shedule_on_week ? (
                        <div className="invalid-feedback d-block">
                          {errors.shedule_on_week}
                        </div>
                      ) : null}
                    </FormGroup>
                  </div>

                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Vị trí xuất phát:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="start_location"
                        placeholder="Nhập vị trí xuất phát"
                      />
                      {errors.start_location && touched.start_location ? (
                        <div className="invalid-feedback d-block">
                          {errors.start_location}
                        </div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Vị trí kết thúc:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="end_location"
                        placeholder="Nhập vị trí kết thúc"
                      />
                      {errors.end_location && touched.end_location ? (
                        <div className="invalid-feedback d-block">
                          {errors.end_location}
                        </div>
                      ) : null}
                    </FormGroup>
                  </div>

                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Chọn phương tiện:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Select
                        options={ListTransport}
                        onChange={(e) => setFieldValue("transportation", e)}
                        value={values.transportation}
                        onBlur={() => setFieldTouched("transportation", true)}
                      ></Select>
                      {errors.transportation && touched.transportation ? (
                        <div className="invalid-feedback d-block">
                          {errors.transportation}
                        </div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Chọn số ngày:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Select
                        options={ListDayTour}
                        onChange={(e) => setFieldValue("day", e)}
                        value={values.day}
                        onBlur={() => setFieldTouched("day", true)}
                      ></Select>
                      {errors.day && touched.day ? (
                        <div className="invalid-feedback d-block">
                          {errors.day}
                        </div>
                      ) : null}
                    </FormGroup>
                  </div>

                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Giá vé người lớn:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="base_price_adult"
                        placeholder="Nhập giá vé người lớn"
                      />
                      {errors.base_price_adult && touched.base_price_adult ? (
                        <div className="invalid-feedback d-block">
                          {errors.base_price_adult}
                        </div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Giá vé trẻ em:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="base_price_child"
                        placeholder="Nhập giá vé trẻ em"
                      />
                      {errors.base_price_child && touched.base_price_child ? (
                        <div className="invalid-feedback d-block">
                          {errors.base_price_child}
                        </div>
                      ) : null}
                    </FormGroup>
                  </div>

                  {/* <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Chọn ngày bắt đầu:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="start_date"
                        placeholder="Chọn ngày bắt đầu  "
                        type="date"
                      />
                      {errors.start_date && touched.start_date ? (
                        <div className="invalid-feedback d-block">
                          {errors.start_date}
                        </div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Chọn ngày kết thúc:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="end_date"
                        placeholder="Chọn ngày kết thúc"
                        type="date"
                      />
                      {errors.end_date && touched.end_date ? (
                        <div className="invalid-feedback d-block">
                          {errors.end_date}
                        </div>
                      ) : null}
                    </FormGroup>
                  </div> */}

                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Chọn khách sạn:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Select
                        options={LIST_OPTION_RANK_HOTEL}
                        onChange={(e) => setFieldValue("star", e)}
                        value={values.star}
                        onBlur={() => setFieldTouched("star", true)}
                      ></Select>
                      {errors.star && touched.star ? (
                        <div className="invalid-feedback d-block">
                          {errors.star}
                        </div>
                      ) : null}
                    </FormGroup>

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
                        onChange={(e) => {
                          setFieldValue("provinceId", e);
                        }}
                        isMulti
                        onBlur={() => setFieldTouched("provinceId", true)}
                      ></Select>
                      {errors.provinceId && touched.provinceId ? (
                        <div className="invalid-feedback d-block">
                          {errors.provinceId}
                        </div>
                      ) : null}
                    </FormGroup>
                  </div>
                  <div className="d-flex" style={{ gap: "12px" }}>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Nhập giá khách sạn người lớn:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="price_adult"
                        placeholder="Nhập giá khách sạn người lớn"
                      />
                      {errors.price_adult && touched.price_adult ? (
                        <div className="invalid-feedback d-block">
                          {errors.price_adult}
                        </div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="w-100 error-l-100">
                      <Label>
                        Nhập giá khách sạn trẻ em:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Field
                        className="form-control"
                        name="price_child"
                        placeholder="Nhập giá khách sạn trẻ em"
                      />
                      {errors.price_child && touched.price_child ? (
                        <div className="invalid-feedback d-block">
                          {errors.price_child}
                        </div>
                      ) : null}
                    </FormGroup>
                  </div>

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

                  {Array.from({ length: values?.day?.value }).map((_, i) => (
                    <FormGroup className="error-l-100" key={i}>
                      <Label>
                        {`Nhập chi tiết ngày ${i + 1}`}:{" "}
                        <span style={{ color: "red", fontWeight: "600" }}>
                          *
                        </span>
                      </Label>
                      <Editor
                        value={arrSchedules[i]?.detail || ""}
                        setValue={(e) => {
                          const updatedSchedules = [...arrSchedules];
                          updatedSchedules[i] = {
                            day: i,
                            detail: e,
                          };
                          setArrSchedules(updatedSchedules);
                        }}
                      />
                    </FormGroup>
                  ))}

                  <FormGroup className="error-l-100">
                    <Label>
                      Ảnh minh họa:{" "}
                      <span style={{ color: "red", fontWeight: "600" }}>*</span>
                    </Label>
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

                  <FormGroup className="error-l-100">
                    <Label>
                      Ảnh banner quảng bá:{" "}
                      <span style={{ color: "red", fontWeight: "600" }}>*</span>
                    </Label>
                    <Input
                      type="file"
                      id="exampleCustomFileBrowser1"
                      name="image"
                      onChange={(e) => handleBannerUpload(e.target.files[0])}
                    />

                    {urlBanner && (
                      <div
                        className="image-preview"
                        style={{
                          marginTop: "40px",
                        }}
                      >
                        <img
                          src={urlBanner}
                          alt=""
                          style={{ height: "100px", width: "auto" }}
                        />
                        <div
                          className="image-preview-remove"
                          onClick={() => {
                            setUrlBanner("");
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

                  <FormGroup className="error-l-100">
                    <Label>
                      Ảnh slide quảng bá:{" "}
                      <span style={{ color: "red", fontWeight: "600" }}>*</span>
                    </Label>
                    <Input
                      type="file"
                      id="exampleCustomFileBrowser1"
                      name="image"
                      onChange={(e) => handleSlideUpload(e.target.files[0])}
                    />

                    {urlSlide && (
                      <div
                        className="image-preview"
                        style={{
                          marginTop: "40px",
                        }}
                      >
                        <img
                          src={urlSlide}
                          alt=""
                          style={{ height: "100px", width: "auto" }}
                        />
                        <div
                          className="image-preview-remove"
                          onClick={() => {
                            setUrlSlide("");
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
          <h3>{`Xác nhận ${type === "add" ? "thêm" : "chỉnh sửa"} tour`}</h3>
          <p>{`Bạn chắc chắn ${type === "add" ? "thêm" : "chỉnh sửa"} tour`}</p>
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
              disabled={isCreateTourRequest || isUpdateTourRequest}
              className={`btn-shadow btn-multiple-state ${
                isCreateTourRequest || isUpdateTourRequest
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
              disabled={isCreateTourRequest || isUpdateTourRequest}
              className={`btn-shadow btn-multiple-state ${
                isCreateTourRequest || isUpdateTourRequest ? "disabled" : ""
              }`}
              style={
                isCreateTourRequest || isUpdateTourRequest
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
