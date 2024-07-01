import React, { useState } from "react";
import "./navBar.css";
import {
  handleArchivedNotes,
  handleMyNotes,
} from "./utils/hooks";

const NavBar = ({ setIsArchivedPage }) => {
  const [selectedOption, setSelectedOption] = useState("misNotas");

  return (
    <nav className="navbar">
      <div
        className={selectedOption === "misNotas" ? "block-navbar focused" : "block-navbar"}
        onClick={() => handleMyNotes(setSelectedOption, setIsArchivedPage)}
      >
        <h3 className="navbar-title" >Mis Notas</h3>
      </div>
      <div
        className={selectedOption === "notasArchivadas" ? "block-navbar focused" : "block-navbar"}
        onClick={() =>
          handleArchivedNotes(setSelectedOption, setIsArchivedPage)
        }
      >
        <h3 className="navbar-title" >Notas Archivadas</h3>
      </div>
    </nav>
  );
};

export default NavBar;
