import React, { memo, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import logo from '~/assets/logo/duck.png';
import logoTour from '~/assets/logo/logo-tour.png';
import { CSPhoneOutline } from '~/components/iconography/Outline';
import { routesUser } from '~/configs';

export const HeaderAction = memo(() => {
  const [isScroll, setIsScroll] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
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
    <section id="header-action" className={`header-action--wrapper ${isScroll ? 'isScroll' : ''} ${pathname.includes(routesUser.introduce) || pathname.includes(routesUser.tablePriceTour) || pathname.includes(routesUser.contact) || pathname.includes(routesUser.booking) || pathname.includes(routesUser.tour) || pathname.includes(routesUser.blogs) || pathname.includes(routesUser.picturePage) ? 'header-not-home': ''}`}>
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
          <div className={`logo ${!pathname.includes(routesUser.introduce) && !pathname.includes(routesUser.tablePriceTour) && !pathname.includes(routesUser.contact) && !pathname.includes(routesUser.booking) && !pathname.includes(routesUser.tour) && !pathname.includes(routesUser.blogs) && !pathname.includes(routesUser.picturePage)? 'filter-logo' : '' }`}>
            <img src={logoTour} alt="" style={{ height: '80px', width:'auto '}}/>
          </div>
          <div className='list-option'>
            <div className='item' onClick={() => history.push(routesUser.home)}>
              <span>TRANG CHỦ</span>
            </div>
            <div className='item'  onClick={() => history.push(routesUser.introduce)}>
              <span>GIỚI THIỆU</span>
            </div>
            <div className='item' >
              <span onClick={() => history.push(routesUser.tour) }>TOUR</span>
                <ul className='ul-tour'>
                  <li>Miền tây trong ngày</li>
                  <li>Tour dịch vụ</li>
                  <li>Tour 3 ngày 2 đêm</li>
                </ul>
            </div>
            <div className='item' onClick={() => history.push(routesUser.tablePriceTour)}>
              <span>BẢNG GIÁ</span>
            </div>
            <div className='item' onClick={() => history.push(routesUser.booking)}>
              <span>ĐẶT TOUR</span>
            </div>
             <div className='item' >
              <span>BLOG</span>
                  <ul className='ul-blog'>
                  <li onClick={() => history.push(routesUser.blogs) }>Cẩm nang du lịch</li>
                  <li>Đặt sản miền tây</li>
                </ul>
            </div>
            <div className='item' onClick={() => history.push(routesUser.picturePage)}>
              <span>HÌNH ẢNH</span>
            </div>
            <div className='item' onClick={() => history.push(routesUser.contact)}>
              LIÊN HỆ
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeaderAction.displayName = 'HeaderAction';
