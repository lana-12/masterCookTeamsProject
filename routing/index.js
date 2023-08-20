//On appelle les routes 
const router = require('express').Router();
const appRoutes = require('./app.routes');

router.use(appRoutes);

router.get('*', (req, res) => res.redirect('/home'));

module.exports = router;