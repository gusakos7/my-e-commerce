import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../../routes/categories-preview/categories-preview.component";
import Category from "../../routes/category/category.component";
import { setCategories } from "../../store/categories/categoriesSlice";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getCategoriesMap() {
      const categoriesArray = await getCategoriesAndDocuments();
      dispatch(setCategories(categoriesArray));
    }

    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
