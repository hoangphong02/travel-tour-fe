import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export const ModalDelete = ({ data, isOpen, handleClose }) => {
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     if (isDeleteProductSuccess) {
  //       handleClose();
  //     }
  //   }, [isDeleteProductSuccess]);

  const handleDelete = () => {
    // dispatch(deleteProductRequest(data.id));
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
            // disabled={isDeleteProductRequest}
            // className={`btn-shadow btn-multiple-state ${
            //   isDeleteProductRequest ? "show-spinner disabled" : ""
            // }`}
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
            // disabled={isDeleteProductRequest}
            // className={`btn-shadow btn-multiple-state ${
            //   isDeleteProductRequest ? "disabled" : ""
            // }`}
            // style={isDeleteProductRequest ? { cursor: "no-drop" } : {}}
            onClick={handleClose}
          >
            Trở về
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
