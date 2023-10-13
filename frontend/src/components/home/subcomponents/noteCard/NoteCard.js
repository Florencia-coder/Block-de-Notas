import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNoteSticky,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { faBoxArchive, faUpload } from "@fortawesome/free-solid-svg-icons";
import "./noteCard.css";
import ModalDeleteCard from "../modalDeleteCard/ModalDeleteCard";
import ModalCreateEditNote from "../../../modalCreateEditNote/ModalCreateEditNote";
import { usePutNote } from "../../../../actions";

const NoteCard = ({ title, description, type, updatedAt, id, archived }) => {
  const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const { putNote } = usePutNote();

  const handleEditNote = () => {
    setModalIsOpenEdit(true);
  };

  const handleTrashCanClick = () => {
    setModalIsOpenDelete(true);
  };

  const closeModalDelete = () => {
    setModalIsOpenDelete(false);
  };

  const closeModalEdit = () => {
    setModalIsOpenEdit(false);
  };

  const handleArchiveNote = () => {
    putNote({ id, archived: true });
  };

  const handleUnarchiveNote = () => {
    putNote({ id, archived: false });
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return dateObj.toLocaleDateString("es-ES", options);
  };

  return (
    <div className="container-card">
      <FontAwesomeIcon icon={faNoteSticky} className="icon" />
      <div className="container-card-second">
        <h2>{title}</h2>
        <p>Last edited: {formatDate(updatedAt)}</p>
      </div>
      <div className="container-card-third">
        <FontAwesomeIcon
          icon={type === "archived-note" ? faUpload : faBoxArchive}
          onClick={
            type === "archived-note" ? handleUnarchiveNote : handleArchiveNote
          }
        />
        <FontAwesomeIcon icon={faPenToSquare} onClick={handleEditNote} />
        <FontAwesomeIcon icon={faTrashCan} onClick={handleTrashCanClick} />{" "}
      </div>
      <ModalDeleteCard
        modalIsOpen={modalIsOpenDelete}
        onClose={closeModalDelete}
        id={id}
      />
      <ModalCreateEditNote
        modalIsOpen={modalIsOpenEdit}
        type="edit"
        onClose={closeModalEdit}
        description={description ? description : null}
        title={title ? title : null}
        archived={archived}
        id={id}
      />
    </div>
  );
};

export default NoteCard;
