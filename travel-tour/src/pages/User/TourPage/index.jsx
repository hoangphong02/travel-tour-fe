import React from 'react'
import { CardTour } from '~/components/common'

const TourPage = () => {
  return (
    <div className='tour-page-wrapper'>
        <div className='title'>
          <span>TOUR</span>
          <span className='line-1'></span>
          <span  className='line-2'></span>
        </div>
        <div className='list-tour'>
            <CardTour />
            <CardTour />
            <CardTour />
        </div>
    </div>
  )
}

export default TourPage