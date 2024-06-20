/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./home.css";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import SectionOptions from "../../components/sectionOptions/SectionOptions";
import { useGetNotes, useGetNotesCategory } from "../../actions";
import SectionNotes from "../../components/sectionNotes/SectionNotes";

const Home = () => {
  const [allNotes, setAllNotes] = useState();
  const [isArchivedBody, setIsArchivedBody] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: notes, isLoading, refetch } = useGetNotes();
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
      const notesByCat = await noteCategory(Number(selectedValue) + 1) || []
      console.log('valor de id de categoria', selectedValue);
      console.log('Notas por categoria:', notesByCat);
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
