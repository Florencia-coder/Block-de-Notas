import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import "./home.css";
import { useHomeHooks } from "./utils/hooks";
import FilterCategories from "../../components/subcomponents/filterCategories/FilterCategories";
import SectionNotes from "../../components/sectionNotes/SectionNotes";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import ButtonIcon from "../../atoms/buttonIcon/ButtonIcon";

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
      <ButtonIcon onClick={toggleDarkMode} title={(<FontAwesomeIcon icon={darkMode ? faSun : faMoon} />)}/>
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
        <div>
          <ButtonIcon onClick={handleLogout}title={<FontAwesomeIcon icon={faArrowRightFromBracket} />}/>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
