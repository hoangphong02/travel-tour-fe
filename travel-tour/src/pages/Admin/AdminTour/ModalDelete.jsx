import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Alert, Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { deleteTourRequest, resetDeleteTour } from "~/redux/tour/actions";

export const ModalDelete = ({ data, isOpen, handleClose, setCallApi }) => {
  const dispatch = useDispatch();

  const { isDeleteTourRequest, isDeleteTourSuccess, isDeleteTourFailure } =
    useSelector((store) => store.tour);
  useEffect(() => {
    if (isDeleteTourSuccess) {
      handleClose();
      setCallApi(true);
      toast.success("Xóa Tour du lịch thành công");
      dispatch(resetDeleteTour());
    }
  }, [isDeleteTourSuccess]);

  const handleDelete = () => {
    dispatch(deleteTourRequest(data._id));
  };

  return (
    <Modal
      isOpen={isOpen}
      size="md"
      centered
      backdrop="static"
      toggle={handleClose}
    >
      <ModalBody>
        {isDeleteTourFailure && (
          <Alert color="danger">Xóa Tour du lịch thất bại</Alert>
        )}
        <h3 className="color-danger">Xác nhận xóa Tour du lịch</h3>
        <p>Bạn chắc chắc xóa Tour du lịch</p>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex align-content-center justify-content-end flex-grow-1 gap-2">
          <Button
            color="danger"
            disabled={isDeleteTourRequest}
            className={`btn-shadow btn-multiple-state ${
              isDeleteTourRequest ? "show-spinner disabled" : ""
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
            disabled={isDeleteTourRequest}
            className={`btn-shadow btn-multiple-state ${
              isDeleteTourRequest ? "disabled" : ""
            }`}
            style={isDeleteTourRequest ? { cursor: "no-drop" } : {}}
            onClick={handleClose}
          >
            Trở về
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
