import React, { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ReactTableWithPaginationCard } from "~/components/common";
import { LIST_OPTION_RANK_HOTEL } from "~/constants";

const TablePriceTour = () => {
  const [dataActive, setDataActive] = useState({});
  const [dataTable, setDataTable] = useState([]);

  const {
    isGetDetailTourRequest,
    isGetDetailTourSuccess,
    isGetDetailTourFailure,
    getDetailTourState,
  } = useSelector((store) => store.tour);
  const handleClickRow = (value) => {
    setDataActive(value);
  };

  useEffect(() => {
    if (getDetailTourState) {
      setDataTable(getDetailTourState?.data?.hotel_level);
    }
  }, [getDetailTourState]);

  const columns = useMemo(() => [
    {
      Header: "STT",
      accessor: "#",
      cellClass: "list-item-heading w-5",
      Cell: (row) => row.row.index + 1,
    },
    {
      Header: "Khách sạn",
      accessor: "star",
      cellClass: "list-item-heading w-5",
      Cell: ({ value }) => {
        console.log(value);
        return (
          <span>
            {LIST_OPTION_RANK_HOTEL.find((item) => item.value === value)?.label}
          </span>
        );
      },
    },
    {
      Header: "Giá người lớn",
      accessor: "price_adult",
      cellClass: "list-item-heading w-5",
    },
    {
      Header: "Giá trẻ em",
      accessor: "price_child",
      cellClass: "list-item-heading w-5",
    },
    {
      Header: "Suất ăn",
      accessor: "",
      cellClass: "list-item-heading w-5",
      Cell: (row) => <span>Trọn gói</span>,
    },
    {
      Header: "Hành động",
      accessor: "action",
      Cell: () => (
        <div
          className="d-flex align-items-center btn-see-tour"
          style={{ gap: "10px" }}
        >
          <Button outline color="primary" className="icon-button">
            ĐẶT NGAY
          </Button>
        </div>
      ),
    },
  ]);
  console.log(dataTable);
  return (
    <div className="table-price-tour">
      <div className="table-price-tour-title">
        <span>Bảng giá</span>
      </div>
      <div className="table-price-tour-body">
        <div className="table-price-tour-body-main">
          <ReactTableWithPaginationCard
            columns={columns}
            data={dataTable}
            // isLoading={isGetAllOrdersListRequest}
            divided
            onClickRow={handleClickRow}
            showPagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default TablePriceTour;
