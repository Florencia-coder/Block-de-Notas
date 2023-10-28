import Modal from "react-modal";
import { useDeleteNote } from "../../../../actions";
import "./modalDeleteCard.css";

const ModalDeleteCard = ({ modalIsOpen, onClose, id }) => {
  const { deleteNote, isLoading } = useDeleteNote();

  const handleDeleteNote = async () => {
    await deleteNote(id);
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
      <h2>¿Estás seguro que quieres eliminar esta nota?</h2>
      <div className="separatorHeader" />
      <p>Si eliminas la siguiente nota, no podrás recuperarla más tarde.</p>
      <div className="container-button">
        <button onClick={onClose} className="button">
          Cancelar
        </button>
        <button onClick={handleDeleteNote} className="button">
          {isLoading ? "Cargando..." : "Aceptar"}
        </button>
      </div>
    </Modal>
  );
};

export default ModalDeleteCard;
