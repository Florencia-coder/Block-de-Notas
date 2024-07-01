import Modal from "react-modal";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
  usePostNote,
  usePutNote,
  useGetCategories,
  useGetCategoryById,
} from "../../actions";
import FilterCategories from "../subcomponents/filterCategories/FilterCategories";
import Button from "../../atoms/button/Button";
import "./modalCreateEditNote.css";

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
  const { data, isLoading: isLoadingCategories } = useGetCategories();

  const validateFields = () => {
    if (titleInput.trim() === "" || descriptionInput.trim() === "") {
      alert("Por favor, complete todos los campos requeridos.");
      return false;
    }
    return true;
  };

  
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
  const handleModalClose = async () => {
    if (!validateFields()) return;

    if (type === "edit") {
      await putNote({
        id,
        title: titleInput.toLowerCase(),
        description: descriptionInput,
        archived,
        category: selectedCategory,
      });
    } else {
      await postNote({
        title: titleInput.toLowerCase(),
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
    if(event.target.value !== 'All'){
    const category = JSON.parse(event.target.value)
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
  }, [modalIsOpen]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="modal-content-note"
      overlayClassName="modal-overlay-note"
      ariaHideApp={false}
    >
      <h2 className="modal-content-note-title">{type === "edit" ? "Edita tu nota" : "Crea tu nota"}</h2>
      <div className="separatorHeader" />
<div>
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
</div>

      <FilterCategories
        isLoadingCategories={isLoadingCategories}
        categories={data}
        handleCategory={handleCategoryExisting}
        defaultValue="Elegir categoria existente"
        disabled={selectedCategory}
      />
      <div className="square-container">
            <input
            className="square-container-input"
            id="categoryInput"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nueva categoria"
            disabled={selectedCategory}
          />

        {selectedCategory && (
          <div className="selectedCategory">
            {selectedCategory}
            <FontAwesomeIcon
              className="icon-trash"
              icon={faCircleXmark}
              onClick={() => removeCategory()}
            />
          </div>
        )}
      </div>

      <div className="container-label-button">
        <Button
        onClick={closeModal}
        title="Cancelar"
        />
        
          <Button
          onClick={handleModalClose}
          type="submit"
          title={isLoading || isLoadingPut ? (
            <FontAwesomeIcon className="icon-spiner" icon={faSpinner} spin />
          ) : 'Guardar'}
          />

      </div>
    </Modal>
  );
};

export default ModalCreateEditNote;
