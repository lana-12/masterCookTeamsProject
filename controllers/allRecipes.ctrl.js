const data = require('../data/db.json');
const { recipesCtrl } = require('./app.ctrl');

exports.getAllRecipes = (req, res) => {
    try {
        res.status(200).json(data.allRecipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
