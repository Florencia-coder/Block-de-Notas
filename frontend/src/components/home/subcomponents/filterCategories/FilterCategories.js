import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./filterCategories.css";

const FilterCategories = ({
  categories,
  handleCategory = () => {},
  styleSelect,
  defaultValue,
  selectedCategory,
  disabled,
  isLoadingCategories,
}) => {
  if (isLoadingCategories) {
    return (
      <div className="loading-spinner">
        <FontAwesomeIcon className="icon-filter" icon={faSpinner} spin />
      </div>
    );
  }
  return (
    <select
      key="SelectedCategories"
      style={styleSelect}
      onChange={handleCategory}
      defaultValue="Todas"
      disabled={disabled}
      value={selectedCategory}
    >
      <option value="All" selected>
        {defaultValue ? defaultValue : `Todas`}
      </option>
      {categories?.length > 0 &&
        categories?.map((category, index) => {
          return (
            <option value={index} name={category.name}>
              {category.name}
            </option>
          );
        })}
    </select>
  );
};

export default FilterCategories;
