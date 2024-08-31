import React, { useState } from 'react'
import { CardTour } from '~/components/common'
import PaginationCustom from '~/components/common/TableComponent/PaginationCustom';

const TourPage = () => {
  const limit = 6;
  const [indexPage, setIndexPage] = useState(1);
  const handleChangePage = (idxPage) => {
    setIndexPage(idxPage);
    // setIsCallApi(true);
  };
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
            <CardTour />
            <CardTour />
            <CardTour />
            <CardTour />
            <CardTour />
            <CardTour />
            <CardTour />
            <CardTour />
            <CardTour />
        </div>
        <div>
          <PaginationCustom maxPage={2} indexPage={indexPage} handlePaginationNext={handleChangePage}/>
        </div>
    </div>
  )
}

export default TourPage