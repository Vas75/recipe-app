import { v4 as uuidv4 } from "uuid";

let recipes = [];

//local storage and retrieval of recipes array
const storeRecipes = () => {
  localStorage.setItem("recipes", JSON.stringify(recipes));
};

const loadRecipes = () => {
  const recipesJSON = localStorage.getItem("recipes");

  try {
    recipes = recipesJSON ? JSON.parse(recipesJSON) : [];
  } catch (error) {
    console.log(error);
    recipes = [];
  }
};

const createRecipe = () => {
  const id = uuidv4();

  recipes.push({
    title: "",
    instructions: "",
    ingredients: [],
    id: id,
  });

  return id;
};

//remove the recipe obj from array
const deleteRecipe = (id) => {
  recipes = recipes.filter((rec) => id !== rec.id);
};

const editRecipe = ({ title, instructions }) => {
  const id = document
    .getElementById("modal-container")
    .getAttribute("data-index");

  const recipe = getRecipeById(id);

  if (title) {
    recipe.title = title;
  } else if (instructions) {
    recipe.instructions = instructions;
  }
};

const getAllRecipes = () => recipes;

const getRecipeById = (id) => recipes.find((rec) => id === rec.id);

loadRecipes();

export {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  loadRecipes,
  storeRecipes,
  deleteRecipe,
  editRecipe,
};
