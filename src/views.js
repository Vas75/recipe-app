import { getAllRecipes, getRecipeById } from "./recipe";
import {
  handleRecipeSelection,
  handleIngredientDelete,
  handleCheckBoxChange,
} from "./handlers";
import { getFilterSearchText } from "./filters";

const renderRecipes = () => {
  const recipeContainer = document.getElementById("recipe-container-inner");
  const searchText = getFilterSearchText();
  let recipes = getAllRecipes();

  //create array of recipes filtered by user search text
  recipes = recipes.filter((rec) =>
    rec.title.toLowerCase().includes(searchText.toLowerCase())
  );

  //clears container before rendering to
  while (recipeContainer.firstChild) {
    recipeContainer.removeChild(recipeContainer.firstChild);
  }

  if (recipes.length > 0) {
    recipes.forEach((rec) => {
      recipeContainer.appendChild(getRecipeHTML(rec));
    });
  } else {
    recipeContainer.appendChild(getNoRecipeMssg());
  }
};

const getRecipeHTML = (rec) => {
  const { title, id, ingredients } = rec;

  const div = document.createElement("div");
  div.classList.add("recipe-card");

  const h2 = document.createElement("h2");
  h2.textContent = title ? title : "unnamed recipe";

  //here we call to get numb of ingredients mssg
  const p = document.createElement("p");
  p.textContent = getNumIngredientsMssg(ingredients);

  div.appendChild(h2);
  div.appendChild(p);

  div.addEventListener("click", () => handleRecipeSelection(id));
  return div;
};

const getIngredientHTML = (ingredient) => {
  const { name, stocked, ingredientID } = ingredient;

  const div = document.createElement("div");
  div.classList.add("ingredient-card");
  div.setAttribute("data-index", ingredientID);

  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.checked = stocked;

  const p = document.createElement("p");
  p.textContent = name;

  const dltIngredientBtn = document.createElement("button");
  dltIngredientBtn.classList.add("modal-btn");
  dltIngredientBtn.textContent = "x";

  div.appendChild(checkBox);
  div.appendChild(p);
  div.appendChild(dltIngredientBtn);

  dltIngredientBtn.addEventListener("click", () => {
    handleIngredientDelete(ingredientID);
  });

  checkBox.addEventListener("change", (e) =>
    handleCheckBoxChange(e, ingredientID)
  );

  return div;
};

//init modal with recipe vals, sets id on the modal element so recipe obj may be retrieved later
const initializeEditModal = (id) => {
  const modal = document.getElementById("modal-container");
  const titleEl = document.getElementById("recipe-title");
  const instructionsEl = document.getElementById("recipe-instructions");

  modal.setAttribute("data-index", id);

  const recipe = getRecipeById(id);

  if (!recipe) {
    closeEditModal();
    return;
  }

  const { title, instructions } = recipe;

  titleEl.value = title;
  instructionsEl.value = instructions;
};

const renderIngredients = (id) => {
  const ingredientsContainer = document.getElementById(
    "ingredients-container-inner"
  );

  const { ingredients } = getRecipeById(id);

  while (ingredientsContainer.firstChild) {
    ingredientsContainer.removeChild(ingredientsContainer.firstChild);
  }

  ingredients.forEach((ingredient) => {
    const ingDiv = getIngredientHTML(ingredient);
    ingredientsContainer.appendChild(ingDiv);
  });
};

const getNumIngredientsMssg = (ingredients) => {
  let numOfStocked = 0;
  const totalIngredients = ingredients.length;

  for (let ingredient of ingredients) {
    if (ingredient.stocked) {
      numOfStocked++;
    }
  }

  if (totalIngredients < 1) {
    return "You haven't added any ingredients to this recipe yet.";
  } else if (totalIngredients === numOfStocked) {
    return "You have all the ingredients for this recipe!";
  } else if (numOfStocked === 0) {
    return "You have none of the ingredients for this recipe.";
  } else if (numOfStocked < totalIngredients) {
    return "You have some of the ingredients for this recipe.";
  }
};

const openEditModal = () => {
  const editModal = document.getElementById("modal-container");
  editModal.classList.add("show");
};

const closeEditModal = () => {
  const editModal = document.getElementById("modal-container");
  editModal.classList.remove("show");
};

const getNoRecipeMssg = () => {
  const div = document.createElement("div");
  div.textContent = "No recipes to show.";
  div.classList.add("no-recipes-mssg");
  return div;
};

export {
  openEditModal,
  initializeEditModal,
  closeEditModal,
  renderRecipes,
  renderIngredients,
};
