const initialState = {
    recipeAll: [],
    filterResult: [],
    recipeDetail: { id:null },
    filtering: false,    
    dietTypes: []
  };

function rootReducer(state = initialState, action) {

    if (action.type === "GET_ALL_RECIPES") {
        return {
            ...state,
            recipeAll: [action.payload]
        }
    }

    if (action.type === "ORDER_RECIPES") {
        
        var orderedRecipes = [...state.filterResult]
        if (action.payload.orderAlpha === 'az') {//aplico orden A->Z
            orderedRecipes.sort(function(a, b) {
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                return 0;
            })
        } else {
            orderedRecipes.sort(function(a, b) {
                if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
                return 0;
            })
        } 
        if (action.payload.orderScore === 'asc') {//aplico orden A->Z
            orderedRecipes.sort(function (a, b) {
                if (a.spoonacularScore > b.spoonacularScore) return 1;
                if (a.spoonacularScore < b.spoonacularScore) return -1;
                return 0;
            })
        } else {
            orderedRecipes.sort(function (a, b) {
                if (a.spoonacularScore < b.spoonacularScore) return 1;
                if (a.spoonacularScore > b.spoonacularScore) return -1;
                return 0;
            })
        }    
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
        if (action.payload.filter.orderAlpha === 'az') {//aplico orden A->Z
            action.payload.recipes.sort(function(a, b) {
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                return 0;
            })
        } else {
            action.payload.recipes.sort(function(a, b) {
                if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
                return 0;
            })
        } 
        if (action.payload.filter.orderScore === 'asc') {//aplico orden A->Z
            action.payload.recipes.sort(function (a, b) {
                if (a.spoonacularScore > b.spoonacularScore) return 1;
                if (a.spoonacularScore < b.spoonacularScore) return -1;
                return 0;
            })
        } else {
            action.payload.recipes.sort(function (a, b) {
                if (a.spoonacularScore < b.spoonacularScore) return 1;
                if (a.spoonacularScore > b.spoonacularScore) return -1;
                return 0;
            })
        }    
        return {
            ...state,
            filterResult: action.payload.recipes            
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