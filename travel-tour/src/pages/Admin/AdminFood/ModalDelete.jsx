import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Alert, Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { deleteFoodsRequest, resetDeleteFoods } from "~/redux/food/actions";

export const ModalDelete = ({ data, isOpen, handleClose, setCallApi }) => {
  const dispatch = useDispatch();
  const { isDeleteFoodRequest, isDeleteFoodSuccess, isDeleteFoodFailure } =
    useSelector((store) => store.food);

  useEffect(() => {
    if (isDeleteFoodSuccess) {
      handleClose();
      setCallApi(true);
      toast.success("Xóa thành công món ăn");
      dispatch(resetDeleteFoods());
    }
  }, [isDeleteFoodSuccess]);

  const handleDelete = () => {
    dispatch(deleteFoodsRequest(data._id));
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
        {isDeleteFoodFailure && (
          <Alert color="danger">Xóa món ăn thất bại</Alert>
        )}
        <h3 className="color-danger">Xác nhận xóa món ăn</h3>
        <p>Bạn chắc chắc xóa món ăn</p>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex align-content-center justify-content-end flex-grow-1 gap-2">
          <Button
            color="danger"
            disabled={isDeleteFoodRequest}
            className={`btn-shadow btn-multiple-state ${
              isDeleteFoodRequest ? "show-spinner disabled" : ""
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
            disabled={isDeleteFoodRequest}
            className={`btn-shadow btn-multiple-state ${
              isDeleteFoodRequest ? "disabled" : ""
            }`}
            style={isDeleteFoodRequest ? { cursor: "no-drop" } : {}}
            onClick={handleClose}
          >
            Trở về
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
