import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Alert, Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import {
  deleteCategoryTourRequest,
  resetDeleteCategoryTour,
} from "~/redux/categoryTour/actions";

export const ModalDelete = ({ data, isOpen, handleClose, setCallApi }) => {
  const dispatch = useDispatch();

  const {
    isDeleteCategoryTourRequest,
    isDeleteCategoryTourSuccess,
    isDeleteCategoryTourFailure,
  } = useSelector((store) => store.categoryTour);

  useEffect(() => {
    if (isDeleteCategoryTourSuccess) {
      handleClose();
      setCallApi(true);
      toast.success("Xóa danh mục tour món ăn");
      dispatch(resetDeleteCategoryTour());
    }
  }, [isDeleteCategoryTourSuccess]);

  const handleDelete = () => {
    dispatch(deleteCategoryTourRequest(data._id));
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
        {isDeleteCategoryTourFailure && (
          <Alert color="danger">Xóa danh mục Tour thất bại</Alert>
        )}
        <h3 className="color-danger">Xác nhận xóa danh mục Tour</h3>
        <p>Bạn chắc chắc xóa danh mục Tour</p>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex align-content-center justify-content-end flex-grow-1 gap-2">
          <Button
            color="danger"
            disabled={isDeleteCategoryTourRequest}
            className={`btn-shadow btn-multiple-state ${
              isDeleteCategoryTourRequest ? "show-spinner disabled" : ""
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
            disabled={isDeleteCategoryTourRequest}
            className={`btn-shadow btn-multiple-state ${
              isDeleteCategoryTourRequest ? "disabled" : ""
            }`}
            style={isDeleteCategoryTourRequest ? { cursor: "no-drop" } : {}}
            onClick={handleClose}
          >
            Trở về
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
