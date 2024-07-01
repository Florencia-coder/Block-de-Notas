import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetNotes } from "../../../actions";

export const useHomeHooks = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [isArchivedPage, setIsArchivedPage] = useState(false);
  const { data: notes, isLoading } = useGetNotes();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const filterNotes = () => {
    if (!isArchivedPage) {
      setAllNotes(notes?.filter((item) => !item.archived));
    } else {
      setAllNotes(notes?.filter((item) => item.archived));
    }
  };

  useEffect(() => {
    filterNotes();
    setSelectedCategory("All");
  }, [notes, isArchivedPage]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    const categoryId = selectedCategory !== "All" && JSON.parse(selectedCategory).id
    setSelectedCategory(selectedCategory);
    if (categoryId) {
      let notesByCategory = [];
      if (isArchivedPage) {
        notesByCategory = notes.filter((note) => note.categoryId === Number(categoryId) && note.archived);
      } else {
        notesByCategory = notes.filter((note) => note.categoryId === Number(categoryId) && !note.archived);
      }
      setAllNotes(notesByCategory);
    } else {
      filterNotes();
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loginUser");
    navigate("/");
  };

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return {
    allNotes,
    isArchivedPage,
    setIsArchivedPage,
    isLoading,
    selectedCategory,
    handleCategoryChange,
    handleLogout,
    toggleDarkMode,
    darkMode
  };
};
