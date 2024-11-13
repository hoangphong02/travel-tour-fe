import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ReactTableWithPaginationCard } from "~/components/common";
import { CSEyeSolid } from "~/components/iconography/Solid";
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
  const [dataActive, setDataActive] = useState();
  const [show, setShow] = useState(false);

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
      Header: "Ordinal number",
      accessor: "",
      cellClass: "list-item-heading w-5",
      Cell: (row) => row.row.index + 1,
    },
    {
      Header: "GUIDE",
      accessor: "name",
      cellClass: "list-item-heading w-5",
      Cell: ({ value }) => {
        return (
          <div
            className="d-flex flex-column text-align-left"
            style={{ gap: "10px" }}
          >
            {profileResponse?.data?.role === "admin" ? (
              <span>{value}</span>
            ) : (
              <span>{profileResponse?.data?.name}</span>
            )}
          </div>
        );
      },
    },
    {
      Header: "PHONE (GUIDE)",
      accessor: "phone",
      cellClass: "list-item-heading w-5",
      Cell: ({ value }) => {
        return (
          <div
            className="d-flex flex-column text-align-left"
            style={{ gap: "10px" }}
          >
            {profileResponse?.data?.role === "admin" ? (
              <span>{value}</span>
            ) : (
              <span>{profileResponse?.data?.phone}</span>
            )}
          </div>
        );
      },
    },
    {
      Header: "TIME",
      accessor: "",
      cellClass: "list-item-heading w-5",
      Cell: ({ row }) => {
        return (
          <div
            className="d-flex flex-column text-align-left"
            style={{ gap: "10px" }}
          >
            {profileResponse?.data?.role === "admin" ? (
              <>
                <span>
                  <strong>Start:</strong>{" "}
                  {moment(row?.original?.bookings[0]?.start_date).format(
                    "DD/MM/YYYY"
                  )}
                </span>
                <span>
                  <strong>End:</strong>{" "}
                  {moment(row?.original?.bookings[0]?.end_date).format(
                    "DD/MM/YYYY"
                  )}{" "}
                </span>
              </>
            ) : (
              <>
                <span>
                  <strong>Start:</strong>{" "}
                  {moment(row?.original?.start_date).format("DD/MM/YYYY")}
                </span>
                <span>
                  <strong>End:</strong>{" "}
                  {moment(row?.original?.end_date).format("DD/MM/YYYY")}{" "}
                </span>
              </>
            )}
          </div>
        );
      },
    },
    {
      Header: "CLIENT",
      accessor: "",
      cellClass: "list-item-heading w-5",
      Cell: ({ row }) => {
        return (
          <div
            className="d-flex flex-column text-align-left"
            style={{ gap: "10px" }}
          >
            {profileResponse?.data?.role === "admin" ? (
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <Button
                  onClick={handleShow}
                  variant="none"
                  style={{
                    padding: "0 24px",
                    width: "fit-content",
                  }}
                >
                  <CSEyeSolid className="fill-white" />
                </Button>
              </OverlayTrigger>
            ) : (
              <>
                <span>
                  <strong>Name: </strong> {row.original?.fullname}
                </span>
                <span>
                  <strong>Phone: </strong> {row.original?.phone}
                </span>
                <span>
                  <strong>Email: </strong> {row.original?.email}
                </span>
                <span>
                  <strong>Adult ticket: </strong> {row.original?.adult_ticket}
                </span>
                <span>
                  <strong>Child tickets: </strong> {row.original?.child_ticket}
                </span>
                <span>
                  <strong>Address: </strong> {row.original?.address}
                </span>
                <span>
                  <strong>Note: </strong> {row.original?.note}
                </span>
              </>
            )}
          </div>
        );
      },
    },
    {
      Header: "TOUR NAME",
      accessor: "",
      cellClass: "list-item-heading w-5",
      Cell: ({ row }) => {
        return (
          <div
            className="d-flex flex-column text-align-left"
            style={{ gap: "10px" }}
          >
            {profileResponse?.data?.role === "admin"
              ? getAllTourState?.data?.find(
                  (item) => item?._id === row?.original?.bookings[0]?.tour_id
                )?.name
              : getAllTourState?.data?.find(
                  (item) => item?._id === row?.original?.tour_id
                )?.name}
            <span></span>
          </div>
        );
      },
    },
    {
      Header: "PRICE TOUR",
      accessor: "",
      cellClass: "list-item-heading w-5",
      Cell: ({ row }) => {
        return (
          <div
            className="d-flex flex-column text-align-left"
            style={{ gap: "10px" }}
          >
            {profileResponse?.data?.role === "admin" ? (
              <span>
                {row?.original?.bookings[0]?.total_price?.toLocaleString(
                  "VI-VN"
                )}{" "}
                VNĐ
              </span>
            ) : (
              <span>
                {row?.original?.total_price?.toLocaleString("VI-VN")} VNĐ
              </span>
            )}
          </div>
        );
      },
    },
  ]);
  const handleClickRow = (value) => {
    setDataActive(value);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      See detailed list
    </Tooltip>
  );

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setDataActive();
  };

  return (
    <div className="work-schedule-page">
      <div className="filter">
        <div className="title">
          <div>
            <span>WORK SCHEDULE</span>
            <span className="line-1"></span>
            <span className="line-2"></span>
          </div>
        </div>
        <div className="filter-date">
          <div>
            <label htmlFor="">Start date: </label>
            <input
              type="date"
              value={moment(startDate).format("YYYY-MM-DD")}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="">End date: </label>
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
          onClickRow={handleClickRow}
        />
      </div>
      {show && dataActive && (
        <ModalListUser data={dataActive} handleClose={handleClose} />
      )}
    </div>
  );
};

export default WorkSchedulePage;

function ModalListUser({ data, handleClose }) {
  return (
    <Modal
      show
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Customer list</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="modal-list-user"
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          {data?.bookings?.map((item, index) => {
            return (
              <div key={index} className="item-user">
                <span>
                  <strong>Name: </strong>
                  {item?.fullname}
                </span>
                <span>
                  <strong>Phone: </strong>
                  {item?.phone}
                </span>
                <span>
                  <strong>Email: </strong>
                  {item?.email}
                </span>
                <span>
                  <strong>Description: </strong>
                  {item?.note}
                </span>
                <span>
                  <strong>Adult ticket: </strong>
                  {item?.adult_ticket}
                </span>
                <span>
                  <strong>Child tickets: </strong>
                  {item?.child_ticket}
                </span>
                <span>
                  <strong>Total price: </strong>
                  {item?.total_price.toLocaleString("VI-VN")} VNĐ
                </span>
              </div>
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer style={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          onClick={handleClose}
          style={{
            width: "45%",
            background: "#fff",
            border: "1px solid #000",
            color: "#000",
          }}
        >
          Back
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
