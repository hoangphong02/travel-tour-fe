import React, { useEffect, useRef, useState } from 'react'
import banner1 from '~/assets/logo/image3.jpg';

const IntroducePage = () => {
    const [isScrollSectionRight, setIsScrollSectionRight] = useState(false);
    const [isScrollRight, setIsSCrollRight] = useState(true)
    const ref = useRef();
   const distanceFromTop = ref?.current?.offsetTop;

   useEffect(() => {
    // Define the scroll event handler
    const handleScroll = () => {
      let scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (ref.current) {
        if (scrollTop > distanceFromTop) {
          setIsScrollSectionRight(true);
        } else {
          setIsScrollSectionRight(false);
        }
      }
    };

    // Add the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [distanceFromTop]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight; // Get the viewport height

      if (ref.current) {
        const rightSectionRect = ref.current.getBoundingClientRect();
        const distanceFromBottom = windowHeight - (rightSectionRect.top + rightSectionRect.height); // Calculate distance from bottom

        // If the distance from the bottom of the viewport to the bottom of the element is greater than 100px
        if (distanceFromBottom > 100) {
          setIsScrollSectionRight(true);
        } else {
          setIsScrollSectionRight(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsSCrollRight(isScrollSectionRight)
  }, [isScrollSectionRight])
  return (
    <div className='introduce-page-wrapper'>
        <div className='introduce-page-wrapper-body'>
            <div className='introduce-page-wrapper-body-left'>
                <div className='title'>
                    <span>VỀ CHÚNG TÔI</span>
                </div>
                <div className='bottom'>
                    <div className="name-company">
                        <span>CÔNG TY TNHH DU LỊCH TOUR MIỀN TÂY</span>
                    </div>
                    <div>
                        <strong >Thời gian thành lập và quá trình phát triển</strong>
                        <br />
                        <span>Công ty <strong>TNHH du lịch Tour Miền Tây</strong> được thành lập năm 2024, với tên gọi <strong>Tour Miền Tây</strong>. Tuy mới thành lập cách đây không lâu, nhưng sau quá trình hình thành và phát triển, <strong>Tour miền Tây</strong> không ngừng nghiên cứu và luôn là đơn vị đi đầu trong lĩnh vực ứng dụng công nghệ hiện đại kết hợp với dịch vụ. Chúng tôi luôn ưu tiên cung cấp những ý tưởng du lịch độc đáo và sáng tạo nhằm đem lại trải nghiệm độc đáo cho du khách khi trải nghiệm du lịch Miền Tây</span>
                        <strong>Lĩnh vực hoạt động</strong>
                        <br />
                        <span>
                            <strong>Tour Miền Tây</strong> hoạt động như một nhà điều hành tour du lịch trong và ngoài nước, chuyên tổ chức các tour du lịch miền Tây như:
                        </span>
                        <ul>
                           <li> Tour miền tây 1 ngày: CẦN THƠ - BẾN TRE</li>
                           <li> Tour miền tây 2 ngày 1 đêm: CẦN THƠ - BẾN TRE - BẠC LIÊU</li>
                           <li> Tour miền tây 3 ngày 2 đêm: CẦN THƠ - SÓC TRĂNG - BẾN TRE - BẠC LIÊU - CÀ MAU</li>
                           <li> Tour tham quan vườn trái cây miền Tây, các khu du lịch sinh thái</li>
                        </ul>
                        <span>
                            Bên cạnh đó, chúng tôi còn có các dịch vụ hỗ trợ đi kèm để có thể đảm bảo mang đến trải nghiệm dịch vụ tốt nhất cho khách hàng như:
                        </span>
                        <ul>
                            <li>Dịch vụ tư vấn</li>
                            <li>Dịch vụ hỗ trợ khách hàng</li>
                            <li>Quản lý lữ hành và các gói dịch vụ tùy chỉnh</li>
                        </ul>
                        <span><strong>Tour Miền Tây</strong> tự tin có thể đáp ứng đa dạng của khách khi tham quan Miền Tây. Không những thế, chúng tôi còn cung cấp các giải pháp du lịch để nhằm mang đến cho khách hàng chuyến du lịch như ý. Tất cả đều được điều chỉnh một cách chuyên nghiệp phù hợp nhu cầu và mang lại sự thoải mái, tiện lợi cho du khách, cho dù đó là những chuyến du lịch chọn gói hay du lịch tự túc.</span>
                        <span>Tiêu chí hoạt động</span>
                        <span>Với phương châm mang lại những giá trị tốt nhất cho du khách. Tour Miền Tây luôn cung cấp những gì tốt nhất, thuận tiện nhất đồng thời tìm kiếm những điểm đến và trải nghiệm với tiêu chí:</span>
                        <ul>
                            <li>Chất lượng là quan tâm hàng đầu.</li>
                            <li>Giá tour cạnh tranh nhất.</li>
                            <li>Tour thiết kế theo yêu cầu.</li>
                            <li>Khởi hành hàng ngày.</li>
                            <li>Đặt tour nhanh chóng và thuận tiện.</li>
                            <li>Thanh toán linh hoạt.</li>
                            <li>Tưu vấn và hỗ trợ tối đa cho du khách</li>
                        </ul>
                        <strong>Thành quả đạt được.</strong>
                        <br/>
                        <span>Xuyên suốt quá trình hoạt động <strong>Tour Miền Tây</strong> may mắn nhận được sựu tin tưởng và ủng hộ của hơn 500 nghìn khách hàng. Đây là nguồn động viên to lớn và là động lực để <strong>Tour Miền Tây</strong> ngày càng hoàn thiện và phát triển. Chúng tôi luôn hi vọng có thể mang lại cho quý khách hàng những chuyến du lịch miền Tây chọn vẹn nhất</span>
                        <div className='image-about-us'>
                            <img src={banner1} />
                        </div>
                    </div>

                    <div className='form-comment'>
                        <div className='form-comment-body'>
                            <div><span style={{ fontSize: '20px', fontWeight: '600'}}>BÌNH LUẬN BÀI VIẾT</span></div>

                        <div className='section-1'>
                            <div>
                                <span style={{ fontSize: '18px', fontWeight: '600'}}>1. Nhập họ tên</span>
                                <input type="text" />
                            </div>
                            <div>
                                <span style={{ fontSize: '18px', fontWeight: '600'}}>2. Nhập email</span>
                                <input type="text" />
                            </div>
                            <div>
                                <span style={{ fontSize: '18px', fontWeight: '600'}}>3. Nhập số điện thoại</span>
                                <input type="text" />
                            </div>
                        </div>
                        <div className='section-2'>
                            <div>
                                <span style={{ fontSize: '18px', fontWeight: '600'}}>4. Viết nhận xét của bạn vào bên dưới</span>
                                <textarea type="text" className='message'/>
                            </div>
                        </div>
                        <div className='section-3'> 
                            <div className='btn-send'> 
                                <span style={{ fontSize: '18px', fontWeight: '600', color: 'rgb(156 204 219)'}}>GỬI NGAY</span>
                            </div>
                        </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className='introduce-page-wrapper-body-right' >
                <div className={`introduce-page-wrapper-body-right-body ${isScrollRight ? 'scroll-section-right': '' }`} ref={ref}>
                    <div className='title'>
                        <span>TOUR DU LỊCH XEM NHIỀU</span>
                    </div>
                    <div className='list-tour'>
                        <div className='tour'>
                            <img src={banner1} alt="" />
                            <div>
                                <span>TOUR MIỀN TÂY 1 NGÀY</span>
                                <span>Giá: <span className='price'>450.000đ</span></span>
                            </div>
                        </div>
                        <div  className='tour'>
                            <img src={banner1} alt="" />
                            <div>
                                <span>TOUR MIỀN TÂY 1 NGÀY</span>
                                <span>Giá: <span className='price'>450.000đ</span></span>
                            </div>
                        </div>
                        <div  className='tour'>
                            <img src={banner1} alt="" />
                            <div>
                                <span>TOUR MIỀN TÂY 1 NGÀY</span>
                                <span>Giá: <span className='price'>450.000đ</span></span>
                            </div>
                        </div>
                        <div className='tour'>
                            <img src={banner1} alt="" />
                            <div>
                                <span>TOUR MIỀN TÂY 1 NGÀY</span>
                                <span>Giá: <span className='price'>450.000đ</span></span>
                            </div>
                        </div>
                        <div className='tour'>
                            <img src={banner1} alt="" />
                            <div>
                                <span>TOUR MIỀN TÂY 1 NGÀY</span>
                                <span>Giá: <span className='price'>450.000đ</span></span>
                            </div>
                        </div>
                        <div  className='tour'>
                            <img src={banner1} alt="" />
                            <div>
                                <span>TOUR MIỀN TÂY 1 NGÀY</span>
                                <span>Giá: <span className='price'>450.000đ</span></span>
                            </div>
                        </div>  

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default IntroducePage