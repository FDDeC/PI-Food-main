const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const wanRecipes = require('./data.js')
const {Diet,Recipe} = require('../db.js');
const router = Router();
const dietsFromSpoon = ['gluten free', 'ketogenic', 'vegetarian', 'lacto vegetarian', 'ovo vegetarian', 'vegan', 'pescetarian', 'paleolithic', 'primal', 'low fodmap', 'whole 30']
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post('/recipe', async (req, res) => {
    try {
        const newRecipe = await Recipe.create(req.body)
        const recipeRelation = await newRecipe.setDiets(req.body.diets)           
        return res.status(200).send({ done: true, data: newRecipe })    
    } catch (error) {
        return res.status(401).send({ done: false, data: `post('/recipe' ${ error }` })
    }    
})

router.get('/types', async (req, res) => {
    try {
        let response = []
        dietsFromSpoon.map(async (value,index) => {
            const addDiet = await Diet.findOrCreate({
                where: { name: value }
            })
            response.push(addDiet[0].get({ plain: true }))
            if (index === dietsFromSpoon.length - 1) {
                return res.status(200).json(response)
            }            
        });
    } catch (error) {
        return res.status(401).json({ done: false, data: `get('/types' ${error}` })
    }      
})

function sanitizeRecipe(recipeDb) {
    var data = recipeDb.get({ plain: true })
    data.diets = recipeDb.diets.map(d => d.name)
    data.analyzedInstructions = JSON.parse(recipeDb.analyzedInstructions)
    return data
}

router.get('/recipes/:id', async (req, res) => {
    try {                
        const id = req.params.id        
        const result = await Recipe.findByPk(id, {
        include: {
                model: Diet,
                attributes: ['name'],
                through: { attributes: [] }
            }            
        },{ raw: true })        
        return res.status(200).send({done:true, data:sanitizeRecipe(result)})
    } catch (error) {
        return res.status(401).json({ done: false, data: `get('/recipes/:id' ${error}` })
    }
})

router.get('/recipes', async (req, res) => {
    try {
        const name = req.query.name || ''
        
        if (name.legth) {//aca solicito recetas con nombres parecidos
            return res.status(200).send({done:true, data:name})
        } else {//aca solicito todas las recetas
            Recipe.findAll({
            include: {
                    model: Diet,
                    attributes: ['name'],
                    through: { attributes: [] }
                }            
            }, { raw: true }).then( data => data.map(e => sanitizeRecipe(e))).then(data=>res.status(200).send({ done:true, data:data }))        
            // console.log(result)//const result2 = await Promise.all(result.map(e => sanitizeRecipe(e)))
            // return res.status(200).send({ done:true, data:result })
            // if (result.length) {                 
                                
            // } else {
            //     return res.status(200).send({ done: true, data: [] })
            // }            
        }        
    } catch (error) {
        return res.status(401).json({ done: false, data: `get('/recipes' ${error}` })
    }
})

async function getRecipeById(id) {
    try {        
        const result = await Recipe.findByPk(id, {
        include: {
                model: Diet,
                attributes: ['name'],
                through: { attributes: [] }
            }            
        })
        const result2 = await result.get({ plain: true })
        result2.diets = result2.diets.map(d => d.name)
        result2.analyzedInstructions = JSON.parse(result2.analyzedInstructions)
        return { done:true, data: result2 } 
    } catch (error) {
        return { done:false, data: `getRecipeById(id) ${error}` }
    }
}


module.exports = router;
