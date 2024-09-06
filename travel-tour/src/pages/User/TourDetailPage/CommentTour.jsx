import React from 'react'
import image2 from '~/assets/logo/image2.jpg';

const CommentTour = () => {
  return (
    <div className='comment-tour-detail'>
         <div className='form-comment'>
                        <div className='form-comment-body'>
                        <div><span style={{ fontSize: '20px', fontWeight: '600'}}>QUÝ KHÁCH CÓ ĐIỀU CHƯA RÕ VỀ TOUR. HÃY ĐẶT CÂU HỎI CHÚNG TÔI SẼ TRẢ LỜI SỚM NHẤT.</span></div>

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
                        <div className='list-comment'  style={{display:"flex", flexDirection:"column", gap:"16px"}}>
                            <div style={{display:"flex", flexDirection:"column", gap:"16px"}}>
                                <div style={{textAlign:'left'}}>
                                    <div>
                                        <img src={image2} alt="" style={{ height: '40px', width:'40px', objectFit:'cover', borderRadius:'50% '}}/>
                                        <span style={{paddingLeft:"16px", fontWeight:"600"}}>Nguyễn Kim</span>
                                    </div>
                                    <div style={{paddingTop:"8px", fontSize:"13px"}}>
                                        <span>11:11 12/12/2222</span>
                                    </div>
                                </div>
                                <div style={{background:"#fff", textAlign:"left", padding:"20px", borderRadius:"16px"}}>
                                    <span>Tư vấn tour châu đốc</span>
                                    <div style={{ cursor:"pointer", color:"#3880bb", padding:"8px 0"}}>
                                        <span>Gửi trả lời</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{display:"flex", flexDirection:"column", gap:"16px"}}>
                                <div style={{textAlign:'left'}}>
                                    <div>
                                        <img src={image2} alt="" style={{ height: '40px', width:'40px', objectFit:'cover', borderRadius:'50% '}}/>
                                        <span style={{paddingLeft:"16px", fontWeight:"600"}}>Nguyễn Kim</span>
                                    </div>
                                    <div style={{paddingTop:"8px", fontSize:"13px"}}>
                                        <span>11:11 12/12/2222</span>
                                    </div>
                                </div>
                                <div style={{background:"#fff", textAlign:"left", padding:"20px", borderRadius:"16px"}}>
                                    <span>Tư vấn tour châu đốc</span>
                                    <div style={{ cursor:"pointer", color:"#3880bb", padding:"8px 0"}}>
                                        <span>Gửi trả lời</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{display:"flex", flexDirection:"column", gap:"16px"}}>
                                <div style={{textAlign:'left'}}>
                                    <div>
                                        <img src={image2} alt="" style={{ height: '40px', width:'40px', objectFit:'cover', borderRadius:'50% '}}/>
                                        <span style={{paddingLeft:"16px", fontWeight:"600"}}>Nguyễn Kim</span>
                                    </div>
                                    <div style={{paddingTop:"8px", fontSize:"13px"}}>
                                        <span>11:11 12/12/2222</span>
                                    </div>
                                </div>
                                <div style={{background:"#fff", textAlign:"left", padding:"20px", borderRadius:"16px"}}>
                                    <span>Tư vấn tour châu đốc</span>
                                    <div style={{ cursor:"pointer", color:"#3880bb", padding:"8px 0"}}>
                                        <span>Gửi trả lời</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
    </div>
  )
}

export default CommentTour