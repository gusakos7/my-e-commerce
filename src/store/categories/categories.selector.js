import { createSelector } from "@reduxjs/toolkit";

const selectCategoriesReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categories) => categories.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
