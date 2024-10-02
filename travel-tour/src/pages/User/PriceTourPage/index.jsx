import React, { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ReactTableWithPaginationCard, Table } from "~/components/common";
import { ListTransport } from "~/constants";
import { getAllTourRequest } from "~/redux/tour/actions";

const PriceTourPage = () => {
  const [indexPage, setIndexPage] = useState(1);
  const [dataActive, setDataActive] = useState({});
  const [dataTable, setDataTable] = useState([]);
  const {
    isGetAllTourRequest,
    isGetAllTourSuccess,
    isGetAllTourFailure,
    getAllTourState,
  } = useSelector((store) => store.tour);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const params = {
      limit: 10,
      page: indexPage,
    };
    dispatch(getAllTourRequest(params));
  }, [indexPage]);

  const handleDetailTour = (id) => {
    history.push(`/tour-detail/${id}`);
  };
  const columns = useMemo(() => [
    {
      Header: "STT",
      accessor: "",
      cellClass: "list-item-heading w-5",
      Cell: (row) => row.row.index + 1,
    },
    {
      Header: "MÃ",
      accessor: "tour_code",
      cellClass: "list-item-heading w-5",
    },
    {
      Header: "LỊCH TRÌNH TOUR",
      accessor: "name",
      cellClass: "list-item-heading w-5",
    },
    {
      Header: "THỜI GIAN",
      accessor: "schedules",
      cellClass: "list-item-heading w-5",
      Cell: ({ value }) => {
        return (
          <span>
            {value?.length > 1
              ? `${value?.length} Ngày ${value?.length - 1} Đêm`
              : `${value?.length} Ngày`}
          </span>
        );
      },
    },
    {
      Header: "LỊCH KHỞI HÀNH",
      accessor: "shedule_on_week",
      cellClass: "list-item-heading w-5",
    },
    {
      Header: "PHƯƠNG TIỆN",
      accessor: "transportation",
      cellClass: "list-item-heading w-5",
      Cell: ({ value }) => {
        return (
          <span>
            {ListTransport.find((item) => item.value === value)?.label}
          </span>
        );
      },
    },
    {
      Header: "GIÁ TOUR",
      accessor: "base_price_adult",
      cellClass: "list-item-heading w-5",
      Cell: ({ value }) => {
        return <span>{value.toLocaleString("vi-VN")}</span>;
      },
    },
    {
      Header: "HÀNH ĐỘNG",
      accessor: "_id",
      Cell: ({ value }) => (
        <div
          className="d-flex align-items-center btn-see-tour"
          style={{ gap: "10px" }}
        >
          <Button
            outline
            color="primary"
            className="icon-button"
            onClick={() => handleDetailTour(value)}
          >
            XEM TOUR
          </Button>
        </div>
      ),
    },
  ]);

  const handleChangePage = (idxPage) => {
    setIndexPage(idxPage);
    // setIsCallApi(true);
  };
  const handleClickRow = (value) => {
    setDataActive(value);
  };

  useEffect(() => {
    if (getAllTourState?.data) {
      setDataTable(getAllTourState?.data);
    }
  }, [getAllTourState?.data]);
  return (
    <div className="price-tour-page-wrapper">
      <div className="price-tour-page-wrapper-inner">
        <div className="title">
          <div>
            <span>BẢNG GIÁ</span>
            <span className="line-1"></span>
            <span className="line-2"></span>
          </div>
        </div>
        <div className="table">
          <ReactTableWithPaginationCard
            columns={columns}
            data={dataTable}
            indexPage={indexPage}
            maxPage={getAllTourState?.totalPage}
            handlePaginationNext={handleChangePage}
            // isLoading={isGetAllOrdersListRequest}
            divided
            onClickRow={handleClickRow}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceTourPage;
