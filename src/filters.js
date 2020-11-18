const filters = {
  searchText: "",
};

//update filter text used to filter recipies by title
const updateFilters = (searchTerm) => {
  filters.searchText = searchTerm;
};

//return current filter search text
const getFilterSearchText = () => filters.searchText;

export { updateFilters, getFilterSearchText };
