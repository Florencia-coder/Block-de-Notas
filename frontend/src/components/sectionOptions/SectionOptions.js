import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faPenToSquare,
  faNoteSticky,
  faClipboard,
} from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "./sectionOptions.css";
import ModalCreateEditNote from "../modalCreateEditNote/ModalCreateEditNote";

const SectionOptions = ({
  handleArchivedChange = () => {},
  handleMyNotesChange,
}) => {
  const [modalIsOpenCreate, setModalIsOpenCreate] = useState(false);
  const [selectedOption, setSelectedOption] = useState("misNotas");
  const navigate = useNavigate();

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

  const handleLogout = () => {
    handleOptionClick("cerrarSesion");
    window.localStorage.removeItem("loginUser");
    navigate("/");
  };

  return (
    <div className="section-options">
      <div
        className={selectedOption === "misNotas" ? "section-options_option focused" : "section-options_option"}
        onClick={() => handleMyNotes()}
      >
        <FontAwesomeIcon className="section-options_icon" icon={faClipboard} />
        Mis notas
      </div>
      <div
        className={selectedOption === "crearNota" ? "section-options_option focused" : "section-options_option"}
        onClick={() => handleCreateNote()}
      >
        <FontAwesomeIcon className="section-options_icon" icon={faNoteSticky} />
        Crear nueva nota
      </div>
      <div
        className={selectedOption === "notasArchivadas" ? "section-options_option focused" : "section-options_option"}
        onClick={() => handleArchivedNotes()}
      >
        <FontAwesomeIcon className="section-options_icon" icon={faPenToSquare} />
        Notas archivadas
      </div>
      <div
        className={selectedOption === "cerrarSesion" ? "section-options_option focused" : "section-options_option"}
        onClick={() => handleLogout()}
      >
        <FontAwesomeIcon
          className="section-options_icon"
          icon={faArrowRightFromBracket}
        />
        Cerrar Sesión
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
