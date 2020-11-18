import {
  handleUserSearch,
  handleNewRecipe,
  handleRecipeDelete,
  handleRecipeEdit,
  handleAddIngredient,
} from "./handlers";
import { closeEditModal, renderRecipes } from "./views";

const addRecipeBtn = document.getElementById("add-recipe-btn");
const recipeSearchInp = document.getElementById("search-input");

//modal elements
const modalContainer = document.getElementById("modal-container");
const recipeTitle = document.getElementById("recipe-title");
const instructions = document.getElementById("recipe-instructions");
const closeModalBtn = document.getElementById("close-modal-btn");
const deleteRecipeBtn = document.getElementById("delete-recipe-btn");
const addIngredientBtn = document.getElementById("add-ingredient-btn");

// add new recipe, will open edit page, start process of new rec. obj.
addRecipeBtn.addEventListener("click", handleNewRecipe);

//listener for user title search input
recipeSearchInp.addEventListener("input", handleUserSearch);

//close modal on click outside modal inner box
modalContainer.addEventListener("click", (e) => {
  if (e.target.id === "modal-container") {
    closeEditModal();
  }
});

//close the modal
closeModalBtn.addEventListener("click", () => {
  closeEditModal();
});

//edit recipe title
recipeTitle.addEventListener("input", (e) => handleRecipeEdit(e, "title"));

//edit recipe instructions
instructions.addEventListener("input", (e) =>
  handleRecipeEdit(e, "instructions")
);

//delete recipe
deleteRecipeBtn.addEventListener("click", handleRecipeDelete);

//add ingredient
addIngredientBtn.addEventListener("click", handleAddIngredient);

renderRecipes();
