import React, { useEffect, useMemo, useState } from "react";
import TopComponent from "./TopComponent";
import { ReactTableWithPaginationCard } from "~/components/common";
import {
  CSEditOutline,
  CSSearchOutline,
} from "~/components/iconography/Outline";
import { ModalActions } from "./ModalAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDebounce } from "~/helpers/hooks";
import { getAllTourRequest } from "~/redux/tour/actions";
import {
  getAllBookingGroupRequest,
  getUserGuideBookingRequest,
  resetCreateBooking,
  resetUpdateBooking,
} from "~/redux/booking/actions";
import moment from "moment";
import { ListStatusBooking } from "~/constants";
import { getAllUserRequest } from "~/redux/user/actions";

const AdminAddGuide = () => {
  const [isShowModalAction, setIsShowModalAction] = useState(false);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [type, setType] = useState();
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 500);
  const {
    isGetAllBookingSuccess,
    getAllBookingState,
    isCreateBookingSuccess,
    isCreateBookingFailure,
    isUpdateBookingSuccess,
    isUpdateBookingFailure,
  } = useSelector((store) => store.booking);
  const {
    getAllBookingGroupState,
    isGetAllBookingGroupSuccess,
    getUserGuideBookingState,
  } = useSelector((store) => store.booking);

  const { getAllCategoryTourState } = useSelector(
    (store) => store.categoryTour
  );

  const [callApi, setCallApi] = useState(false);
  const [dataActive, setDataActive] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const [indexPage, setIndexPage] = useState(1);
  const [options, setOptions] = useState([]);

  const [filter, setFilter] = useState(false);

  const limit = 10;
  const dispatch = useDispatch();
  const handleCloseModalActions = () => {
    setIsShowModalAction(false);
  };
  const handleShowModalActions = (type) => {
    setType(type);
    setIsShowModalAction(true);
  };
  useEffect(() => {
    setCallApi(true);
  }, [searchDebounce]);

  useEffect(() => {
    if (dataActive) {
      const payload = {
        tourId: dataActive?.bookings[0]?.tour_id?._id,
        start_date: dataActive?.start_date,
        end_date: dataActive?.end_date,
      };
      dispatch(getUserGuideBookingRequest(payload));
    }
  }, [dataActive]);

  console.log(getUserGuideBookingState);

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
    setCallApi(true);
  }, [filter]);

  useEffect(() => {
    if (callApi) {
      const params = {
        limit,
        page: indexPage,
        tour_guide: filter,
      };
      if (searchDebounce) {
        params.name = searchDebounce;
      }
      dispatch(getAllBookingGroupRequest(params));
      setCallApi(false);
    }
  }, [callApi, indexPage]);

  useEffect(() => {
    if (isShowModalAction) {
      const params = {
        limit: 0,
      };
      dispatch(getAllTourRequest(params));
      dispatch(getAllUserRequest(params));
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
      Header: "Tên nhóm",
      accessor: "group_number",
      cellClass: "list-item-heading w-10",
    },
    {
      Header: "Ngày bắt đầu",
      accessor: "start_date",
      cellClass: "list-item-heading w-10",
      Cell: ({ value }) => {
        return (
          <div
            className="d-flex flex-column text-align-left"
            style={{ gap: "10px" }}
          >
            {moment(value).format("DD/MM/YYYY")}
          </div>
        );
      },
    },
    {
      Header: "Ngày kết thúc",
      accessor: "end_date",
      cellClass: "list-item-heading w-5",
      Cell: ({ value }) => (
        <div
          className="d-flex flex-column text-align-left"
          style={{ gap: "10px" }}
        >
          {moment(value).format("DD/MM/YYYY")}
        </div>
      ),
    },
    {
      Header: "Hướng dẫn viên",
      accessor: "bookings",
      cellClass: "list-item-heading w-5",
      Cell: ({ value }) => (
        <div
          className="d-flex flex-column text-align-left"
          style={{ gap: "10px" }}
        >
          {value[0]?.tour_guide?.name || "Chưa có"}
        </div>
      ),
    },
    {
      Header: "Tên tour",
      accessor: "",
      cellClass: "list-item-heading w-5",
      Cell: ({ row }) => (
        <div
          className="d-flex flex-column text-align-left"
          style={{ gap: "10px" }}
        >
          {row?.original?.bookings[0]?.tour_id?.name || ""}
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
    if (isGetAllBookingGroupSuccess) {
      const arr = [];
      getAllBookingGroupState?.data?.map((item) => {
        item?.groups?.map((group) => {
          arr.push(group);
        });
      });
      setDataTable(arr || []);
    }
  }, [isGetAllBookingGroupSuccess]);

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

      {/* {isShowModalAction && type && (
        <ModalActions
          isOpen
          type={type}
          handleClose={handleCloseModalActions}
          data={dataActive}
          isShowModalConfirm={isShowModalConfirm}
          setIsShowModalConfirm={setIsShowModalConfirm}
          options={options}
        />
      )} */}
    </div>
  );
};

export default AdminAddGuide;
