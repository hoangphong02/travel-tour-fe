import React, { useMemo, useState } from 'react'
import { Button } from 'react-bootstrap';
import { ReactTableWithPaginationCard } from '~/components/common'

const TablePriceTour = () => {
  const [dataActive, setDataActive] = useState({});

    const handleClickRow = (value) => {
    setDataActive(value);
  };

  const fakeData = [
    {
      star: 5,
      price_human: 10000,
      price_kid: 50000,
      food: 'Trọn gói',
    },
     {
      star: 5,
      price_human: 10000,
      price_kid: 50000,
      food: 'Trọn gói',
    },
     {
      star: 5,
      price_human: 10000,
      price_kid: 50000,
      food: 'Trọn gói',
    },
  ];

  const columns = useMemo(
    () => [
      {
        Header: 'STT',
        accessor: 'index',
        cellClass: 'list-item-heading w-5',
      },
      {
        Header: 'Khách sạn',
        accessor: 'star',
        cellClass: 'list-item-heading w-5',
      },
      {
        Header: 'Giá người lớn',
        accessor: 'price_human',
        cellClass: 'list-item-heading w-5',
      },
      {
        Header: 'Giá trẻ em',
        accessor: 'price_kid',
        cellClass: 'list-item-heading w-5',
      },
      {
        Header: 'Suất ăn',
        accessor: 'food',
        cellClass: 'list-item-heading w-5',
      },
      {
        Header: 'Hành động',
        accessor: 'action',
        Cell: () => (
          <div className="d-flex align-items-center btn-see-tour" style={{ gap: '10px' }}>
            <Button
              outline
              color="primary"
              className="icon-button"
            >
              ĐẶT NGAY
            </Button>
          </div>
        ),
      },
    ],
  ); 
  return (
     <div className='table-price-tour'>
        <div className='table-price-tour-title'>
            <span>Bảng giá</span>
        </div>
        <div className='table-price-tour-body'>
           <div className='table-price-tour-body-main'>
            <ReactTableWithPaginationCard columns={columns} data={fakeData}
                          // isLoading={isGetAllOrdersListRequest}
                          divided
                          onClickRow={handleClickRow}
                          showPagination={false}
                      />
           </div>
        </div>

    </div>
  )
}

export default TablePriceTour