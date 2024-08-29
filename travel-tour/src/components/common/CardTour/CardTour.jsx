import React, { memo } from 'react'
import { Button } from 'react-bootstrap';
import image1 from '~/assets/logo/image4.jpg';
import { CSChatOutline, CSCheckCircleOutline, CSMailBoxOutline, CSUser2Outline } from '~/components/iconography/Outline';
import { CSUserSolid } from '~/components/iconography/Solid';



export const CardTour = memo(() => {

  
  return (
   <div className='card-tour'>
        <img src={image1}/>
        <div className='info-card'>
            <span className='title'>TOUR 4 NGÀY 3 ĐÊM</span>
            <span className='price'>Giá gốc: <strong>3.080.000 VND</strong></span>
            <Button>Đặt tour</Button>
        </div>
        <div className='bottom'>
            <div className='left'>
                <CSUser2Outline/>
            <span>Lượng người quan tâm</span>
            </div>
            <div className='right'>
                <div >
                    <CSCheckCircleOutline />
                    100
                </div>
                <div>
                    <CSChatOutline />
                <span>
                    50
                </span>
                </div>
            </div>
        </div>

   </div>
  );
});

CardTour.displayName = 'CardTour';
