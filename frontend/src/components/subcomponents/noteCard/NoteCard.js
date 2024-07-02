import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faEdit, faTrashAlt, faArchive, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import "./noteCard.css";
import ModalDeleteCard from "../modalDeleteCard/ModalDeleteCard";
import ModalCreateEditNote from "../../modalCreateEditNote/ModalCreateEditNote";
import { usePatchNote } from "../../../actions";
import formatDate from "../../home/utils";
import Button from "../../../atoms/button/Button";
import ButtonIcon from "../../../atoms/buttonIcon/ButtonIcon";

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
  const { patchNote, isLoading } = usePatchNote();
  const descriptionResume = truncateText(description, 120);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <div className="container-note-card">
      <div className="container-note-card-text">
        <h2 className="note-card-title">{title.toUpperCase()}</h2>
        <p>Ultima edición: {formatDate(updatedAt)}</p>
        <h4 className="note-card-description">{descriptionResume}</h4>
      </div>
        {
          isMobile ? (
          <div className="container-button">
            <ButtonIcon 
              onClick={type === "archived-note" ? handleUnarchiveNote : handleArchiveNote}
              title={
                isLoading ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : type === "archived-note" ? (
                  <FontAwesomeIcon icon={faBoxOpen} />
                ) :  (
                  <FontAwesomeIcon icon={faArchive} />
                )
              }
            />
            <ButtonIcon
              onClick={handleEditNote}
              title={<FontAwesomeIcon icon={faEdit} />}
            />
            <ButtonIcon
              onClick={handleTrashCanClick}
              title={<FontAwesomeIcon icon={faTrashAlt} />}
            />
          </div>
          ) :( 
        <div className="container-button">
          <Button
            onClick={type === "archived-note" ? handleUnarchiveNote : handleArchiveNote}
            title={
              isLoading ? (
                <FontAwesomeIcon className="icon-spinner-note-card" icon={faSpinner} spin />
              ) : type === "archived-note" ? (
                "Desarchivar"
              ) :  (
                "Archivar"
              )
            }
          />
          <Button
            onClick={handleEditNote}
            title="Editar"
          />
          <Button
            onClick={handleTrashCanClick}
            title="Eliminar"
          />
        </div>
      )}
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
