const { Router } = require('express');
const { Recipe } = require('../db');
const router = Router();

// cargo receta en base de datos y aplico relacion entre tablas
router.post('/', async (req, res) => {
    try {
        const newRecipe = await Recipe.create(req.body)
        const recipeRelation = await newRecipe.setDiets(req.body.diets)           
        return res.status(200).send({ done: true, data: newRecipe })    
    } catch (error) {
        return res.status(401).send({ done: false, data: `post('/recipe' ${ error }` })
    }    
})

module.exports = router;