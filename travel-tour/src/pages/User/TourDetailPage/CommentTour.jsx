import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import image2 from "~/assets/logo/image2.jpg";
import {
  createCommentsRequest,
  resetCreateComments,
} from "~/redux/comment/actions";

const CommentTour = ({ id }) => {
  const dispatch = useDispatch();
  const {
    isCreateCommentsRequest,
    isCreateCommentsSuccess,
    isCreateCommentsFailure,
  } = useSelector((store) => store.comment);
  const { values, setFieldValue, resetForm } = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
      content: "",
    },
  });

  const handleComment = () => {
    const payload = {
      fullname: values.fullname,
      email: values.email,
      phone: values.phone,
      content: values.content,
      tour: id,
    };
    dispatch(createCommentsRequest(payload));
  };

  useEffect(() => {
    if (isCreateCommentsSuccess) {
      toast.success("Gửi comment thành công");
      dispatch(resetCreateComments());
      resetForm();
    }
  }, [isCreateCommentsSuccess]);

  return (
    <div className="comment-tour-detail">
      <div className="form-comment">
        <div className="form-comment-body">
          <div>
            <span style={{ fontSize: "20px", fontWeight: "600" }}>
              QUÝ KHÁCH CÓ ĐIỀU CHƯA RÕ VỀ TOUR. HÃY ĐẶT CÂU HỎI CHÚNG TÔI SẼ
              TRẢ LỜI SỚM NHẤT.
            </span>
          </div>

          <div className="section-1">
            <div>
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                1. Nhập họ tên
              </span>
              <input
                type="text"
                value={values.fullname}
                onChange={(e) => setFieldValue("fullname", e.target.value)}
              />
            </div>
            <div>
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                2. Nhập email
              </span>
              <input
                type="text"
                value={values.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
              />
            </div>
            <div>
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                3. Nhập số điện thoại
              </span>
              <input
                type="text"
                value={values.phone}
                onChange={(e) => setFieldValue("phone", e.target.value)}
              />
            </div>
          </div>
          <div className="section-2">
            <div>
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                4. Viết nhận xét của bạn vào bên dưới
              </span>
              <textarea
                type="text"
                className="message"
                value={values.content}
                onChange={(e) => setFieldValue("content", e.target.value)}
              />
            </div>
          </div>
          <div className="section-3">
            <Button className="btn-send" onClick={handleComment}>
              {isCreateCommentsRequest ? (
                <Spinner size="12" />
              ) : (
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "rgb(156 204 219)",
                  }}
                >
                  GỬI NGAY
                </span>
              )}
            </Button>
          </div>
          <div
            className="list-comment"
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div>
                  <img
                    src={image2}
                    alt=""
                    style={{
                      height: "40px",
                      width: "40px",
                      objectFit: "cover",
                      borderRadius: "50% ",
                    }}
                  />
                  <span style={{ paddingLeft: "16px", fontWeight: "600" }}>
                    Nguyễn Kim
                  </span>
                </div>
                <div style={{ paddingTop: "8px", fontSize: "13px" }}>
                  <span>11:11 12/12/2222</span>
                </div>
              </div>
              <div
                style={{
                  background: "#fff",
                  textAlign: "left",
                  padding: "20px",
                  borderRadius: "16px",
                }}
              >
                <span>Tư vấn tour châu đốc</span>
                <div
                  style={{
                    cursor: "pointer",
                    color: "#3880bb",
                    padding: "8px 0",
                  }}
                >
                  <span>Gửi trả lời</span>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div>
                  <img
                    src={image2}
                    alt=""
                    style={{
                      height: "40px",
                      width: "40px",
                      objectFit: "cover",
                      borderRadius: "50% ",
                    }}
                  />
                  <span style={{ paddingLeft: "16px", fontWeight: "600" }}>
                    Nguyễn Kim
                  </span>
                </div>
                <div style={{ paddingTop: "8px", fontSize: "13px" }}>
                  <span>11:11 12/12/2222</span>
                </div>
              </div>
              <div
                style={{
                  background: "#fff",
                  textAlign: "left",
                  padding: "20px",
                  borderRadius: "16px",
                }}
              >
                <span>Tư vấn tour châu đốc</span>
                <div
                  style={{
                    cursor: "pointer",
                    color: "#3880bb",
                    padding: "8px 0",
                  }}
                >
                  <span>Gửi trả lời</span>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div>
                  <img
                    src={image2}
                    alt=""
                    style={{
                      height: "40px",
                      width: "40px",
                      objectFit: "cover",
                      borderRadius: "50% ",
                    }}
                  />
                  <span style={{ paddingLeft: "16px", fontWeight: "600" }}>
                    Nguyễn Kim
                  </span>
                </div>
                <div style={{ paddingTop: "8px", fontSize: "13px" }}>
                  <span>11:11 12/12/2222</span>
                </div>
              </div>
              <div
                style={{
                  background: "#fff",
                  textAlign: "left",
                  padding: "20px",
                  borderRadius: "16px",
                }}
              >
                <span>Tư vấn tour châu đốc</span>
                <div
                  style={{
                    cursor: "pointer",
                    color: "#3880bb",
                    padding: "8px 0",
                  }}
                >
                  <span>Gửi trả lời</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentTour;
