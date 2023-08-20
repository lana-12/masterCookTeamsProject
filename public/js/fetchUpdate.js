import { createMarkup } from "../utils/createMarkup.js";
import { units } from "../utils/unit.js"

export function fetchUpdate(id, recipe) {

    const ingredientsForm = recipe.ingredients;

    const editModal = document.getElementById('modalUpdate');

    // Create modal with style bootstrap
    const divDialog = createMarkup('div', '', editModal, [{ class: 'modal-dialog' }]);
    const divContent = createMarkup('div', '', divDialog, [{ class: 'modal-content' }]);
    const divHeader = createMarkup('div', '', divContent, [{ class: 'modal-header' }]);


    //** START FORM_EDIT **/ 

    //Create form modal bootstrap
    const formEdit = createMarkup('form', '', divHeader, [{ class: '' }]);

    // Create label + input for recipe.title
    const inputTitle = createMarkup('input', '', formEdit, [{ type: 'text' }, { id: 'titleRecipe' }, { name: 'title' }, { value: `${recipe.title}` }, { class: 'form-control' }]);

    //Start label + input Ingredients with 'compteur'
    let cpt = 0;
    ingredientsForm.forEach(ing => {

        //Display name
        console.log('list ingredients unité : ', ing);
        cpt++

        const divIngredient = createMarkup('div', '', formEdit, [{ class: 'ingredient' }]);

        //Name ingredients
        createMarkup('label', 'Ingrédient N°' + cpt, divIngredient, [{ for: 'ingName' }, { class: 'form-label' }]);
        createMarkup('input', '', divIngredient, [{ type: 'text' }, { id: 'ingName' }, { name: 'ingName' }, { value: `${ing.name}` }, { class: 'form-control  name' }])

        //Quantity ingredients
        createMarkup('input', '', divIngredient, [{ type: 'number' }, { id: 'ingQ' }, { name: 'ingQ' }, { value: `${ing.quantity}` }, { class: 'form-control  quantity' }])

        //Unit Ingredient 
        const inputUnit = createMarkup('input', '', divIngredient, [{ type: 'text' }, { id: 'ingUnit' }, { name: 'ingUnit' }, { value: `${ing.unit}` }, { class: 'form-control unit' }])

        //rien qui ne change lors du changement mais le select affiche les units
        //test select + option
        const selectEdit = createMarkup('select', '', divIngredient, [{ class: ' ' }])
        createMarkup('option', ing.unit, selectEdit, [{ name: 'optioningUnit' }, { value: '' }, { class: ' ' }])

        //loop of the units
        for (const element in units) {
            createMarkup('option', units[element], selectEdit, [{ value: element }, { class: '' }]);
        }
    });

    // Create Btn submit "du form "
    const btnSubmit = createMarkup('button', 'Modifier', formEdit, [{ class: 'btn btn-primary' }, { type: 'submit' }])

    btnSubmit.addEventListener("click", (e) => {
        e.preventDefault();

        // Collecter les données saisies dans le formulaire
        const title = inputTitle.value;
        console.log(title)
        const ingredients = [];

        const ingredientInputs = document.querySelectorAll(".ingredient");

        ingredientInputs.forEach((input) => {
            const name = input.querySelector(".name").value;
            console.log('118', name)
            const quantity = input.querySelector(".quantity").value;
            const unit = input.querySelector(".unit").value;
            ingredients.push({ name, quantity, unit });
            console.log('122', ingredients)
        });
        console.log(ingredients);

        const updatedRecipe = { title, ingredients };
        console.log(updatedRecipe);

        update(updatedRecipe, id);
    });

    // "Lancement bootstrapModal => formedit"
    editModal = new bootstrap.Modal(document.getElementById('modalUpdate'), {});
    editModal.show();


    //** START FETCH PATCH **/ 

    async function update(updatedRecipe, id) {
        console.log(updatedRecipe);
        console.log(id);
        try {
            fetch(`https://localhost:4343/recipes/update/${id}`, {

                method: "PATCH",
                headers:
                {
                    "content-type": "application/json",

                },
                body: JSON.stringify(updatedRecipe)
            })
        } catch (error) {
            console.log(error)
            console.log(body);
        }
    }
}
