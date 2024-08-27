import React from 'react'
import Select from 'react-select'

const BookingPage = () => {
    const options = [
  { value: 'require-tour', label: 'Tour yêu cầu' },
  { value: 'normal-tour', label: 'Tour bình thường' },
]
  return (
    <div className='booking-page-wrapper'>
        <div className='booking-page-wrapper-left'>
            <div className='booking-page-wrapper-left-section-1'>
                <div className='top'>
                    <span className='title'>DỊCH VỤ TOUR</span>
                    <Select options={options} defaultValue={options[0]}/>
                </div>
                <div className='bottom'>
                    <div className='tour-require'>
                        <span className='title'>Tour yêu cầu</span>
                        <input type="text" placeholder='Tour yêu cầu'/>
                    </div>

                    <div className='list-option'>
                        <div className='option'>
                            <span className='title'>Khách sạn</span>
                             <Select options={options} defaultValue={options[1]}/>
                        </div>

                        <div className='option'>
                             <span className='title'>Số ngày đi tour</span>
                             <Select options={options} defaultValue={options[1]}/>
                        </div>
                          <div className='option'>
                             <span className='title'>Phương tiện</span>
                             <Select options={options} defaultValue={options[1]}/>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className='booking-page-wrapper-left-section-2'>
                <div className='top'>
                    <span className='title'>Chi tiết tour</span>
                </div>
                <div className='bottom'>
                    <span><strong>Mã booking 12342423</strong> <span style={{ color: 'red'}}>(Quý khách vui lòng nhớ số booking để tiện cho các giao dịch sau này)</span></span>
                    <div className='list-option'> 
                        <div className='option'>
                            <span>Người lớn</span>
                            <input type="text"  placeholder='0'/>
                        </div>
                        <div className='option'>
                            <span>Trẻ em</span>
                            <input type="text"  placeholder='0'/>
                        </div>
                        <div className='option'>
                            <span>Trẻ nhỏ</span>
                            <input type="text" placeholder='0'/>
                            <span> (Trẻ nhỏ hơn 6 tuổi ) </span>
                        </div>
                        
                    </div>
                    <div>
                        <span>Ngày đặt tour</span>
                        <input type="date" />
                    </div>
                </div>
            </div>

             <div className='booking-page-wrapper-left-section-3'>
                <div className='top'>
                    <span className='title'>Lưu ý</span>
                </div>
                <div className='bottom'>
                    <span>* Xin vui lòng nhập họ tên khách hàng phải đúng như tên trong CMND/CCCD.</span>
                    <span>* Quý khách vui lòng mang đầy đủ giấy tờ tùy thân.</span>
                    <span>* Hãy để lại thông tin chính xác để nhân viên của chúng tôi liên hệ lại cho bạn trong thời gian sớm nhất.</span>
                    <span>* Booking có giá trị khi được nhân viên xác nhận.</span>
                </div>
            </div>
        </div>

        <div className='booking-page-wrapper-right'>
            <div className='booking-page-wrapper-right-body'>
                <div className='top'>
                    <span>THÔNG TIN LIÊN LẠC</span>
                </div>
                <div className='form'>
                    <input type="text" placeholder='Họ tên*'/>
                    <input type="text" placeholder='Điện thoại*'/>
                    <input type="text" placeholder='Họ tên Email*'/>
                    <input type="text" placeholder='Địa chỉ'/>
                    <textarea placeholder='Ghi chú'/> 
                </div>

                <div className='bottom'>
                    <button>ĐẶT TOUR</button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default BookingPage