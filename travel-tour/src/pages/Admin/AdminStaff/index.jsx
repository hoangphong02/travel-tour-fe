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
import { getAllUserRequest } from "~/redux/user/actions";
import { resetRegisterState, resetUpdateUserState } from "~/redux/auth/actions";
import logo from "~/assets/logo/no-avatar.png";

const AdminFood = () => {
  const [isShowModalAction, setIsShowModalAction] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [type, setType] = useState();
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 500);
  const { isGetAllUsersSuccess, getAllUsersState } = useSelector(
    (store) => store.user
  );

  const {
    isRegisterSuccess,
    isRegisterFailure,
    isUpdateUserSuccess,
    isUpdateUserFailure,
  } = useSelector((store) => store.auth);

  const [callApi, setCallApi] = useState(false);
  const [dataActive, setDataActive] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const [indexPage, setIndexPage] = useState(1);
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
    if (callApi) {
      const params = {
        limit,
        page: indexPage,
      };
      if (searchDebounce) {
        params.name = searchDebounce;
      }
      dispatch(getAllUserRequest(params));
      setCallApi(false);
    }
  }, [callApi, indexPage]);

  const columns = useMemo(() => [
    {
      Header: "STT",
      accessor: "",
      cellClass: "list-item-heading w-5",
      Cell: (row) => row.row.index + 1,
    },
    {
      Header: "Ảnh đại diện",
      accessor: "avatar",
      cellClass: "list-item-heading w-5",
      Cell: ({ value }) => (
        <div
          className="d-flex align-items-center btn-see-tour justify-content-center"
          style={{ gap: "10px" }}
        >
          <img
            src={value ? value : logo}
            alt="avatar"
            style={{ height: "50px", width: "50px", objectFit: "contain" }}
          />
        </div>
      ),
    },
    {
      Header: "Mã",
      accessor: "_id",
      cellClass: "list-item-heading w-5",
    },
    {
      Header: "Tên",
      accessor: "name",
      cellClass: "list-item-heading w-5",
    },
    {
      Header: "Email",
      accessor: "email",
      cellClass: "list-item-heading w-5",
    },
    {
      Header: "Số điện thoại",
      accessor: "phone",
      cellClass: "list-item-heading w-5",
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
            onClick={handleShowModalDelete}
          >
            <CSTrash2Outline />
          </div>
        </div>
      ),
    },
  ]);

  useEffect(() => {
    if (isGetAllUsersSuccess) {
      setDataTable(getAllUsersState?.data || []);
    }
  }, [isGetAllUsersSuccess]);

  useEffect(() => {
    if (isRegisterSuccess) {
      toast.success("Thêm nhân viên thành công");
      setIsShowModalConfirm(false);
      setCallApi(true);
      setIsShowModalAction(false);
      dispatch(resetRegisterState());
    }
  }, [isRegisterSuccess]);

  useEffect(() => {
    if (isRegisterFailure) {
      toast.error("Thêm nhân viên thất bại");
      dispatch(resetRegisterState());
    }
  }, [isRegisterFailure]);

  useEffect(() => {
    if (isUpdateUserSuccess) {
      toast.success("Cập nhật nhân viên thành công");
      setCallApi(true);
      setIsShowModalConfirm(false);
      setIsShowModalAction(false);
      dispatch(resetUpdateUserState());
    }
  }, [isUpdateUserSuccess]);

  useEffect(() => {
    if (isUpdateUserFailure) {
      toast.error("Cập nhật nhân viên thất bại");
      dispatch(resetUpdateUserState());
    }
  }, [isUpdateUserFailure]);

  const handleClickRow = (value) => {
    setDataActive(value);
  };
  const handleChangePage = (idxPage) => {
    setIndexPage(idxPage);
    setCallApi(true);
  };

  return (
    <div className="admin-staff-page">
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
          maxPage={getAllUsersState?.totalPage}
          handlePaginationNext={handleChangePage}
          showPagination={getAllUsersState?.totalPage > 1 ? true : false}
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

export default AdminFood;
