import React, { useEffect, useMemo, useState } from "react";
import TopComponent from "./TopComponent";
import { ReactTableWithPaginationCard } from "~/components/common";
import {
  CSEditOutline,
  CSSearchOutline,
  CSTrash2Outline,
} from "~/components/iconography/Outline";
import { ModalActions } from "./ModalAction";
import { ModalDelete } from "./ModalDelete";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDebounce } from "~/helpers/hooks";
import logo from "~/assets/logo/no-avatar.png";
import { getAllCategoryTourRequest } from "~/redux/categoryTour/actions";
import { resetCreateTour, resetUpdateTour } from "~/redux/tour/actions";
import {
  getAllBookingRequest,
  resetCreateBooking,
  resetUpdateBooking,
} from "~/redux/booking/actions";
import moment from "moment";
import { ListStatusBooking } from "~/constants";

const AdminBooking = () => {
  const [isShowModalAction, setIsShowModalAction] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [type, setType] = useState();
  const [search, setSearch] = useState("");
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

  const { getAllCategoryTourState } = useSelector(
    (store) => store.categoryTour
  );

  const [callApi, setCallApi] = useState(false);
  const [dataActive, setDataActive] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const [indexPage, setIndexPage] = useState(1);
  const [options, setOptions] = useState([]);

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
  }, []);

  useEffect(() => {
    setCallApi(true);
  }, [searchDebounce]);

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
        params.name = searchDebounce;
      }
      dispatch(getAllBookingRequest(params));
      setCallApi(false);
    }
  }, [callApi, indexPage]);

  useEffect(() => {
    if (isShowModalAction) {
      dispatch(getAllCategoryTourRequest());
    } else {
      setDataActive();
    }
  }, [isShowModalAction]);

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
          <div
            outline
            color="primary"
            className="icon-button"
            onClick={() => handleShowModalDelete(true)}
          >
            <CSTrash2Outline />
          </div>
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
    <div className="admin-food-page">
      <div className="top">
        <TopComponent handleShowModalActions={handleShowModalActions} />
      </div>
      <div className="search">
        <div className="body">
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
      </div>
      <div className="table">
        <ReactTableWithPaginationCard
          data={dataTable}
          columns={columns}
          onClickRow={handleClickRow}
          indexPage={indexPage}
          // maxPage={getAllFoodsState?.totalPage}
          handlePaginationNext={handleChangePage}
          // showPagination={getAllFoodsState?.totalPage > 1 ? true : false}
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
