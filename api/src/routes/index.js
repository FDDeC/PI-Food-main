const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const wanRecipes = require('./data.js')
const {Diet,Recipe} = require('../db.js');
const router = Router();

const types = require('./types.js');
const recipe = require('./recipe.js');
const recipes = require ('./recipes.js')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/types', types);
router.use('/recipe', recipe);
router.use('/recipes', recipes)





module.exports = router;
