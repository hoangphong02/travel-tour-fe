import React from 'react';

const ContactPage = () => {
  // Optional: Add state and event handlers if you need to manage form input
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <div className="contact-container">
      <div className="left-col">
      
      </div>
      <div className="right-col">
        <div className="theme-switch-wrapper">
          <label className="theme-switch" htmlFor="checkbox">
            <input type="checkbox" id="checkbox" />
            <div className="slider round"></div>
          </label>
          <div className="description">Dark Mode</div>
        </div>
        
        <h1>Liên hệ chúng tôi</h1>
        <p>Có kế hoạch đến thăm miền Tây sớm? Nhận những lời khuyên nội bộ về nơi sẽ đến, những việc cần làm và tìm những ưu đãi tốt nhất cho chuyến phiêu lưu tiếp theo của bạn.</p>
        
        <form id="contact-form" method="post" onSubmit={handleSubmit}>
            <div className='item-form'>
          <label htmlFor="name">Họ và tên</label>
          <input type="text" id="name" name="name" placeholder="Tên của bạn" required />
            </div>
          <div className='item-form'>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email của bạn" required />
          </div>
          
          <div className='item-form'>
          <label htmlFor="message">Mong muốn</label>
          <textarea rows="6" placeholder="Mong muốn của bạn" id="message" name="message" required></textarea>
          </div>
          <div className='item-form'>
          <button type="submit" id="submit" name="submit">Gửi</button>
          </div>
        </form>
        
        <div id="error"></div>
        <div id="success-msg"></div>
      </div>
    </div>
  );
};

export default ContactPage;
