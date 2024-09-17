import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Alert, Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import {
  deleteCategoryRequest,
  resetDeleteCategory,
} from "~/redux/categoryBlog/actions";

export const ModalDelete = ({ data, isOpen, handleClose, setCallApi }) => {
  const dispatch = useDispatch();

  const {
    isDeleteCategoryRequest,
    isDeleteCategorySuccess,
    isDeleteCategoryFailure,
  } = useSelector((store) => store.categoryBlog);

  useEffect(() => {
    if (isDeleteCategorySuccess) {
      handleClose();
      setCallApi(true);
      toast.success("Xóa thành công danh mục blog");
      dispatch(resetDeleteCategory());
    }
  }, [isDeleteCategorySuccess]);

  const handleDelete = () => {
    dispatch(deleteCategoryRequest(data._id));
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
        {isDeleteCategoryFailure && (
          <Alert color="danger">Xóa danh mục Blog thất bại</Alert>
        )}
        <h3 className="color-danger">Xác nhận xóa danh mục Blog</h3>
        <p>Bạn chắc chắc xóa danh mục blog</p>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex align-content-center justify-content-end flex-grow-1 gap-2">
          <Button
            color="danger"
            disabled={isDeleteCategoryRequest}
            className={`btn-shadow btn-multiple-state ${
              isDeleteCategoryRequest ? "show-spinner disabled" : ""
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
            disabled={isDeleteCategoryRequest}
            className={`btn-shadow btn-multiple-state ${
              isDeleteCategoryRequest ? "disabled" : ""
            }`}
            style={isDeleteCategoryRequest ? { cursor: "no-drop" } : {}}
            onClick={handleClose}
          >
            Trở về
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
