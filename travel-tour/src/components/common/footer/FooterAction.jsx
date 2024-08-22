import React, { memo, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import image1 from '~/assets/logo/image1.jpg';
import image2 from '~/assets/logo/image2.jpg';
import image3 from '~/assets/logo/image3.jpg';
import image4 from '~/assets/logo/image9.png';
import logoTour from '~/assets/logo/logo-tour.png';


export const FooterAction = memo(() => {
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

  

  return (
    <footer id="footer-action" className="footer-action--wrapper">

        <div className='footer-action--wrapper--content'>
          <div className='content-bank '>
          <img src={logoTour} alt="" style={{ height: '80px', width: '162px', objectFit:'contain'}}/>
          <strong>CÔNG TY TNHH DU LỊCH MIỀN TÂY</strong>
          <strong>Thông tin chuyển khoản</strong>
          <span>1. Chủ tài khoản: <strong>Nguyễn Văn A</strong> | STK: <strong>0343 432 4343</strong> | Ngân hàng nhà nước Agribank </span>
          <span>2. Chủ tài khoản: <strong>Công ty TNHH Du lịch miền Tây</strong> | STK: <strong>0343 432 4335</strong> | Ngân hàng nhà nước Agribank </span>

        </div>

        <div className='content-contact'>
          <strong>THÔNG TIN LIÊN HỆ</strong>
          <span> <strong>Địa chỉ:</strong> Đường 3/2, quận Ninh Kiều, Thành Phố Cần Thơ</span>
          <span> <strong>Điện thoại:</strong> 0234 243 434</span>
          <span> <strong>Hotline:</strong> 0234 243 434 | 0234 243 435</span>
          <span> <strong>Email:</strong> tourmientay.com</span>
        </div>
        <div className='content-introduce'>
          <strong>GIỚI THIỆU</strong>
          <span> Về chúng tôi</span>
          <span> Hướng dẫn thanh toán</span>
          <span> Hướng dẫn đặt tour</span>
          <span> Bảng giá</span>
        </div>
        <div className='content-image'>
          <strong>HÌNH ẢNH</strong>
          <div className='image1'>
            <img src={image1} alt=""  style={{ height: '100px', width: "200px"}}/>
            <img src={image2} alt="" style={{ height: '100px', width: "200px"}}/>
          </div>
          <div className='image2'>
            <img src={image3} alt="" style={{ height: '100px', width: "200px"}}/>
            <img src={image4} alt="" style={{ height: '100px', width: "200px"}}/>
          </div>
        </div>

      </div>
      <div className='footer-action--wrapper--bottom'>
        <span>Copyright © 2024 <strong>Tour Miền Tây</strong> . All rights reserved.
		 </span>
      </div>

    </footer>
  );
});

FooterAction.displayName = 'FooterAction';
