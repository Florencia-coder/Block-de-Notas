/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./home.css";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import SectionOptions from "../../components/sectionOptions/SectionOptions";
import { useGetNotes, useGetNotesByCategory } from "../../actions";
import SectionNotes from "../../components/sectionNotes/SectionNotes";

const Home = () => {
  const [allNotes, setAllNotes] = useState();
  const [isArchivedBody, setIsArchivedBody] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: notes, isLoading, refetch } = useGetNotes();
  const { notesByCategory } = useGetNotesByCategory();

  const handleCategoryChange = async (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    if (selectedCategory === "All") {
      if (isArchivedBody) {
        setAllNotes(notes?.filter((item) => item.archived));
      } else {
        setAllNotes(notes?.filter((item) => !item.archived));
      }
    } else {
      const notesByCat = await notesByCategory(Number(selectedCategory)) || []
      if (isArchivedBody) {
        const notesFilterArchived = notesByCat?.filter((note) => note.archived);
        setAllNotes(notesFilterArchived);
      } else {
        const notesFilterUnarchived = notesByCat?.filter(
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

  useEffect(()=>{
    refetch()
  },[])

  return (
    <div className="block-main">
      <SectionHeader
        handleCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
      />
      <section className="section-body">
        <SectionOptions
          handleArchivedChange={handleArchivedChange}
          handleMyNotesChange={handleMyNotes}
        />
        <SectionNotes
          allNotes={allNotes}
          isArchivedBody={isArchivedBody}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
};

export default Home;
