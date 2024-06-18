import React from "react";
import FilterCategories from "../subcomponents/filterCategories/FilterCategories";
import { useGetCategories } from "../../actions";
import './sectionHeader.css'

const SectionHeader = ({ handleCategoryChange, selectedCategory }) => {
  const { data: categories, isLoading } = useGetCategories();

  return (
    <section className="header">
      <div className="header_logo">
        <img className="header_logo_img" src="/assets/images/note-logo.png" alt="logo note" />
        <h1 className="header_logo_title">MIS NOTAS</h1>
      </div>
      <div className="block-filter">
        <h4 className="block-filter_title">Filtrar Categoria</h4>

        <FilterCategories
          categories={(categories?.length > 0 && categories) || []}
          handleCategory={handleCategoryChange}
          selectedCategory={selectedCategory}
          isLoadingCategories={isLoading}
        />
      </div>
    </section>
  );
};

export default SectionHeader;
