
//**Ecoute le submit du formulaire de création de recette**//

export function handleFormSubmit(event) {
    event.preventDefault();

    // Génération d'un ID de recette aléatoire
    const recipeId = Math.floor(Math.random() * 10000);

    // Récupération du titre et du nom de pays de la recette
    const title = event.target.elements.title.value;
    const name = event.target.elements.name.value;

    // Récupération des ingrédients
    const ingredients = [];
    let index = 0;
    while (true) {
        const ingredientName = event.target.elements[`ingredientName${index}`]?.value;
        const ingredientQuantity = event.target.elements[`ingredientQuantity${index}`]?.value;
        const ingredientUnit = event.target.elements[`ingredientUnit${index}`]?.value;

        if (!ingredientName || !ingredientQuantity || !ingredientUnit) break; // Sortie de la boucle si l'un des champs d'ingrédient est manquant

        ingredients.push({
            name: ingredientName,
            quantity: parseFloat(ingredientQuantity), // Conversion de la quantité en nombre
            unit: ingredientUnit
        });
        index++;
    }

    // Construction de l'objet de recette
    const recipe = {
        id: recipeId,
        title: title,
        name: name,
        ingredients: ingredients,
    };
    
    console.log(recipe); // Affichage de l'objet de recette dans la console

    // Envoi de la recette à l'API
    fetch('https://localhost:4343/recipes', {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(recipe) // Conversion de l'objet de recette en JSON
    })
    .then(response => response.json()) // Transformation de la réponse en JSON
    .then(data => {
        console.log(data); // Affichage de la réponse de l'API
    })
    .catch(err => {
        console.error(err); // Affichage des erreurs éventuelles
    });
}
