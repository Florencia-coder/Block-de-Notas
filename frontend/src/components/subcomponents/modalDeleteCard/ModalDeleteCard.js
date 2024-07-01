import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDeleteNote } from "../../../actions";
import Button from "../../../atoms/button/Button";
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
      className="modal-delete"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <h2 className="modal-delete-title">¿Estás seguro que quieres eliminar esta nota?</h2>
      <div className="separatorHeader" />
      <p className="modal-delete-text">Si eliminas la siguiente nota, no podrás recuperarla más tarde.</p>
      <div className="block-button">
        <Button onClick={onClose} title="Cancelar"/>
        <Button onClick={handleDeleteNote} title={isLoading ? (
            <FontAwesomeIcon className="icon-spiner" icon={faSpinner} spin />
          ) : "Aceptar"} />
      </div>
    </Modal>
  );
};

export default ModalDeleteCard;
