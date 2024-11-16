import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Alert, Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export const ModalConfirmChecking = ({
  isOpen,
  handleClose,
  handleConfirm,
}) => {
  const { isUpdateBookingRequest, isUpdateBookingFailure } = useSelector(
    (store) => store.booking
  );

  return (
    <Modal
      isOpen={isOpen}
      size="md"
      centered
      backdrop="static"
      toggle={handleClose}
    >
      <ModalBody>
        {isUpdateBookingFailure && (
          <Alert color="danger">Update checked in failure</Alert>
        )}
        <h3 className="color-danger">Update status checked in booking</h3>
        <p>You definitely want to update status checked in booking</p>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex align-content-center justify-content-end flex-grow-1 gap-2">
          <Button
            color="primary"
            disabled={isUpdateBookingRequest}
            className={`btn-shadow btn-multiple-state ${
              isUpdateBookingRequest ? "show-spinner disabled" : ""
            }`}
            onClick={handleConfirm}
          >
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            {isUpdateBookingRequest ? (
              <Spinner size="12" />
            ) : (
              <span className="label">Confirm</span>
            )}
          </Button>
          <Button
            outline
            disabled={isUpdateBookingRequest}
            className={`btn-shadow btn-multiple-state ${
              isUpdateBookingRequest ? "disabled" : ""
            }`}
            style={isUpdateBookingRequest ? { cursor: "no-drop" } : {}}
            onClick={handleClose}
          >
            Back
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
