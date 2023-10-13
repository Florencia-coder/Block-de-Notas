import { Link } from "react-router-dom";
import "./home.css";
import NoteCard from "./subcomponents/noteCard/NoteCard";
import { useEffect, useState } from "react";
import ModalCreateEditNote from "../modalCreateEditNote/ModalCreateEditNote";
import {
  useGetNotes,
  useGetCategories,
  useGetNotesCategory,
} from "../../actions";

const Home = () => {
  const [modalIsOpenCreate, setModalIsOpenCreate] = useState(false);
  const [allNotes, setAllNotes] = useState();
  const { data: notes, isLoading } = useGetNotes();
  const { data: categories } = useGetCategories();
  const { noteCategory } = useGetNotesCategory();

  const handleCategoryChange = async (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "All") {
      setAllNotes(notes?.filter((item) => !item.archived));
    } else {
      const noteCat = await noteCategory(Number(selectedValue) + 1);
      setAllNotes(noteCat);
    }
  };

  const handleCreateNote = () => {
    setModalIsOpenCreate(true);
  };

  const closeModalCreate = () => {
    setModalIsOpenCreate(false);
  };
  useEffect(() => {
    setAllNotes(notes?.filter((item) => !item.archived));
  }, [notes]);
  return (
    <div>
      <div>
        <section className="section-header">
          <h1>My notes </h1>
          <button onClick={handleCreateNote} className="create-note-button">
            Create note
          </button>
          <Link to="/archived">Archived notes</Link>
        </section>
        <div className="category-filter">
          <h4>Category Filter</h4>
          <select id="categorySelect" onChange={handleCategoryChange}>
            <option value="All" selected>
              All
            </option>
            {categories?.map((category, index) => {
              return <option value={index}>{category.name}</option>;
            })}
          </select>
        </div>
        <section className="section-notes">
          {isLoading ? (
            <div>Cargando...</div>
          ) : (
            allNotes?.map((el) => <NoteCard key={el.id} {...el} />)
          )}
        </section>
        <ModalCreateEditNote
          modalIsOpen={modalIsOpenCreate}
          type="create"
          onClose={closeModalCreate}
        />
      </div>
    </div>
  );
};

export default Home;
