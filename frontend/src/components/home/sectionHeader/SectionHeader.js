import React from "react";
import FilterCategories from "../subcomponents/filterCategories/FilterCategories";
import { useGetCategories } from "../../../actions";

const SectionHeader = ({ handleCategoryChange, selectedCategory }) => {
  const { data: categories, isLoading } = useGetCategories();

  return (
    <section className="section-header">
      <div>
        <img src="/assets/images/note-logo.png" alt="logo note" />
        <h1 className="title">MIS NOTAS</h1>
      </div>
      <div className="category-filter">
        <h4>Filtrar Categoria</h4>

        <FilterCategories
          categories={(categories?.length > 0 && categories) || []}
          handleCategory={handleCategoryChange}
          selectedCategory={selectedCategory}
          isLoadingCategories={isLoading}
        />
      </div>
      <button style={{ width: "60px" }} title="procesando..." />
    </section>
  );
};

export default SectionHeader;
