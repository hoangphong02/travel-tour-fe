import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Alert, Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { deleteBlogsRequest, resetDeleteBlogs } from "~/redux/blog/actions";

export const ModalDelete = ({ data, isOpen, handleClose, setCallApi }) => {
  const dispatch = useDispatch();
  const { isDeleteBlogsRequest, isDeleteBlogsSuccess, isDeleteBlogsFailure } =
    useSelector((store) => store.blog);

  useEffect(() => {
    if (isDeleteBlogsSuccess) {
      handleClose();
      setCallApi(true);
      toast.success("Xóa bài blog thành công");
      dispatch(resetDeleteBlogs());
    }
  }, [isDeleteBlogsSuccess]);

  const handleDelete = () => {
    dispatch(deleteBlogsRequest(data._id));
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
        {isDeleteBlogsFailure && (
          <Alert color="danger">Xóa bài blog thất bại</Alert>
        )}
        <h3 className="color-danger">Xác nhận xóa bài blog</h3>
        <p>Bạn chắc chắc xóa bài blog</p>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex align-content-center justify-content-end flex-grow-1 gap-2">
          <Button
            color="danger"
            disabled={isDeleteBlogsRequest}
            className={`btn-shadow btn-multiple-state ${
              isDeleteBlogsRequest ? "show-spinner disabled" : ""
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
            disabled={isDeleteBlogsRequest}
            className={`btn-shadow btn-multiple-state ${
              isDeleteBlogsRequest ? "disabled" : ""
            }`}
            style={isDeleteBlogsRequest ? { cursor: "no-drop" } : {}}
            onClick={handleClose}
          >
            Trở về
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
