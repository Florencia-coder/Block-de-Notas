export const handleMyNotes = (setSelectedOption, setIsArchivedPage) => {
    setSelectedOption("misNotas");
    setIsArchivedPage(false);
  };
  
  export const handleArchivedNotes = (setSelectedOption, setIsArchivedPage) => {
    setSelectedOption("notasArchivadas");
    setIsArchivedPage(true);
  };
  