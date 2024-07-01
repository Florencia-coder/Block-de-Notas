import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useGetCategories } from "../../../actions";
import "./filterCategories.css";

const FilterCategories = ({
  handleCategory = () => {},
  styleSelect,
  defaultValue = 'Todas',
  selectedCategory,
  disabled= false,
}) => {
  const { data: categories, isLoading } = useGetCategories();
  if (isLoading) {
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
      disabled={disabled}
      value={selectedCategory}
    >
      <option value="All" key='all'>
        {defaultValue}
      </option>
      {categories?.length > 0 &&
        categories.map((category) => {
          return (
            <option value={JSON.stringify({ id: category.id, name: category.name })} name={category.name} key={category.id}>
              {category.name}
            </option>
          );
        })}
    </select>
  );
};

export default FilterCategories;
