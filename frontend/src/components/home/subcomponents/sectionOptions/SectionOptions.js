import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faNoteSticky,
  faClipboard,
} from "@fortawesome/free-regular-svg-icons";
import "./sectionOptions.css";
import ModalCreateEditNote from "../../../modalCreateEditNote/ModalCreateEditNote";

const SectionOptions = ({
  handleArchivedChange = () => {},
  handleMyNotesChange,
}) => {
  const [modalIsOpenCreate, setModalIsOpenCreate] = useState(false);
  const [selectedOption, setSelectedOption] = useState("misNotas"); // Pista sobre la opción seleccionada

  const handleCreateNote = () => {
    setModalIsOpenCreate(true);
    handleOptionClick("crearNota");
  };

  const handleMyNotes = () => {
    handleOptionClick("misNotas");
    handleMyNotesChange();
  };

  const closeModalCreate = () => {
    setModalIsOpenCreate(false);
    handleMyNotes();
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleArchivedNotes = () => {
    handleOptionClick("notasArchivadas");
    handleArchivedChange();
  };

  return (
    <div className="section-options">
      <div
        onClick={() => handleMyNotes()}
        className={selectedOption === "misNotas" ? "focused" : ""}
      >
        <FontAwesomeIcon icon={faClipboard} className="icon-select" />
        Mis notas
      </div>
      <div
        onClick={() => handleCreateNote()}
        className={selectedOption === "crearNota" ? "focused" : ""}
      >
        <FontAwesomeIcon icon={faNoteSticky} className="icon-select" />
        Crear nueva nota
      </div>
      <div
        onClick={() => handleArchivedNotes()}
        className={selectedOption === "notasArchivadas" ? "focused" : ""}
      >
        <FontAwesomeIcon icon={faPenToSquare} className="icon-select" />
        Notas archivadas
      </div>

      <ModalCreateEditNote
        modalIsOpen={modalIsOpenCreate}
        type="create"
        onClose={closeModalCreate}
      />
    </div>
  );
};

export default SectionOptions;
