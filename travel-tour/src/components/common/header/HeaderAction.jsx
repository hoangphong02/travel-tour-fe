import React, { memo, useState } from "react";
import { Button, ButtonGroup, Dropdown, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "~/assets/logo/duck.png";
import logoTour from "~/assets/logo/logo-tour.png";
import { CSPhoneOutline } from "~/components/iconography/Outline";
import { CSUserAddSolid } from "~/components/iconography/Solid";
import { routesAuth, routesUser } from "~/configs";
import { logoutRequest } from "~/redux/auth/actions";
import { resetUserState } from "~/redux/user/actions";

export const HeaderAction = memo(() => {
  const [isScroll, setIsScroll] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const { profileResponse } = useSelector((store) => store.user);
  const [isShowModalLogout, setIsShowModalLogout] = useState(false);
  const dispatch = useDispatch();

  window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > 80) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  });
  const handleClose = () => {
    setIsShowModalLogout(false);
  };

  const handleLogout = () => {
    dispatch(logoutRequest());
    toast.success("Đăng xuất thành công!", {
      position: "top-center",
    });
    dispatch(resetUserState());
    setIsShowModalLogout(false);
  };

  console.log("profileResponse header", profileResponse);

  return (
    <section
      id="header-action"
      className={`header-action--wrapper ${isScroll ? "isScroll" : ""} ${pathname.includes(routesUser.introduce) || pathname.includes(routesUser.tablePriceTour) || pathname.includes(routesUser.contact) || pathname.includes(routesUser.booking) || pathname.includes(routesUser.tour) || pathname.includes(routesUser.blogs) || pathname.includes(routesUser.picturePage) ? "header-not-home" : ""}`}
    >
      <div className="header-action--inner flex-center-space h-full">
        <div className="header-action--inner--top">
          <div className="header-action--inner--top--left">
            <div className="phone">
              <CSPhoneOutline />
              <span>0742 483 578</span>
            </div>
            <div className="btn-contact">Liên hệ</div>
          </div>
          <div className="header-action--inner--top--right">
            {profileResponse?.data ? (
              // <div
              //   style={{ display: "flex", gap: "16px", alignItems: "center" }}
              // >
              //   <img
              //     src={logo}
              //     alt=""
              //     style={{ width: "30px", height: "30px" }}
              //   />
              //   <div>
              //     <span className="name-user">
              //       {profileResponse?.data?.name}
              //     </span>
              //   </div>
              // </div>

              <Dropdown as={ButtonGroup}>
                <div
                  style={{ display: "flex", gap: "16px", alignItems: "center" }}
                >
                  <img
                    src={logo}
                    alt=""
                    style={{ width: "30px", height: "30px" }}
                  />
                  <div>
                    <span className="name-user">
                      {profileResponse?.data?.name}
                    </span>
                  </div>
                </div>

                <Dropdown.Toggle
                  split
                  variant="none"
                  id="dropdown-split-basic"
                  style={{ border: "none" }}
                />

                <Dropdown.Menu style={{ zIndex: "6" }}>
                  {profileResponse?.data?.role === "admin" && (
                    <Dropdown.Item href="/admin">
                      Quản lý hệ thống
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item href="#/action-2">Lịch công tác</Dropdown.Item>
                  <Dropdown.Item onClick={() => setIsShowModalLogout(true)}>
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <span
                onClick={() => history.push(routesAuth.login)}
                style={{ cursor: "pointer" }}
              >
                <CSUserAddSolid style={{ height: "24px", fill: "#fff" }} />
              </span>
            )}
          </div>
        </div>

        <div className="header-action--inner--bottom">
          <div
            className={`logo ${!pathname.includes(routesUser.introduce) && !pathname.includes(routesUser.tablePriceTour) && !pathname.includes(routesUser.contact) && !pathname.includes(routesUser.booking) && !pathname.includes(routesUser.tour) && !pathname.includes(routesUser.blogs) && !pathname.includes(routesUser.picturePage) ? "filter-logo" : ""}`}
          >
            <img
              src={logoTour}
              alt=""
              style={{ height: "80px", width: "auto " }}
              onClick={() => history.push(routesUser.home)}
            />
          </div>
          <div className="list-option">
            <div className="item" onClick={() => history.push(routesUser.home)}>
              <span>TRANG CHỦ</span>
            </div>
            <div
              className="item"
              onClick={() => history.push(routesUser.introduce)}
            >
              <span>GIỚI THIỆU</span>
            </div>
            <div className="item">
              <span onClick={() => history.push(routesUser.tour)}>TOUR</span>
              <ul className="ul-tour">
                <li>Miền tây trong ngày</li>
                <li>Tour dịch vụ</li>
                <li>Tour 3 ngày 2 đêm</li>
              </ul>
            </div>
            <div
              className="item"
              onClick={() => history.push(routesUser.tablePriceTour)}
            >
              <span>BẢNG GIÁ</span>
            </div>
            <div
              className="item"
              onClick={() => history.push(routesUser.booking)}
            >
              <span>ĐẶT TOUR</span>
            </div>
            <div className="item">
              <span>BLOG</span>
              <ul className="ul-blog">
                <li onClick={() => history.push(routesUser.blogs)}>
                  Cẩm nang du lịch
                </li>
                <li>Đặt sản miền tây</li>
              </ul>
            </div>
            <div
              className="item"
              onClick={() => history.push(routesUser.picturePage)}
            >
              <span>HÌNH ẢNH</span>
            </div>
            <div
              className="item"
              onClick={() => history.push(routesUser.contact)}
            >
              LIÊN HỆ
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={isShowModalLogout}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Xác nhận</span>
            <span style={{ fontSize: "13px" }}>
              Bạn có chắc chắn muốn đăng xuất tài khoản không
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Button
            onClick={handleClose}
            style={{
              width: "45%",
              background: "#fff",
              border: "1px solid #ddd",
              color: "rgb(157 157 157)",
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleLogout}
            style={{
              width: "45%",
              background: "rgb(255 145 15)",
              border: "none",
            }}
          >
            Đăng xuất
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
});

HeaderAction.displayName = "HeaderAction";
