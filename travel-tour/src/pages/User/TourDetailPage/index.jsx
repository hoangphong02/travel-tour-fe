import React from 'react'

const TourDetailPage = () => {
  return (
    <div className='tour-detail-page-wrapper'>
        <div className='tour-detail-page-wrapper-top'>
            <span className='name-tour'>TOUR MIỀN TÂY 1 NGÀY</span>
            <span className='price-tour'>Giá tour gốc: 450.000VNĐ</span>
            <div className='btn-book-tour'>
                <span>Đặt ngay</span>
            </div>
        </div>
        
        <div className='body'>
            <div>
                <div>
                    <span>Chương trình tour</span>
                </div>
                <div>
                    <span>Bảng giá</span>
                </div>
                <div>
                    <span>Thông tin tour</span>
                </div>
                <div>
                    <span>Tổng quan tour</span>
                </div>
                <div>
                    <span>Điều kiện tour</span>
                </div>
                <div>
                    <span>Hình ảnh tour</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TourDetailPage