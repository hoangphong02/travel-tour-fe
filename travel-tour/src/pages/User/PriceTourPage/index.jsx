import React, { useMemo, useState } from 'react'
import { Button } from 'react-bootstrap';
import { ReactTableWithPaginationCard, Table } from '~/components/common'

const PriceTourPage = () => {
  const [indexPage, setIndexPage] = useState(1);
  const [dataActive, setDataActive] = useState({});

  const columns = useMemo(
    () => [
      {
        Header: 'STT',
        accessor: '',
        cellClass: 'list-item-heading w-5',
      },
      {
        Header: 'MÃ',
        accessor: 'id',
        cellClass: 'list-item-heading w-5',
      },
      {
        Header: 'LỊCH TRÌNH TOUR',
        accessor: 'name',
        cellClass: 'list-item-heading w-5',
      },
      {
        Header: 'THỜI GIAN',
        accessor: 'time',
        cellClass: 'list-item-heading w-5',
      },
      {
        Header: 'LỊCH KHỞI HÀNH',
        accessor: 'time-start',
        cellClass: 'list-item-heading w-5',
      },
      {
        Header: 'PHƯƠNG TIỆN',
        accessor: 'vehicle',
        cellClass: 'list-item-heading w-5',
      },
      {
        Header: 'GIÁ TOUR',
        accessor: 'price',
        cellClass: 'list-item-heading w-5',
      },
      {
        Header: 'HÀNH ĐỘNG',
        accessor: 'action',
        Cell: () => (
          <div className="d-flex align-items-center btn-see-tour" style={{ gap: '10px' }}>
            <Button
              outline
              color="primary"
              className="icon-button"
            >
              XEM TOUR
            </Button>
          </div>
        ),
      },
    ],
  ); 
  const data = [
    { 
      id: 1,
      name: 'Cà phê',
      price: '20000',
    }, 
    {
       id: 1,
      name: 'Cà phê',
      price: '20000',
    },
     { 
      id: 1,
      name: 'Cà phê',
      price: '20000',
    }, 
    {
       id: 1,
      name: 'Cà phê',
      price: '20000',
    },
     { 
      id: 1,
      name: 'Cà phê',
      price: '20000',
    }, 
    {
       id: 1,
      name: 'Cà phê',
      price: '20000',
    },
     { 
      id: 1,
      name: 'Cà phê',
      price: '20000',
    }, 
    {
       id: 1,
      name: 'Cà phê',
      price: '20000',
    },
     { 
      id: 1,
      name: 'Cà phê',
      price: '20000',
    }, 
    {
       id: 1,
      name: 'Cà phê',
      price: '20000',
    },
     { 
      id: 1,
      name: 'Cà phê',
      price: '20000',
    }, 
    {
       id: 1,
      name: 'Cà phê',
      price: '20000',
    },
     { 
      id: 1,
      name: 'Cà phê',
      price: '20000',
    }, 
    {
       id: 1,
      name: 'Cà phê',
      price: '20000',
    },
     { 
      id: 1,
      name: 'Cà phê',
      price: '20000',
    }, 
    {
       id: 1,
      name: 'Cà phê',
      price: '20000',
    },
     { 
      id: 1,
      name: 'Cà phê',
      price: '20000',
    }, 
    {
       id: 1,
      name: 'Cà phê',
      price: '20000',
    },
     { 
      id: 1,
      name: 'Cà phê',
      price: '20000',
    }, 
    {
       id: 1,
      name: 'Cà phê',
      price: '20000',
    },
     { 
      id: 1,
      name: 'Cà phê',
      price: '20000',
    }, 
    {
       id: 1,
      name: 'Cà phê',
      price: '20000',
    },
  ]
  const handleChangePage = (idxPage) => {
    setIndexPage(idxPage);
    // setIsCallApi(true);
  };
    const handleClickRow = (value) => {
    setDataActive(value);
  };
  return (
    <div className='price-tour-page-wrapper'>
      <div className='price-tour-page-wrapper-inner'>
        <div className='title'>
          <div>
          <span>BẢNG GIÁ</span>
           <span className='line-1'></span>
          <span  className='line-2'></span>
          </div>
        </div>
        <div className='table'>
        <ReactTableWithPaginationCard columns={columns} data={data}

              indexPage={indexPage}
              maxPage={10}
              handlePaginationNext={handleChangePage}
              // isLoading={isGetAllOrdersListRequest}
              divided
              onClickRow={handleClickRow}
              limit={20}
          />
        </div>
      </div>
    </div>
  )
}

export default PriceTourPage