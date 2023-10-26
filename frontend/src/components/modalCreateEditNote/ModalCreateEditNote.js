import Modal from "react-modal";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./modalCreateEditNote.css";
import {
  usePostNote,
  usePutNote,
  useGetCategories,
  useGetCategoryById,
} from "../../actions";
import FilterCategories from "../home/subcomponents/filterCategories/FilterCategories";

const ModalCreateEditNote = ({
  modalIsOpen,
  onClose,
  categoryId,
  type,
  title,
  id,
  description,
  archived,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryInput, setCategoryInput] = useState("");
  const [titleInput, setTitleInput] = useState(title || "");
  const [descriptionInput, setDescriptionInput] = useState(description || "");
  const { postNote, isLoading } = usePostNote();
  const { putNote, isLoading: isLoadingPut } = usePutNote();
  const { getCategoryById } = useGetCategoryById();
  const { data } = useGetCategories();

  /**
   *  Agrega la categoria al estado local, y setea el input de "Nueva categoria"
   */
  const addCategory = async () => {
    if (categoryInput.trim() !== "") {
      setSelectedCategory(categoryInput);
      setCategoryInput("");
    }
  };

  /**
   * Se ejecuta cuando se da Enter en "Nueva categoria"
   */
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addCategory();
    }
  };

  /**
   * Elimina la categoria seleccionada del estado local
   */
  const removeCategory = () => {
    setSelectedCategory(null);
  };

  /**
   * Se ejecuta cuando se le da a "Guardar", si es de tipo "edit", hace un PUT con la info que tiene,
   * de lo contrario hace un POST, creando la nueva nota con toda la información.
   */
  const handleModalClose = () => {
    if (type === "edit") {
      putNote({
        id,
        title: titleInput,
        description: descriptionInput,
        archived,
        category: selectedCategory,
      });
    } else {
      postNote({
        title: titleInput,
        description: descriptionInput,
        category: selectedCategory,
      });
    }
    onClose();
  };

  /**
   * Si se presiona "Cancelar" se cierra el modal.
   */
  const closeModal = () => {
    onClose();
  };

  /**
   * Si selecciona una categoria existente, se busca la categoria y se agrega al estado local.
   */
  const handleCategoryExisting = async (event) => {
    if (event.target.value !== "All") {
      const selectedCategoryId = Number(event.target.value) + 1;
      const category = await getCategoryById(selectedCategoryId);
      setSelectedCategory(category.name);
    }
  };

  useEffect(() => {
    // Si es de tipo "Crear" seteamos los inputs
    if (type === "create") {
      setTitleInput("");
      setDescriptionInput("");
      setSelectedCategory(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsOpen]);

  useEffect(() => {
    async function functionSetCategory() {
      // Si es de tipo "Editar" guardamos las categorias de la nota en un estado local para luego mostrarlas
      if (type === "edit" && categoryId) {
        const category = await getCategoryById(categoryId);
        setSelectedCategory(category.name);
      }
    }
    functionSetCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsOpen]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="modal-content-note"
      overlayClassName="modal-overlay-note"
      ariaHideApp={false}
    >
      <h2>{type === "edit" ? "Edita tu nota" : "Crea tu nota"}</h2>
      <div className="separatorHeader" />

      <div className="input-container">
        <input
          type="text"
          id="titleInput"
          name="title"
          value={titleInput}
          placeholder="Título"
          onChange={(e) => setTitleInput(e.target.value)}
          required
        />
      </div>

      <div className="input-container">
        <textarea
          rows={5}
          id="descripcion"
          name="descripcion"
          value={descriptionInput}
          className="container-label-input"
          placeholder="Crear nota"
          onChange={(e) => setDescriptionInput(e.target.value)}
          required
        />
      </div>
      <FilterCategories
        categories={data}
        handleCategory={handleCategoryExisting}
        defaultValue="Elegir categoria existente"
        styleSelect={{
          padding: "6px",
          color: "#888d83",
          fontSize: "small",
          backgroundColor: "#51544a",
          margin: "0px",
          fontFamily: "sans-serif",
        }}
        disabled={selectedCategory}
      />
      <div className="square-ul-container">
        <div>
          <input
            className="container-label-input"
            id="categoryInput"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nueva categoria"
            disabled={selectedCategory}
          />
        </div>
        {selectedCategory && (
          <div className="selectedCategory">
            {selectedCategory}
            <FontAwesomeIcon
              className="icon"
              icon={faCircleXmark}
              onClick={() => removeCategory()}
            />
          </div>
        )}
      </div>

      <div className="container-label-button">
        <button onClick={closeModal} className="button">
          Cancelar
        </button>
        <button onClick={handleModalClose} type="submit" className="button">
          {isLoading || isLoadingPut ? "Cargando..." : "Guardar"}
        </button>
      </div>
    </Modal>
  );
};

export default ModalCreateEditNote;
