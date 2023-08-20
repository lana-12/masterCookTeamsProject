const { resolve } = require('path');
const { allRecipes } = require('../data/db.json');
const { addRecipeCtrl } = require('./addRecipe.ctrl.js');
const fs = require('fs');

exports.homeCtrl = (req, res) => {
  res.sendFile(resolve('public', 'home.html'));
};

exports.recipesCtrl = (req, res) => {
  res.json(allRecipes);
};


exports.addRecipeCtrl = (req, res) => {
  addRecipeCtrl(req, res);
};

exports.deleteCtrl = (req, res) => {
  const id = req.params.id;
  let isIdExists = false;

  allRecipes.forEach(recipe => {
    const recipes = recipe.recipes;

    const index = recipes.findIndex(r => r.id == id);
    if (index !== -1) {
      isIdExists = true;
      recipes.splice(index, 1);
      if (recipes.length === 0) {
        // Supprimer la gastronomie si elle ne contient plus de recette
        allRecipes.splice(allRecipes.findIndex(r => r === recipe), 1);
      }
      return;
    }
  });

  if (!isIdExists) {
    const error = new Error('ID not found');
    error.name = 'NotFoundError';
    throw error;
  }

  // Réécrire le fichier db.json avec les modifications
  const updatedData = JSON.stringify({ allRecipes });
  fs.writeFile('data/db.json', updatedData, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('db.json updated successfully');
  });
};

exports.updateCtrl = (req, res) => {
  
  const id = req.params.id;
  console.log(id);

  const reqBody = req.body;
  console.log(reqBody);

  const recipe = req.body;

  const title = recipe.title;
  console.log(title);

  const ingredients = recipe.ingredients;
  console.log(ingredients);

  res.json(req.body);
}

