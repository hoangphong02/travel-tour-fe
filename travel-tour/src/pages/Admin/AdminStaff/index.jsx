import React, { useMemo, useState } from "react";
import TopComponent from "./TopComponent";
import { ReactTableWithPaginationCard } from "~/components/common";
import { Button } from "react-bootstrap";
import {
  CSEditOutline,
  CSEyeOutline,
  CSTrash2Outline,
  CSTrashOutline,
} from "~/components/iconography/Outline";
import { CSTrashSolid } from "~/components/iconography/Solid";
import { ModalActions } from "./ModalAction";
import { ModalDelete } from "./ModalDelete";

const AdminStaff = () => {
  const [isShowModalAction, setIsShowModalAction] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [type, setType] = useState();
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
  const handleShowModalDelete = (type) => {
    setIsShowModalDelete(true);
  };

  const fakeData = [
    {
      id: "123",
      name: "Thai",
      email: "thaistar1f@gmail.com",
      password: "Xtera123",
      phone: "0915210966",
      avatar: "",
    },
    {
      id: "123",
      name: "Thai",
      email: "thaistar1f@gmail.com",
      password: "Xtera123",
      phone: "0915210966",
      avatar: "",
    },
    {
      id: "123",
      name: "Thai",
      email: "thaistar1f@gmail.com",
      password: "Xtera123",
      phone: "0915210966",
      avatar: "",
    },
  ];
  const columns = useMemo(() => [
    {
      Header: "STT",
      accessor: "",
      cellClass: "list-item-heading w-5",
    },
    {
      Header: "MÃ",
      accessor: "id",
      cellClass: "list-item-heading w-5",
    },
    {
      Header: "TÊN",
      accessor: "name",
      cellClass: "list-item-heading w-5",
    },
    {
      Header: "EMAIL",
      accessor: "email",
      cellClass: "list-item-heading w-5",
    },
    {
      Header: "SỐ ĐIỆN THOẠI",
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
  return (
    <div className="admin-staff-page">
      <div className="top">
        <TopComponent handleShowModalActions={handleShowModalActions} />
      </div>
      <div className="table">
        <ReactTableWithPaginationCard data={fakeData} columns={columns} />
      </div>

      {isShowModalAction && type && (
        <ModalActions
          isOpen
          type={type}
          handleClose={handleCloseModalActions}
          // data={dataActive}
        />
      )}
      {isShowModalDelete && (
        <ModalDelete
          isOpen
          handleClose={handleCloseModalDelete}
          // data={dataActive}
        />
      )}
    </div>
  );
};

export default AdminStaff;
