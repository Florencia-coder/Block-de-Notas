import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faBoxArchive, faUpload } from "@fortawesome/free-solid-svg-icons";
import "./noteCard.css";
import ModalDeleteCard from "../modalDeleteCard/ModalDeleteCard";
import ModalCreateEditNote from "../../../modalCreateEditNote/ModalCreateEditNote";
import { usePatchNote } from "../../../../actions";
import formatDate from "../../utils";

const NoteCard = ({
  title,
  description,
  categoryId,
  type,
  updatedAt,
  id,
  archived,
}) => {
  const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const { patchNote } = usePatchNote();

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
    patchNote({ id, archived: true });
  };

  const handleUnarchiveNote = () => {
    patchNote({ id, archived: false });
  };

  return (
    <div>
      <div className="container-card-second">
        <h2>{title.toUpperCase()}</h2>
        <p>Last edited: {formatDate(updatedAt)}</p>
        <h4>{description}</h4>
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
        categoryId={categoryId ? categoryId : null}
        title={title ? title : null}
        archived={archived}
        id={id}
      />
    </div>
  );
};

export default NoteCard;
