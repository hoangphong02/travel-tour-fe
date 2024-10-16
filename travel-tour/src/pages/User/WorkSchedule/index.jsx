import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ReactTableWithPaginationCard } from "~/components/common";
import { routesUser } from "~/configs";
import { getAllTourRequest } from "~/redux/tour/actions";
import { getWorkSchedulesRequest } from "~/redux/user/actions";

const WorkSchedulePage = () => {
  const { getWorkSchedulesState, profileResponse } = useSelector(
    (store) => store.user
  );
  const { getAllTourState } = useSelector((store) => store.tour);
  const [callApi, setCallApi] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState("");
  const [indexPage, setIndexPage] = useState(1);
  const [dataTable, setDataTable] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (startDate || endDate) {
      setCallApi(true);
    }
  }, [startDate, endDate]);
  useEffect(() => {
    if (!profileResponse?.data) {
      history.push(routesUser.home);
    }
  }, [profileResponse]);

  useEffect(() => {
    const params = {
      limit: 0,
    };
    dispatch(getAllTourRequest(params));
  }, [startDate]);
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
      Header: "HƯỚNG DẪN VIÊN",
      accessor: "name",
      cellClass: "list-item-heading w-5",
    },
    {
      Header: "SỐ ĐIỆN THOẠI (HDV)",
      accessor: "phone",
      cellClass: "list-item-heading w-5",
    },
    {
      Header: "THỜI GIAN",
      accessor: "",
      cellClass: "list-item-heading w-5",
      Cell: ({ row }) => {
        return (
          <div
            className="d-flex flex-column text-align-left"
            style={{ gap: "10px" }}
          >
            <span>
              <strong>Bắt đầu:</strong>{" "}
              {moment(row?.original?.bookings[0]?.start_date).format(
                "DD/MM/YYYY"
              )}
            </span>
            <span>
              <strong>Kết thúc:</strong>{" "}
              {moment(row?.original?.bookings[0]?.end_date).format(
                "DD/MM/YYYY"
              )}{" "}
            </span>
          </div>
        );
      },
    },
    {
      Header: "KHÁCH HÀNG",
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
      Header: "TÊN TOUR",
      accessor: "",
      cellClass: "list-item-heading w-5",
      Cell: ({ row }) => {
        return (
          <div
            className="d-flex flex-column text-align-left"
            style={{ gap: "10px" }}
          >
            <span>
              {
                getAllTourState?.data?.find(
                  (item) => item?._id === row?.original?.bookings[0]?.tour_id
                )?.name
              }
            </span>
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
            <span>
              {row?.original?.bookings[0]?.total_price?.toLocaleString("VI-VN")}{" "}
              VNĐ
            </span>
          </div>
        );
      },
    },
  ]);

  return (
    <div className="work-schedule-page">
      <div className="filter">
        <div className="title">
          <div>
            <span>LỊCH CÔNG TÁC</span>
            <span className="line-1"></span>
            <span className="line-2"></span>
          </div>
        </div>
        <div className="filter-date">
          <div>
            <label htmlFor="">Ngày bắt đầu: </label>
            <input
              type="date"
              value={moment(startDate).format("YYYY-MM-DD")}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="">Ngày kết thúc: </label>
            <input
              type="date"
              value={moment(endDate).format("YYYY-MM-DD")}
              onChange={(e) => setEndDate(new Date(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="table">
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
    </div>
  );
};

export default WorkSchedulePage;
