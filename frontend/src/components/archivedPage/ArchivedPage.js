import { Link } from "react-router-dom";
import NoteCard from "../home/subcomponents/noteCard/NoteCard";
import { useState } from "react";
import ModalCreateEditNote from "../modalCreateEditNote/ModalCreateEditNote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useGetNotes } from "../../actions";

const ArchivedPage = () => {
  const [modalIsOpenCreate, setModalIsOpenCreate] = useState(false);
  const { data: notes, isLoading } = useGetNotes();
  const notesArchived = notes?.filter((item) => item.archived);

  const closeModalCreate = () => {
    setModalIsOpenCreate(false);
  };
  return (
    <div>
      <section className="section-header">
        <h1>Archived notes</h1>
        <Link to="/">
          <FontAwesomeIcon icon={faChevronLeft} />
          {"  "}
          Go to back to unarchived notes
        </Link>
      </section>
      <section className="section-notes">
        {notesArchived?.map((el) => {
          return <NoteCard type="archived-note" {...el} />;
        })}
      </section>
      <ModalCreateEditNote
        modalIsOpen={modalIsOpenCreate}
        type="create"
        onClose={closeModalCreate}
      />
    </div>
  );
};

export default ArchivedPage;
