import React, { memo, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import logo from '~/assets/logo/duck.png';
import logoTour from '~/assets/logo/logo-tour.png';
import { CSPhoneOutline } from '~/components/iconography/Outline';

export const HeaderAction = memo(() => {
  const [isScroll, setIsScroll] = useState(false);
  // const { profileResponse } = useSelector((store) => store.user);
  // const { getAllNotificationsResponse } = useSelector(
  //   (store) => store.notification,
  // );

  // const cartState = localStorage.getItem(
  //   STORAGE_KEY.CART_STATE.concat('_').concat(profileResponse.data.id),
  // )
  //   ? JSON.parse(
  //     localStorage.getItem(
  //       STORAGE_KEY.CART_STATE.concat('_').concat(profileResponse.data.id),
  //     ),
  //   )
  //   : [];

  const [showBlog, setShowBlog] = useState(true);
  const [showTour, setShowTour] = useState(true);
  window.addEventListener('scroll', function() {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;
  if(scrollTop > 80) {
    setIsScroll(true);
  }
  else{
    setIsScroll(false)
  }
});

  return (
    <section id="header-action" className={`header-action--wrapper ${isScroll ? 'isScroll' : ''}`}>
      <div className="header-action--inner flex-center-space h-full">
        <div className="header-action--inner--top">
            <div className='header-action--inner--top--left'>
                <div className='phone'>
                    <CSPhoneOutline/>
                    <span>0742 483 578</span>
                </div>
                <div className='btn-contact'>
                    Liên hệ
                </div>
            </div>
            <div className='header-action--inner--top--right'>
                <img src={logo} alt="" style={{ width:'30px', height: '30px'}} />

            </div>
        </div>

        <div className='header-action--inner--bottom'> 
          <div className='logo'>
            <img src={logoTour} alt="" style={{ height: '80px', width:'auto '}}/>
          </div>
          <div className='list-option'>
            <div className='item'>
              <span>TRANG CHỦ</span>
            </div>
            <div className='item'>
              <span>GIỚI THIỆU</span>
            </div>
            <div className='item' onClick={() => setShowTour(true)} onBlur={() => setShowTour(false)}>
              <Dropdown autoClose align="end" > 
                      <Dropdown.Toggle variant="success" id="dropdown-basic" >
                        TOUR
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ display: showTour === true ? 'flex' : 'none'}} className='dropdown-menu-tour' hidden={showTour}>
                          <span>Miền tây trong ngày</span>
                           <span>Tour dịch vụ</span>
                           <span>Tour 3 ngày 2 đêm</span>
                      </Dropdown.Menu>
                    </Dropdown>
            </div>
            <div className='item'>
              <span>BẢNG GIÁ</span>
            </div>
            <div className='item'>
              <span>ĐẶT TOUR</span>
            </div>
             <div className='item' onClick={() => setShowBlog(true)} onBlur={() => setShowBlog(false)}>
              <Dropdown autoClose align="end" > 
                      <Dropdown.Toggle variant="success" id="dropdown-basic" >
                        BLOG
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ display: showBlog === true ? 'flex' : 'none'}} className='dropdown-menu-blog' hidden={showBlog}>
                          <span>Cẩm nang du lịch</span>
                           <span>Đặt sản miền tây</span>
                      </Dropdown.Menu>
                    </Dropdown>
            </div>
            <div className='item'>
              <span>HÌNH ẢNH</span>
            </div>
            <div className='item'>
              LIÊN HỆ
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeaderAction.displayName = 'HeaderAction';
