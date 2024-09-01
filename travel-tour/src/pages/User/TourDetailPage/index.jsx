import React from 'react'
import OptionTour from './OptionTour'

const TourDetailPage = () => {
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
                <div className='option active'>
                    <span>Chương trình tour</span>
                </div>
                <div className='option'>
                    <span>Bảng giá</span>
                </div>
                <div className='option'>
                    <span>Thông tin tour</span>
                </div>
                <div className='option'>
                    <span>Tổng quan tour</span>
                </div>
                <div className='option active'>
                    <span>Điều kiện tour</span>
                </div>
                <div className='option'>
                    <span>Hình ảnh tour</span>
                </div>
            </div>
        </div>
        <div className='list-option-tour'>
            <OptionTour />
        </div>
    </div>
  )
}

export default TourDetailPage