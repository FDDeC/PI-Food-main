const initialState = {
    wanRecipes: [],
    filterResult: [],
    recipeDetail: { id:null },
    filtering: false,    
    dietTypes: []
};
  
function orderByAlpha(recipes, filter) { 
    
    if (filter.orderAlpha === 'az') {//aplico orden A->Z
        recipes.sort(function(a, b) {
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            return 0;
        })
    } else {
        recipes.sort(function(a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
            return 0;
        })
    }
    return recipes
}

function orderByScore(recipes, filter) {
    if (filter.orderScore === 'asc') {//aplico orden A->Z
            recipes.sort(function (a, b) {
                if (a.spoonacularScore > b.spoonacularScore) return 1;
                if (a.spoonacularScore < b.spoonacularScore) return -1;
                return 0;
            })
        } else {
            recipes.sort(function (a, b) {
                if (a.spoonacularScore < b.spoonacularScore) return 1;
                if (a.spoonacularScore > b.spoonacularScore) return -1;
                return 0;
            })
    }
    return recipes
}

function rootReducer(state = initialState, action) {

    if (action.type === "SET_WAN_RECIPES") {
        return {
            ...state,
            wanRecipes: [action.payload]
        }
    }

    if (action.type === "ORDER_BY_ALPHA") {
        
        const orderedRecipes = orderByAlpha([...state.filterResult],action.payload)
        
        return {
            ...state,
            filterResult: orderedRecipes            
        }
    }

    if (action.type === "ORDER_BY_SCORE") {
        
        const orderedRecipes = orderByScore([...state.filterResult],action.payload)
        
        return {
            ...state,
            filterResult: orderedRecipes            
        }
    }


    if (action.type === "SET_RECIPES_AND_FILTER") { 
        
        if (action.payload.filter.title.length) {//aplico filtro de título
            action.payload.recipes = action.payload.recipes.filter(r => r.title.toLowerCase().includes(action.payload.filter.title.toLowerCase()))
        }
        if (action.payload.filter.dietsArr.length) { //aplico filtro de dietas
                action.payload.filter.dietsArr.forEach( diet => {
                action.payload.recipes = action.payload.recipes.filter(r => r.diets.includes(diet.toLowerCase()))    
            });            
        }
        const orderedRecipes = orderByAlpha(action.payload.recipes,action.payload.filter)           
        return {
            ...state,            
            filterResult: orderedRecipes            
        }
    }

    if (action.type === "SET_DIET_TYPES") {
        if (!Object.keys(state.dietTypes).length && Object.keys(action.payload).length) {
            return {
                ...state,
                dietTypes: action.payload
            }
        }    
    }
    
    if (action.type === "SET_FILTERING_STATUS") {
        return {
            ...state,
            filtering: action.payload
        }
    }    

    if (action.type === "SET_RECIPE_DETAIL") {        
        return {
            ...state,
            recipeDetail: action.payload //action.payload
        };
    }
    
    return state;
}

export default rootReducer;