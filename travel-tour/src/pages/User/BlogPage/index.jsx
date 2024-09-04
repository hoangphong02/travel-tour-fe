import React from 'react'
import { CardBlog } from '~/components/common/CardBlog'

const BlogPage = () => {
  return (
    <div className='blog-page'>
        <div className='section'>
            <div className='title'>
                <span>CẨM NANG DU LỊCH</span>
                <div className='line'>
                  <span className='line-1'></span>
                  <span className='line-2'></span>
                </div>
            </div>
            <div className='list-card-blog'>
                <CardBlog />
                <CardBlog />
                <CardBlog />
                <CardBlog />
                <CardBlog />
                <CardBlog />
            </div>
        </div>
        <div className='section'>
            <div className='title'>
                <span>ĐẶC SẢN MIỀN TÂY</span>
                <div className='line'>
                  <span className='line-1'></span>
                  <span className='line-2'></span>
                </div>
            </div>
            <div className='list-card-blog'>
                <CardBlog />
                <CardBlog />
                <CardBlog />
                <CardBlog />
                <CardBlog />
                <CardBlog />
            </div>
        </div>
    </div>
  )
}

export default BlogPage
