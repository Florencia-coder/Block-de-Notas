import React from "react";
import NoteCard from "../subcomponents/noteCard/NoteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import "./sectionNotes.css";

const colores = [
  "color-1",
  "color-2",
  "color-3",
  "color-4",
  "color-5",
  "color-6",
  "color-7",
  "color-8",
  "color-9",
];
let colorIndex = 0;

// Función para asignar una clase de color de fondo a una tarjeta
function asignarColorDeFondo(contenedor) {
  const color = colores[colorIndex];
  contenedor.classList.add(color);
  colorIndex = (colorIndex + 1) % colores.length; // Vuelve a empezar si te quedas sin colores
}

const SectionNotes = ({ isLoading, allNotes, isArchivedBody }) => {
  if (isLoading) {
    return (
      <div className="container-loading">
        <FontAwesomeIcon icon={faClipboard} className="icon-clip" fade />
        <p>Cargando notas...</p>
      </div>
    );
  }
  return (
    <div className="section-notes">
      {allNotes?.map((el, index) => (
        <div className={`container-card ${colores[index % colores.length]}`}>
          <NoteCard
            key={el.id}
            {...el}
            type={isArchivedBody ? "archived-note" : ""}
          />
        </div>
      ))}
    </div>
  );
};
document.querySelectorAll(".container-card").forEach((contenedor) => {
  asignarColorDeFondo(contenedor);
});

export default SectionNotes;
