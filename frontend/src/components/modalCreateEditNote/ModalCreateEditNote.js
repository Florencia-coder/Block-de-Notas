import Modal from "react-modal";
import "./modalCreateEditNote.css";
import { useEffect, useState } from "react";
import { usePostNote, usePutNote, usePostCategory } from "../../actions";

const ModalCreateEditNote = ({
  modalIsOpen,
  onClose,
  onSave,
  type,
  title,
  id,
  description,
  archived,
}) => {
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [titleInput, setTitleInput] = useState(title || "");
  const [descriptionInput, setDescriptionInput] = useState(description || "");
  const { postNote, isLoading } = usePostNote();
  const { putNote, isLoading: isLoadingPut } = usePutNote();
  const { postCategory } = usePostCategory();

  const addCategory = async () => {
    if (categoryInput.trim() !== "") {
      const newCategory = { id: Date.now(), name: categoryInput };
      // Creo la nueva categoria en la base de datos
      await postCategory({ name: categoryInput });
      // Agrego la nueva categoria al array de categorias de la nota
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      setCategoryInput("");
    }
  };
  const removeCategory = (categoryId) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== categoryId)
    );
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addCategory();
    }
  };

  const handleModalClose = () => {
    if (type === "edit") {
      putNote({
        id,
        title: titleInput,
        description: descriptionInput,
        archived,
      });
    } else {
      const categoryNames = categories.map((category) => category.name);
      postNote({
        title: titleInput,
        description: descriptionInput,
        categories: categoryNames,
      });
    }
    onClose();
  };

  const closeModal = () => {
    onClose();
  };

  useEffect(() => {
    if (type === "create") {
      setTitleInput("");
      setDescriptionInput("");
    }
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
      <h2>{type === "edit" ? "Edit Note" : "Create Note"}</h2>
      <div className="container-label">
        <label htmlFor="titulo">Title:</label>
        <input
          type="text"
          id="titleInput"
          name="title"
          value={titleInput}
          placeholder="New-Title"
          onChange={(e) => setTitleInput(e.target.value)}
          required
        />
      </div>
      <div className="container-label">
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          rows={5}
          id="descripcion"
          name="descripcion"
          value={descriptionInput}
          className="container-label-input"
          placeholder="New-Content"
          onChange={(e) => setDescriptionInput(e.target.value)}
          required
        />
      </div>
      <div className="container">
        <div className="container-label">
          <label htmlFor="categories">Categories:</label>
          <div className="square">
            <ul className="square-ul">
              {categories.map((category) => (
                <li className="square-ul-li" key={category.id}>
                  {category.name}
                  <button
                    onClick={() => removeCategory(category.id)}
                    className="button-remove"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container-label--categories">
          <input
            className="container-label-input"
            id="categoryInput"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="New-Category"
          />
          <button onClick={addCategory} className="button-add">
            Add
          </button>
        </div>
      </div>
      <div className="container-label-button">
        <button onClick={closeModal} className="button">
          Cancel
        </button>
        <button onClick={handleModalClose} type="submit" className="button">
          {isLoading || isLoadingPut ? "Loading..." : "Save"}
        </button>
      </div>
    </Modal>
  );
};

export default ModalCreateEditNote;
