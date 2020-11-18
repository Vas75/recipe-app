import { v4 as uuidv4 } from "uuid";
import { getRecipeById } from "./recipe";

//code to make the ingredient object, place on ing array of recipe
const createIngredient = (recipeID) => {
  const recipe = getRecipeById(recipeID);
  const ingredientName = document
    .getElementById("add-ingredient-input")
    .value.trim();
  const ingredientID = uuidv4();

  recipe.ingredients.push({
    name: ingredientName,
    stocked: false,
    ingredientID: ingredientID,
  });
};

const deleteIngredient = (recipeID, ingredientID) => {
  const recipe = getRecipeById(recipeID);

  recipe.ingredients = recipe.ingredients.filter(
    (ingr) => ingr.ingredientID !== ingredientID
  );
};

const toggleCheckBox = (recipeID, ingredientID, isChecked) => {
  const recipe = getRecipeById(recipeID);
  const ingredient = recipe.ingredients.find(
    (ingr) => ingr.ingredientID === ingredientID
  );

  ingredient.stocked = isChecked;
};

export { createIngredient, deleteIngredient, toggleCheckBox };
