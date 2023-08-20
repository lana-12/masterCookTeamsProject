import { createMarkup } from "../utils/createMarkup.js";
import { units } from "../utils/unit.js"

// Fonction pour filtrer les recettes par nom

export function filterRecipes(allRecipes, recipeName) {
    const filteredRecipes = [];

    allRecipes.forEach(recipeGroup => {
        const filteredGroup = {
            name: recipeGroup.name,
            recipes: []
        };

        recipeGroup.recipes.forEach(recipe => {
            // verifie si le titre de la recette correspond à la recherche (ignore la casse)
            if (recipe.title.toLowerCase().includes(recipeName)) {
                filteredGroup.recipes.push(recipe);
            }
        });

        if (filteredGroup.recipes.length > 0) {
            filteredRecipes.push(filteredGroup);
        }
    });
    return filteredRecipes;
}

// Fonction pour générer les éléments HTML de la recette filtrée
export function createFilteredRecipeElements(filteredRecipes) {
    showElement.innerHTML = '';

    filteredRecipes.forEach(recipeGroup => {
        if (recipeGroup.name === "american") {
            createMarkup('h2', "Américain", showElement);
        }
        if (recipeGroup.name === "japanese") {
            createMarkup('h2', "Japonais", showElement);
        }
        if (recipeGroup.name === "italian") {
            createMarkup('h2', "Italien", showElement);
        }
        if (recipeGroup.name === "french") {
            createMarkup('h2', "Français", showElement);
        }
        const groupElement = createMarkup('div', '', showElement);
        const recipes = recipeGroup.recipes;

        recipes.forEach(recipe => {
            const recipeElement = createMarkup('div', '', groupElement, [{ class: "recipe" }]);
            createMarkup('h3', recipe.title, recipeElement);

            const ulElement = createMarkup('ul', '', recipeElement);
            recipe.ingredients.forEach(ingredient => {
                if (ingredient.unit === "UNIT_PM") {
                    createMarkup('li', `${ingredient.name} - ${units[ingredient.unit]}`, ulElement);

                } else {

                    createMarkup('li', `${ingredient.name} - ${ingredient.quantity} ${units[ingredient.unit]}`, ulElement);
                }
            });
        });
    });
}