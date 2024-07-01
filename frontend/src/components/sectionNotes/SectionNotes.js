import React from "react";
import NoteCard from "../subcomponents/noteCard/NoteCard";
import NewNoteCard from "../newNoteCard/NewNoteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import "./sectionNotes.css";

const SectionNotes = ({ isLoading, allNotes, isArchivedPage }) => {
  if (isLoading) {
    return (
      <div className="loading">
        <FontAwesomeIcon className="loading_icon" icon={faClipboard} fade />
        <p className="loading_text">Cargando notas...</p>
      </div>
    );
  }
  return (
    <div className="section-notes">
      <NewNoteCard/>
      {allNotes?.map((el) => (
        <div className={`section-notes_card`} key={el.id}>
          <NoteCard
            {...el}
            type={isArchivedPage ? "archived-note" : ""}
          />
        </div>
      ))}
    </div>
  );
};


export default SectionNotes;
