import { updateFilters } from "./filters";
import {
  openEditModal,
  initializeEditModal,
  renderRecipes,
  closeEditModal,
  renderIngredients,
} from "./views";
import {
  createRecipe,
  storeRecipes,
  deleteRecipe,
  editRecipe,
} from "./recipe.js";

import {
  createIngredient,
  deleteIngredient,
  toggleCheckBox,
} from "./ingredient.js";

const handleUserSearch = (e) => {
  const searchTerm = e.target.value.trim();
  updateFilters(searchTerm);
  renderRecipes();
};

const handleNewRecipe = () => {
  openEditModal();
  const id = createRecipe();
  initializeEditModal(id);
  renderRecipes();
  renderIngredients(id);
  storeRecipes();
};

const handleRecipeEdit = (e, editType) => {
  const editText = e.target.value.trim();

  if (editType === "title") {
    editRecipe({ title: editText });
  } else if (editType === "instructions") {
    editRecipe({ instructions: editText });
  }

  renderRecipes();
  storeRecipes();
};

//called from eventlistener added in getRecipeHTML on views.js
const handleRecipeSelection = (id) => {
  openEditModal();
  initializeEditModal(id);
  renderIngredients(id);
};

const handleRecipeDelete = () => {
  const id = document
    .getElementById("modal-container")
    .getAttribute("data-index");

  deleteRecipe(id);
  renderRecipes();
  closeEditModal();
  storeRecipes();
};

const handleAddIngredient = () => {
  const ingredientInp = document.getElementById("add-ingredient-input");

  if (!ingredientInp.value) {
    return;
  }

  const recipeID = document
    .getElementById("modal-container")
    .getAttribute("data-index");
  createIngredient(recipeID);
  renderIngredients(recipeID);
  renderRecipes();
  storeRecipes();
  ingredientInp.value = "";
};

const handleIngredientDelete = (ingredientID) => {
  const recipeID = document
    .getElementById("modal-container")
    .getAttribute("data-index");
  deleteIngredient(recipeID, ingredientID);
  renderIngredients(recipeID);
  renderRecipes();
  storeRecipes();
};

const handleCheckBoxChange = (e, ingredientID) => {
  const isChecked = e.target.checked;
  const recipeID = document
    .getElementById("modal-container")
    .getAttribute("data-index");

  toggleCheckBox(recipeID, ingredientID, isChecked);
  renderRecipes();
  storeRecipes();
};

export {
  handleUserSearch,
  handleNewRecipe,
  handleRecipeSelection,
  handleRecipeDelete,
  handleRecipeEdit,
  handleAddIngredient,
  handleIngredientDelete,
  handleCheckBoxChange,
};
