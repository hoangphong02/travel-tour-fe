import { Button } from 'react-bootstrap'
import Image1 from '~/assets/logo/image1.jpg'
import React, { memo } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';




export const CardBlog = memo(() => {
  const history = useHistory();
    const handleDetail = () => {
        history.push('/blog-detail/123')
    }
  
  return (
    <div className='card-blog' onClick={handleDetail}>
        <div className='card-blog-image'>
            <img src={Image1} alt=""    />
        </div>
        <div className='card-blog-body'>
            <span className='name'>CÁCH NẤU LẨU MẮM MIỀN TÂY CHUẨN HƯƠNG VỊ MIỀN TÂY</span>
            <span className='line'></span>
            <span className='des'>Lẩu mắm miền Tây là một trong những món ăn đặc sản nổi tiếng của vùng đất miền Tây Nam Bộ trù phú, dồi dào cá, tôm. Với hương vị đậm đà kết hợp với mùi thơm đặc trưng của mắm, lẩu mắm đã trở thành một món ăn được nhiều người ưa chuộng. Trong bài viết này ...</span>
            <Button>Xem thêm</Button>
        </div>
    </div>
  );
});

CardBlog.displayName = 'CardBlog';
