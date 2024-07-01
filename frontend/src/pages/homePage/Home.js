import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import "./home.css";
import { useHomeHooks } from "./utils/hooks";
import FilterCategories from "../../components/subcomponents/filterCategories/FilterCategories";
import SectionNotes from "../../components/sectionNotes/SectionNotes";
import NavBar from "../../components/navBar/NavBar";
import Button from "../../atoms/button/Button";

const Home = () => {

  const {
    allNotes,
    isArchivedPage,
    setIsArchivedPage,
    isLoading,
    selectedCategory,
    handleCategoryChange,
    handleLogout,
    toggleDarkMode,
    darkMode
  } = useHomeHooks();

  return (
    <div className="block-main">
      <div className="block-header">
      <NavBar setIsArchivedPage={setIsArchivedPage} />
      <div className="block-filter-mode">
      <button className="button-mode" onClick={toggleDarkMode}>{(<FontAwesomeIcon icon={darkMode ? faSun : faMoon} />)}</button>
        <FilterCategories
          defaultValue="Todas las categorias"
          handleCategory={(e) => handleCategoryChange(e)}
          selectedCategory={selectedCategory}
        />
      </div>
      </div>
      <section className="section-body">
        <SectionNotes
          allNotes={allNotes}
          isArchivedPage={isArchivedPage}
          isLoading={isLoading}
        />
      </section>
      <div className="block-button-logout">
        <Button onClick={handleLogout} title='Salir' />
      </div>
    </div>
  );
};

export default Home;
