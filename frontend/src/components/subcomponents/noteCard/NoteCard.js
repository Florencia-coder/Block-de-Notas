import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faBoxArchive, faUpload } from "@fortawesome/free-solid-svg-icons";
import "./noteCard.css";
import ModalDeleteCard from "../modalDeleteCard/ModalDeleteCard";
import ModalCreateEditNote from "../../modalCreateEditNote/ModalCreateEditNote";
import { usePatchNote } from "../../../actions";
import formatDate from "../../home/utils";

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

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
  const descriptionResume = truncateText(description, 120)

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

  const handleArchiveNote = async () => {
    await patchNote({ id, archived: true });
  };

  const handleUnarchiveNote = async () => {
    await patchNote({ id, archived: false });
  };

  

  return (
    <>
      <div className="card-header">
        <h2 className="card-header_title">{title.toUpperCase()}</h2>
        <p className="card-header_edition">Ultima edición: {formatDate(updatedAt)}</p>
        <h4 className="card-header_description">{descriptionResume}</h4>
      </div>
      <div className="card-footer">
        <FontAwesomeIcon
          className="card-footer_icon"
          icon={type === "archived-note" ? faUpload : faBoxArchive}
          onClick={
            type === "archived-note" ? handleUnarchiveNote : handleArchiveNote
          }
        />
        <FontAwesomeIcon className="card-footer_icon" icon={faPenToSquare} onClick={handleEditNote} />
        <FontAwesomeIcon className="card-footer_icon" icon={faTrashCan} onClick={handleTrashCanClick} />{" "}
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
    </>
  );
};

export default NoteCard;
