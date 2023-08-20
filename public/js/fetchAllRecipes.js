import { createMarkup } from "../utils/createMarkup.js";
import { fetchDelete } from "../js/fetchDelete.js";
import { fetchUpdate } from "../js/fetchUpdate.js";
import { createForm } from './createForm.js';
import { createFilteredRecipeElements } from "../js/filterRecipe.js"
import { filterRecipes } from "../js/filterRecipe.js"
import { units } from "../utils/unit.js"

const showElement = document.getElementById('showElement');

// Creation du bouton nouvelle recette puis du formulaire
createForm();

fetch('https://localhost:4343/recipes', {
    method: "GET",
    headers:
    {
        "content-type": "application/json",
    },
}
)
    .then(res => res.json())
    .then(allRecipes => {

        allRecipes.forEach(recipeGroup => {
            
             createMarkup('h1', recipeGroup.name, showElement,);

            const country = createMarkup('section', "", showElement, [{ class: "row" }]);

            const recipes = recipeGroup.recipes;
            recipes.forEach(recipe => {

                const titleIng = createMarkup('article', '', country, [{ class: "card col-4 recipeName" }])

                createMarkup('h2', recipe.title, titleIng, [{ class: "card-title" }]);


                const cardBody = createMarkup('div', "", titleIng, [{ class: "card-body" }]);

                const ingredients = recipe.ingredients;
                ingredients.forEach(ingredient => {
                  
                    createMarkup('h3', ingredient.name, cardBody,[{ class:"fw-bold"}]);
                    createMarkup('p', ingredient.quantity+ " "+units[ingredient.unit], cardBody,[{class:"fs-5"}]);

                })
                const buttonDiv = createMarkup('div', '', cardBody, [{ class: 'd-flex justify-content-center' }])

                const btnEdit = createMarkup('button', 'Modifier', buttonDiv, [{ class: "btn btn-warning" }]);
                btnEdit.addEventListener('click', () => {

                    fetchUpdate(recipe.id, recipe);
                });
                
                const btnDelete = createMarkup('button', 'Supprimer', buttonDiv, [{ class: "reload btn btn-danger" }]);
                btnDelete.addEventListener('click', () => {

                    if (confirm('Souhaitez-vous confirmer ?')) {

                        fetchDelete(recipe.id)
                        location.href = "https://localhost:4343/home"
                    }
                    else {
                        location.href = "https://localhost:4343/home"
                    }

                    console.log("supprimer recipe ", recipe);
                });
            })
        })
        // Gestionnaire d'événements pour le formulaire de filtrage
        document.getElementById('filterForm').addEventListener('submit', event => {
            event.preventDefault();

            const recipeNameInput = document.getElementById('recipeNameInput');
            const recipeName = recipeNameInput.value.toLowerCase();

            // Filtrer les recettes par nom
            const resultFilter = filterRecipes(allRecipes, recipeName)

            // Générer les éléments HTML de la recette filtrée
            createFilteredRecipeElements(resultFilter)
        })
    });


