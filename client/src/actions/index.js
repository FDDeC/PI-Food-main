//import WR from './test'
var WanRecipes = []
//var WanRecipes = WR

async function getWanRecipes() {
    try {        
        if (!WanRecipes.length) {                        
            const consulta = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&number=100`)
            const result = await consulta.json()
            WanRecipes = result.results
            return result.results   
        } else {                           
            return WanRecipes;
        } 
    } catch (error) {
        console.log(`error en getWanRecipes, ${error}`)
        return []
    }
    
}

async function getLanRecipes(title) {    
    try {
        const consulta = await fetch(`http://localhost:3001/recipes?name=${title}`)
        const result = await consulta.json()       
        return result.data        
    } catch (error) {
        console.log(`error en /actions getLanRecipes, ${error}`)
        return []
    }    
}



async function getDietTypes() {
    try {
        const consulta = await fetch(`http://localhost:3001/types`)
        const result = await consulta.json()        
        return result
    } catch (error) {
        console.log(`error en /actions getDietTypes, ${error}`)
        return []
    }    
}

async function getLanOrWanId(id) {
    try {
        const num = Number(id);
        if (Number.isInteger(num)) { 
            const consulta = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY2}`)
            const result = await consulta.json()
            return result            
        } else {
            const consulta = await fetch(`http://localhost:3001/recipes/${id}`)
            const result = await consulta.json()
            return result.data
        }        
    } catch (error) {
        console.log(`error en /actions getDietTypes, ${error}`)
        return { id:null }
    }
}

export function getDiets() {
    return async function (dispatch) {
        const dietTypes = await getDietTypes()        
        dispatch({ type: 'SET_DIET_TYPES', payload: dietTypes })              
    }
}

export function setOrder(order) {
    return async function (dispatch) {
        dispatch({ type: 'ORDER_RECIPES', payload: order })              
    }
}

export function setAlpha(order) {
    return async function (dispatch) {
        dispatch({ type: 'ORDER_BY_ALPHA', payload: order })              
    }
}

export function setScore(order) {
    return async function (dispatch) {
        dispatch({ type: 'ORDER_BY_SCORE', payload: order })              
    }
}

export function getRecipes(filter) {
    
    return async function (dispatch) {
        try {
            const wanR = await getWanRecipes()
            dispatch({type:'SET_WAN_RECIPES', payload:wanR})
            const lanR = await getLanRecipes(filter.title)            
            const allR = [...lanR,...wanR] //aca meto todo lo que me trae el wan y el lan, luego aplico filtro            
            dispatch({ type: 'SET_FILTERING_STATUS', payload: false })            
            const payloadWfilter = { recipes: allR, filter:filter }
            return dispatch({ type: "SET_RECIPES_AND_FILTER", payload: payloadWfilter });
        } catch (error) {
            console.log(error) 
            return dispatch({ type:'ERROR', payload: error})
        }
};
}

export function setFilteringStatus(value) {
    return function (dispatch) {        
        dispatch({ type: 'SET_FILTERING_STATUS', payload: value })
    }
}
export function addNewRecipe(value) {
    
    return function (dispatch) {        
        dispatch({ type: 'ADD_NEW_RECIPE', payload: value })
    }
}

export function setPage(value) {
    return function (dispatch) {        
        dispatch({ type: 'SET_PAGE_AND_LOAD_CONTENT', payload: value })
    }
}


export function getRecipeDetail(id) {    
    return async function (dispatch) {        
        try {
            const details = await getLanOrWanId(id)
            return dispatch({ type: "SET_RECIPE_DETAIL", payload: details });
        } catch (error) {
            console.log(error)
            return dispatch({ type: "SET_RECIPE_DETAIL", payload: { id:null }});
        }    
    };
}
  