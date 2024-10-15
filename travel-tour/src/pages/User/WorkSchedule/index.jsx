import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactTableWithPaginationCard } from "~/components/common";
import { getWorkSchedulesRequest } from "~/redux/user/actions";

const WorkSchedulePage = () => {
  const { getWorkSchedulesState } = useSelector((store) => store.user);
  const [callApi, setCallApi] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState("");
  const [indexPage, setIndexPage] = useState(1);
  const [dataTable, setDataTable] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (startDate || endDate) {
      setCallApi(true);
    }
  }, [startDate, endDate]);

  console.log("getWorkSchedulesState", getWorkSchedulesState);
  useEffect(() => {
    if (callApi) {
      const params = {
        start_date: moment(startDate).format("MM/DD/YYYY"),
      };
      if (endDate) {
        params.end_date = moment(endDate).format("MM/DD/YYYY");
      }

      dispatch(getWorkSchedulesRequest(params));
      setCallApi(false);
    }
  }, [callApi]);
  useEffect(() => {
    setDataTable(getWorkSchedulesState?.data || []);
  }, [getWorkSchedulesState?.data]);

  const columns = useMemo(() => [
    {
      Header: "STT",
      accessor: "",
      cellClass: "list-item-heading w-5",
      Cell: (row) => row.row.index + 1,
    },
    {
      Header: "Nhân viên",
      accessor: "name",
      cellClass: "list-item-heading w-5",
    },
    {
      Header: "Số điện thoại nhân viên",
      accessor: "phone",
      cellClass: "list-item-heading w-5",
    },
    {
      Header: "Thời gian tour",
      accessor: "",
      cellClass: "list-item-heading w-5",
      Cell: ({ row }) => {
        return (
          <div
            className="d-flex flex-column text-align-left"
            style={{ gap: "10px" }}
          >
            <span>
              <strong>Bắt đầu:</strong> {row?.original?.bookings[0]?.start_date}
            </span>
            <span>
              <strong>Kết thúc:</strong> {row?.original?.bookings[0]?.end_date}
            </span>
          </div>
        );
      },
    },
    {
      Header: "Khách đặt tour",
      accessor: "",
      cellClass: "list-item-heading w-5",
      Cell: ({ row }) => {
        return (
          <div
            className="d-flex flex-column text-align-left"
            style={{ gap: "10px" }}
          >
            <span>
              <strong>Tên:</strong> {row?.original?.bookings[0]?.fullname}
            </span>
            <span>
              <strong>Số điện thoại:</strong>{" "}
              {row?.original?.bookings[0]?.phone}
            </span>
          </div>
        );
      },
    },
    {
      Header: "Mã tour",
      accessor: "",
      cellClass: "list-item-heading w-5",
      Cell: ({ row }) => {
        return (
          <div
            className="d-flex flex-column text-align-left"
            style={{ gap: "10px" }}
          >
            <span>{row?.original?.bookings[0]?.tour_id}</span>
          </div>
        );
      },
    },
    {
      Header: "GIÁ TOUR",
      accessor: "",
      cellClass: "list-item-heading w-5",
      Cell: ({ row }) => {
        return (
          <div
            className="d-flex flex-column text-align-left"
            style={{ gap: "10px" }}
          >
            <span>{row?.original?.bookings[0]?.total_price}</span>
          </div>
        );
      },
    },
  ]);
  return (
    <div className="work-schedule-page">
      <div>
        <div className="title">
          <span>Lịch công tác</span>
        </div>
        <div className="d-flex">
          <div>
            <label htmlFor="">Ngày bắt đầu</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Ngày kết thúc</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <ReactTableWithPaginationCard
        columns={columns}
        data={dataTable}
        indexPage={indexPage}
        maxPage={getWorkSchedulesState?.totalPage}
        showPagination={false}
        // handlePaginationNext={handleChangePage}
        // isLoading={isGetAllOrdersListRequest}
        divided
        // onClickRow={handleClickRow}
      />
    </div>
  );
};

export default WorkSchedulePage;
