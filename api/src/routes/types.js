const { Router } = require('express');
const { Diet } = require('../db');
const dietsFromSpoon = ['vegetarian', 'vegan', 'gluten free', 'ketogenic', 'lacto vegetarian', 'ovo vegetarian', 'pescetarian', 'paleolithic', 'primal', 'low fodmap', 'whole 30']
const router = Router();

async function getAllDietTypes() {
    var response = []   
    for (let i = 0; i < dietsFromSpoon.length; i++) {
        const result = await Diet.findOrCreate({
                    where: { name: dietsFromSpoon[i] }
                })
        const diet = await result[0].get({ plain: true })
        response.push(diet);
    }
    if (response.length === dietsFromSpoon.length) {        
        return response
    }
}

router.get('/', async (req, res) => {
    try {
        const diets = await getAllDietTypes()        
        return res.status(200).json(diets)
    } catch (error) {
        return res.status(401).json({ done: false, data: `get('/types' ${error}` })
    }      
})


module.exports = router;