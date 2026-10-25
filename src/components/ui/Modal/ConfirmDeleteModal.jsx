import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import './style.css'
const ConfirmDeleteModal = ({ 
  show, 
  onHide, 
  onConfirm, 
  title = "Delete Record", 
  message = "Are you sure you want to delete this record?",
  isLoading = false 
}) => {
  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      className="custom-confirm-modal"
      backdrop={isLoading ? "static" : true}
    >
      <Modal.Header closeButton={!isLoading} className="border-0">
        <Modal.Title className="d-flex align-items-center">
          {/* Using a soft red circle icon instead of a red header */}
          <div className="icon-shape-delete me-3">
             <FaTrashCan size={18} color="#ef4444" />
          </div>
          {title}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <p className="mb-0">{message}</p>
      </Modal.Body>
      
      <Modal.Footer className="border-0 pb-4">
        <Button 
          variant="light" 
          onClick={onHide} 
          disabled={isLoading}
          className="px-4 py-2"
        >
          Cancel
        </Button>
        <Button 
          variant="danger" 
          onClick={onConfirm} 
          disabled={isLoading}
          className="px-4 py-2 d-flex align-items-center"
        >
          {isLoading ? (
            <>
              <Spinner size="sm" className="me-2" />
              Deleting...
            </>
          ) : (
            "Yes, Delete"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;