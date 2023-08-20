const router = require('express').Router();
const {
    homeCtrl,
    recipesCtrl,
    deleteCtrl,
    addRecipeCtrl,
    updateCtrl

} = require('../controllers/app.ctrl');

router.get('/home', homeCtrl);
router.get('/recipes', recipesCtrl );
router.post('/recipes', addRecipeCtrl);
router.delete('/recipes/delete/:id', deleteCtrl);
router.patch('/recipes/update/:id', updateCtrl);

module.exports = router;