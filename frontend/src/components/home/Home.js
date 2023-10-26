/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./home.css";
import NoteCard from "./subcomponents/noteCard/NoteCard";
import SectionOptions from "./subcomponents/sectionOptions/SectionOptions";
import FilterCategories from "./subcomponents/filterCategories/FilterCategories";
import {
  useGetNotes,
  useGetCategories,
  useGetNotesCategory,
} from "../../actions";

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

const Home = () => {
  const [allNotes, setAllNotes] = useState();
  const [isArchivedBody, setIsArchivedBody] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: notes, isLoading } = useGetNotes();
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();

  const { noteCategory } = useGetNotesCategory();

  const handleCategoryChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    if (selectedValue === "All") {
      if (isArchivedBody) {
        setAllNotes(notes?.filter((item) => item.archived));
      } else {
        setAllNotes(notes?.filter((item) => !item.archived));
      }
    } else {
      const notesByCat = await noteCategory(Number(selectedValue) + 1);
      if (isArchivedBody) {
        const notesFilterArchived = notesByCat.filter((note) => note.archived);
        setAllNotes(notesFilterArchived);
      } else {
        const notesFilterUnarchived = notesByCat.filter(
          (note) => !note.archived
        );
        setAllNotes(notesFilterUnarchived);
      }
    }
  };

  const handleArchivedChange = () => {
    setSelectedCategory("All");
    setAllNotes(notes?.filter((item) => item.archived));
    setIsArchivedBody(true);
  };

  const handleMyNotes = () => {
    setIsArchivedBody(false);
    setSelectedCategory("All");
    setAllNotes(notes?.filter((item) => !item.archived));
  };

  useEffect(() => {
    if (!isArchivedBody) {
      handleMyNotes();
    } else {
      setAllNotes(notes?.filter((item) => item.archived));
    }
  }, [notes]);

  return (
    <div className="container-main">
      <section className="section-header">
        <div>
          <img src="/assets/images/note-logo.png" alt="logo note" />
          <h1 className="title">MIS NOTAS</h1>
        </div>
        <div className="category-filter">
          <h4>Filtrar Categoria</h4>
          {isLoadingCategories ? (
            <p>Cargando...</p>
          ) : (
            <FilterCategories
              categories={(categories.length > 0 && categories) || []}
              handleCategory={handleCategoryChange}
              selectedCategory={selectedCategory}
            />
          )}
        </div>
        <button style={{ width: "60px" }} title="procesando..." />
      </section>

      <section className="section-body">
        <SectionOptions
          handleArchivedChange={handleArchivedChange}
          handleMyNotesChange={handleMyNotes}
        />
        <div className="section-notes">
          {isLoading ? (
            <div>Cargando...</div>
          ) : (
            allNotes?.map((el, index) => (
              <div
                className={`container-card ${colores[index % colores.length]}`}
              >
                <NoteCard
                  key={el.id}
                  {...el}
                  type={isArchivedBody ? "archived-note" : ""}
                />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
document.querySelectorAll(".container-card").forEach((contenedor) => {
  asignarColorDeFondo(contenedor);
});

export default Home;
