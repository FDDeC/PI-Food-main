const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const router = Router();

//modifica arreglo de receta
function refactRecipe(recipeDb) {
    var data = recipeDb.get({ plain: true })
    data.diets = recipeDb.diets.map(d => d.name)
    data.analyzedInstructions = JSON.parse(recipeDb.analyzedInstructions)
    return data
}

router.get('/:id', async (req, res) => {
    try {                
        const id = req.params.id        
        const result = await Recipe.findByPk(id, {
        include: {
                model: Diet,
                attributes: ['name'],
                through: { attributes: [] }
            }            
        },{ raw: true })        
        return res.status(200).json({done:true, data:refactRecipe(result)})
    } catch (error) {
        return res.status(401).json({ done: false, data: `get('/recipes/:id' ${error}` })
    }
})

router.get('/', async (req, res) => {
    try {
        const name = req.query.name || ''
        
        const result = await Recipe.findAll({
            include: {
                    model: Diet,
                    attributes: ['name'],
                    through: { attributes: [] }
                }            
        }, { raw: true })

        const result2 = result.map(r => refactRecipe(r))    
        
        const recipes = name.length ? result2.filter(r => r.title.toLowerCase().includes(name.toLowerCase())) : result2 
        
        return res.status(200).json({ done:true, data:recipes })   
    } catch (error) {        
        return res.status(401).json({ done: false, data: `get('/recipes' ${error}` })
    }
})

module.exports = router;