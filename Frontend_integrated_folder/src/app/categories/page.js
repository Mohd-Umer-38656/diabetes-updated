import CategoryPage from "@/Components/categories_components/categories"; // Importing the CategoryPage component
import React from "react"; // Importing React

const Categories = () => {
  return (
    <div>
      {" "}
      {/* Wrapper div for the component */}
      <CategoryPage /> {/* Rendering the CategoryPage component */}
    </div>
  );
};

export default Categories; // Exporting the Categories component as default
