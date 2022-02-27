const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const wanRecipes = require('./data.js')
const {Diet,Recipe} = require('../db.js');
const router = Router();
const dietsFromSpoon = ['gluten free', 'ketogenic', 'vegetarian', 'lacto vegetarian', 'ovo vegetarian', 'vegan', 'pescetarian', 'paleolithic', 'primal', 'low fodmap', 'whole 30']
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//aplico una funcion a cada valor del arreglo devuelto por la base de datos
function refactorizarArray(arrdB,sanitizante) {
    return new Promise(function (resolve, reject) {
        var newArr = []
        if (arrdB.length) {
                arrdB.map((value, index) => {
                newArr.push(sanitizante(value))                
                if (index === arrdB.length - 1) {
                    resolve(newArr)
                }
            })
        } else {
            resolve(newArr)
        }        
    })
}

//filtro las recetas por titulo
function filterByTitle(arr,name) {
    return new Promise(function (resolve, reject) {
        var newArr = []
        if (arr.length) {            
            arr.map((value, index) => {
                if (value.title.toLowerCase().includes(name.toLowerCase())) {
                    newArr.push(value)       
                }                                
                if (index === arr.length - 1) {
                    resolve(newArr)
                }
            })
        } else {
            resolve(arr)
        }        
    })
}

//modifica arreglo de receta
function sanitizeRecipe(recipeDb) {
    var data = recipeDb.get({ plain: true })
    data.diets = recipeDb.diets.map(d => d.name)
    data.analyzedInstructions = JSON.parse(recipeDb.analyzedInstructions)
    return data
}

// cargo receta en base de datos y aplico relacion entre tablas
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
        return res.status(200).json({done:true, data:sanitizeRecipe(result)})
    } catch (error) {
        return res.status(401).json({ done: false, data: `get('/recipes/:id' ${error}` })
    }
})

router.get('/recipes', async (req, res) => {
    try {
        const name = req.query.name || ''
        
        const result = await Recipe.findAll({
            include: {
                    model: Diet,
                    attributes: ['name'],
                    through: { attributes: [] }
                }            
        }, { raw: true })

        const result2 = await refactorizarArray(result, sanitizeRecipe)
                
        const recipes = await filterByTitle(result2,name)

        return res.status(200).json({ done:true, data:recipes })                        
                
    } catch (error) {        
        return res.status(401).json({ done: false, data: `get('/recipes' ${error}` })
    }
})

module.exports = router;
