import React, { useEffect, useMemo, useState } from "react";
import TopComponent from "./TopComponent";
import { ReactTableWithPaginationCard } from "~/components/common";
import {
  CSEditOutline,
  CSSearchOutline,
} from "~/components/iconography/Outline";
import { ModalActions } from "./ModalAction";
import { ModalDelete } from "./ModalDelete";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDebounce } from "~/helpers/hooks";
import { getAllCategoryTourRequest } from "~/redux/categoryTour/actions";
import { getAllTourRequest } from "~/redux/tour/actions";
import {
  getAllBookingRequest,
  resetCreateBooking,
  resetUpdateBooking,
} from "~/redux/booking/actions";
import moment from "moment";
import { ListSearch, ListStatusBooking } from "~/constants";
import { getAllUserRequest } from "~/redux/user/actions";
import Select from "react-select";
import { FormGroup } from "react-bootstrap";

const AdminBooking = () => {
  const [isShowModalAction, setIsShowModalAction] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [type, setType] = useState();
  const [search, setSearch] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [typeSearch, setTypeSearch] = useState({
    value: "tour_name",
    label: "Tên tour",
  });

  const searchDebounce = useDebounce(search, 500);
  const {
    isGetAllBookingRequest,
    isGetAllBookingSuccess,
    isGetAllBookingFailure,
    getAllBookingState,
    isCreateBookingRequest,
    isCreateBookingSuccess,
    isCreateBookingFailure,
    isUpdateBookingRequest,
    isUpdateBookingSuccess,
    isUpdateBookingFailure,
  } = useSelector((store) => store.booking);
  const { getAllTourState } = useSelector((store) => store.tour);

  const { getAllCategoryTourState } = useSelector(
    (store) => store.categoryTour
  );

  const [callApi, setCallApi] = useState(false);
  const [dataActive, setDataActive] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const [indexPage, setIndexPage] = useState(1);
  const [options, setOptions] = useState([]);
  const [status, setStatus] = useState("");

  const limit = 10;
  const dispatch = useDispatch();
  const handleCloseModalActions = () => {
    setIsShowModalAction(false);
  };
  const handleShowModalActions = (type) => {
    setType(type);
    setIsShowModalAction(true);
  };
  const handleCloseModalDelete = () => {
    setIsShowModalDelete(false);
  };
  const handleShowModalDelete = () => {
    setIsShowModalDelete(true);
  };

  useEffect(() => {
    setCallApi(true);
  }, [searchDebounce, status, start, end]);

  useEffect(() => {
    if (getAllCategoryTourState?.data) {
      setOptions(
        getAllCategoryTourState?.data.map((item) => {
          return {
            value: item?._id,
            label: item?.name,
          };
        })
      );
    }
  }, [getAllCategoryTourState.data]);

  useEffect(() => {
    if (callApi) {
      const params = {
        limit,
        page: indexPage,
      };
      if (searchDebounce) {
        if (typeSearch.value === "tour_name") {
          params.tour_name = searchDebounce;
        } else {
          params.tour_code = searchDebounce;
        }
      }
      if (status) {
        params.status = status.value;
      }
      if (start) {
        params.sdate = moment(start).format("MM/DD/YYYY");
      }
      if (end) {
        params.edate = moment(end).format("MM/DD/YYYY");
      }
      dispatch(getAllBookingRequest(params));
      setCallApi(false);
    }
  }, [callApi, indexPage]);

  useEffect(() => {
    if (isShowModalAction || indexPage) {
      const params = {
        limit: 0,
      };
      dispatch(getAllCategoryTourRequest());
      dispatch(getAllTourRequest(params));
      dispatch(getAllUserRequest(params));
    } else {
      setDataActive();
    }
  }, [isShowModalAction, indexPage]);

  const columns = useMemo(() => [
    {
      Header: "STT",
      accessor: "",
      cellClass: "list-item-heading w-5",
      Cell: (row) => row.row.index + 1,
    },
    {
      Header: "Mã",
      accessor: "_id",
      cellClass: "list-item-heading w-5",
    },
    {
      Header: "Tên tour",
      accessor: "tour_id",
      cellClass: "list-item-heading w-10",
      Cell: ({ value }) => (
        <div
          className="d-flex flex-column text-align-left"
          style={{ gap: "10px" }}
        >
          <span>{value?.name}</span>
          <div className="d-flex flex-column">
            <span>
              <strong>Giá người lớn:</strong>{" "}
              {value?.base_price_adult.toLocaleString("vi-VN")} VNĐ
            </span>
            <span>
              <strong>Giá trẻ em:</strong>{" "}
              {value?.base_price_child.toLocaleString("vi-VN")} VNĐ
            </span>
          </div>
        </div>
      ),
    },
    {
      Header: "SL vé",
      accessor: "",
      cellClass: "list-item-heading w-10",
      Cell: ({ row }) => {
        return (
          <div
            className="d-flex flex-column text-align-left"
            style={{ gap: "10px" }}
          >
            <span>
              <strong>Người lớn:</strong> {row?.original?.adult_ticket}
            </span>
            <span>
              <strong>Trẻ em:</strong> {row?.original?.child_ticket}
            </span>
          </div>
        );
      },
    },
    {
      Header: "Tổng giá",
      accessor: "total_price",
      cellClass: "list-item-heading w-5",
      Cell: ({ value }) => (
        <div
          className="d-flex flex-column text-align-left"
          style={{ gap: "10px" }}
        >
          {value?.toLocaleString("vi-VN")} VNĐ
        </div>
      ),
    },
    {
      Header: "Trạng thái",
      accessor: "payment_status",
      cellClass: "list-item-heading w-5",
      Cell: ({ value }) => (
        <div
          className="d-flex flex-column text-align-left"
          style={{ gap: "10px" }}
        >
          {ListStatusBooking?.find((item) => item.value === value)?.label}
        </div>
      ),
    },
    {
      Header: "Ngày đặt",
      accessor: "createdAt",
      cellClass: "list-item-heading w-5",
      Cell: ({ value }) => (
        <div
          className="d-flex flex-column text-align-left"
          style={{ gap: "10px" }}
        >
          {moment(value).format("DD/MM/YYYY - hh:mm")}
        </div>
      ),
    },
    {
      Header: "HOẠT ĐỘNG",
      accessor: "action",
      Cell: () => (
        <div
          className="d-flex align-items-center btn-see-tour justify-content-center"
          style={{ gap: "10px" }}
        >
          <div
            outline
            color="primary"
            className="icon-button"
            onClick={() => handleShowModalActions("edit")}
          >
            <CSEditOutline />
          </div>
          {/* <div
            outline
            color="primary"
            className="icon-button"
            onClick={() => handleShowModalDelete(true)}
          >
            <CSTrash2Outline />
          </div> */}
        </div>
      ),
    },
  ]);

  useEffect(() => {
    if (isGetAllBookingSuccess) {
      setDataTable(getAllBookingState?.data || []);
    }
  }, [isGetAllBookingSuccess]);

  useEffect(() => {
    if (isCreateBookingSuccess) {
      toast.success("Đặt tour thành công");
      setIsShowModalConfirm(false);
      setCallApi(true);
      setIsShowModalAction(false);
      dispatch(resetCreateBooking());
    }
  }, [isCreateBookingSuccess]);

  useEffect(() => {
    if (isCreateBookingFailure) {
      toast.error("Đặt tour thất bại");
      dispatch(resetCreateBooking());
    }
  }, [isCreateBookingFailure]);

  useEffect(() => {
    if (isUpdateBookingSuccess) {
      toast.success("Cập nhật đặt tour thành công");
      setCallApi(true);
      setIsShowModalConfirm(false);
      setIsShowModalAction(false);
      dispatch(resetUpdateBooking());
    }
  }, [isUpdateBookingSuccess]);
  useEffect(() => {
    if (isUpdateBookingFailure) {
      toast.error("Cập nhật đặt tour thất bại");
      dispatch(resetUpdateBooking());
    }
  }, [isUpdateBookingFailure]);

  const handleClickRow = (value) => {
    setDataActive(value);
  };
  const handleChangePage = (idxPage) => {
    setIndexPage(idxPage);
    setCallApi(true);
  };
  return (
    <div className="admin-booking-page">
      <div className="top">
        <TopComponent handleShowModalActions={handleShowModalActions} />
      </div>
      <div className="search">
        <div className="body">
          <Select
            className="select-type"
            options={ListSearch}
            onChange={(e) => setTypeSearch(e)}
            value={typeSearch}
          ></Select>
          <input
            type="text"
            placeholder="Nhập tìm kiếm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span>
            <CSSearchOutline />
          </span>
        </div>
        <div className="d-flex gap-2 align-items-center select-filter">
          <span>Trạng thái:</span>
          <Select
            options={ListStatusBooking}
            onChange={(e) => setStatus(e)}
            value={status}
          ></Select>
        </div>
        <FormGroup className="d-flex gap-2 align-items-center">
          <label htmlFor="">Ngày đặt tour từ: </label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="d-flex gap-2 align-items-center">
          <label htmlFor="">Đến: </label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </FormGroup>
      </div>
      <div className="table">
        <ReactTableWithPaginationCard
          data={dataTable}
          columns={columns}
          onClickRow={handleClickRow}
          indexPage={indexPage}
          handlePaginationNext={handleChangePage}
          maxPage={getAllBookingState?.totalPage}
          showPagination={getAllBookingState?.totalPage > 1 ? true : false}
        />
      </div>

      {isShowModalAction && type && (
        <ModalActions
          isOpen
          type={type}
          handleClose={handleCloseModalActions}
          data={dataActive}
          isShowModalConfirm={isShowModalConfirm}
          setIsShowModalConfirm={setIsShowModalConfirm}
          options={options}
        />
      )}
      {isShowModalDelete && (
        <ModalDelete
          isOpen
          handleClose={handleCloseModalDelete}
          data={dataActive}
          setCallApi={setCallApi}
        />
      )}
    </div>
  );
};

export default AdminBooking;
