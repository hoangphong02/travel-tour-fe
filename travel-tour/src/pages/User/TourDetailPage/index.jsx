import React, { useState } from 'react'
import OptionTour from './OptionTour'

const TourDetailPage = () => {
      const [option, setOption] = useState('program');
      const handleChangeOption = (value) => {
        setOption(value);
      }
  return (
    <div className='tour-detail-page-wrapper'>
        <div className='tour-detail-page-wrapper-top'>
            <span className='name-tour'>TOUR MIỀN TÂY 1 NGÀY</span>
            <span className='price-tour'>Giá tour gốc: <span className='price'>450.000VNĐ</span></span>
            <div className='btn-book-tour'>
                <span>Đặt ngay</span>
            </div>
        </div>
        
        <div className='tour-detail-page-wrapper-body'>
            <div className='tour-detail-page-wrapper-body-list-option'>
                <div className={`option ${option === 'program'  ? 'active': ''}`} onClick={()=>handleChangeOption('program')}>
                    <span>Chương trình tour</span>
                </div>
                <div className={`option ${option === 'priceTable'  ? 'active': ''}`} onClick={()=>handleChangeOption('priceTable')}>
                    <span>Bảng giá</span>
                </div>
                <div className={`option ${option === 'information'  ? 'active': ''}`} onClick={()=>handleChangeOption('information')}>
                    <span>Thông tin tour</span>
                </div>
                <div className={`option ${option === 'overview'  ? 'active': ''}`} onClick={()=>handleChangeOption('overview')}>
                    <span>Tổng quan tour</span>
                </div>
                <div className={`option ${option === 'require'  ? 'active': ''}`} onClick={()=>handleChangeOption('require')}>
                    <span>Điều kiện tour</span>
                </div>
                <div className={`option ${option === 'picture'  ? 'active': ''}`} onClick={()=>handleChangeOption('picture')}>
                    <span>Hình ảnh tour</span>
                </div>
            </div>
        </div>
        <div className='list-option-tour'>
            <OptionTour option={option} setOption={setOption}/>
        </div>
    </div>
  )
}

export default TourDetailPage