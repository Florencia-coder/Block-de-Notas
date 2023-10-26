import "./filterCategories.css";

const FilterCategories = ({
  categories,
  handleCategory = () => {},
  styleSelect,
  defaultValue,
  selectedCategory,
  disabled,
}) => {
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
