import Modal from "react-modal";
import { useDeleteNote } from "../../../../actions";
import "./modalDeleteCard.css";

const ModalDeleteCard = ({ modalIsOpen, onClose, id }) => {
  const { deleteNote, isLoading } = useDeleteNote();

  const handleDeleteNote = () => {
    deleteNote(id);
    onClose();
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <h2>¿Are you sure you want to delete this note?</h2>
      <p>
        If you delete the following note, you won't be able to retrieve it later
      </p>
      <div className="container-button">
        <button onClick={onClose} className="button">
          Cancel
        </button>
        <button onClick={handleDeleteNote} className="button">
          {isLoading ? "Loading..." : "Accept"}
        </button>
      </div>
    </Modal>
  );
};

export default ModalDeleteCard;
