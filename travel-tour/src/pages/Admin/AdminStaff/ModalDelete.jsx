import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { deleteUserRequest, resetDeleteUserState } from "~/redux/auth/actions";

export const ModalDelete = ({ data, isOpen, handleClose, setCallApi }) => {
  const { isDeleteUserRequest, isDeleteUserSuccess, isDeleteUserFailure } =
    useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDeleteUserSuccess) {
      setCallApi(true);
      toast.success("Xóa nhân viên thành công");
      handleClose();
      dispatch(resetDeleteUserState());
    }
  }, [isDeleteUserSuccess]);
  useEffect(() => {
    if (isDeleteUserFailure) {
      toast.error("Xóa nhân viên thất bại");
      dispatch(resetDeleteUserState());
    }
  }, [isDeleteUserFailure]);

  const handleDelete = () => {
    dispatch(deleteUserRequest(data._id));
  };

  return (
    <Modal
      isOpen={isOpen}
      size="sm"
      centered
      backdrop="static"
      toggle={handleClose}
    >
      <ModalBody>
        {/* {isDeleteProductFailure && (
          <Alert color="danger">
            {translate("product.noti.delete.failure")}
          </Alert>
        )} */}
        <h3 className="color-danger">Xác nhận xóa nhân viên</h3>
        <p>Bạn chắc chắc xóa nhân viên</p>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex align-content-center justify-content-between flex-grow-1">
          <Button
            color="danger"
            disabled={isDeleteUserRequest}
            className={`btn-shadow btn-multiple-state ${
              isDeleteUserRequest ? "show-spinner disabled" : ""
            }`}
            onClick={handleDelete}
          >
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            <span className="label">Xác nhận</span>
          </Button>
          <Button
            color="danger"
            outline
            disabled={isDeleteUserRequest}
            className={`btn-shadow btn-multiple-state ${
              isDeleteUserRequest ? "disabled" : ""
            }`}
            style={isDeleteUserRequest ? { cursor: "no-drop" } : {}}
            onClick={handleClose}
          >
            Trở về
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
